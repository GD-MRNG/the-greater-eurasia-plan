/**
 * Stages: the Upper arc (Japan, Korea, China, Mongolia, Russia).
 * One s(...) call per stage, along the route. See the schema in shared.js.
 * Depends on: shared.js (GEP.stage).  Exposes: nothing (registers stages).
 */
(function (s) {
s("upper","","Japan: Tokyo to Hiroshima","Rail south through the old capitals.",
 "Tokyo 139.7 35.7 *; Nikko 139.6 36.75 ~; Kamakura 139.55 35.32 ~; Hakone 139.02 35.23 ~; Mount Fuji 138.73 35.36 ~; Nagoya 136.9 35.18 +; Kyoto 135.77 35.01 *; Nara 135.8 34.69 ~; Osaka 135.5 34.69 +; Himeji 134.69 34.82; Okayama 133.92 34.66; Hiroshima 132.46 34.39 *; Miyajima 132.32 34.3 ~","Continue to Kyushu");
s("upper","","Japan: Kyushu and the ferry out","Down to Fukuoka, then the ferry to Busan.",
 "Fukuoka 130.4 33.59 *; Nagasaki 129.88 32.75 ~; Kumamoto 130.74 32.8 ~; Mount Aso 131.1 32.88 ~; Beppu 131.5 33.28 ~; Kagoshima 130.56 31.6 ~; Naha (Okinawa) 127.68 26.21 ~","Ferry from Fukuoka to Busan");
s("upper","u-hokkaido","Tohoku and Hokkaido","Temples, volcanoes and the north.",
 "Sendai 140.87 38.27; Matsushima 141.06 38.37 ~; Hiraizumi 141.1 39.0 ~; Aomori 140.74 40.82; Hakodate 140.73 41.77 +; Sapporo 141.35 43.06 *; Otaru 141.0 43.19 ~; Asahikawa 142.37 43.77; Shiretoko 145.2 44.1 ~");
s("upper","u-alps","Japan Alps and Kanazawa","The mountain route between Nagoya and Kyoto.",
 "Matsumoto 137.97 36.24; Kamikochi 137.64 36.25 ~; Takayama 137.25 36.14 +; Shirakawa-go 136.9 36.26 ~; Kanazawa 136.65 36.56 *");
s("upper","u-shikoku","Shikoku and the Seto Inland Sea","Art islands and pilgrimage country.",
 "Takamatsu 134.05 34.34; Naoshima 133.99 34.46 ~; Matsuyama 132.77 33.84 +; Shimanami Kaido 133.1 34.25 ~");
s("upper","","South Korea: Busan to Seoul","Land at Busan, then north through the old kingdom of Silla.",
 "Busan 129.07 35.18 *; Gyeongju 129.21 35.84 *; Andong 128.73 36.57 ~; Daegu 128.6 35.87; Haeinsa 128.1 35.8 ~; Daejeon 127.38 36.35; Suwon 127.0 37.26 ~; Seoul 126.98 37.57 *; DMZ 126.68 37.96 ~; Incheon 126.7 37.46 ~","Fly or ferry to China");
s("upper","u-korea-east","Korea's east coast","Mountains and sea between Seoul and Gyeongju.",
 "Sokcho 128.59 38.2 +; Seoraksan 128.47 38.12 ~; Gangneung 128.9 37.75; Samcheok 129.17 37.45; Pohang 129.37 36.03");
s("upper","u-korea-sw","Southwest Korea and Jeju","Food capital, tea fields and the island.",
 "Jeonju 127.15 35.82; Gwangju 126.85 35.16; Suncheon 127.49 34.95 ~; Mokpo 126.39 34.81; Jeju 126.53 33.5 *; Seogwipo 126.56 33.25 ~");
s("upper","u-north-korea","North Korea","Pyongyang and the cities up the peninsula.",
 "Kaesong 126.56 37.97; Pyongyang 125.75 39.02 *; Nampo 125.41 38.74 ~; Wonsan 127.44 39.15; Mount Kumgang 128.32 38.66 ~; Hamhung 127.54 39.92; Chongjin 129.78 41.79; Sinuiju 124.4 40.1 ~");
s("upper","u-taiwan","Taiwan","The island's cities, from the north down the west coast.",
 "Taipei 121.57 25.03 *; Jiufen 121.84 25.11 ~; Taroko 121.62 24.16 ~; Hualien 121.61 23.98 ~; Taichung 120.68 24.15; Tainan 120.2 23.0; Kaohsiung 120.3 22.63 *; Kenting 120.8 21.95 ~");
s("upper","","Northern China: Beijing and the Great Wall","Over to Beijing, then the Trans-Mongolian line north.",
 "Tianjin 117.2 39.1 ~; Beijing 116.4 39.9 *; Mutianyu Great Wall 116.57 40.43 ~; Chengde 117.94 40.97 ~; Datong 113.3 40.08 +; Yungang Grottoes 113.13 40.11 ~; Hohhot 111.67 40.84 ~; Erenhot 111.98 43.65","Train to Ulaanbaatar");
s("upper","u-northeast","Northeast China","Old Manchuria, ice and Russian echoes.",
 "Shenyang 123.43 41.8; Dalian 121.6 38.9 ~; Changchun 125.3 43.88; Harbin 126.64 45.75 *");
s("upper","","Mongolia: Ulaanbaatar and the north line","Steppe, gers and the rail line to Russia.",
 "Sainshand 110.1 44.89; Ulaanbaatar 106.9 47.92 *; Terelj 107.5 47.98 ~; Darkhan 105.97 49.49; Sükhbaatar 106.2 50.23","Rail on to Ulan-Ude in Russia");
s("upper","u-gobi","Gobi and central Mongolia","Karakorum, dunes and flaming cliffs.",
 "Kharkhorin 102.84 47.2 +; Dalanzadgad 104.42 43.57; Yolyn Am 104.1 43.5 ~; Bayanzag 103.7 44.14 ~; Khongoryn Els 102.3 43.77 ~");
s("upper","u-khovsgol","Khövsgöl and the north","Mongolia's great blue lake.",
 "Erdenet 104.1 49.03; Mörön 100.15 49.64; Lake Khövsgöl 100.2 51.0 *");
s("upper","u-mn-west","Western Mongolia and the Altai","Eagle hunters and the far west.",
 "Ölgii 89.97 48.97 *; Khovd 91.64 48.0; Tavan Bogd 87.8 49.1 ~");
s("upper","","Russia: Buryatia and Lake Baikal","Into Siberia and the deepest lake on Earth.",
 "Ulan-Ude 107.6 51.83 *; Ivolginsky Datsan 107.2 51.7 ~; Listvyanka 104.87 51.87 ~; Irkutsk 104.28 52.29 *; Olkhon Island 107.34 53.2 ~");
s("upper","","Russia: Krasnoyarsk to Omsk","The long Siberian middle.",
 "Krasnoyarsk 92.87 56.01 *; Stolby Reserve 92.77 55.9 ~; Tomsk 84.95 56.5 ~; Novosibirsk 82.92 55.03 *; Omsk 73.37 54.99");
s("upper","","Russia: the Urals and the Volga","Across the Europe–Asia line to Kazan.",
 "Tyumen 65.53 57.15; Yekaterinburg 60.6 56.84 *; Europe-Asia obelisk 60.0 56.9 ~; Perm 56.25 58.01; Kazan 49.1 55.8 *; Nizhny Novgorod 44.0 56.33 +");
s("upper","","Russia: Moscow and the Golden Ring","The capital and the old towns around it.",
 "Vladimir 40.4 56.13 ~; Suzdal 40.43 56.42 ~; Sergiev Posad 38.13 56.3 ~; Moscow 37.62 55.75 *");
s("upper","","Russia: Tver, Novgorod and St Petersburg","The imperial end of the line.",
 "Tver 35.9 56.86; Veliky Novgorod 31.27 58.52 ~; St Petersburg 30.32 59.94 *; Vyborg 28.75 60.7 ~","Overland to Finland or the Baltics");
s("upper","u-far-east","Russian Far East","The east end of the Trans-Siberian and the Pacific side.",
 "Suifenhe 131.15 44.4 ~; Vladivostok 131.9 43.12 *; Ussuriysk 131.95 43.8 ~; Khabarovsk 135.08 48.48 *; Birobidzhan 132.9 48.8; Chita 113.5 52.03");
s("upper","u-karelia","Karelia, Kola and Murmansk","Wooden churches, White Sea and the Arctic.",
 "Petrozavodsk 34.35 61.79; Kizhi Island 35.22 62.07 ~; Solovetsky Islands 35.7 65.0 ~; Murmansk 33.08 68.97 *; Teriberka 35.12 69.2 ~");
s("upper","u-altai","Altai and Sayan","Mountains in southern Siberia.",
 "Barnaul 83.77 53.35; Gorno-Altaysk 85.96 51.96; Chemal 86.0 51.4 ~; Belukha 86.6 49.8 ~");
s("upper","u-volga","Volga and the south","Down the river to the Caspian.",
 "Ulyanovsk 48.4 54.3 ~; Samara 50.1 53.2; Saratov 46.0 51.5; Volgograd 44.5 48.7 *; Astrakhan 48.05 46.35");
})(GEP.stage);
