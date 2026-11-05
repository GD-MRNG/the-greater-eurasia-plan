/**
 * map.js: draws the inline SVG sketch map for one tab from a camera.
 *
 * Camera model (shared with panzoom.js):
 *   viewport  {width, height, aspect}   pixel size of the map box and the latitude stretch
 *   camera    {cx, cy, scale}           lon/lat at the centre of the box, and pixels per degree of longitude
 * Latitude is stretched by 1/aspect (aspect = cos of the tab's middle latitude) so shapes look roughly right.
 *
 * Every draw is a fresh render at the camera's true scale, so dots, line widths and fonts always stay at
 * a readable pixel size, and a higher zoom reveals more labels (see LABEL_MIN_SCALE). Labels are placed
 * greedily, biggest first, and anything that would overlap is dropped (the dot keeps its hover title).
 *
 * A tab whose default view runs past longitude 180 (Oceania) is drawn in that continuous frame.
 * Stops, lines, land and diamonds are shifted with GEP.lonInView so the date line is not a seam.
 * A land polygon smaller than a few pixels, and smaller than a couple of degrees, is drawn as a
 * dot of fixed size so atolls stay visible when the whole Pacific is on screen.
 *
 * Exposes: GEP.map = { viewportFor, fitCamera, projector, draw }
 * Depends on: shared.js, model.js, data/land.js, data/tabs.js, data/arcs.js, data/entries.js.
 */
