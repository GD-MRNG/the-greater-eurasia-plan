/**
 * panzoom.js: free pan and zoom for the map, plus the +/-/Reset and "Move map" controls.
 *
 * How it works
 *  - The controller owns a camera {cx, cy, scale} (see map.js) and a viewport size.
 *  - While a gesture is running, the current SVG is only moved with a cheap CSS transform, so dragging
 *    and pinching feel instant. When the gesture settles (pointer up, or 140 ms after the last wheel tick)
 *    the map is re-rendered at the new camera. That re-render is what keeps dots, lines and fonts at a
 *    constant, readable pixel size and reveals more labels as you zoom in.
 *  - The preset view buttons (fitView) just set the same camera, so presets and free movement never disagree.
 *  - Zoom is limited: out to 85% of the tab's default view, in to 16x that.
 *
 * Input
 *  - Mouse:  drag to pan, wheel (or trackpad pinch) zooms around the cursor, double-click zooms in.
 *  - Touch:  one-finger drag pans and two fingers pinch, but ONLY while the map is "active", so the page
 *            can still be scrolled with a finger over the map. Tap the map (not a dot) or the "Move map"
 *            button to activate it; "Done", or a touch outside the map, deactivates it.
 *  - Keys:   with the map focused, arrows pan and + / - / 0 zoom and reset.
 *  - A drag never counts as a click, so tapping a dot still jumps to its stage card.
 *
 * "Touch device" means a coarse pointer or any touch points reported by the browser.
 *
 * Expected markup (see index.html): #mapbox containing #mapwrap, and #zoomIn #zoomOut #zoomReset #mapMove #mapTip.
 *
 * Exposes: GEP.panzoom.create(options) -> controller
 *   options: { container: HTMLElement, render(camera, viewport), onChange() }
 *   controller: load(views), fitView(index), zoomBy(factor), reset(), resize(), redraw(),
 *               camera, viewport, activeView (index of the preset on screen, or null after free movement)
 * Depends on: shared.js, map.js (fitCamera, viewportFor, projector).
 */
