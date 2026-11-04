/**
 * Stages: Europe, where the arcs meet (St Petersburg to Lisbon) and its branches.
 * One s(...) call per stage, in travel order. See the schema in shared.js.
 * Depends on: shared.js (GEP.stage).  Exposes: nothing (registers stages).
 */
(function (s) {
s("europe","","Finland and the Baltics","Where the upper arc arrives, by Helsinki and the ferry across.",
 "Helsinki 24.94 60.17 *; Tallinn 24.75 59.44 *; Pärnu 24.5 58.38 ~; Riga 24.1 56.95 *; Vilnius 25.28 54.69 *; Trakai 24.93 54.65 ~; Kaunas 23.9 54.9 ~; Curonian Spit 21.0 55.3 ~");
s("europe","","Poland","Warsaw and the old Hanseatic and royal cities.",
 "Białowieża 23.87 52.7 ~; Warsaw 21.01 52.23 *; Gdańsk 18.65 54.35 ~+; Poznań 16.93 52.41; Wrocław 17.04 51.11 ~; Kraków 19.94 50.06 ~+; Zakopane 19.95 49.3 ~");
s("europe","","Germany","Berlin west to the Rhine.",
 "Berlin 13.4 52.52 *; Hannover 9.73 52.37; Cologne 6.96 50.94 *; Rhine Valley 7.77 50.06 ~; Heidelberg 8.69 49.4 ~; Frankfurt 8.68 50.11 ~; Hamburg 9.99 53.55 ~+; Leipzig 12.37 51.34 ~");
s("europe","","Netherlands and Belgium","Canals, art cities and the rail hub of the west.",
 "Amsterdam 4.9 52.37 *; Rotterdam 4.48 51.92; Antwerp 4.4 51.22 ~; Bruges 3.22 51.21 ~; Brussels 4.35 50.85 *; Luxembourg 6.13 49.61 ~");
s("europe","","France: Paris to Bordeaux","The big one in the middle, then the Atlantic side.",
 "Paris 2.35 48.86 *; Rouen 1.1 49.44 ~; Mont-Saint-Michel -1.51 48.64 ~; Tours 0.69 47.39; Bordeaux -0.58 44.84 *; Biarritz -1.56 43.48 ~; Strasbourg 7.75 48.57 ~; Chamonix 6.87 45.92 ~");
s("europe","","Basque Country, Galicia and Portugal","Along the Atlantic edge to the westernmost point of mainland Europe.",
 "San Sebastián -1.98 43.32; Bilbao -2.93 43.26 *; Santiago de Compostela -8.54 42.88 *; Porto -8.61 41.15 *; Lisbon -9.14 38.72 *; Sintra -9.39 38.8 ~; Cabo da Roca -9.5 38.78 ~; Évora -7.91 38.57 ~; Lagos -8.67 37.1 ~; Sagres -8.94 37.0 ~","","The Atlantic end of the line");
s("europe","e-andalusia","Madrid and Andalusia","From the capital to the south coast, with Tarifa the way to Morocco.",
 "Burgos -3.7 42.34 ~; Madrid -3.7 40.42 *; Segovia -4.12 40.95 ~; Toledo -4.02 39.86 ~; Córdoba -4.78 37.89; Seville -5.98 37.39 *; Granada -3.6 37.18 *; Málaga -4.42 36.72; Ronda -5.17 36.74 ~; Tarifa -5.6 36.01 *","","Ferry to Tangier");
s("europe","e-med","Rhône, Provence and the Spanish Mediterranean","South from Paris to the sea and on to Barcelona and Valencia.",
 "Lyon 4.83 45.76 *; Avignon 4.81 43.95 ~; Marseille 5.37 43.3 *; Barcelona 2.17 41.39 *; Valencia -0.38 39.47");
s("europe","e-it-north","Riviera and northern Italy","The coast, Milan and the lakes, then Venice and Trieste.",
 "Nice 7.27 43.7; Genoa 8.93 44.41 *; Milan 9.19 45.46 *; Lake Como 9.26 46.0 ~; Verona 10.99 45.44; Venice 12.33 45.44 *; Dolomites 12.14 46.54 ~; Trieste 13.77 45.65 +");
s("europe","e-it-south","Tuscany, Rome and the south","The classic Italian line, then across to Sicily.",
 "Cinque Terre 9.7 44.13 ~; Pisa 10.4 43.72 ~; Florence 11.25 43.77 *; Siena 11.33 43.32 ~; Rome 12.5 41.9 *; Naples 14.27 40.85 *; Pompeii 14.49 40.75 ~; Amalfi 14.6 40.63 ~; Palermo 13.36 38.12 *; Mount Etna 15.0 37.75 ~; Syracuse 15.29 37.08 ~");
s("europe","e-swiss","Switzerland and the Alps","Lakes, trains and big peaks.",
 "Geneva 6.14 46.2 *; Lausanne 6.63 46.52 ~; Zermatt 7.75 46.02 ~; Bern 7.45 46.95; Interlaken 7.86 46.69 ~; Lucerne 8.31 47.05 *; Lugano 8.95 46.0 ~; Zurich 8.54 47.38 *");
s("europe","e-bavaria","Bavaria and Austria","Munich, the Salzkammergut and Vienna.",
 "Munich 11.58 48.14 *; Innsbruck 11.39 47.26 ~; Salzburg 13.04 47.8 *; Hallstatt 13.65 47.56 ~; Vienna 16.37 48.21 *");
s("europe","e-central","Czechia, Slovakia and Hungary","Central Europe's cities.",
 "Dresden 13.74 51.05; Prague 14.42 50.09 *; Český Krumlov 14.32 48.81 ~; Bratislava 17.11 48.15; Budapest 19.04 47.5 *");
s("europe","e-romania","Romania and the Danube","Transylvania and the Black Sea side.",
 "Cluj 23.6 46.77; Sighișoara 24.79 46.22 ~; Sibiu 24.15 45.8; Brașov 25.6 45.65 *; Bucharest 26.1 44.43 *; Danube Delta 28.8 45.18 ~; Constanța 28.65 44.18 ~; Veliko Tarnovo 25.65 43.08 ~");
s("europe","e-balkans","Bulgaria and Serbia","From Istanbul through the Balkans.",
 "Plovdiv 24.75 42.15; Rila Monastery 23.34 42.13 ~; Sofia 23.32 42.7 *; Niš 21.9 43.32; Belgrade 20.46 44.82 *; Novi Sad 19.84 45.25 ~");
s("europe","e-balkans","Bosnia, Montenegro, Croatia and Slovenia","The Adriatic side.",
 "Sarajevo 18.41 43.86 *; Mostar 17.81 43.34 ~; Dubrovnik 18.09 42.65 *; Kotor 18.77 42.43 ~; Split 16.44 43.51 *; Plitvice Lakes 15.6 44.88 ~; Zagreb 15.98 45.81 *; Lake Bled 14.1 46.37 ~; Ljubljana 14.51 46.05 *");
s("europe","e-sw-balkans","Albania, North Macedonia and Kosovo","The quieter Balkans, then across to Greece.",
 "Skopje 21.43 42.0 *; Prishtina 21.17 42.67 ~; Ohrid 20.8 41.12 *; Tirana 19.82 41.33 *; Shkodër 19.51 42.07 ~; Berat 19.95 40.7 ~; Gjirokastër 20.14 40.08 ~");
s("europe","e-greece","Greece: north and Meteora","Overland in from Türkiye, or down from the Balkans.",
 "Alexandroupoli 25.88 40.85 ~; Kavala 24.4 40.94; Thessaloniki 22.94 40.64 *; Mount Olympus 22.35 40.09 ~; Meteora 21.63 39.72 *; Ioannina 20.85 39.67; Delphi 22.5 38.48 *");
s("europe","e-greece","Greece: Athens and the Peloponnese","Ancient Greece, in order.",
 "Athens 23.73 37.98 *; Mycenae 22.76 37.73 ~; Nafplio 22.8 37.57; Monemvasia 23.04 36.69 ~; Mystras 22.37 37.07 ~; Olympia 21.63 37.64 *; Patras 21.73 38.25");
s("europe","e-isles","Greek islands","Cyclades to Crete, plus Rhodes.",
 "Mykonos 25.33 37.45; Naxos 25.38 37.1 ~; Santorini 25.43 36.39 *; Heraklion 25.14 35.34 *; Rhodes 28.23 36.43 ~");
s("europe","e-uk","England and Wales","By Eurostar from Brussels or Paris.",
 "London -0.13 51.51 *; Canterbury 1.08 51.28 ~; Oxford -1.26 51.75; Bath -2.36 51.38 ~; St Ives -5.48 50.21 ~; Cardiff -3.18 51.48; Snowdonia -4.0 53.07 ~; Liverpool -2.98 53.4; Lake District -2.9 54.38 ~; York -1.08 53.96 *");
s("europe","e-uk","Scotland and Ireland","Up to the Highlands, then by ferry to Ireland.",
 "Edinburgh -3.19 55.95 *; Inverness -4.22 57.48 ~; Isle of Skye -6.2 57.3 ~; Belfast -5.93 54.6; Dublin -6.26 53.35 *; Galway -9.05 53.27; Killarney -9.5 52.06 ~; Cork -8.47 51.9");
s("europe","e-nordics","Sweden, Norway and Lapland","Ferry from Helsinki to Stockholm, then the fjords and the Arctic.",
 "Stockholm 18.07 59.33 *; Oslo 10.75 59.91 *; Bergen 5.32 60.39 *; Flåm 7.11 60.86 ~; Geirangerfjord 7.2 62.1 ~; Trondheim 10.4 63.43; Bodø 14.4 67.28; Lofoten 14.57 68.23 *; Tromsø 18.96 69.65 *; North Cape 25.78 71.17 ~; Rovaniemi 25.73 66.5 *");
s("europe","e-denmark","Denmark and Gothenburg","Over the Øresund to the Swedish west coast.",
 "Odense 10.39 55.4 ~; Copenhagen 12.57 55.68 *; Aarhus 10.2 56.16 ~; Malmö 13.0 55.6; Gothenburg 11.97 57.71 *");
})(GEP.stage);
