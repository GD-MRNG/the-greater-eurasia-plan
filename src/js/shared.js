/**
 * shared.js: the GEP namespace, the data schema, and tiny helpers.
 *
 * Loaded first. Everything else hangs off the single global `GEP`:
 *   GEP.data     all editable content (filled by the files in src/data/)
 *   GEP.model    parsed stops, paths and lookups   (js/model.js)
 *   GEP.map      the SVG map renderer              (js/map.js)
 *   GEP.views    HTML renderers for the page       (js/views.js)
 *
 * Exposes: GEP, GEP.stage(), GEP.$(), GEP.esc(), GEP.svgEl(), GEP.lonInView().
 * Depends on: nothing.
 *
 * ---------------------------------------------------------------------------
 * DATA SCHEMA (the one place it is documented; README.md mirrors it)
 * ---------------------------------------------------------------------------
 *
 * TAB      GEP.data.tabs[tabId]            tabId: "eurasia" | "africa" | "americas" | "oceania"
 *   label      text in the top nav
 *   blurb      one line shown when other pages link here
 *   g          [c1, c2, c3] gradient colours for the page title
 *   eyebrow, title (HTML allowed), sub, chips [[plain, bold], ...]   hero text
 *   mapHint    one-line help above the map
 *   views      [{n: "Button text", b: [lonMin, lonMax, latMin, latMax]}]   preset zoom views; the first is the default and also fixes the map box shape and zoom limits
 *   regions    [[TEXT, lon, lat], ...]   faint names painted on the map
 *
 * ARC      GEP.data.arcs[arcId]
 *   tab, code (short, used for stage codes like "S3"), name, color, route (one-paragraph summary)
 *   from       optional: name of a stop the arc's trunk starts from (draws a link into the first stage)
 *
 * BRANCH   GEP.data.branches[branchId]
 *   arc        the arc it belongs to
 *   name       shown on chips and stage cards
 *   from       name of the stop where it leaves (must exist in some stage)
 *   to         optional: name of the stop where it rejoins
 *
 * ENTRY    GEP.data.entries[]              ways between pages, drawn as white diamonds
 *   at         [lon, lat]
 *   eurasia | africa | americas | oceania   label text; the diamond shows on every tab that has a label
 *
 * A view box may run past longitude 180 so the Pacific sits in one piece (see GEP.lonInView).
 * Stop coordinates themselves stay ordinary degrees: west of Greenwich is negative.
 *
 * STAGE    one call per stage, in route order, in src/data/stages/*.js:
 *   s(arc, branch, name, note, stops, onward)
 *     arc      arc id
 *     branch   branch id, or "" for the arc's trunk
 *     name     card heading
 *     note     one sentence under the heading
 *     stops    "Name lon lat flags; Name lon lat flags; ..." along the route
 *     onward   optional text for the "Onward:" line
 *
 *   Stop flags (any combination, after the latitude):
 *     *  key stop: big dot, always labelled when there is room
 *     +  labelled when there is room
 *     ~  side trip: hollow dot, off the line (not part of the drawn route)
 *     ^  modern corridor hub: gold ring
 *   A stop with no flag is a small dot, labelled only when zoomed in.
 *
 *   Example:  "Kashgar 75.99 39.47 *^; Tashkurgan 75.23 37.77 +; Karakul 73.55 39.0 ~"
 *
 *   Rules: stop names are looked up across all tabs and the first one wins, so two different places
 *   must not share a name (use "La Paz (Baja)"). The same name in two stages draws one dot;
 *   `from` / `to` of arcs and branches refer to stop names; every branch needs at least one stage.
 *   Run `node tools/check-data.js` to verify all of this.
 */

/** The single global namespace. */
const GEP = {
  /** All editable content. Filled by the files in src/data/. */
  data: {stages: []},

  /**
   * Register one stage (see the schema above). Used by the files in src/data/stages/.
   * @param {string} arc      arc id
   * @param {string} branch   branch id, or "" for the trunk
   * @param {string} name     card heading
   * @param {string} note     one-sentence description
   * @param {string} stops    stop DSL string
   * @param {string} [onward] text for the "Onward" line
   */
  stage(arc, branch, name, note, stops, onward) {
    GEP.data.stages.push({
      arc, branch: branch || "", name, note: note || "", stops,
      onward: onward || ""
    });
  },

  /** Shorthand for document.getElementById. */
  $: id => document.getElementById(id),

  /** Escape text for safe use inside HTML. */
  esc: text => String(text).replace(/[&<>"]/g, ch => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[ch])),

  /**
   * Create an SVG element, set attributes and optionally append it to a parent.
   * @param {string} name
   * @param {Object} [attrs]
   * @param {Element} [parent]
   * @returns {SVGElement}
   */
  svgEl(name, attrs, parent) {
    const node = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (const key in attrs || {}) node.setAttribute(key, attrs[key]);
    if (parent) parent.appendChild(node);
    return node;
  },

  /**
   * Longitude to draw for a view that may cross the 180° meridian.
   * If adding or subtracting 360 brings `lon` inside the view box (plus a small margin, so a
   * point just outside still pans with the map), that value is used. Otherwise `lon` is left
   * as written, so continents outside the box are not dragged across the date line.
   * Stop coordinates stay ordinary degrees; only the view box (tabs.js) runs past ±180.
   * @param {number} lon
   * @param {number[]} bounds  [lonMin, lonMax, latMin, latMax]
   * @returns {number}
   */
  lonInView(lon, bounds) {
    const lonMin = bounds[0], lonMax = bounds[1];
    const margin = 8;
    const lo = lonMin - margin, hi = lonMax + margin;
    const mid = (lonMin + lonMax) / 2;
    let best = lon, bestDist = Math.abs(lon - mid);
    [lon + 360, lon - 360].forEach(cand => {
      if (cand < lo || cand > hi) return;
      const dist = Math.abs(cand - mid);
      if (dist < bestDist) { best = cand; bestDist = dist; }
    });
    return best;
  }
};
