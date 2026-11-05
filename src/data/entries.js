/**
 * Ways between the pages, drawn as white diamonds. `at` is [lon, lat].
 * Add a label under the tab key (eurasia, africa, americas, oceania) to show it on that tab.
 * A coordinate west of the date line is an ordinary negative longitude; the Oceania view shifts it.
 * Depends on: shared.js.  Exposes: GEP.data.entries.
 */
GEP.data.entries = [
  {at:[-5.6,36.0], eurasia:"to Morocco: ferry", africa:"In from Spain: Tarifa to Tangier ferry"},
  {at:[35.0,29.5], eurasia:"to Egypt: Aqaba to Nuweiba ferry", africa:"In from Jordan: Aqaba to Nuweiba ferry"},
  {at:[13.4,38.1], africa:"In from Italy: ferries to Tunis"},
  {at:[-0.5,38.3], africa:"In from Spain: ferries to Algeria"},
  {at:[55.3,25.2], africa:"In from the Gulf: flights to Cairo, Nairobi, Addis"},
  {at:[143.5,37.5], eurasia:"Pacific to the Americas"},
  {at:[-12.5,39.5], eurasia:"Atlantic to the Americas"},
  {at:[-168,50], americas:"In from Japan or Korea across the Pacific"},
  {at:[-38,40], americas:"In from Europe across the Atlantic"},
  {at:[111.6,-5.4], eurasia:"to Oceania", oceania:"From SE Asia"},
  {at:[-154.2,26.2], americas:"In from Oceania", oceania:"Toward the Americas"}
];
