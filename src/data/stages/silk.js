/**
 * Stages: the Modern Silk Road arc (Xi'an to Istanbul) and its branches.
 * One s(...) call per stage, along the route. See the schema in shared.js.
 * Depends on: shared.js (GEP.stage).  Exposes: nothing (registers stages).
 */
(function (s) {
s("silk","","China: Xi'an to Lanzhou","The eastern anchor of the modern corridor, and the old capital.",
 "Xi'an 108.94 34.34 *^; Terracotta Army 109.27 34.38 ~; Tianshui 105.7 34.58 ~; Lanzhou 103.83 36.06 +; Labrang Monastery 102.5 35.2 ~; Zhangye 100.45 38.93; Danxia Landform 100.1 38.9 ~");
s("silk","","China: the Hexi Corridor to Xinjiang","Gansu's desert corridor, then Xinjiang, where the rail and road links to Central Asia begin.",
 "Jiayuguan 98.28 39.77 +; Dunhuang 94.66 40.14 *; Mogao Caves 94.8 40.04 ~; Turpan 89.19 42.95; Urumqi 87.6 43.82 *^; Heavenly Lake 88.13 43.88 ~; Alashankou 82.57 45.17 ~+^; Khorgos 80.4 44.2 *^","Rail dry port at Khorgos, then into Kazakhstan");
s("silk","","Kazakhstan: Almaty and the southeast","The modern hub of Central Asia, with canyons and lakes nearby.",
 "Almaty 76.95 43.24 *^; Charyn Canyon 79.1 43.35 ~; Kolsay Lakes 78.3 42.9 ~; Medeu 77.06 43.16 ~");
s("silk","","Kyrgyzstan: Bishkek to Osh","Mountains, lakes and yurts on the way to the Fergana side.",
 "Bishkek 74.6 42.87 *; Burana Tower 75.25 42.74 ~; Cholpon-Ata 77.0 42.65 ~; Issyk-Kul 77.5 42.45 ~; Karakol 78.4 42.49 ~; Kochkor 75.8 42.2; Song-Kol 75.1 41.8 ~; Naryn 76.0 41.43 +; Osh 72.8 40.53 *");
s("silk","","Uzbekistan: Fergana and Tashkent","Down the Fergana Valley into Central Asia's biggest hub.",
 "Fergana 71.78 40.38; Kokand 70.94 40.53 ~; Tashkent 69.24 41.3 *^");
s("silk","","Uzbekistan: Samarkand, Bukhara and Khiva","The old Silk Road cities, linked today by high-speed rail.",
 "Samarkand 66.96 39.65 *; Shakhrisabz 66.83 39.05 ~; Bukhara 64.42 39.77 *; Khiva 60.36 41.38 *; Nukus 59.6 42.46 +");
s("silk","","Aral Sea and Aktau: the Caspian gateway","Across the western Kazakh desert to the Middle Corridor port.",
 "Moynaq 59.0 43.77 ~; Beyneu 55.2 45.3; Aktau 51.2 43.65 *^","Cross the Caspian to Baku (cargo ferry or fly)");
s("silk","","Azerbaijan: Baku","The Caspian port at the other end of the Middle Corridor.",
 "Baku 49.87 40.41 *^; Gobustan 49.4 40.1 ~; Sheki 47.19 41.19 ~; Ganja 46.36 40.68 +");
s("silk","","Georgia: Tbilisi to Batumi","Wine, mountains and the Black Sea.",
 "Tbilisi 44.8 41.72 *^; Mtskheta 44.72 41.84 ~; Kazbegi 44.64 42.66 ~; Sighnaghi 45.92 41.62 ~; Kutaisi 42.7 42.25; Mestia 42.73 43.05 ~; Batumi 41.64 41.65 +; Sukhumi 41.02 43.0 ~","On to Kars on the Baku–Tbilisi–Kars rail corridor, by train where it runs or by road");
s("silk","","Türkiye: Kars to Cappadocia","Eastern Anatolia and the heart of the plateau.",
 "Kars 43.1 40.6 *^; Ani 43.57 40.51 ~; Doğubayazıt 44.08 39.55 ~; Erzurum 41.27 39.9; Sivas 37.02 39.75; Göreme 34.83 38.64 *");
s("silk","","Türkiye: Ankara and Istanbul","Through the capital to Istanbul, where Marmaray crosses under the Bosphorus into Europe.",
 "Ankara 32.85 39.93 +; Istanbul 28.98 41.01 *^","Marmaray rail tunnel to Europe, then the Balkans or Greece");
s("silk","s-kkh","Karakoram Highway and the CPEC link","From Kashgar over the Khunjerab Pass to Pakistan. The pass is seasonal.",
 "Korla 86.15 41.77; Kuqa 82.96 41.72; Aksu 80.26 41.17; Kashgar 75.99 39.47 *^; Tashkurgan 75.23 37.77 +; Khunjerab Pass 75.42 36.85 *; Sost 74.8 36.7 ~; Karimabad 74.66 36.32 *; Gilgit 74.3 35.92");
s("silk","s-irkeshtam","Kashgar to Osh via Irkeshtam","A road crossing into Kyrgyzstan. A rail link between the three countries has been in the works; until then it is road.",
 "Irkeshtam Pass 73.9 39.7 *; Sary-Tash 73.3 39.73 +");
s("silk","s-pamir","Pamir Highway","One of the great road journeys: Sary-Tash to Dushanbe.",
 "Karakul 73.55 39.0 ~; Murghab 73.96 38.17 *; Wakhan Valley 72.7 37.0 ~; Khorog 71.55 37.49 *; Kalaikhum 70.8 38.45; Dushanbe 68.78 38.56 *; Iskanderkul 68.37 39.07 ~; Penjikent 67.6 39.5 +");
s("silk","s-trans-kaz","Trans-Kazakh rail line","The northern rail route from Tashkent to the Caspian.",
 "Shymkent 69.6 42.3; Turkistan 68.25 43.3 +; Kyzylorda 65.5 44.85; Aralsk 61.67 46.8");
s("silk","s-astana","Kazakh heartland: Astana","The new capital and the steppe.",
 "Karaganda 73.1 49.8; Astana 71.43 51.17 *^; Burabay 70.3 53.1 ~");
s("silk","s-turkmen","Turkmenistan branch","Desert gate, Merv and the Turkmenbashi port on the Caspian.",
 "Konye-Urgench 59.15 42.32; Darvaza 58.4 40.25 *; Ashgabat 58.38 37.95 *; Nisa 58.2 37.97 ~; Merv 62.18 37.66 ~; Turkmenbashi 52.97 40.02 *^");
s("silk","s-armenia","Armenia loop","A loop out of Tbilisi through the lake and the south.",
 "Dilijan 44.86 40.74 ~; Lake Sevan 45.0 40.55 ~; Yerevan 44.51 40.18 *; Garni and Geghard 44.73 40.11 ~; Echmiadzin 44.29 40.16 ~; Tatev 46.25 39.38 ~; Gyumri 43.85 40.79");
s("silk","s-black-sea","Black Sea Türkiye","Mountain monasteries and the northern coast.",
 "Trabzon 39.72 41.0 *; Sumela Monastery 39.66 40.69 ~; Amasya 35.83 40.65; Safranbolu 32.69 41.25 +; Amasra 32.39 41.75 ~");
s("silk","s-southeast","Southeast Türkiye","Mosaics, Göbekli Tepe and Nemrut.",
 "Gaziantep 37.38 37.07 +; Mount Nemrut 38.74 37.98 ~; Şanlıurfa 38.79 37.16; Göbekli Tepe 38.92 37.22 ~; Mardin 40.74 37.31 *; Diyarbakır 40.22 37.91; Van 43.38 38.5 +");
s("silk","s-aegean","Aegean and Mediterranean Türkiye","Troy, Ephesus and the turquoise coast.",
 "Gallipoli 26.35 40.4 ~; Çanakkale 26.4 40.15; Troy 26.24 39.96 ~; İzmir 27.14 38.42 +; Ephesus 27.34 37.94 ~; Pamukkale 29.12 37.92 ~; Bodrum 27.43 37.04; Antalya 30.7 36.9 *");
s("silk","s-afghan","Afghanistan","Across the Amu Darya and through the Hindu Kush.",
 "Termez 67.28 37.22 +; Mazar-i-Sharif 67.11 36.71 *; Balkh 66.9 36.76 ~; Herat 62.2 34.34 ~*; Bamiyan 67.82 34.82; Kabul 69.17 34.53 *; Kandahar 65.72 31.61 ~; Jalalabad 70.45 34.43");
s("silk","s-cyprus","Cyprus","The island south of Anatolia.",
 "Paphos 32.42 34.76 *; Limassol 33.04 34.68; Nicosia 33.36 35.17 *; Kyrenia 33.32 35.34; Famagusta 33.94 35.12");
})(GEP.stage);
