/**
 * Stages: the four Africa arcs (North Africa, Nile and East Africa, Southern Africa loop, West Africa Atlantic).
 * One s(...) call per stage, in travel order. See the schema in shared.js.
 * Depends on: shared.js (GEP.stage).  Exposes: nothing (registers stages).
 */
(function (s) {
/* ============ AFRICA: NORTH AFRICA ARC ============ */
s("an","","Morocco: Tangier to Casablanca","In from Spain by the Tarifa ferry. Blue town, imperial cities, the coast.",
 "Tangier -5.8 35.76 *; Tetouan -5.37 35.57 ~; Chefchaouen -5.26 35.17 *; Volubilis -5.55 34.07 ~; Meknes -5.55 33.9 ~; Fes -5.0 34.03 *; Rabat -6.84 34.02 *; Casablanca -7.59 33.57 *","","Fly or sail on: the Morocco–Algeria land border has been closed for decades, so check");
s("an","an-atlas","Atlas and Sahara","Marrakech, the High Atlas and the dunes.",
 "Marrakech -8.0 31.63 *; Aït Benhaddou -7.13 31.05 ~; Ouarzazate -6.9 30.92; Todra Gorge -5.58 31.58 ~; Dades Gorge -5.9 31.5 ~; Merzouga -4.0 31.1 *");
s("an","","Algeria","Roman ruins, the Casbah and the east.",
 "Oran -0.64 35.7; Tipaza 2.44 36.59 ~; Algiers 3.06 36.75 *; Djemila 5.74 36.32 ~; Constantine 6.61 36.37 *; Timgad 6.47 35.48 ~; Ghardaïa 3.67 32.49 ~","","Ferries link Spain and France with Algeria");
s("an","","Tunisia","Ferries from Italy, Carthage and the desert south. Libya is skipped for now.",
 "Tunis 10.18 36.8 *; Carthage 10.33 36.85 ~; Dougga 9.22 36.42 ~; Sousse 10.64 35.83; Kairouan 10.1 35.68 *; El Djem 10.71 35.3 ~; Tozeur 8.13 33.92 *; Douz 9.02 33.46; Matmata 9.97 33.54 ~; Djerba 10.86 33.8 *","","Fly Tunis to Cairo");
s("an","","Egypt: Alexandria and Cairo","The Mediterranean coast and the capital.",
 "Alexandria 29.92 31.2 *; Siwa Oasis 25.52 29.2 ~+; Port Said 32.3 31.26 ~; Cairo 31.24 30.04 *; Giza Pyramids 31.13 29.98 ~; Saqqara 31.22 29.87 ~; Fayoum 30.84 29.31 ~");
s("an","an-western-desert","Western Desert oases","The White Desert loop from Cairo to Luxor.",
 "Bahariya 28.85 28.35; White Desert 28.2 27.3 *; Farafra 27.97 27.06; Dakhla Oasis 29.0 25.5; Kharga 30.55 25.45");

/* ============ AFRICA: NILE AND EAST AFRICA ARC ============ */
s("ae","","Egypt: Luxor to Aswan","Temples along the Nile, then the Lake Nasser ferry to Sudan.",
 "Luxor 32.64 25.7 *; Valley of the Kings 32.6 25.74 ~; Edfu 32.87 24.98; Kom Ombo 32.93 24.45 ~; Aswan 32.9 24.09 *; Abu Simbel 31.62 22.34 ~+","","Lake Nasser ferry to Wadi Halfa, or fly to Addis");
s("ae","ae-sinai","Sinai and the Red Sea","Mountains and reefs. The Aqaba–Nuweiba ferry is the way in from Jordan.",
 "St Catherine 33.95 28.56 +; Mount Sinai 33.98 28.54 ~; Nuweiba 34.67 29.03 ~+; Dahab 34.5 28.5 *; Sharm el-Sheikh 34.33 27.91; Hurghada 33.8 27.26 *; Marsa Alam 34.9 25.06");
s("ae","","Sudan","Pyramids of Meroë and the confluence of the Niles. Overland through Sudan needs a fresh check, otherwise fly Cairo to Addis.",
 "Wadi Halfa 31.33 21.8; Dongola 30.48 19.17; Jebel Barkal 31.85 18.55 ~; Meroë 33.75 16.94 *; Khartoum 32.53 15.5 *; Kassala 36.4 15.45 ~","check");
s("ae","","Ethiopia: the northern historic circuit","Addis, Lake Tana, Gondar, Axum and the rock churches of Lalibela. Regional conflict makes this one a check.",
 "Addis Ababa 38.76 9.03 *; Bahir Dar 37.39 11.6 *; Gondar 37.47 12.6 *; Simien Mountains 38.0 13.2 ~; Axum 38.72 14.12 *; Mekele 39.47 13.5; Lalibela 39.04 12.03 *; Erta Ale 40.67 13.6 ~; Harar 42.12 9.31 ~","check");
s("ae","ae-omo","Rift Valley and Omo","Lakes, Konso villages and the Omo tribes.",
 "Hawassa 38.47 7.06; Arba Minch 37.55 6.04; Jinka 36.57 5.78; Turmi 36.5 4.9 ~; Moyale 39.05 3.52","","Northern Kenya road to Nairobi: check");
s("ae","","Kenya: Nairobi and the Rift","Safari country. The SGR train runs Nairobi to Mombasa.",
 "Nairobi 36.82 -1.29 *; Lake Nakuru 36.08 -0.37 ~; Lake Naivasha 36.43 -0.77 ~; Mount Kenya 37.31 -0.15 ~; Maasai Mara 35.15 -1.5 *; Amboseli 37.26 -2.65 ~","","Overland south to Arusha");
s("ae","ae-swahili","Swahili coast","Mombasa down through Zanzibar to Mozambique Island.",
 "Mombasa 39.67 -4.04 *; Lamu 40.9 -2.27 ~+; Diani Beach 39.57 -4.3 ~; Tanga 39.1 -5.07; Zanzibar Stone Town 39.19 -6.16 *; Dar es Salaam 39.28 -6.79 *; Kilwa Kisiwani 39.5 -8.96 ~; Mtwara 40.19 -10.27; Pemba (Mozambique) 40.52 -12.97 ~; Mozambique Island 40.73 -15.03 *");
s("ae","ae-gorillas","Uganda and Rwanda","The source of the Nile and the mountain gorillas.",
 "Jinja 33.2 0.44 ~; Kampala 32.58 0.35 *; Murchison Falls 31.7 2.28 ~; Queen Elizabeth NP 30.0 -0.2 ~; Bwindi 29.7 -1.05 *; Volcanoes NP 29.5 -1.47 ~; Lake Kivu 29.26 -1.7 ~; Kigali 30.06 -1.95 *");
s("ae","","Tanzania: Kilimanjaro to the south","Kilimanjaro, then south along the Tazara corridor.",
 "Moshi 37.34 -3.35; Kilimanjaro 37.35 -3.07 ~+; Arusha 36.68 -3.37 *; Dodoma 35.74 -6.16; Iringa 35.7 -7.77; Ruaha 34.9 -7.6 ~; Mbeya 33.46 -8.9");
s("ae","ae-safari","Northern safari circuit","The classic Tanzania parks.",
 "Tarangire 36.0 -3.85 ~; Lake Manyara 35.8 -3.6; Ngorongoro 35.58 -3.17 *; Serengeti 34.83 -2.33 *");
s("ae","","Malawi and Zambia","Lake Malawi, Lusaka and on to Livingstone.",
 "Karonga 33.9 -9.93; Livingstonia 34.1 -10.6 ~; Nkhata Bay 34.3 -11.6 *; Lilongwe 33.78 -13.97 *; Cape Maclear 34.83 -14.0 ~; South Luangwa 31.8 -13.0 ~; Lusaka 28.28 -15.39 *; Kafue NP 26.0 -15.0 ~; Livingstone 25.86 -17.85 *");

/* ============ AFRICA: SOUTHERN AFRICA LOOP ============ */
s("as","","Victoria Falls and Chobe","Where the Zambezi drops, and Botswana's elephants.",
 "Victoria Falls 25.85 -17.93 *; Kasane (Chobe) 25.15 -17.8 *");
s("as","","Botswana: Okavango","Delta, salt pans and the Kalahari.",
 "Nata 26.2 -20.2 ~; Makgadikgadi 25.5 -20.6 ~; Maun 23.42 -19.98 *; Moremi 23.0 -19.2 ~; Ghanzi 21.7 -21.7");
s("as","","Namibia","Dunes, desert coast, Etosha and the canyon.",
 "Windhoek 17.08 -22.56 *; Etosha 16.0 -18.8 *; Spitzkoppe 15.2 -21.8 ~; Swakopmund 14.53 -22.68 *; Walvis Bay 14.5 -22.96 ~; Sossusvlei 15.3 -24.73 *; Lüderitz 15.16 -26.65 ~; Fish River Canyon 17.6 -27.6 *");
s("as","","South Africa: Cape Town and the Garden Route","The Cape, wine country and the south coast.",
 "Cape Town 18.42 -33.92 *; Cape Point 18.5 -34.36 ~; Stellenbosch 18.86 -33.93 ~; Hermanus 19.24 -34.42 ~; Oudtshoorn 22.2 -33.6 ~; Knysna 23.05 -34.04 *; Tsitsikamma 23.9 -34.0 ~; Gqeberha 25.6 -33.96 +; Addo 25.7 -33.45 ~");
s("as","","South Africa: Wild Coast, Durban and the Drakensberg","Beaches and mountains up to Zululand.",
 "Coffee Bay 29.15 -31.98 ~; Durban 31.03 -29.86 *; Drakensberg 29.2 -29.0 *; Sani Pass 29.3 -29.58 ~; Maseru (Lesotho) 27.48 -29.31 ~+; St Lucia 32.4 -28.38 ~; Hluhluwe 31.9 -28.0 ~");
s("as","","South Africa: Johannesburg and Kruger","The big city, then the park.",
 "Johannesburg 28.05 -26.2 *; Pretoria 28.19 -25.75 ~; Blyde River Canyon 30.8 -24.6 ~; Kruger 31.5 -24.0 *");
s("as","as-zimbabwe","Zimbabwe","Falls to Great Zimbabwe, then south to Johannesburg.",
 "Hwange 26.5 -18.9 ~; Bulawayo 28.58 -20.15; Matobo Hills 28.5 -20.5 ~; Great Zimbabwe 30.93 -20.27 *; Harare 31.05 -17.83 ~");
s("as","as-angola","Angola link","Up the Atlantic side from Namibia.",
 "Ruacana 14.2 -17.4 ~; Lubango 13.5 -14.9; Benguela 13.4 -12.58; Luanda 13.23 -8.84 *");
s("as","as-mozambique","Eswatini and the Mozambique coast","Out of Johannesburg to the Indian Ocean.",
 "Mbabane (Eswatini) 31.13 -26.32 *; Maputo 32.57 -25.97 *; Tofo Beach 35.55 -23.85 *; Vilankulo 35.3 -22.0 ~; Gorongosa 34.4 -18.8 ~; Beira 34.84 -19.84");
s("as","as-islands","Madagascar and Mauritius","Optional island branch, by air.",
 "Antananarivo 47.5 -18.9 *; Andasibe 48.4 -18.95 ~; Antsirabe 47.03 -19.87; Ranomafana 47.45 -21.25 ~; Isalo 45.4 -22.55 ~; Morondava Baobab Avenue 44.42 -20.25 ~; Nosy Be 48.27 -13.3 ~; Port Louis (Mauritius) 57.5 -20.16 ~");

/* ============ AFRICA: WEST AFRICA ATLANTIC ARC ============ */
s("aw","","Morocco's Atlantic coast and Western Sahara","South from Marrakech to the Sahara coast. The status of Western Sahara needs a check.",
 "Essaouira -9.77 31.51 *; Agadir -9.6 30.43; Sidi Ifni -10.17 29.38 ~; Laâyoune -13.2 27.15; Dakhla -15.96 23.7 *");
s("aw","","Mauritania","Desert coast, the ore train and the oases.",
 "Nouadhibou -17.0 20.93; Nouakchott -15.98 18.08 *; Atar -13.05 20.52 ~; Chinguetti -12.37 20.46 ~");
s("aw","","Senegal and the Gambia","Dakar, Saint-Louis and the river.",
 "Saint-Louis -16.5 16.03 *; Lac Rose -17.23 14.84 ~; Dakar -17.47 14.69 *; Gorée -17.4 14.67 ~; Saloum Delta -16.7 13.9 ~; Banjul -16.58 13.45 *; Kunta Kinteh -16.0 13.33 ~");
s("aw","","Guinea-Bissau, Guinea, Sierra Leone and Liberia","The Upper Guinea coast.",
 "Bissau -15.6 11.86; Bijagós Islands -16.0 11.2 ~; Conakry -13.7 9.5; Freetown -13.23 8.48 *; Monrovia -10.8 6.3");
s("aw","","Côte d'Ivoire and Ghana","Abidjan, the old forts and Accra.",
 "Abidjan -4.02 5.36 *; Grand-Bassam -3.74 5.2 ~; Yamoussoukro -5.28 6.82 ~; Cape Coast -1.25 5.1 *; Accra -0.19 5.6 *; Kumasi -1.62 6.69 ~");
s("aw","","Togo, Benin and Nigeria","Lomé to Lagos.",
 "Lomé 1.22 6.13 *; Ouidah 2.09 6.37 ~; Cotonou 2.42 6.37; Abomey 1.99 7.18 ~; Lagos 3.38 6.52 *; Benin City 5.63 6.34 ~; Calabar 8.33 4.95 ~");
s("aw","","Cameroon and Gabon","The Gulf of Guinea's far corner.",
 "Douala 9.7 4.05 *; Limbe 9.2 4.02 ~; Yaoundé 11.5 3.85 ~; Libreville 9.45 0.39 *");
s("aw","aw-sahel","The Sahel","Bamako, Timbuktu, Dogon country and Niamey. The Sahel needs a fresh check before anything is booked.",
 "Bamako -8.0 12.64 *; Djenné -4.55 13.9 ~; Mopti -4.2 14.5; Bandiagara (Dogon) -3.6 14.35 ~; Timbuktu -3.0 16.77 ~+; Ouagadougou -1.52 12.37 *; Niamey 2.11 13.51 *; Agadez 7.99 16.97 ~","check");
s("aw","aw-capeverde","Cabo Verde","Optional island branch, by air.",
 "Praia -23.51 14.92 *; Mindelo -24.99 16.89; Santo Antão -25.1 17.05 ~");
})(GEP.stage);
