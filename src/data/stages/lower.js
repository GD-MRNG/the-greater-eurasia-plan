/**
 * Stages: the Lower arc (Singapore to the Gulf) and its branches.
 * One s(...) call per stage, along the route. See the schema in shared.js.
 * Depends on: shared.js (GEP.stage).  Exposes: nothing (registers stages).
 */
(function (s) {
s("lower","","Singapore and Malaysia","North by rail and road.",
 "Singapore 103.82 1.35 *; Johor Bahru 103.74 1.49 ~; Melaka 102.25 2.19; Kuala Lumpur 101.69 3.14 *; Cameron Highlands 101.37 4.47 ~; Ipoh 101.09 4.6; Penang 100.33 5.41 *; Langkawi 99.8 6.35 ~; Hat Yai 100.47 7.0");
s("lower","","Thailand: south to Bangkok","Islands, then the capital.",
 "Surat Thani 99.33 9.14; Koh Samui 100.06 9.5 ~; Hua Hin 99.96 12.57; Bangkok 100.5 13.75 *; Ayutthaya 100.57 14.35 ~; Nong Khai 102.74 17.88","Rail to Vientiane");
s("lower","","Laos: Vientiane to the China border","Down the Mekong and up the Laos–China railway.",
 "Vientiane 102.6 17.97 *; Vang Vieng 102.45 18.92; Luang Prabang 102.14 19.89 *; Kuang Si Falls 102.2 19.75 ~; Boten 101.69 21.17; Pakse 105.78 15.12 ~; Bolaven Plateau 106.2 15.1 ~; Si Phan Don 105.9 14.1 ~","Laos–China railway to Kunming");
s("lower","","Southern China: Kunming and southern Yunnan","The Yunnan capital and the way down to Vietnam.",
 "Jinghong 100.8 22.0 ~; Kunming 102.83 25.04 *; Stone Forest 103.3 24.8 ~; Yuanyang Terraces 102.75 23.1 ~; Hekou 103.97 22.5","Border crossing at Hekou to Lao Cai");
s("lower","","Vietnam: Hanoi to Saigon","The length of the country by the Reunification line.",
 "Hanoi 105.85 21.03 *; Ha Long Bay 107.07 20.95 ~; Sapa 103.84 22.34 ~; Ninh Binh 105.97 20.25 ~; Phong Nha 106.28 17.59 ~; Hue 107.59 16.46 *; Hoi An 108.33 15.88 *; Da Nang 108.2 16.05; Nha Trang 109.19 12.24; Da Lat 108.44 11.94; Saigon 106.7 10.78 *; Can Tho 105.78 10.04 ~");
s("lower","","Cambodia","Phnom Penh and Angkor.",
 "Phnom Penh 104.92 11.56 *; Kampot 104.18 10.61 ~; Battambang 103.2 13.1 ~; Siem Reap 103.86 13.36 *; Angkor Wat 103.87 13.41 ~","Fly west");
s("lower","","Myanmar","Pagodas and plains.",
 "Yangon 96.15 16.8 *; Bago 96.48 17.34 ~; Kyaiktiyo 97.1 17.48 ~; Bagan 94.86 21.17 *; Inle Lake 96.9 20.55 ~; Mandalay 96.08 21.97 +","Fly to India");
s("lower","","Bangladesh and Kolkata","Dhaka and the old capital of the Raj.",
 "Dhaka 90.41 23.81 *; Sundarbans 89.0 22.0 ~; Kolkata 88.36 22.57 *; Darjeeling 88.26 27.04 ~; Puri 85.83 19.8 ~");
s("lower","","India: Varanasi, Agra and Delhi","The Ganges plain and the Golden Triangle.",
 "Bodh Gaya 84.99 24.7 ~; Varanasi 83.0 25.32 *; Lucknow 80.95 26.85 ~; Agra 78.01 27.18 *; Delhi 77.2 28.6 *; Amritsar 74.87 31.63 *","Wagah crossing to Lahore");
s("lower","","Pakistan","Lahore, Islamabad and the hills.",
 "Wagah 74.57 31.6 ~; Lahore 74.34 31.55 *; Multan 71.47 30.2 ~; Karachi 67.0 24.86 ~; Taxila 72.83 33.75 ~; Islamabad 73.05 33.68 *","Iran, by air or overland");
s("lower","","Iran","Persian cities, gardens and ruins.",
 "Tehran 51.39 35.69 *; Kashan 51.45 33.98 ~; Isfahan 51.68 32.65 *; Yazd 54.37 31.9 *; Shiraz 52.53 29.59 *; Persepolis 52.89 29.93 ~; Bandar Abbas 56.27 27.19","On to the Gulf");
s("lower","","The Gulf states","Kuwait and Bahrain, then Qatar, the UAE and Oman.",
 "Kuwait City 47.98 29.38 *; Manama 50.59 26.23 *; Doha 51.53 25.29 *; Dubai 55.3 25.2 *; Abu Dhabi 54.37 24.45; Al Ain 55.76 24.2 ~; Muscat 58.4 23.59 *; Nizwa 57.53 22.93 ~; Wahiba Sands 58.8 22.4 ~; Salalah 54.1 17.02 ~","Jordan by air, or back to Istanbul");
s("lower","l-borneo","Borneo","Mountains and rainforest.",
 "Kuching 110.35 1.55 *; Brunei 114.94 4.89; Mount Kinabalu 116.56 6.08 ~; Kota Kinabalu 116.07 5.98 *");
s("lower","l-indonesia","Indonesia island branch","Sumatra to Bali, optional.",
 "Medan 98.67 3.6; Lake Toba 98.7 2.6 ~; Padang 100.35 -0.95; Jakarta 106.85 -6.2; Yogyakarta 110.37 -7.8 *; Borobudur 110.2 -7.6 ~; Mount Bromo 112.95 -7.94 ~; Ubud 115.26 -8.5 *; Komodo 119.5 -8.55 ~",
 "East of Bali continues on the Oceania page");
s("lower","l-phil","Philippines island branch","Optional island hopping.",
 "Palawan El Nido 119.4 11.18 ~; Cebu 123.9 10.3; Manila 120.98 14.6 *; Banaue 121.06 16.92 ~");
s("lower","l-andaman","Andaman coast","Thailand's west coast islands.",
 "Krabi 98.9 8.09; Phuket 98.39 7.88 *");
s("lower","l-north-thai","Northern Thailand and the slow boat","Temples, then the two-day Mekong slow boat into Laos.",
 "Sukhothai 99.82 17.0 ~; Chiang Mai 98.99 18.79 *; Chiang Rai 99.83 19.91; Huay Xai 100.42 20.27 *; Pakbeng 101.1 19.9 ~");
s("lower","l-yunnan","West Yunnan and Sichuan","Old towns and gorges, out to Chengdu.",
 "Dali 100.23 25.6 *; Lijiang 100.23 26.87 *; Tiger Leaping Gorge 100.1 27.2 ~; Shangri-La 99.7 27.83; Chengdu 104.07 30.67 *; Leshan Giant Buddha 103.77 29.55 ~; Chongqing 106.55 29.56 ~");
s("lower","l-south-china","Guangxi, Guangdong and Hong Kong","Karst country and the south coast.",
 "Nanning 108.37 22.82; Guilin 110.29 25.27 *; Yangshuo 110.5 24.78 ~; Zhangjiajie 110.48 29.12 ~; Guangzhou 113.26 23.13; Macau 113.54 22.19 *; Hong Kong 114.17 22.32 *");
s("lower","l-rajasthan","Rajasthan loop","Forts, palaces and desert.",
 "Jaipur 75.79 26.91 *; Pushkar 74.55 26.49 ~; Jodhpur 73.02 26.3; Udaipur 73.7 24.58 *; Jaisalmer 70.92 26.92 ~");
s("lower","l-himalaya","Himalayan India","Hills and high passes.",
 "Rishikesh 78.27 30.09; Shimla 77.17 31.1; Dharamshala 76.32 32.22 ~; Manali 77.19 32.24; Leh 77.58 34.15 *");
s("lower","l-south-india","West and South India","Mumbai down to Kerala and Chennai.",
 "Mumbai 72.88 19.08 *; Goa 73.83 15.5 +; Hampi 76.46 15.34 ~; Kochi 76.27 9.97 *; Alleppey 76.33 9.5 ~; Madurai 78.12 9.92; Chennai 80.27 13.08 *");
s("lower","l-srilanka","Sri Lanka","The teardrop island.",
 "Colombo 79.86 6.93 *; Sigiriya 80.76 7.96 ~; Kandy 80.63 7.29; Ella 81.05 6.87 ~; Galle 80.22 6.03; Jaffna 80.0 9.66 ~");
s("lower","l-nepal","Nepal","Kathmandu, Pokhara and the Himalaya.",
 "Lumbini 83.28 27.47 ~; Chitwan 84.4 27.5 ~; Pokhara 83.99 28.21 *; Kathmandu 85.32 27.72 *; Everest Base Camp trek 86.85 28.0 ~");
s("lower","l-nw-iran","Northwest Iran and the Caucasus link","Tabriz and the road to the Caucasus.",
 "Tabriz 46.29 38.08 *; Kandovan 46.2 37.8 ~; Jolfa 45.63 38.95");
s("lower","l-levant","Levant: Jordan","Petra, Wadi Rum and the Dead Sea.",
 "Amman 35.93 31.95 *; Jerash 35.9 32.28 ~; Dead Sea 35.5 31.5 ~; Petra 35.44 30.33 *; Wadi Rum 35.42 29.58 ~; Aqaba 35.0 29.53 +","Aqaba to Nuweiba ferry into Egypt");
s("lower","l-levant","Israel and Palestine","Cities and towns from the Gulf of Aqaba to the Mediterranean.",
 "Eilat 34.95 29.56; Jerusalem 35.21 31.78 *; Bethlehem 35.2 31.7; Hebron 35.1 31.53 ~; Jericho 35.46 31.86 ~; Ramallah 35.21 31.9 *; Nablus 35.26 32.22 ~; Nazareth 35.3 32.7 ~; Haifa 34.99 32.82; Acre 35.08 32.93 ~; Tel Aviv 34.78 32.08 *; Gaza 34.47 31.5 ~*");
s("lower","l-levant","Lebanon","The coast and the Bekaa.",
 "Beirut 35.5 33.89 *; Byblos 35.65 34.12; Tripoli (Lebanon) 35.84 34.44; Baalbek 36.2 34.01 *; Tyre 35.2 33.27 ~");
s("lower","l-levant","Syria","Damascus, Aleppo and the desert cities.",
 "Damascus 36.28 33.51 *; Bosra 36.48 32.52 ~; Homs 36.72 34.73; Palmyra 38.27 34.56 *; Aleppo 37.16 36.2 *; Latakia 35.78 35.53 ~");
s("lower","l-levant","Iraq","The Tigris and Euphrates, from Baghdad to the north and the south.",
 "Baghdad 44.37 33.32 *; Babylon 44.42 32.54 ~; Najaf 44.33 32.0; Karbala 44.02 32.62 ~; Basra 47.78 30.51; Erbil 44.01 36.19 *; Mosul 43.14 36.34; Samarra 43.87 34.2 ~");
s("lower","l-bhutan","Bhutan","From the plains up into the valleys.",
 "Phuentsholing 89.39 26.86; Paro 89.42 27.43 *; Thimphu 89.64 27.47 *; Punakha 89.87 27.59; Trongsa 90.51 27.5 ~");
s("lower","l-maldives","Maldives","The atolls south-west of Sri Lanka.",
 "Malé 73.51 4.18 *; Maafushi 73.49 3.94 ~; Hithadhoo 73.08 -0.6");
s("lower","l-arabia","Saudi Arabia","The Gulf coast, the capital and the western cities.",
 "Dammam 50.1 26.43; Riyadh 46.72 24.69 *; AlUla 37.92 26.62 *; Medina 39.61 24.47; Jeddah 39.17 21.54 *; Mecca 39.83 21.42; Abha 42.51 18.22 ~");
s("lower","l-yemen","Yemen","The south coast, the highlands and Socotra.",
 "Mukalla 49.1 14.54; Shibam 48.63 15.93 ~; Socotra 54.02 12.65 ~; Aden 45.03 12.79 *; Sana'a 44.21 15.35 *; Al Hudaydah 42.95 14.8");
})(GEP.stage);