GEP.panzoom = (function () {
  const {$} = GEP;

  const ZOOM_IN_LIMIT = 16;        // max zoom, as a multiple of the default view's scale
  const ZOOM_OUT_LIMIT = 0.85;     // min zoom, as a multiple of the default view's scale
  const PAN_MARGIN_DEG = 6;        // the camera centre may stray this far outside the default view
  const BUTTON_FACTOR = 1.6;       // zoom step of the + and - buttons
  const WHEEL_STEP = 0.0016;       // zoom per wheel delta unit (zoom = exp(-delta * step))
  const DRAG_THRESHOLD = 5;        // px of movement before a press becomes a drag
  const SETTLE_MS = 140;           // wait after the last wheel tick before re-rendering
  const KEY_PAN_PX = 80;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  /**
   * @param {{container:HTMLElement, render:function, onChange:function}} options
   */
  function create(options) {
    const {container, render} = options;
    const box = $("mapbox");
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;

    let views = [];
    let viewport = {width: 0, height: 0, aspect: 1};
    let camera = {cx: 0, cy: 0, scale: 1};   // camera of the SVG currently on screen
    let live = camera;                       // camera during a gesture (differs until the next render)
    let limits = {min: 1, max: 1, lonMin: 0, lonMax: 0, latMin: 0, latMax: 0};
    let activeView = 0;
    let touchActive = false;
    let settleTimer = null;
    const pointers = new Map();              // pointerId -> {x, y} in client px
    let gesture = null;                      // {kind: "pan"|"pinch", ...} while a drag or pinch runs
    let suppressClick = false;

    /* ---------- camera math ---------- */

    /** Client (page) pixel -> map-box pixel (the SVG is drawn 1:1 with the box, but be safe if it is not). */
    function toBoxPoint(clientX, clientY) {
      const rect = container.getBoundingClientRect();
      return {x: (clientX - rect.left) * viewport.width / rect.width, y: (clientY - rect.top) * viewport.height / rect.height};
    }

    function computeLimits() {
      const [lonMin, lonMax, latMin, latMax] = views[0].b;
      const base = GEP.map.fitCamera(views[0].b, viewport).scale;
      limits = {
        min: base * ZOOM_OUT_LIMIT, max: base * ZOOM_IN_LIMIT,
        lonMin: lonMin - PAN_MARGIN_DEG, lonMax: lonMax + PAN_MARGIN_DEG,
        latMin: latMin - PAN_MARGIN_DEG, latMax: latMax + PAN_MARGIN_DEG
      };
    }

    function clampCamera(c) {
      return {
        scale: clamp(c.scale, limits.min, limits.max),
        cx: clamp(c.cx, limits.lonMin, limits.lonMax),
        cy: clamp(c.cy, limits.latMin, limits.latMax)
      };
    }

    /** Camera after zooming to `scale` while keeping the lon/lat under a box point fixed. */
    function zoomAround(from, scale, boxPoint) {
      const target = clamp(scale, limits.min, limits.max);
      const before = GEP.map.projector(from, viewport);
      const lon = before.lon(boxPoint.x), lat = before.lat(boxPoint.y);
      return clampCamera({
        scale: target,
        cx: lon - (boxPoint.x - viewport.width / 2) / target,
        cy: lat + (boxPoint.y - viewport.height / 2) * viewport.aspect / target
      });
    }

    /** Camera after dragging the map by (dx, dy) box pixels. */
    function panBy(from, dx, dy) {
      return clampCamera({scale: from.scale, cx: from.cx - dx / from.scale, cy: from.cy + dy * viewport.aspect / from.scale});
    }

    /* ---------- rendering ---------- */

    /** Move the existing SVG so it looks like it is already at `live`, without redrawing it. */
    function previewTransform() {
      const svg = container.firstElementChild;
      if (!svg) return;
      const k = live.scale / camera.scale;
      const tx = (camera.cx - live.cx) * live.scale + viewport.width / 2 * (1 - k);
      const ty = (live.cy - camera.cy) * live.scale / viewport.aspect + viewport.height / 2 * (1 - k);
      const unit = container.getBoundingClientRect().width / viewport.width;   // css px per box px
      svg.style.transformOrigin = "0 0";
      svg.style.transform = `matrix(${k},0,0,${k},${tx * unit},${ty * unit})`;
    }

    /** Re-render at the live camera and tell the page. */
    function commit() {
      clearTimeout(settleTimer);
      camera = live;
      render(camera, viewport);
      updateButtons();
      options.onChange();
    }

    function setLive(next) { live = next; previewTransform(); }

    function updateButtons() {
      $("zoomIn").disabled = camera.scale >= limits.max * 0.999;
      $("zoomOut").disabled = camera.scale <= limits.min * 1.001;
    }

    /* ---------- public camera commands ---------- */

    /** Show preset view `index` (fits its box in the viewport). */
    function fitView(index) {
      if (!views[index]) return;
      activeView = index;
      live = clampCamera(GEP.map.fitCamera(views[index].b, viewport));
      commit();
    }

    function zoomBy(factor) {
      const centre = {x: viewport.width / 2, y: viewport.height / 2};
      activeView = null;
      live = zoomAround(live, live.scale * factor, centre);
      commit();
    }

    /** Back to the default (first) view. */
    function reset() { fitView(0); }

    /** Switch to a new tab's views and show the first one (or the one requested). */
    function load(newViews, firstView) {
      views = newViews;
      viewport = GEP.map.viewportFor(views[0].b, container.clientWidth || 1000);
      computeLimits();
      setTouchActive(false);
      fitView(firstView || 0);
    }

    /** The container changed width: keep what is in view and re-render. */
    function resize() {
      const width = container.clientWidth;
      if (!views.length || !width || Math.round(width) === viewport.width) return;
      const oldWidth = viewport.width;
      viewport = GEP.map.viewportFor(views[0].b, width);
      computeLimits();
      live = clampCamera({cx: live.cx, cy: live.cy, scale: live.scale * viewport.width / oldWidth});
      commit();
    }

    /** Re-render without moving (the selection changed). */
    function redraw() { render(camera, viewport); }

    /* ---------- touch activation (so a finger can still scroll the page) ---------- */

    function setTouchActive(on) {
      touchActive = on;
      box.classList.toggle("active", on);
      $("mapMove").textContent = on ? "Done" : "Move map";
      $("mapMove").setAttribute("aria-pressed", String(on));
      $("mapTip").textContent = tipText();
    }

    function tipText() {
      if (!isTouchDevice) return "Drag to pan. Scroll or pinch the trackpad to zoom around the cursor. Double-click to zoom in. Tap a dot to jump to its stage.";
      return touchActive
        ? "Map is active: drag to pan, pinch to zoom. Tap Done (or outside the map) to scroll the page again."
        : "The page scrolls normally over the map. Tap Move map to pan and pinch, or use + and −.";
    }

    /* ---------- pointer gestures ---------- */

    /** May this pointer move the map? Mice always can, touches only while the map is active. */
    function canMove(event) { return event.pointerType !== "touch" || touchActive; }

    function startPan(point) {
      gesture = {kind: "pan", startX: point.x, startY: point.y, from: live, moved: false};
    }

    function startPinch() {
      const [a, b] = [...pointers.values()];
      const mid = toBoxPoint((a.x + b.x) / 2, (a.y + b.y) / 2);
      gesture = {kind: "pinch", startDistance: Math.hypot(a.x - b.x, a.y - b.y) || 1, startMid: mid, from: live, moved: true};
    }

    function onPointerDown(event) {
      if (event.button > 0 && event.pointerType === "mouse") return;
      pointers.set(event.pointerId, {x: event.clientX, y: event.clientY});
      suppressClick = false;
      if (!canMove(event)) return;
      if (pointers.size === 1) startPan({x: event.clientX, y: event.clientY});
      else if (pointers.size === 2) startPinch();
    }

    function onPointerMove(event) {
      const tracked = pointers.get(event.pointerId);
      if (!tracked || !gesture) return;
      tracked.x = event.clientX; tracked.y = event.clientY;
      if (gesture.kind === "pan") {
        const dx = event.clientX - gesture.startX, dy = event.clientY - gesture.startY;
        if (!gesture.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
        if (!gesture.moved) { gesture.moved = true; suppressClick = true; container.setPointerCapture(event.pointerId); box.classList.add("dragging"); }
        const scale = viewport.width / container.getBoundingClientRect().width;   // box px per client px
        activeView = null;
        setLive(panBy(gesture.from, dx * scale, dy * scale));
      } else if (gesture.kind === "pinch" && pointers.size >= 2) {
        const [a, b] = [...pointers.values()];
        const ratio = Math.hypot(a.x - b.x, a.y - b.y) / gesture.startDistance;
        const mid = toBoxPoint((a.x + b.x) / 2, (a.y + b.y) / 2);
        suppressClick = true;
        activeView = null;
        // Zoom about where the fingers started, then slide so that point follows the fingers.
        const zoomed = zoomAround(gesture.from, gesture.from.scale * ratio, gesture.startMid);
        setLive(panBy(zoomed, mid.x - gesture.startMid.x, mid.y - gesture.startMid.y));
      }
    }

    function onPointerEnd(event) {
      if (!pointers.has(event.pointerId)) return;
      const wasTap = event.type === "pointerup" && !suppressClick && event.pointerType === "touch" && !touchActive && !event.target.closest(".dot");
      pointers.delete(event.pointerId);
      box.classList.remove("dragging");
      if (gesture && gesture.moved) commit();
      gesture = null;
      if (pointers.size === 1 && touchActive) {          // one finger left after a pinch: carry on panning
        const rest = [...pointers.values()][0];
        startPan(rest);
      }
      if (wasTap) setTouchActive(true);
    }

    /** A drag or pinch must not also click whatever is under the finger (a dot, say). */
    function onClickCapture(event) {
      if (!suppressClick) return;
      suppressClick = false;
      event.stopPropagation();
      event.preventDefault();
    }

    /* ---------- wheel, double-click, keys, buttons ---------- */

    function onWheel(event) {
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 33 : event.deltaMode === 2 ? 400 : 1;   // lines / pages -> px
      const factor = Math.exp(-event.deltaY * unit * WHEEL_STEP * (event.ctrlKey ? 4 : 1));
      activeView = null;
      setLive(zoomAround(live, live.scale * factor, toBoxPoint(event.clientX, event.clientY)));
      clearTimeout(settleTimer);
      settleTimer = setTimeout(commit, SETTLE_MS);
    }

    function onDoubleClick(event) {
      if (event.target.closest(".dot")) return;
      activeView = null;
      live = zoomAround(live, live.scale * 2, toBoxPoint(event.clientX, event.clientY));
      commit();
    }

    function onKeyDown(event) {
      const moves = {ArrowLeft: [KEY_PAN_PX, 0], ArrowRight: [-KEY_PAN_PX, 0], ArrowUp: [0, KEY_PAN_PX], ArrowDown: [0, -KEY_PAN_PX]};
      if (moves[event.key]) { activeView = null; live = panBy(live, ...moves[event.key]); commit(); }
      else if (event.key === "+" || event.key === "=") zoomBy(BUTTON_FACTOR);
      else if (event.key === "-" || event.key === "_") zoomBy(1 / BUTTON_FACTOR);
      else if (event.key === "0") reset();
      else return;
      event.preventDefault();
    }

    /** Touching anywhere outside the map hands scrolling back to the page. */
    function onDocumentPointerDown(event) {
      if (touchActive && event.pointerType === "touch" && !box.contains(event.target)) setTouchActive(false);
    }

    /* ---------- wiring ---------- */

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerEnd);
    container.addEventListener("pointercancel", onPointerEnd);
    container.addEventListener("click", onClickCapture, true);
    container.addEventListener("wheel", onWheel, {passive: false});
    container.addEventListener("dblclick", onDoubleClick);
    container.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onDocumentPointerDown);
    $("zoomIn").addEventListener("click", () => zoomBy(BUTTON_FACTOR));
    $("zoomOut").addEventListener("click", () => zoomBy(1 / BUTTON_FACTOR));
    $("zoomReset").addEventListener("click", reset);
    $("mapMove").addEventListener("click", () => setTouchActive(!touchActive));
    box.classList.toggle("touch", isTouchDevice);
    setTouchActive(false);

    return {
      load, fitView, zoomBy, reset, resize, redraw,
      get camera() { return camera; },
      get viewport() { return viewport; },
      get activeView() { return activeView; }
    };
  }

  return {create};
})();
