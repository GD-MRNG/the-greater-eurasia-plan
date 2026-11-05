/**
 * Stages: Oceania and the Pacific (eastern Indonesia and New Guinea, Australia, New Zealand, the Pacific).
 * One s(...) call per stage, along the route. See the schema in shared.js.
 * Longitudes stay ordinary degrees (west of Greenwich is negative). The Oceania view box runs
 * past 180° so Samoa, the Cook Islands, French Polynesia and Hawaii are drawn in one piece.
 * Depends on: shared.js (GEP.stage).  Exposes: nothing (registers stages).
 */
(function (s) {
/* ============ OCEANIA: EASTERN ISLANDS ARC ============ */
s("oi","","Lombok and Sumbawa","Across the Lombok Strait from Bali, then along Sumbawa.",
 "Ubud 115.26 -8.5 *; Senggigi 116.04 -8.49 ~; Gili Trawangan 116.03 -8.35 ~; Mataram 116.1 -8.58 +; Kuta Lombok 116.28 -8.89 ~; Mount Rinjani 116.46 -8.41 ~; Sumbawa Besar 117.42 -8.49; Mount Tambora 118.0 -8.25 ~; Bima 118.73 -8.46 +");
s("oi","","Flores and Komodo","Dragon country, highland towns and the crater lakes.",
 "Komodo 119.5 -8.55; Labuan Bajo 119.89 -8.5 *; Ruteng 120.47 -8.61; Bajawa 120.96 -8.79; Ende 121.66 -8.84; Kelimutu 121.79 -8.77 ~; Maumere 122.21 -8.62 +","On to Timor by road and ferry");
s("oi","oi-sumba","Sumba","Megalithic villages and the west-coast beaches, south of Flores.",
 "Waikabubak 119.41 -9.63 *; Waingapu 120.26 -9.66 +");
s("oi","oi-indian","Christmas Island and the Cocos (Keeling) Islands","The Australian islands in the Indian Ocean.",
 "Flying Fish Cove 105.63 -10.42 *; West Island (Cocos) 96.83 -12.19 *");
s("oi","","Timor and Timor-Leste","West Timor, then Dili and the eastern districts.",
 "Kalabahi 124.52 -8.22; Kupang 123.61 -10.17 +; Soe 124.28 -9.86 ~; Atambua 124.9 -9.11; Dili 125.58 -8.56 *; Atauro 125.58 -8.24 ~; Maubisse 125.6 -8.84 ~; Baucau 126.46 -8.46 +; Lospalos 126.99 -8.52; Jaco 127.32 -8.42 ~","Air or sea to Ambon");
s("oi","","Maluku","Ambon, the Banda Islands and the twin islands of Ternate and Tidore.",
 "Ambon 128.18 -3.7 *; Banda Neira 129.9 -4.52 +; Ternate 127.37 0.79; Tidore 127.44 0.68 ~","East to the Bird's Head");
s("oi","oi-kei","Kei and Tanimbar","The southern Maluku islands, by sea from Ambon.",
 "Tual 132.75 -5.63 *; Saumlaki 131.3 -7.98 +");
s("oi","","West Papua","Raja Ampat, the north coast and the Baliem Valley.",
 "Sorong 131.25 -0.88 *; Waisai 130.82 -0.43 +; Misool 130.08 -1.89 ~; Manokwari 134.08 -0.86; Biak 136.08 -1.18 ~; Wamena 138.95 -4.1 +; Merauke 140.4 -8.49 ~; Jayapura 140.72 -2.53 *","Across the border to Vanimo, or by air to Port Moresby");
s("oi","","Papua New Guinea: north coast and highlands","The north coast, then the highland towns.",
 "Vanimo 141.3 -2.67; Wewak 143.64 -3.55; Lorengau 147.27 -2.02 ~; Madang 145.79 -5.22 +; Mount Wilhelm 145.03 -5.78 ~; Goroka 145.39 -6.08; Mount Hagen 144.3 -5.86 +; Tari 142.95 -5.85 ~; Lae 147.0 -6.73 +");
s("oi","","Papua New Guinea: south coast","The capital on the Gulf of Papua, then Milne Bay.",
 "Port Moresby 147.19 -9.48 *; Alotau 150.46 -10.31 +; Losuia 151.08 -8.54 ~","Sea or air on to the Solomon Islands");
s("oi","oi-png-isles","New Britain and Bougainville","The Bismarck archipelago, east from Lae.",
 "Kimbe 150.14 -5.55; Rabaul 152.17 -4.2 +; Kokopo 152.26 -4.35; Kavieng 150.81 -2.58 ~; Buka 154.67 -5.42; Arawa 155.57 -6.23");

/* ============ OCEANIA: AUSTRALIA LOOP ============ */
s("au","","The Top End","Darwin, the plateau waterfalls and Kakadu.",
 "Darwin 130.84 -12.46 *; Litchfield 130.8 -13.16 ~; Kakadu 132.84 -12.67 +; Ubirr 132.96 -12.41 ~; Katherine 132.26 -14.47 +; Nitmiluk 132.42 -14.32 ~; Nhulunbuy 136.78 -12.18 ~");
s("au","au-centre","The Red Centre","South from Katherine through the ranges and the rock to the south coast.",
 "Daly Waters 133.38 -16.25; Tennant Creek 134.23 -19.65; Alice Springs 133.88 -23.7 +; West MacDonnell 132.73 -23.63 ~; Kings Canyon 131.57 -24.25 +; Uluru 131.04 -25.34 *; Kata Tjuta 130.73 -25.3 ~; Coober Pedy 134.75 -29.01");
s("au","","The Kimberley","Gorges, the Bungle Bungles and the west Kimberley coast.",
 "Kununurra 128.74 -15.77; Purnululu 128.3 -17.5 *; Derby 123.63 -17.3; Horizontal Falls 123.59 -16.38 ~; Broome 122.24 -17.96 *");
s("au","","The coral coast","North West Cape, the reef and the gorges inland.",
 "Exmouth 114.13 -21.93 +; Ningaloo 113.9 -22.57 ~; Coral Bay 113.77 -23.14; Karijini 118.3 -22.5 ~; Monkey Mia 113.72 -25.79 +; Kalbarri 114.16 -27.71");
s("au","","Perth and the southwest","The Swan River, then the forests and the south coast.",
 "Perth 115.86 -31.95 *; Rottnest 115.5 -32.0 ~; Fremantle 115.75 -32.06; Margaret River 115.07 -33.95 +; Albany 117.88 -35.02; Esperance 121.89 -33.86 ~; Kalgoorlie 121.47 -30.75 ~");
s("au","","South Australia","Across the Bight to Adelaide, with the ranges and the island.",
 "Ceduna 133.68 -32.13; Port Lincoln 135.86 -34.73; Kangaroo Island 137.4 -35.78 ~; Adelaide 138.6 -34.93 *; Barossa 138.96 -34.53 ~; Wilpena 138.55 -31.54 +");
s("au","","Victoria","Melbourne, the ranges and the southern ocean road.",
 "Melbourne 144.96 -37.81 *; Grampians 142.52 -37.14 ~; Twelve Apostles 143.1 -38.66 +; Apollo Bay 143.67 -38.76; Phillip Island 145.23 -38.48 ~; Wilsons Prom 146.4 -39.0 ~");
s("au","au-tasmania","Tasmania","Across Bass Strait. Mountains, the west coast and Hobart.",
 "Launceston 147.14 -41.44; Cradle Mountain 145.96 -41.68 +; Strahan 145.33 -42.15; Hobart 147.33 -42.88 *; Port Arthur 147.85 -43.15 ~; Freycinet 148.29 -42.12 +; Bay of Fires 148.29 -41.25 ~");
s("au","","New South Wales","The capital, the harbour and the north coast.",
 "Canberra 149.13 -35.28 +; Katoomba 150.31 -33.72 ~; Sydney 151.21 -33.87 *; Hunter Valley 151.3 -32.77 ~; Byron Bay 153.61 -28.64 +");
s("au","","Queensland: the south-east","Brisbane, the islands and the reef coast north.",
 "Brisbane 153.03 -27.47 +; Gold Coast 153.43 -28.02 ~; Noosa 153.09 -26.39; K'gari 153.13 -25.24 ~; Airlie Beach 148.72 -20.27; Whitsundays 148.95 -20.35 +");
s("au","","Queensland: the far north","Cairns, the reef and the track to Cape York.",
 "Cairns 145.77 -16.92 *; Kuranda 145.64 -16.82 ~; Port Douglas 145.47 -16.48 +; Daintree 145.38 -16.25 ~; Cape Tribulation 145.46 -16.09 ~; Cooktown 145.25 -15.47; Thursday Island 142.22 -10.58 +; Cape York 142.39 -10.89","Across the Torres Strait, or by air back to Darwin");

/* ============ OCEANIA: NEW ZEALAND ARC ============ */
s("nz","","North Island","Across the Tasman. Auckland, the volcanic centre and Wellington.",
 "Auckland 174.76 -36.85 *; Coromandel 175.5 -36.76 ~; Tauranga 176.17 -37.69; Rotorua 176.25 -38.14; Taupo 176.07 -38.69; Tongariro 175.58 -39.13 ~; New Plymouth 174.08 -39.06 ~; Wellington 174.78 -41.29 +");
s("nz","nz-northland","Northland","The Bay of Islands and the northern cape.",
 "Paihia 174.09 -35.28; Russell 174.12 -35.26 ~; Cape Reinga 172.68 -34.43 +");
s("nz","nz-east","East Cape","Hawke's Bay and the east-coast road.",
 "Napier 176.91 -39.49 +; Gisborne 178.0 -38.66; Te Araroa 178.37 -37.63 ~");
s("nz","","South Island: Marlborough to the lakes","The ferry, the east coast and the southern lakes.",
 "Picton 174.01 -41.29; Nelson 173.28 -41.27 +; Kaikoura 173.68 -42.4; Christchurch 172.64 -43.53 +; Akaroa 172.97 -43.8 ~; Lake Tekapo 170.48 -44.0; Aoraki 170.14 -43.73 +; Wanaka 169.13 -44.7; Queenstown 168.66 -45.03 *");
s("nz","nz-west","The West Coast","From Nelson down the wet coast to the glaciers, rejoining at Queenstown.",
 "Abel Tasman 172.97 -40.95; Punakaiki 171.33 -42.11; Greymouth 171.21 -42.45; Hokitika 170.97 -42.72; Franz Josef 170.19 -43.39 +; Fox Glacier 170.02 -43.46 ~; Haast 169.04 -43.88");
s("nz","","South Island: Te Anau to Dunedin","Fiordland, the south coast and the east.",
 "Te Anau 167.72 -45.41; Milford Sound 167.93 -44.67 ~; Invercargill 168.35 -46.41; Dunedin 170.5 -45.87 +; Oamaru 170.97 -45.1 ~; Waitangi (Chatham) -176.56 -43.95");
s("nz","nz-stewart","Stewart Island","The short crossing from the South Island.",
 "Oban 168.13 -46.9 +");
s("nz","nz-norfolk","Norfolk Island","The small island between New Caledonia and New Zealand.",
 "Kingston (Norfolk) 167.96 -29.05 +");

/* ============ OCEANIA: PACIFIC ARC ============ */
s("pa","","Solomon Islands","West to east through the New Georgia islands to Guadalcanal and Temotu.",
 "Gizo 156.84 -8.1 +; Munda 157.26 -8.33; Honiara 159.95 -9.43 *; Tulagi 160.15 -9.1 ~; Auki 160.7 -8.77; Lata 165.86 -10.73");
s("pa","","Vanuatu","Espiritu Santo, the central islands and Tanna.",
 "Luganville 167.16 -15.52 +; Champagne Beach 167.12 -15.14 ~; Pentecost 168.17 -15.76; Ambrym 168.12 -16.25 ~; Port Vila 168.32 -17.73 *; Lenakel 169.27 -19.53; Mount Yasur 169.45 -19.53 ~");
s("pa","pa-newcal","New Caledonia","The Grande Terre and the Loyalty Islands, between Vanuatu and Fiji.",
 "Lifou 167.24 -20.92; Hienghène 164.94 -20.69 ~; Bourail 165.5 -21.57; Nouméa 166.46 -22.28 *; Isle of Pines 167.45 -22.62 ~; Ouvéa 166.57 -20.65 ~");
s("pa","","Fiji","The Mamanucas and Yasawas, then Viti Levu, Ovalau and the north.",
 "Nadi 177.44 -17.78 *; Mamanuca Islands 177.1 -17.67 ~; Yasawa Islands 177.45 -16.8 ~; Lautoka 177.45 -17.62; Suva 178.44 -18.14 +; Levuka 178.83 -17.68 ~; Kadavu 178.2 -19.05 ~; Savusavu 179.34 -16.78; Taveuni 179.87 -16.82 +");
s("pa","","Tonga","Tongatapu, then the middle islands and Vava'u.",
 "Nuku'alofa -175.2 -21.13 *; Eua -174.95 -21.38 ~; Pangai -174.35 -19.81; Neiafu -173.98 -18.65 +");
s("pa","","Samoa","Upolu and Savai'i, then Tutuila.",
 "Apia -171.77 -13.83 *; Lalomanu -171.44 -14.05 ~; Salelologa -172.4 -13.74 +; Pago Pago -170.7 -14.28 +; Ofu -169.68 -14.17 ~");
s("pa","pa-tuvalu","Tuvalu","The atolls north of Fiji.",
 "Funafuti 179.2 -8.52 *; Nanumea 176.13 -5.67 ~");
s("pa","pa-pitcairn","Pitcairn Islands","The islands south-east of the Tuamotus.",
 "Adamstown -130.1 -25.07 *");
s("pa","pa-isles","Wallis, Futuna, Niue and Tokelau","The smaller islands around Samoa, by ship or air.",
 "Atafu -172.52 -8.54; Mata-Utu -176.17 -13.28 +; Leava -178.13 -14.31; Alofi -169.92 -19.05 *");
s("pa","","Cook Islands","Rarotonga and the northern atoll of Aitutaki.",
 "Rarotonga -159.78 -21.23 *; Aitutaki -159.79 -18.86 +; Atiu -158.12 -20.0 ~");
s("pa","","Society Islands","Tahiti and the Leeward Islands.",
 "Papeete -149.57 -17.54 *; Moorea -149.83 -17.53 +; Huahine -151.03 -16.74; Raiatea -151.44 -16.83; Bora Bora -151.74 -16.5 +");
s("pa","","Tuamotu and the Marquesas","The atolls, then the high islands to the north-east.",
 "Rangiroa -147.66 -15.12 +; Fakarava -145.62 -16.05 ~; Nuku Hiva -140.1 -8.91 *; Hiva Oa -139.03 -9.8 +");
s("pa","","Hawaii","Oahu, Hawai'i, Maui and Kaua'i.",
 "Honolulu -157.86 21.31 *; Pearl Harbor -157.95 21.36 ~; Haleiwa -158.1 21.59 ~; Kailua-Kona -155.99 19.64; Hawaii Volcanoes -155.29 19.42 ~; Hilo -155.09 19.73; Kahului -156.47 20.89; Haleakala -156.25 20.71 ~; Lihue -159.37 21.98; Napali Coast -159.58 22.17 ~","On across the Pacific to North America");
s("pa","pa-micro","Palau","Rock islands and the reef, north of West Papua.",
 "Koror 134.48 7.34 *; Rock Islands 134.36 7.25 ~; Peleliu 134.25 7.01; Ngerulmud 134.62 7.5 ~");
s("pa","pa-micro","Yap, Guam and the Northern Marianas","West to east along the Marianas.",
 "Colonia (Yap) 138.12 9.51 +; Hagåtña 144.75 13.48 *; Tumon 144.79 13.51 ~; Rota 145.21 14.15; Saipan 145.75 15.19 +; Tinian 145.63 15.0 ~");
s("pa","pa-micro","The Federated States of Micronesia","Chuuk, Pohnpei and Kosrae.",
 "Weno 151.85 7.45; Kolonia 158.21 6.96 +; Nan Madol 158.33 6.84 ~; Tofol 162.96 5.33");
s("pa","pa-micro","Marshall Islands and Nauru","Atolls west of the date line, and Nauru to the south.",
 "Yaren 166.93 -0.55; Kwajalein 167.73 8.72; Jaluit 169.64 5.92; Majuro 171.38 7.12 *; Arno 171.7 7.1 ~");
s("pa","pa-micro","Kiribati","The Gilberts, then the Phoenix and Line Islands across the date line.",
 "Banaba 169.54 -0.86 ~; Tarawa 172.98 1.33 +; Kanton -171.72 -2.81; Tabuaeran -159.33 3.86; Kiritimati -157.36 1.86 +");
})(GEP.stage);
