/**
 * views.js: renders the page (everything except the SVG map) from the data and the UI state.
 *
 * Every function takes the current UI state and writes into one element of index.html.
 * No state is kept here and no events are bound here (see main.js).
 *
 * UI state shape:
 *   { tab: "eurasia", view: 0 (preset on screen, -1 after free pan or zoom), selection: null | {arc, branch|null},
 *     filterArc: "all" | arcId, filterStatus: "all" | status, query: "" }
 *
 * Exposes: GEP.views = { renderAll, renderNav, renderHero, renderStats, renderMapChrome, renderViewButtons,
 *                        renderArcs, renderFilters, renderStages, renderWays }
 * Depends on: shared.js, model.js, data/*.
 */
GEP.views = (function () {
  const {$, esc} = GEP;
  const {tabs, arcs, branches, entries, updated} = GEP.data;
  const model = GEP.model;

  /* ---------- header area ---------- */

  function renderNav(state) {
    $("tabs").innerHTML = Object.keys(tabs).map(id =>
      `<a class="tab${id === state.tab ? " on" : ""}" href="#${id}">${esc(tabs[id].label)}<small>${model.stagesOfTab(id).length}</small></a>`
    ).join("");
  }

  function renderHero(state) {
    const tab = tabs[state.tab];
    const root = document.documentElement.style;
    tab.g.forEach((colour, i) => root.setProperty("--g" + (i + 1), colour));
    $("hero").innerHTML =
      `<div><div class="eyebrow">${esc(tab.eyebrow)}</div><h1>${tab.title}</h1><p class="sub">${esc(tab.sub)}</p></div>` +
      `<div class="facts">${tab.chips.map(([plain, bold]) => `<span class="chip">${esc(plain)} <b>${esc(bold)}</b></span>`).join("")}</div>`;
    document.title = tab.label + " · The Greater Eurasia Plan";
  }

  function renderStats(state) {
    const stages = model.stagesOfTab(state.tab);
    const stopNames = new Set();
    stages.forEach(s => s.pts.forEach(p => stopNames.add(p.name)));
    const arcList = model.arcIds(state.tab);
    const branchCount = arcList.reduce((sum, id) => sum + model.branchIds(id).length, 0);
    const count = status => stages.filter(s => s.status === status).length;
    const items = [
      [stages.length, "stages"], [stopNames.size, "stops"], [arcList.length, "arcs"],
      [branchCount, "branches"], [count("next"), "next up"], [count("check"), "check first"]
    ];
    $("stats").innerHTML = items.map(([n, label]) => `<div class="stat"><div class="n">${n}</div><div class="l">${label}</div></div>`).join("");
  }

  /* ---------- map chrome: title, hint, zoom buttons, legend ---------- */

  function renderLegend(state) {
    const hasHubs = model.stagesOfTab(state.tab).some(s => s.pts.some(p => p.hub));
    const arcKeys = model.arcIds(state.tab).map(id => `<span><i style="background:${arcs[id].color}"></i>${esc(arcs[id].name)}</span>`);
    const keys = [
      `<span><i class="dash" style="--c:#aab6cc"></i>Branch, dashed in the arc's colour</span>`,
      `<span><span class="k"></span>Key stop (labelled)</span>`,
      `<span><span class="k s"></span>Other stop</span>`,
      `<span><span class="k s" style="background:none;border:1.5px solid #8da0c0"></span>Side trip</span>`,
      hasHubs ? `<span><span class="k h"></span>Modern corridor hub</span>` : "",
      `<span><span class="k e"></span>Way in from another page</span>`
    ];
    $("legend").innerHTML = arcKeys.concat(keys).join("");
  }

  function renderMapChrome(state) {
    const tab = tabs[state.tab];
    $("mapTitle").textContent = state.tab === "eurasia" ? "The map at a glance" : tab.label + " map";
    $("mapHint").textContent = tab.mapHint;
    renderViewButtons(state);
    renderLegend(state);
  }

  /** The preset zoom buttons. state.view is the preset on screen, or -1 after free pan/zoom. */
  function renderViewButtons(state) {
    $("views").innerHTML = tabs[state.tab].views.map((v, i) =>
      `<button class="btn${i === state.view ? " on" : ""}" data-view="${i}">${esc(v.n)}</button>`).join("");
  }

  /* ---------- arc cards ---------- */

  function renderArcs(state) {
    const selection = state.selection;
    $("arcs").innerHTML = model.arcIds(state.tab).map(arcId => {
      const arc = arcs[arcId], stages = model.stagesOfArc(arcId);
      const done = stages.filter(s => s.status === "done").length;
      const stopNames = new Set();
      stages.forEach(s => s.pts.forEach(p => stopNames.add(p.name)));
      const branchList = model.branchIds(arcId);
      const arcSelected = selection && selection.arc === arcId;
      const chip = (branchId, label, extraClass) =>
        `<span class="br${extraClass}${arcSelected && selection.branch === branchId ? " on" : ""}" data-arc="${arcId}" data-branch="${branchId}">${esc(label)}</span>`;
      return `<div class="arc${arcSelected && selection.branch === null ? " on" : ""}" style="--c:${arc.color}" data-arc="${arcId}">
        <h3>${esc(arc.name)} <em>${esc(arc.code)}</em></h3>
        <div class="route">${esc(arc.route)}</div>
        <div class="meta">${stages.length} stages · ${stopNames.size} stops · ${branchList.length} branches · ${done} done</div>
        <div class="bar"><div style="width:${stages.length ? Math.round(done / stages.length * 100) : 0}%"></div></div>
        <div class="meta" style="margin-top:8px">Trunk and branches, tap to show on the map</div>
        <div class="brs">${chip("", "Trunk", " tr")}${branchList.map(id => chip(id, branches[id].name, "")).join("")}</div>
      </div>`;
    }).join("");
  }

  /* ---------- filters and stage cards ---------- */

  function renderFilters(state) {
    const button = (attr, value, text, on) => `<button class="btn${on ? " on" : ""}" data-${attr}="${value}">${esc(text)}</button>`;
    const arcButtons = model.arcIds(state.tab).map(id =>
      button("filter-arc", id, arcs[id].code + " · " + arcs[id].name.replace(/ arc$/, ""), state.filterArc === id));
    const statusButtons = ["all", "next", "planned", "check", "done"].map(status =>
      button("filter-status", status, status === "all" ? "Any status" : GEP.STATUS_LABEL[status], state.filterStatus === status));
    $("filters").innerHTML = button("filter-arc", "all", "All arcs", state.filterArc === "all") + arcButtons.join("") +
      `<span class="sep"></span>` + statusButtons.join("");
  }

  /** Does a stage pass the arc, status and search filters? */
  function matchesFilters(stage, state) {
    if (state.filterArc !== "all" && stage.arc !== state.filterArc) return false;
    if (state.filterStatus !== "all" && stage.status !== state.filterStatus) return false;
    return state.query.toLowerCase().split(/\s+/).filter(Boolean).every(word => stage.searchText.includes(word));
  }

  /** The stop list of a card: bold = key stop, <i> = side trip, a gold circle = modern hub. */
  function stopsHtml(stage) {
    return stage.pts.map(stop => {
      let html = esc(stop.name);
      if (stop.key) html = "<b>" + html + "</b>";
      if (stop.side) html = "<i>" + html + "</i>";
      if (stop.hub) html += ' <span style="color:#f2b134" title="Modern corridor hub">◎</span>';
      return html;
    }).join(" · ");
  }

  function stageCard(stage) {
    const arc = arcs[stage.arc];
    const hasHub = stage.pts.some(p => p.hub);
    const where = stage.branch ? "Branch: " + branches[stage.branch].name : "Trunk of " + arc.name;
    return `<div class="stage" id="${stage.id}" style="--c:${arc.color}">
      <div class="top"><span class="code">${esc(stage.code)}</span><span class="pill p-${stage.status}">${GEP.STATUS_LABEL[stage.status]}</span></div>
      <h4>${esc(stage.name)}${hasHub ? '<span class="hubtag">modern hub</span>' : ""}</h4>
      <div class="bd${stage.branch ? "" : " trunk"}">${esc(where)}</div>
      <div class="note">${esc(stage.note)}</div>
      <div class="stops">${stopsHtml(stage)}</div>
      ${stage.onward ? `<div class="on2">Onward: ${esc(stage.onward)}</div>` : ""}
    </div>`;
  }

  /** A titled grid of cards, or nothing when the list is empty. */
  function stageGroup(title, small, dashed, list) {
    if (!list.length) return "";
    return `<div class="sub2"${dashed ? ' style="--bs:dashed"' : ""}>${esc(title)}${small ? ` <small>${esc(small)}</small>` : ""}</div>` +
      `<div class="stages">${list.map(stageCard).join("")}</div>`;
  }

  function renderStages(state) {
    let html = `<p class="hint" style="font-size:12.5px;color:var(--dim);margin:6px 2px 0"><b style="color:var(--text)">Bold</b> = key stop on the map · <i style="color:#b9a56a;font-style:normal">amber</i> = side trip, off the line · <span style="color:#f2b134">◎</span> = modern corridor hub</p>`;
    let shown = 0;
    model.arcIds(state.tab).forEach(arcId => {
      const arc = arcs[arcId];
      const matching = model.stagesOfArc(arcId).filter(s => matchesFilters(s, state));
      if (!matching.length) return;
      shown += matching.length;
      html += `<section class="group" style="--c:${arc.color}"><div class="ghead"><h3>${esc(arc.code)} · ${esc(arc.name)}</h3><span>${esc(arc.route)}</span></div>`;
      html += stageGroup("Trunk", "the spine of the arc, in travel order", false, matching.filter(s => !s.branch));
      model.branchIds(arcId).forEach(branchId => {
        const b = branches[branchId];
        html += stageGroup("Branch: " + b.name, "leaves at " + b.from + (b.to ? ", rejoins at " + b.to : ""), true, matching.filter(s => s.branch === branchId));
      });
      html += `</section>`;
    });
    if (!shown) html += `<p class="empty">No stages match. Clear the search or the filters.</p>`;
    $("stages").innerHTML = html;
  }

  /* ---------- shared "ways between pages" card ---------- */

  function renderWays(state) {
    const here = entries.filter(e => e[state.tab]).map(e => `<div><b>${esc(e[state.tab])}</b></div>`);
    const links = Object.keys(tabs).filter(id => id !== state.tab).map(id =>
      `<div><a href="#${id}"><b>${esc(tabs[id].label)} page →</b>${esc(tabs[id].blurb || "")}</a></div>`);
    $("ways").innerHTML = `<h2>Ways between the pages</h2><p class="hint">Where the arcs hand over to each other. Tap a page to jump.</p>` +
      `<div class="tandem">${here.concat(links).join("")}</div>`;
  }

  /** Redraw everything except the SVG map (main.js draws the map). */
  function renderAll(state) {
    renderNav(state); renderHero(state); renderStats(state); renderMapChrome(state);
    renderArcs(state); renderFilters(state); renderStages(state); renderWays(state);
    $("updated").textContent = "Last updated " + updated + ". The map is a rough sketch, not to scale. Dates and budgets are deliberately not in here.";
  }

  return {renderAll, renderNav, renderHero, renderStats, renderMapChrome, renderViewButtons, renderArcs, renderFilters, renderStages, renderWays};
})();
