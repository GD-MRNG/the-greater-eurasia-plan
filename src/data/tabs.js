/**
 * Page (tab) definitions: hero text, zoom views and faint region names.
 * `blurb` is the one-liner shown when other pages link here. Edit this file to change a tab's wording or add a zoom view.
 * A view box is [lonMin, lonMax, latMin, latMax]. Oceania's boxes run past longitude 180 so the
 * Pacific is one continuous sketch; stop coordinates stay ordinary degrees (see shared.js).
 * Depends on: shared.js.  Exposes: GEP.data.tabs.
 */
GEP.data.tabs = {
  eurasia:{label:"Eurasia", g:["#4f9dff","#f2b134","#2fd0b5"], blurb:"Four arcs connect East Asia, Central Asia, South Asia and Europe.",
    eyebrow:"Route overview",
    title:'The Greater <span>Eurasia</span> Plan',
    sub:"Four arcs connect East Asia, Central Asia, South Asia and Europe. The Modern Silk Road follows today's rail, road and sea corridors alongside historic highlights.",
    chips:[["4","arcs"],["Span:","Japan to the Atlantic"]],
    mapHint:"A rough sketch, not to scale. Solid lines are each arc's trunk, dashed lines are branches. Big dots are labelled, small dots are other stops (hover for the name), hollow dots are side trips, gold rings are modern corridor hubs. Use the view buttons to zoom.",
    views:[
      {n:"Whole route", b:[-28,146,-9,72]},
      {n:"Europe and Türkiye", b:[-13,42,34,62]},
      {n:"Nordics and Arctic", b:[4,46,54,72]},
      {n:"Iceland and the Faroes", b:[-28,-4,60,67.5]},
      {n:"Russia", b:[26,146,40,70]},
      {n:"Caucasus and Middle East", b:[24,64,11,46]},
      {n:"Central Asia and West China", b:[48,112,26,54]},
      {n:"East Asia", b:[98,146,16,52]},
      {n:"South and SE Asia", b:[66,125,-9,32]}
    ],
    regions:[["CHINA",104,35.5],["RUSSIA",78,63],["CENTRAL ASIA",65,45.5],["MIDDLE EAST",44,26.5],["INDIA",78,22],["SE ASIA",103,15],["EUROPE",14,49.5],["MONGOLIA",103,46.8],["JAPAN",136,38.8]]
  },
  africa:{label:"Africa", g:["#ff8a5b","#8bd450","#5ad1ff"], blurb:"Four arcs across North, East, Southern and West Africa.",
    eyebrow:"Route overview",
    title:'The <span>Africa</span> arcs',
    sub:"Four arcs cover North Africa, the Nile and East Africa, Southern Africa and the West African Atlantic coast.",
    chips:[["4","arcs"],["Linked from:","Europe and the Gulf"]],
    mapHint:"Solid lines are each arc's trunk, dashed lines are branches. Diamonds are ways in from Eurasia. Hollow dots are side trips, big dots are labelled. Use the view buttons to zoom.",
    views:[
      {n:"Whole of Africa", b:[-28,63,-36,42]},
      {n:"North Africa and Egypt", b:[-12,38,14,40]},
      {n:"West Africa", b:[-28,16,-6,32]},
      {n:"East Africa", b:[28,52,-18,16]},
      {n:"Southern Africa", b:[8,42,-36,-8]}
    ],
    regions:[["SAHARA",10,24],["WEST AFRICA",-3,10.5],["EAST AFRICA",40,2],["SOUTHERN AFRICA",24,-24],["CONGO BASIN",21,-2]]
  },
  americas:{label:"Americas", g:["#4f9dff","#ff7a59","#3ccf9a"], blurb:"Three arcs across North, Central and South America.",
    eyebrow:"Route overview",
    title:'The <span>Americas</span> arcs',
    sub:"Three arcs cover North, Central and South America, with entry points across the Pacific or Atlantic.",
    chips:[["3","arcs"],["Linked from:","Pacific and Atlantic"]],
    mapHint:"Solid lines are each arc's trunk, dashed lines are branches. Diamonds mark where you arrive from Eurasia. Hollow dots are side trips, big dots are labelled. Use the view buttons to zoom.",
    views:[
      {n:"Whole of the Americas", b:[-170,-30,-56,72]},
      {n:"North America", b:[-168,-43,14,72]},
      {n:"Mexico, Central America, Caribbean", b:[-118,-58,4,33]},
      {n:"South America", b:[-84,-32,-56,14]}
    ],
    regions:[["NORTH AMERICA",-100,50],["MEXICO",-102,24],["SOUTH AMERICA",-60,-12],["PACIFIC",-150,38],["ATLANTIC",-42,25]]
  },
  oceania:{label:"Oceania", g:["#4cc9f0","#f4a261","#c77dff"], blurb:"Four arcs across the islands east of Bali, Australia, New Zealand and the Pacific.",
    eyebrow:"Route overview",
    title:'The <span>Oceania</span> arcs',
    sub:"Four arcs cover the islands east of Bali, Australia, New Zealand and the Pacific to Hawaii. The sketch continues across the date line, so Polynesia stays in one piece.",
    chips:[["4","arcs"],["Span:","Bali to Hawaii"]],
    mapHint:"Solid lines are each arc's trunk, dashed lines are branches. The view crosses the date line, so Samoa and Hawaii are not split. Hollow dots are side trips, big dots are labelled. Small islands stay visible as a marker when zoomed out. Use the view buttons to zoom.",
    views:[
      {n:"Whole of Oceania", b:[92,238,-50,28]},
      {n:"Eastern Indonesia and New Guinea", b:[114,156,-12,6]},
      {n:"Australia", b:[112,154,-45,-9]},
      {n:"New Zealand", b:[165,186,-48,-28]},
      {n:"Melanesia", b:[156,180,-24,-4]},
      {n:"Polynesia", b:[174,236,-28,-4]},
      {n:"Micronesia", b:[130,192,-5,18]},
      {n:"Hawaii", b:[198,208,18.2,23.6]}
    ],
    regions:[["AUSTRALIA",125,-27],["NEW GUINEA",138,-5.2],["NEW ZEALAND",162,-40],["MELANESIA",162,-14],["MICRONESIA",150,4],["POLYNESIA",196,-10],["HAWAII",214,26]]
  }
};
