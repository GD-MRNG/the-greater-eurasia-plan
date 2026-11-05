/**
 * main.js: owns the UI state, hash routing and all event handlers. Loaded last.
 *
 * Routes:  #eurasia  #africa  #americas        (default: eurasia)
 *          #<tab>/<n>                           opens zoom view n of that tab
 *
 * Exposes: nothing (starts the app).
 * Depends on: shared.js, model.js, map.js, panzoom.js, views.js.
 */
(function () {
  const {$} = GEP;
  const {tabs} = GEP.data;

  /** The one mutable object. views.js and map.js only read it. */
  const state = {tab: "eurasia", view: 0, selection: null, filterArc: "all", query: ""};

  /** Pan/zoom controller. It calls render() whenever the map needs drawing, and onChange() after it did. */
  const mapView = GEP.panzoom.create({
    container: $("mapwrap"),
    render: (camera, viewport) => GEP.map.draw($("mapwrap"), state.tab, camera, viewport, state.selection),
    onChange: () => {
      state.view = mapView.activeView === null ? -1 : mapView.activeView;
      GEP.views.renderViewButtons(state);
    }
  });

  /** Reset everything that belongs to one page, then show the requested zoom view. */
  function openTab(tabId, viewIndex) {
    Object.assign(state, {tab: tabId, view: viewIndex, selection: null, filterArc: "all", query: ""});
    $("q").value = "";
    GEP.views.renderAll(state);
    mapView.load(tabs[tabId].views, viewIndex);
  }

  /** Read location.hash and show the right tab and zoom view. */
  function route() {
    const [tabPart, viewPart] = (location.hash || "").replace("#", "").toLowerCase().split("/");
    const tabId = tabs[tabPart] ? tabPart : "eurasia";
    const requested = Number(viewPart);
    const hasView = viewPart !== undefined && tabs[tabId].views[requested] !== undefined;
    if (tabId !== state.tab || !$("tabs").children.length) {
      openTab(tabId, hasView ? requested : 0);
      if (!hasView) window.scrollTo(0, 0);
    } else if (hasView && requested !== state.view) {
      mapView.fitView(requested);
    }
  }

  /** Clear filters, show the stage card for a map dot, scroll to it and flash it. */
  function jumpToStage(stageId) {
    Object.assign(state, {filterArc: "all", query: ""});
    $("q").value = "";
    GEP.views.renderFilters(state);
    GEP.views.renderStages(state);
    const card = $(stageId);
    if (!card) return;
    card.scrollIntoView({behavior: "smooth", block: "center"});
    card.classList.add("flash");
    setTimeout(() => card.classList.remove("flash"), 2200);
  }

  /** Bring the map into view when the user picks an arc further down the page. */
  function scrollMapIntoView() {
    const top = document.querySelector(".mapcard").getBoundingClientRect().top;
    if (top < 60) window.scrollBy({top: top - 70, behavior: "smooth"});
  }

  /** Select (or, on a second tap, deselect) an arc or branch and zoom to fit it. */
  function toggleSelection(arc, branch) {
    const sel = state.selection;
    const deselect = sel && sel.arc === arc && sel.branch === branch;
    state.selection = deselect ? null : {arc, branch};
    GEP.views.renderArcs(state);
    if (deselect) mapView.redraw();
    else mapView.fitView(GEP.model.bestView(state.tab, state.selection));
    scrollMapIntoView();
  }

  /** One delegated click handler for the whole page. */
  function onClick(event) {
    const target = event.target;
    const viewButton = target.closest("[data-view]");
    const arcFilter = target.closest("[data-filter-arc]");
    const chip = target.closest(".br");
    const arcCard = target.closest(".arc");
    const dot = target.closest(".dot");
    if (viewButton) {
      mapView.fitView(Number(viewButton.dataset.view));
    } else if (arcFilter) {
      state.filterArc = arcFilter.dataset.filterArc;
      GEP.views.renderFilters(state);
      GEP.views.renderStages(state);
    } else if (chip) {
      toggleSelection(chip.dataset.arc, chip.dataset.branch);
    } else if (arcCard) {
      toggleSelection(arcCard.dataset.arc, null);
    } else if (dot) {
      jumpToStage(dot.getAttribute("data-stage"));
    }
  }

  function start() {
    const problems = GEP.model.validate();
    problems.forEach(p => console.error("Data problem: " + p));
    document.addEventListener("click", onClick);
    $("q").addEventListener("input", e => { state.query = e.target.value.trim(); GEP.views.renderStages(state); });
    window.addEventListener("hashchange", route);
    let resizeTimer;
    window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(mapView.resize, 150); });
    route();
  }

  start();
})();
