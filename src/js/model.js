/**
 * model.js: turns the raw data into something the renderers can use.
 *
 * - parses each stage's stop string into stop objects
 * - assigns every stage an id ("st0", ...) and a code ("S3")
 * - indexes stops by name
 * - builds the route polyline of every trunk and branch
 * - validates cross-references (see validate())
 *
 * Pure data code: it never touches the DOM, so tools/check-data.js can run it in Node.
 *
 * Exposes: GEP.model = {
 *   parseStops, stopByName, arcIds, branchIds, stagesOfTab, stagesOfArc, pathOf, bestView, validate
 * }
 * Depends on: shared.js and every file in src/data/.
 */
GEP.model = (function () {
  const {arcs, branches, stages, tabs} = GEP.data;
  const STOP_PATTERN = /^(.*?)\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s*([*+~^]*)$/;
  const problems = [];
  /** @type {Object<string, Object>} first stop seen for each name */
  const stopIndex = {};

  /**
   * Parse the stop DSL ("Name lon lat flags; ...") into stop objects.
   * @param {string} text
   * @returns {Array<{name:string, lon:number, lat:number, key:boolean, plus:boolean, side:boolean, hub:boolean}>}
   */
  function parseStops(text) {
    const result = [];
    text.split(";").map(part => part.trim()).filter(Boolean).forEach(part => {
      const match = STOP_PATTERN.exec(part);
      if (!match) { problems.push("Cannot parse stop: " + part); return; }
      const flags = match[4];
      result.push({
        name: match[1], lon: Number(match[2]), lat: Number(match[3]),
        key: flags.includes("*"), plus: flags.includes("+"), side: flags.includes("~"), hub: flags.includes("^")
      });
    });
    return result;
  }

  /** Decorate every stage: id, tab, code, parsed stops, search text. Fill the stop index. */
  function buildStages() {
    const perArc = {};
    stages.forEach((stage, i) => {
      const arc = arcs[stage.arc];
      if (!arc) { problems.push("Stage '" + stage.name + "' uses unknown arc '" + stage.arc + "'"); return; }
      perArc[stage.arc] = (perArc[stage.arc] || 0) + 1;
      stage.id = "st" + i;
      stage.tab = arc.tab;
      stage.code = arc.code + perArc[stage.arc];
      stage.pts = parseStops(stage.stops);
      stage.pts.forEach(stop => {
        stop.stage = stage;
        if (!stopIndex[stop.name]) stopIndex[stop.name] = stop;
      });
      const branchName = stage.branch && branches[stage.branch] ? branches[stage.branch].name : "trunk";
      stage.searchText = [stage.name, stage.note, stage.onward, branchName, stage.pts.map(p => p.name).join(" ")].join(" ").toLowerCase();
    });
  }

  /**
   * Check that every cross-reference in the data resolves. Problems are collected, not thrown.
   * @returns {string[]} human-readable problems (empty when the data is consistent)
   */
  function validate() {
    const out = problems.slice();
    Object.keys(arcs).forEach(id => {
      if (!tabs[arcs[id].tab]) out.push("Arc " + id + " uses unknown tab " + arcs[id].tab);
      if (arcs[id].from && !stopIndex[arcs[id].from]) out.push("Arc " + id + ": 'from' stop missing: " + arcs[id].from);
    });
    Object.keys(branches).forEach(id => {
      const b = branches[id];
      if (!arcs[b.arc]) out.push("Branch " + id + " uses unknown arc " + b.arc);
      if (!stopIndex[b.from]) out.push("Branch " + id + ": 'from' stop missing: " + b.from);
      if (b.to && !stopIndex[b.to]) out.push("Branch " + id + ": 'to' stop missing: " + b.to);
      if (!stages.some(s => s.branch === id)) out.push("Branch " + id + " has no stages");
    });
    stages.forEach(s => {
      if (s.branch && !branches[s.branch]) out.push("Stage '" + s.name + "' uses unknown branch " + s.branch);
      if (s.branch && branches[s.branch] && branches[s.branch].arc !== s.arc) out.push("Stage '" + s.name + "' branch belongs to another arc");
      if (!s.pts || !s.pts.length) out.push("Stage '" + s.name + "' has no stops");
    });
    return out;
  }

  /** @returns {Object|undefined} the first stop with this name */
  function stopByName(name) { return stopIndex[name]; }

  /** @returns {string[]} arc ids that belong to a tab, in definition order */
  function arcIds(tabId) { return Object.keys(arcs).filter(id => arcs[id].tab === tabId); }

  /** @returns {string[]} branch ids that belong to an arc, in definition order */
  function branchIds(arcId) { return Object.keys(branches).filter(id => branches[id].arc === arcId); }

  /** @returns {Object[]} all stages on a tab, in data order */
  function stagesOfTab(tabId) { return stages.filter(s => s.tab === tabId); }

  /** @returns {Object[]} all stages of an arc, in data order */
  function stagesOfArc(arcId) { return stages.filter(s => s.arc === arcId); }

  /**
   * The drawn route of a trunk or branch as [[lon, lat], ...]. Side trips (~) are not on the line.
   * @param {string} arcId
   * @param {string} branchId  "" for the trunk
   */
  function pathOf(arcId, branchId) {
    const points = [];
    const add = stop => points.push([stop.lon, stop.lat]);
    const startName = branchId ? branches[branchId].from : arcs[arcId].from;
    if (startName && stopIndex[startName]) add(stopIndex[startName]);
    stages.forEach(stage => {
      if (stage.arc === arcId && stage.branch === branchId) stage.pts.forEach(stop => { if (!stop.side) add(stop); });
    });
    const endName = branchId && branches[branchId].to;
    if (endName && stopIndex[endName]) add(stopIndex[endName]);
    return points;
  }

  /**
   * Pick the smallest zoom view of a tab that contains a whole arc or branch.
   * @param {string} tabId
   * @param {{arc:string, branch:(string|null)}} selection  branch null = the whole arc
   * @returns {number} view index (0, the default, when nothing fits)
   */
  function bestView(tabId, selection) {
    const points = selection.branch === null
      ? [].concat(...stagesOfArc(selection.arc).map(s => s.pts.filter(p => !p.side).map(p => [p.lon, p.lat])))
      : pathOf(selection.arc, selection.branch);
    if (points.length < 2) return 0;
    const lons = points.map(p => p[0]), lats = points.map(p => p[1]);
    const box = {w: Math.min(...lons), e: Math.max(...lons), s: Math.min(...lats), n: Math.max(...lats)};
    const slack = 0.5;
    let best = 0, bestArea = Infinity;
    tabs[tabId].views.forEach((view, i) => {
      const [w, e, s, n] = view.b;
      const fits = box.w >= w - slack && box.e <= e + slack && box.s >= s - slack && box.n <= n + slack;
      if (fits && (e - w) * (n - s) < bestArea) { best = i; bestArea = (e - w) * (n - s); }
    });
    return best;
  }

  buildStages();
  return {parseStops, stopByName, arcIds, branchIds, stagesOfTab, stagesOfArc, pathOf, bestView, validate};
})();
