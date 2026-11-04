/**
 * Stages: the three Americas arcs (North, Central, South).
 * One s(...) call per stage, in travel order. See the schema in shared.js.
 * Depends on: shared.js (GEP.stage).  Exposes: nothing (registers stages).
 */
(function (s) {
/* ============ AMERICAS: NORTH AMERICA ARC ============ */
s("na","","Alaska","In from Japan or Korea across the Pacific. Glaciers, Denali and the Dalton Highway.",
 "Anchorage -149.9 61.22 *; Seward -149.44 60.1 ~; Homer -151.55 59.64 ~; Talkeetna -150.1 62.32 ~; Denali -151.0 63.07 *; Fairbanks -147.72 64.84 *; Deadhorse -148.5 70.2 ~; Juneau -134.42 58.3 ~; Skagway -135.3 59.46 ~");
s("na","","Yukon, Alberta and British Columbia","The Alaska Highway south, the Rockies, then the coast at Vancouver.",
 "Dawson City -139.43 64.06 ~; Whitehorse -135.06 60.72 *; Jasper -118.08 52.88 *; Banff -115.57 51.18 *; Lake Louise -116.18 51.43 ~; Calgary -114.07 51.05 ~; Vancouver -123.12 49.28 *; Whistler -122.95 50.12 ~; Victoria -123.37 48.43 ~");
s("na","","Pacific Northwest","Seattle, the Olympic coast and Oregon.",
 "Seattle -122.33 47.61 *; Olympic NP -123.6 47.8 ~; Mount Rainier -121.76 46.85 ~; Portland -122.68 45.52 *; Cannon Beach -123.96 45.89 ~; Crater Lake -122.1 42.94 ~");
s("na","","California","The coast road to the border.",
 "Redwood NP -124.0 41.3 *; San Francisco -122.42 37.77 *; Yosemite -119.54 37.85 ~; Monterey -121.89 36.6 ~; Big Sur -121.8 36.27 ~; Santa Barbara -119.7 34.42 ~; Los Angeles -118.24 34.05 *; Death Valley -116.9 36.5 ~; Joshua Tree -115.9 33.9 ~; San Diego -117.16 32.72 *","","Cross into Mexico at Tijuana");
s("na","na-canada","Across Canada: prairies to the Great Lakes","By road or The Canadian rail line, east from the Rockies.",
 "Saskatoon -106.67 52.13; Winnipeg -97.14 49.9 *; Churchill -94.17 58.77 ~; Thunder Bay -89.25 48.38");
s("na","na-canada","Ontario, Quebec and the Maritimes","From Toronto to the Atlantic.",
 "Toronto -79.38 43.65 *; Niagara Falls -79.07 43.09 *; Ottawa -75.7 45.42; Montréal -73.57 45.5 *; Québec City -71.21 46.81 *; Halifax -63.57 44.65 *; Cape Breton -60.4 46.5 ~; Charlottetown -63.13 46.24 ~; St. John's -52.71 47.56 ~");
s("na","na-rockies","Rockies and Midwest","Glacier, Yellowstone and the Plains to Chicago.",
 "Glacier NP -113.8 48.7 *; Yellowstone -110.5 44.6 *; Grand Teton -110.8 43.8 ~; Salt Lake City -111.89 40.76 ~; Denver -104.99 39.74 ~+; Rocky Mountain NP -105.7 40.34 ~; Mount Rushmore -103.46 43.88 *; Badlands -102.5 43.8 ~; Minneapolis -93.27 44.98; Chicago -87.63 41.88 *");
s("na","na-southwest","Southwest and the Deep South","Desert parks, Santa Fe, Texas and New Orleans.",
 "Las Vegas -115.14 36.17 *; Zion -113.03 37.3 ~; Bryce Canyon -112.17 37.59 ~; Grand Canyon -112.11 36.06 *; Monument Valley -110.1 36.98 ~; Sedona -111.76 34.87 ~; Santa Fe -105.94 35.69 *; Austin -97.74 30.27 *; San Antonio -98.49 29.42 ~; New Orleans -90.07 29.95 *; Memphis -90.05 35.15; Nashville -86.78 36.16 *; Great Smoky Mountains -83.5 35.6 ~; Atlanta -84.39 33.75");
s("na","na-east","East Coast","Boston down to Miami and the Keys.",
 "Boston -71.06 42.36 *; New York -74.0 40.71 *; Philadelphia -75.16 39.95; Washington DC -77.04 38.91 *; Shenandoah -78.4 38.5 ~; Charleston -79.93 32.78 *; Savannah -81.1 32.08 ~; Miami -80.19 25.76 *; Everglades -80.9 25.4 ~; Key West -81.78 24.56 ~");

/* ============ AMERICAS: CENTRAL AMERICA ARC ============ */
s("ca","","Northwest Mexico","Over the border at Tijuana, then the Pacific side.",
 "Tijuana -117.04 32.53 *; Mazatlán -106.41 23.22 *");
s("ca","ca-baja","Baja California","The peninsula, optional.",
 "Ensenada -116.6 31.87; Loreto -111.35 26.0 *; La Paz (Baja) -110.31 24.14 *; Los Cabos -109.9 22.89 *");
s("ca","ca-copper","Copper Canyon","By the Chepe train.",
 "Los Mochis -108.99 25.8; Creel -107.63 27.75 *; Chihuahua -106.09 28.63 *");
s("ca","","Central Mexico highlands","Colonial cities and the capital.",
 "Guadalajara -103.35 20.67 *; Tequila -103.84 20.88 ~; Guanajuato -101.26 21.02 *; San Miguel de Allende -100.74 20.91 ~; Mexico City -99.13 19.43 *; Teotihuacán -98.84 19.69 ~; Puebla -98.2 19.04");
s("ca","","Oaxaca and Chiapas","Food, mountains and Maya country in the south.",
 "Oaxaca -96.73 17.06 *; Monte Albán -96.77 17.04 ~; Puerto Escondido -97.08 15.86 ~; San Cristóbal de las Casas -92.64 16.74 *; Palenque -91.98 17.48 *");
s("ca","","Yucatán and the Caribbean coast","Maya sites, cenotes and the sea.",
 "Campeche -90.53 19.85 ~; Mérida -89.62 20.97 *; Chichén Itzá -88.57 20.68 ~; Cancún -86.85 21.16 +; Tulum -87.46 20.21 *; Bacalar -88.39 18.68 +");
s("ca","","Belize","Cayes and jungle.",
 "Belize City -88.19 17.5; Caye Caulker -88.0 17.74 ~; San Ignacio -89.07 17.16 *; Placencia -88.37 16.52 ~");
s("ca","","Guatemala","Tikal, Lake Atitlán and Antigua.",
 "Flores -89.89 16.93 *; Tikal -89.62 17.22 ~; Semuc Champey -89.96 15.78 ~; Río Dulce -88.8 15.8 ~; Guatemala City -90.51 14.63; Antigua -90.73 14.56 *; Chichicastenango -91.11 14.94 ~; Lake Atitlán -91.2 14.69 *");
s("ca","","El Salvador and Honduras","Copán and the coffee route.",
 "Copán -89.14 14.84 *; Santa Ana -89.56 14.0; Juayúa -89.74 13.85 ~; San Salvador -89.2 13.69 *; El Tunco -89.38 13.49 ~; Tegucigalpa -87.2 14.07 ~; Roatán -86.53 16.34 ~");
s("ca","","Nicaragua","Colonial cities and the volcano island.",
 "León -86.88 12.43 *; Managua -86.25 12.13; Granada -85.96 11.93 *; Ometepe -85.55 11.5 *");
s("ca","","Costa Rica","Cloud forest, volcanoes and two coasts.",
 "Arenal -84.7 10.46 ~; Monteverde -84.8 10.3 *; San José -84.08 9.93 *; Tortuguero -83.5 10.54 ~; Manuel Antonio -84.15 9.39 ~; Puerto Viejo -82.8 9.65 ~");
s("ca","","Panama","The canal, islands and the end of the road at the Darién Gap.",
 "Boquete -82.44 8.78 ~; Bocas del Toro -82.25 9.34 *; Panama City -79.52 8.98 *; Portobelo -79.65 9.55 ~; Guna Yala -78.0 9.55 ~","","No road across the Darién Gap: fly or sail to Colombia");
s("ca","ca-caribbean","Cuba","From Cancún across to the island.",
 "Havana -82.37 23.14 *; Viñales -83.7 22.62 ~; Trinidad -80.0 21.8 *; Santiago de Cuba -75.83 20.02 *");
s("ca","ca-caribbean","Jamaica","Reggae and the Blue Mountains.",
 "Kingston -76.8 17.97 *; Blue Mountains -76.6 18.05 ~");
s("ca","ca-caribbean","Haiti","Needs a fresh check before anything is planned.",
 "Port-au-Prince -72.34 18.54 *","check");
s("ca","ca-caribbean","Dominican Republic and Puerto Rico","Colonial Santo Domingo and the island chain.",
 "Santo Domingo -69.9 18.48 *; Samaná -69.3 19.2 ~; Punta Cana -68.4 18.58 ~; San Juan -66.1 18.47 *");

/* ============ AMERICAS: SOUTH AMERICA ARC ============ */
s("sa","","Colombia","Caribbean coast, coffee and the Andes.",
 "Cartagena -75.51 10.39 *; Santa Marta -74.2 11.24 ~; Tayrona -73.9 11.3 ~; Medellín -75.57 6.25 *; Guatapé -75.16 6.23 ~; Bogotá -74.07 4.71 *; Villa de Leyva -73.53 5.63 ~; Salento -75.57 4.64 *; Cali -76.53 3.45; Popayán -76.6 2.44; San Agustín -76.28 1.89 ~; Ipiales -77.59 0.81");
s("sa","","Ecuador","Volcano avenue and the colonial south.",
 "Quito -78.47 -0.18 *; Cotopaxi -78.44 -0.68 ~; Quilotoa -78.9 -0.85 ~; Baños -78.42 -1.4 *; Cuenca -79.0 -2.9 *; Guayaquil -79.9 -2.17 ~; Galápagos -90.3 -0.74 ~");
s("sa","","Peru","Machu Picchu, the Sacred Valley and the coast.",
 "Máncora -80.97 -4.1 ~; Trujillo -79.03 -8.11; Huaraz -77.53 -9.53 *; Lima -77.04 -12.05 *; Paracas -76.25 -13.8 ~; Huacachina -75.76 -14.09 ~; Nazca -74.93 -14.83; Arequipa -71.54 -16.4 *; Colca Canyon -71.6 -15.6 ~; Cusco -71.97 -13.52 *; Ollantaytambo -72.26 -13.26 ~; Machu Picchu -72.55 -13.16 *; Rainbow Mountain -71.3 -13.87 ~; Puno -70.02 -15.84 *");
s("sa","","Bolivia","Altiplano, the Salar and the white city.",
 "Copacabana -69.09 -16.17; Isla del Sol -69.15 -16.0 ~; La Paz -68.15 -16.5 *; Sucre -65.26 -19.03 *; Potosí -65.75 -19.58 ~; Uyuni -66.83 -20.46 *; Salar de Uyuni -67.5 -20.2 ~; Tupiza -65.7 -21.45");
s("sa","","Chile: north and central","Atacama, then the wine valleys and Santiago.",
 "Arica -70.3 -18.48 ~; Iquique -70.15 -20.2 ~; San Pedro de Atacama -68.2 -22.91 *; La Serena -71.25 -29.9; Valparaíso -71.62 -33.05 *; Santiago -70.65 -33.45 *; Easter Island -109.4 -27.1 ~");
s("sa","","Chile: lakes, Chiloé and the Carretera Austral","Volcanoes, islands and Chile's southern road.",
 "Pucón -71.95 -39.28 *; Valdivia -73.25 -39.82 ~; Puerto Varas -72.98 -41.32; Chiloé (Castro) -73.76 -42.48 *; Coyhaique -72.07 -45.57 *; Puerto Río Tranquilo -72.6 -46.6 ~; Villa O'Higgins -72.56 -48.47");
s("sa","","Patagonia to the end of the world","Glaciers, granite and Ushuaia.",
 "El Chaltén -72.89 -49.33 *; El Calafate -72.27 -50.34 +; Perito Moreno -73.0 -50.5 ~; Torres del Paine -72.99 -51.0 *; Puerto Natales -72.5 -51.73 +; Punta Arenas -70.91 -53.16 *; Ushuaia -68.3 -54.8 *","","The southern end");
s("sa","sa-argentina","Argentina and Uruguay","The northwest, Mendoza, Buenos Aires and the river across to Uruguay.",
 "Purmamarca -65.5 -23.74 ~; Salta -65.41 -24.79 *; Cafayate -65.97 -26.07 ~; Mendoza -68.84 -32.89 *; Córdoba -64.18 -31.42; Buenos Aires -58.38 -34.6 *; Colonia -57.84 -34.47 ~; Montevideo -56.19 -34.9 *; Punta del Este -54.95 -34.96 ~; Bariloche -71.31 -41.13 ~");
s("sa","sa-brazil","Brazil: Iguazú to Rio","Waterfalls, then the southern coast and Rio.",
 "Iguazú Falls -54.44 -25.69 *; Pantanal -56.8 -17.6 ~; Bonito -56.5 -21.1 ~; Florianópolis -48.55 -27.6; São Paulo -46.63 -23.55 *; Paraty -44.72 -23.22 ~; Rio de Janeiro -43.17 -22.9 *; Ouro Preto -43.5 -20.38 ~; Brasília -47.93 -15.8 ~");
s("sa","sa-brazil","Brazil: the northeast coast","Salvador to Fortaleza and the dunes.",
 "Salvador -38.5 -12.97 *; Chapada Diamantina -41.4 -12.6 ~; Recife -34.88 -8.05 *; Fortaleza -38.54 -3.73 *; Jericoacoara -40.5 -2.8 ~; Lençóis Maranhenses -43.0 -2.5 ~; São Luís -44.3 -2.53");
s("sa","sa-amazon","Amazon river route","By boat from Iquitos to Belém.",
 "Tena -77.8 -0.99 ~; Iquitos -73.25 -3.75 *; Leticia -69.94 -4.2; Manaus -60.02 -3.12 *; Santarém -54.7 -2.44 ~; Belém -48.5 -1.46 *");
s("sa","sa-venezuela","Venezuela","Angel Falls and the Caribbean coast. Needs a fresh check.",
 "Mérida (Venezuela) -71.14 8.6 ~; Caracas -66.9 10.48 *; Los Roques -66.75 11.85 ~; Angel Falls -62.5 5.97 *; Roraima -60.76 5.14 ~","check");
s("sa","sa-venezuela","The Guianas","Guyana, Suriname and French Guiana.",
 "Georgetown -58.16 6.8; Paramaribo -55.2 5.85; Cayenne -52.33 4.94");
})(GEP.stage);