GEP.map = (function () {
  const {svgEl} = GEP;
  const {tabs, arcs, entries, land, water} = GEP.data;

  const MAX_HEIGHT = 820;        // px, cap for tall regions on wide screens
  const NARROW_WIDTH = 640;      // px, below this the box is made taller so it is usable on a phone
  const SEA = "#0d1422";
  const COAST = "#3b4f78";
  const LABEL_MIN_SCALE = 8;     // px per degree of longitude from which plain (unflagged) stops may be labelled
  const GRID_STEPS = [30, 20, 10, 5, 2, 1];   // candidate graticule spacings in degrees
  const GRID_MIN_PX = 60;        // keep graticule lines at least this far apart
  const ISLAND_MIN_PX = 8;       // a land shape smaller than this on screen (and geographically small) becomes a marker
  const ISLAND_MARK_R = 4;       // radius of that marker, in px
  const ISLAND_MAX_DEG = 2;      // only shapes spanning fewer degrees than this are eligible, so a continent is never replaced

  /* ---------- viewport, camera and projection ---------- */

  /**
   * Size the map box for a tab. The height follows the shape of the tab's default view
   * (capped on wide screens), and is kept tall enough on phones to be usable.
   * @param {number[]} bounds         the tab's default view [lonMin, lonMax, latMin, latMax]
   * @param {number} containerWidth   px
   * @returns {{width:number, height:number, aspect:number}}
   */
  function viewportFor(bounds, containerWidth) {
    const [lonMin, lonMax, latMin, latMax] = bounds;
    const aspect = Math.cos((latMin + latMax) / 2 * Math.PI / 180);
    const width = Math.max(Math.round(containerWidth), 280);
    let height = width * (latMax - latMin) / ((lonMax - lonMin) * aspect);
    height = width < NARROW_WIDTH ? Math.min(Math.max(height, width * 0.95), width * 1.3) : Math.min(height, MAX_HEIGHT);
    return {width, height: Math.round(height), aspect};
  }

  /**
   * The camera that shows a lon/lat box as large as possible inside the viewport.
   * @param {number[]} bounds  [lonMin, lonMax, latMin, latMax]
   * @param {{width:number, height:number, aspect:number}} viewport
   * @returns {{cx:number, cy:number, scale:number}}
   */
  function fitCamera(bounds, viewport) {
    const [lonMin, lonMax, latMin, latMax] = bounds;
    const scale = Math.min(viewport.width / (lonMax - lonMin), viewport.height * viewport.aspect / (latMax - latMin));
    return {cx: (lonMin + lonMax) / 2, cy: (latMin + latMax) / 2, scale};
  }

  /**
   * Conversion functions between lon/lat and pixels inside the map box.
   * @returns {{x:function, y:function, lon:function, lat:function}}
   */
  function projector(camera, viewport) {
    const {cx, cy, scale} = camera;
    const {width, height, aspect} = viewport;
    return {
      x: lon => (lon - cx) * scale + width / 2,
      y: lat => (cy - lat) * scale / aspect + height / 2,
      lon: px => (px - width / 2) / scale + cx,
      lat: py => cy - (py - height / 2) * aspect / scale
    };
  }

  /* ---------- background: land, graticule, region names ---------- */

  /**
   * Parse a "lon,lat lon,lat" ring, unwrap it so neighbours stay within 180° of each other,
   * then shift the whole ring into the tab's default view when that crosses the date line.
   * One shift for the ring (not per point) keeps a continent in one piece.
   * @returns {number[][]} [lon, lat] pairs in the view's frame
   */
  function ringForView(text, bounds) {
    const pairs = text.trim().split(/\s+/).map(pair => pair.split(",").map(Number));
    if (!pairs.length) return [];
    const ring = [[pairs[0][0], pairs[0][1]]];
    for (let i = 1; i < pairs.length; i++) {
      let lon = pairs[i][0];
      const prev = ring[i - 1][0];
      while (lon - prev > 180) lon -= 360;
      while (prev - lon > 180) lon += 360;
      ring.push([lon, pairs[i][1]]);
    }
    const mean = ring.reduce((sum, p) => sum + p[0], 0) / ring.length;
    const shift = GEP.lonInView(mean, bounds) - mean;
    return shift ? ring.map(([lon, lat]) => [lon + shift, lat]) : ring;
  }

  /** Draw one land or water ring. Tiny islands become a fixed-size marker so they survive the overview. */
  function drawPolygon(svg, proj, ring, fill, markSmall) {
    if (ring.length < 3) return;
    const pts = ring.map(([lon, lat]) => [proj.x(lon), proj.y(lat)]);
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
    ring.forEach(([lon, lat], i) => {
      const [x, y] = pts[i];
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
      if (lon < minLon) minLon = lon; if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat; if (lat > maxLat) maxLat = lat;
    });
    const smallOnScreen = maxX - minX < ISLAND_MIN_PX && maxY - minY < ISLAND_MIN_PX;
    const smallOnEarth = maxLon - minLon < ISLAND_MAX_DEG && maxLat - minLat < ISLAND_MAX_DEG;
    if (markSmall && smallOnScreen && smallOnEarth) {
      const cx = pts.reduce((sum, p) => sum + p[0], 0) / pts.length;
      const cy = pts.reduce((sum, p) => sum + p[1], 0) / pts.length;
      svgEl("circle", {
        cx: cx.toFixed(1), cy: cy.toFixed(1), r: ISLAND_MARK_R,
        fill, stroke: COAST, "stroke-width": 1
      }, svg);
      return;
    }
    svgEl("polygon", {
      points: pts.map(([x, y]) => x.toFixed(1) + "," + y.toFixed(1)).join(" "),
      fill, stroke: COAST, "stroke-width": 1, "stroke-linejoin": "round"
    }, svg);
  }

  /** Graticule lines every N degrees, with N picked so the lines are never crowded. */
  function drawGraticule(svg, proj, camera, viewport) {
    const step = GRID_STEPS.find(s => s * camera.scale >= GRID_MIN_PX) || 1;
    const lonMin = proj.lon(0), lonMax = proj.lon(viewport.width);
    const latMax = proj.lat(0), latMin = proj.lat(viewport.height);
    for (let g = Math.ceil(lonMin / step) * step; g < lonMax; g += step) {
      svgEl("line", {x1: proj.x(g), y1: 0, x2: proj.x(g), y2: viewport.height, stroke: "#152036", "stroke-width": 1}, svg);
    }
    for (let g = Math.ceil(latMin / step) * step; g < latMax; g += step) {
      svgEl("line", {x1: 0, y1: proj.y(g), x2: viewport.width, y2: proj.y(g), stroke: "#152036", "stroke-width": 1}, svg);
    }
  }

  function drawRegionNames(svg, proj, camera, viewport, tab, mapLon) {
    (tab.regions || []).forEach(([text, lon, lat]) => {
      const px = proj.x(mapLon(lon)), py = proj.y(lat);
      if (px < 0 || px > viewport.width || py < 0 || py > viewport.height) return;
      const node = svgEl("text", {
        x: px, y: py, "text-anchor": "middle", fill: "#8da0c0", "fill-opacity": 0.2,
        "font-size": Math.max(11, Math.min(20, camera.scale * 1.4)), "letter-spacing": "0.25em",
        "font-weight": 700, "pointer-events": "none"
      }, svg);
      node.textContent = text;
    });
  }

  function drawBackground(svg, proj, camera, viewport, tab, bounds, mapLon) {
    land.forEach(p => drawPolygon(svg, proj, ringForView(p, bounds), "#1c2b47", true));
    water.forEach(p => drawPolygon(svg, proj, ringForView(p, bounds), SEA, false));
    drawGraticule(svg, proj, camera, viewport);
    drawRegionNames(svg, proj, camera, viewport, tab, mapLon);
  }

  /* ---------- selection dimming ---------- */

  /**
   * Opacity of an arc/branch given the current selection: everything outside the selected arc fades,
   * and inside it the unselected branches fade a little.
   */
  function opacityFor(selection, arcId, branchId) {
    if (!selection) return 1;
    if (selection.arc !== arcId) return 0.12;
    if (selection.branch === null) return 1;
    return branchId === selection.branch ? 1 : 0.3;
  }

  /* ---------- lines ---------- */

  function drawRoute(svg, proj, mapLon, selection, arcId, branchId) {
    const points = GEP.model.pathOf(arcId, branchId);
    if (points.length < 2) return;
    const isBranch = branchId !== "";
    const emphasised = selection && selection.arc === arcId && selection.branch === branchId && isBranch;
    const opacity = opacityFor(selection, arcId, branchId);
    svgEl("polyline", {
      points: points.map(([lon, lat]) => proj.x(mapLon(lon)).toFixed(1) + "," + proj.y(lat).toFixed(1)).join(" "),
      fill: "none", stroke: arcs[arcId].color,
      "stroke-width": isBranch ? (emphasised ? 3.4 : 2) : 3.6,
      "stroke-dasharray": isBranch ? "6 4" : "none",
      "stroke-linecap": "round", "stroke-linejoin": "round",
      opacity: isBranch ? opacity * 0.9 : opacity, "pointer-events": "none"
    }, svg);
  }

  /** Branches first, then trunks on top. */
  function drawRoutes(svg, proj, mapLon, tabId, selection) {
    const arcList = GEP.model.arcIds(tabId);
    arcList.forEach(arcId => GEP.model.branchIds(arcId).forEach(branchId => drawRoute(svg, proj, mapLon, selection, arcId, branchId)));
    arcList.forEach(arcId => drawRoute(svg, proj, mapLon, selection, arcId, ""));
  }

  /* ---------- stops ---------- */

  /**
   * The unique stops (by name) that fall inside the box, each annotated with pixel position,
   * label tier (3 key/hub, 2 plus, 1 plain), dot radius and opacity.
   */
  function visibleStops(proj, mapLon, viewport, tabId, selection) {
    const seen = {}, result = [];
    GEP.model.stagesOfTab(tabId).forEach(stage => stage.pts.forEach(stop => {
      if (seen[stop.name]) return;
      seen[stop.name] = true;
      const px = proj.x(mapLon(stop.lon)), py = proj.y(stop.lat);
      if (px < -4 || px > viewport.width + 4 || py < -4 || py > viewport.height + 4) return;
      const tier = (stop.key || stop.hub) ? 3 : stop.plus ? 2 : 1;
      result.push({
        stop, stage, px, py, tier,
        radius: tier === 3 ? 4.6 : tier === 2 ? 3.6 : 2.7,
        opacity: opacityFor(selection, stage.arc, stage.branch)
      });
    }));
    return result;
  }

  /** Draw dots, small ones first so big ones sit on top. Each dot is clickable (data-stage). */
  function drawStops(svg, shown) {
    const layer = svgEl("g", {}, svg);
    shown.slice().sort((a, b) => a.tier - b.tier).forEach(item => {
      const {stop, stage, px, py, radius} = item;
      const group = svgEl("g", {class: "dot", "data-stage": stage.id, opacity: item.opacity}, layer);
      if (stop.hub) svgEl("circle", {cx: px, cy: py, r: radius + 4.2, fill: "none", stroke: "#f2b134", "stroke-width": 1.6}, group);
      svgEl("circle", {cx: px, cy: py, r: Math.max(radius, 7), fill: "transparent"}, group);   // bigger tap target
      svgEl("circle", {
        cx: px, cy: py, r: radius,
        fill: stop.side ? SEA : arcs[stage.arc].color, stroke: stop.side ? arcs[stage.arc].color : SEA,
        "stroke-width": stop.side ? 1.4 : 1.2
      }, group);
      svgEl("title", {}, group).textContent = stop.name + " · " + stage.name + (stop.hub ? " (modern corridor hub)" : "");
    });
  }

  /** Entries (ways between pages) that have a label on this tab and lie inside the box. */
  function visibleEntries(proj, mapLon, viewport, tabId) {
    return entries
      .filter(e => e[tabId])
      .map(e => ({label: e[tabId], px: proj.x(mapLon(e.at[0])), py: proj.y(e.at[1])}))
      .filter(e => e.px >= 0 && e.px <= viewport.width && e.py >= 0 && e.py <= viewport.height);
  }

  function drawEntries(svg, list) {
    list.forEach(entry => {
      const group = svgEl("g", {}, svg);
      svgEl("rect", {
        x: entry.px - 4.5, y: entry.py - 4.5, width: 9, height: 9, fill: "#fff", stroke: SEA, "stroke-width": 1.2,
        transform: `rotate(45 ${entry.px} ${entry.py})`
      }, group);
      svgEl("title", {}, group).textContent = entry.label;
    });
  }

  /* ---------- labels ---------- */

  function overlaps(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }

  /**
   * Greedy label placer. Tries eight positions around a dot and takes the first that stays inside
   * the map and overlaps neither an earlier label nor any dot.
   */
  function createLabelPlacer(svg, viewport, dotBoxes) {
    const placed = [];
    return function place(owner, text, fontSize, weight, color, dotRadius) {
      const w = text.length * fontSize * 0.56 + 4, h = fontSize + 3, gap = dotRadius + 3;
      const {px, py} = owner;
      const spots = [
        [px + gap, py - h / 2], [px - gap - w, py - h / 2], [px - w / 2, py - gap - h], [px - w / 2, py + gap],
        [px + gap - 2, py - gap - h + 3], [px + gap - 2, py + gap - 3], [px - gap - w + 2, py - gap - h + 3], [px - gap - w + 2, py + gap - 3]
      ];
      for (const [x, y] of spots) {
        const box = {x, y, w, h};
        if (x < 2 || y < 2 || x + w > viewport.width - 2 || y + h > viewport.height - 2) continue;
        if (placed.some(b => overlaps(b, box))) continue;
        if (dotBoxes.some(b => b.owner !== owner && overlaps(b, box))) continue;
        placed.push(box);
        const node = svgEl("text", {
          x: x + 2, y: y + h - 4, "font-size": fontSize, "font-weight": weight, fill: color,
          "paint-order": "stroke", stroke: SEA, "stroke-width": 3.2, "stroke-linejoin": "round",
          "pointer-events": "none"
        }, svg);
        node.textContent = text;
        return true;
      }
      return false;
    };
  }

  function drawLabels(svg, viewport, camera, shown, entryList) {
    const dotBoxes = shown.map(item => ({x: item.px - item.radius - 1.5, y: item.py - item.radius - 1.5, w: item.radius * 2 + 3, h: item.radius * 2 + 3, owner: item}));
    entryList.forEach(e => dotBoxes.push({x: e.px - 6, y: e.py - 6, w: 12, h: 12, owner: e}));
    const place = createLabelPlacer(svg, viewport, dotBoxes);
    entryList.forEach(e => place(e, e.label, 11, 600, "#ffffff", 5));
    const lowestTier = camera.scale >= LABEL_MIN_SCALE ? 1 : 2;
    for (let tier = 3; tier >= lowestTier; tier--) {
      shown.forEach(item => {
        if (item.tier !== tier || item.opacity < 0.5) return;
        const style = tier === 3 ? [12, 700, "#f0f4fb"] : tier === 2 ? [11, 500, "#b7c3d9"] : [10.5, 500, "#b7c3d9"];
        place(item, item.stop.name, style[0], style[1], style[2], item.radius + (item.stop.hub ? 4 : 0));
      });
    }
  }

  /* ---------- public ---------- */

  /**
   * Draw the map for a tab into a container, replacing what is there.
   * @param {HTMLElement} container
   * @param {string} tabId
   * @param {{cx:number, cy:number, scale:number}} camera
   * @param {{width:number, height:number, aspect:number}} viewport
   * @param {{arc:string, branch:(string|null)}|null} selection  highlighted arc/branch, or null
   */
  function draw(container, tabId, camera, viewport, selection) {
    const tab = tabs[tabId];
    const proj = projector(camera, viewport);
    const bounds = tab.views[0].b;
    const mapLon = lon => GEP.lonInView(lon, bounds);
    const svg = svgEl("svg", {
      viewBox: `0 0 ${viewport.width} ${viewport.height}`, width: viewport.width, height: viewport.height,
      role: "img", "aria-label": tab.label + " map"
    });
    svg.style.cssText = `background:${SEA}`;
    // Exposed for debugging and tests: the camera this render was drawn from.
    Object.assign(svg.dataset, {cx: camera.cx.toFixed(3), cy: camera.cy.toFixed(3), scale: camera.scale.toFixed(3)});

    drawBackground(svg, proj, camera, viewport, tab, bounds, mapLon);
    drawRoutes(svg, proj, mapLon, tabId, selection);
    const shown = visibleStops(proj, mapLon, viewport, tabId, selection);
    const entryList = visibleEntries(proj, mapLon, viewport, tabId);
    drawStops(svg, shown);
    drawEntries(svg, entryList);
    drawLabels(svg, viewport, camera, shown, entryList);

    container.replaceChildren(svg);   // one swap, so the box never collapses in between
  }

  return {viewportFor, fitCamera, projector, draw};
})();
