#!/usr/bin/env node
/**
 * check-data.js: sanity-checks the data files without a browser.
 *
 * Loads shared.js, every data file (in the order listed in index.html) and model.js
 * inside a sandbox with no DOM, then runs GEP.model.validate(): unknown arcs or branches,
 * missing "from"/"to" stops, unparseable stop strings, branches without stages,
 * and any country or territory in COVERAGE that has none of its stops.
 *
 * Usage:  node tools/check-data.js     (exit code 1 when problems are found)
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const files = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1])
  .filter(f => f.startsWith("src/data/") || f === "src/js/shared.js" || f === "src/js/model.js");

const sandbox = {console};
vm.createContext(sandbox);
files.forEach(file => vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, {filename: file}));

const GEP = vm.runInContext("GEP", sandbox);
const problems = GEP.model.validate();
const {stages, arcs, branches, tabs} = GEP.data;

/**
 * Countries and notable territories each tab must draw.
 *
 * The map aims to include every sovereign state in the area a tab covers,
 * plus notable territories in that same area (islands, enclaves, and other
 * places commonly shown as their own destination). Whether to go anywhere
 * is a separate, personal decision. This list only checks that the place
 * has a stop. It does not record advice or a political status.
 *
 * A place is covered when at least one of its stop names exists, matched
 * exactly. Pick a name that cannot be satisfied by a different place:
 * "Niamey" for Niger (not Nigeria), "Conakry" for Guinea (not Guinea-Bissau
 * or Papua New Guinea), "Roseau" for Dominica (not the Dominican Republic),
 * "Khartoum" for Sudan (not South Sudan), "Tel Aviv" for Israel and
 * "Ramallah" for Palestine.
 *
 * c(name, stop, stop, ...) — add a line when you add a country, and rename
 * the stop here if you rename it in the stage file.
 */
function c(name, ...stops) { return {name, stops}; }
const COVERAGE = {
  eurasia: [
    /* Europe, including the microstates and nearby islands */
    c("Albania", "Tirana"),
    c("Andorra", "Andorra la Vella"),
    c("Austria", "Vienna"),
    c("Belarus", "Minsk"),
    c("Belgium", "Brussels"),
    c("Bosnia and Herzegovina", "Sarajevo"),
    c("Bulgaria", "Sofia"),
    c("Croatia", "Zagreb"),
    c("Cyprus", "Nicosia"),
    c("Czechia", "Prague"),
    c("Denmark", "Copenhagen"),
    c("Estonia", "Tallinn"),
    c("Faroe Islands", "Tórshavn"),
    c("Finland", "Helsinki"),
    c("France", "Paris"),
    c("Germany", "Berlin"),
    c("Gibraltar", "Gibraltar"),
    c("Greece", "Athens"),
    c("Guernsey", "Saint Peter Port"),
    c("Hungary", "Budapest"),
    c("Iceland", "Reykjavík"),
    c("Ireland", "Dublin"),
    c("Isle of Man", "Douglas"),
    c("Italy", "Rome"),
    c("Jersey", "Saint Helier"),
    c("Kosovo", "Prishtina"),
    c("Latvia", "Riga"),
    c("Liechtenstein", "Vaduz"),
    c("Lithuania", "Vilnius"),
    c("Luxembourg", "Luxembourg"),
    c("Malta", "Valletta"),
    c("Moldova", "Chișinău"),
    c("Monaco", "Monaco"),
    c("Montenegro", "Kotor"),
    c("Netherlands", "Amsterdam"),
    c("North Macedonia", "Skopje"),
    c("Norway", "Oslo"),
    c("Poland", "Warsaw"),
    c("Portugal", "Lisbon"),
    c("Romania", "Bucharest"),
    c("Russia", "Moscow"),
    c("San Marino", "San Marino"),
    c("Serbia", "Belgrade"),
    c("Slovakia", "Bratislava"),
    c("Slovenia", "Ljubljana"),
    c("Spain", "Madrid"),
    c("Sweden", "Stockholm"),
    c("Switzerland", "Zurich"),
    c("Ukraine", "Kyiv"),
    c("United Kingdom", "London"),
    c("Vatican City", "Vatican City"),
    /* Caucasus, Central Asia, the Middle East, South and East Asia */
    c("Afghanistan", "Kabul"),
    c("Armenia", "Yerevan"),
    c("Azerbaijan", "Baku"),
    c("Bahrain", "Manama"),
    c("Bangladesh", "Dhaka"),
    c("Bhutan", "Thimphu"),
    c("Brunei", "Brunei"),
    c("Cambodia", "Phnom Penh"),
    c("China", "Beijing"),
    c("Georgia", "Tbilisi"),
    c("Hong Kong", "Hong Kong"),
    c("India", "Delhi"),
    c("Indonesia", "Jakarta"),
    c("Iran", "Tehran"),
    c("Iraq", "Baghdad"),
    c("Israel", "Tel Aviv"),
    c("Japan", "Tokyo"),
    c("Jordan", "Amman"),
    c("Kazakhstan", "Almaty"),
    c("Kuwait", "Kuwait City"),
    c("Kyrgyzstan", "Bishkek"),
    c("Laos", "Vientiane"),
    c("Lebanon", "Beirut"),
    c("Macau", "Macau"),
    c("Malaysia", "Kuala Lumpur"),
    c("Maldives", "Malé"),
    c("Mongolia", "Ulaanbaatar"),
    c("Myanmar", "Yangon"),
    c("Nepal", "Kathmandu"),
    c("North Korea", "Pyongyang"),
    c("Oman", "Muscat"),
    c("Pakistan", "Lahore"),
    c("Palestine", "Ramallah"),
    c("Philippines", "Manila"),
    c("Qatar", "Doha"),
    c("Saudi Arabia", "Riyadh"),
    c("Singapore", "Singapore"),
    c("South Korea", "Seoul"),
    c("Sri Lanka", "Colombo"),
    c("Syria", "Damascus"),
    c("Taiwan", "Taipei"),
    c("Tajikistan", "Dushanbe"),
    c("Thailand", "Bangkok"),
    c("Türkiye", "Istanbul"),
    c("Turkmenistan", "Ashgabat"),
    c("United Arab Emirates", "Dubai"),
    c("Uzbekistan", "Samarkand"),
    c("Vietnam", "Hanoi"),
    c("Yemen", "Sana'a")
  ],
  africa: [
    c("Algeria", "Algiers"),
    c("Angola", "Luanda"),
    c("Benin", "Cotonou"),
    c("Botswana", "Maun"),
    c("Burkina Faso", "Ouagadougou"),
    c("Burundi", "Bujumbura"),
    c("Cabo Verde", "Praia"),
    c("Cameroon", "Douala"),
    c("Central African Republic", "Bangui"),
    c("Chad", "N'Djamena"),
    c("Comoros", "Moroni"),
    c("Côte d'Ivoire", "Abidjan"),
    c("Djibouti", "Djibouti"),
    c("DR Congo", "Kinshasa"),
    c("Egypt", "Cairo"),
    c("Equatorial Guinea", "Malabo"),
    c("Eritrea", "Asmara"),
    c("Eswatini", "Mbabane (Eswatini)"),
    c("Ethiopia", "Addis Ababa"),
    c("Gabon", "Libreville"),
    c("Gambia", "Banjul"),
    c("Ghana", "Accra"),
    c("Guinea", "Conakry"),
    c("Guinea-Bissau", "Bissau"),
    c("Kenya", "Nairobi"),
    c("Lesotho", "Maseru (Lesotho)"),
    c("Liberia", "Monrovia"),
    c("Libya", "Tripoli"),
    c("Madagascar", "Antananarivo"),
    c("Malawi", "Lilongwe"),
    c("Mali", "Bamako"),
    c("Mauritania", "Nouakchott"),
    c("Mauritius", "Port Louis (Mauritius)"),
    c("Mayotte", "Mamoudzou"),
    c("Morocco", "Tangier"),
    c("Mozambique", "Maputo"),
    c("Namibia", "Windhoek"),
    c("Niger", "Niamey"),
    c("Nigeria", "Lagos"),
    c("Republic of the Congo", "Brazzaville"),
    c("Réunion", "Saint-Denis (Réunion)"),
    c("Rwanda", "Kigali"),
    c("São Tomé and Príncipe", "São Tomé"),
    c("Senegal", "Dakar"),
    c("Seychelles", "Victoria (Seychelles)"),
    c("Sierra Leone", "Freetown"),
    c("Somalia", "Mogadishu"),
    c("South Africa", "Cape Town"),
    c("South Sudan", "Juba"),
    c("Sudan", "Khartoum"),
    c("Tanzania", "Dar es Salaam"),
    c("Togo", "Lomé"),
    c("Tunisia", "Tunis"),
    c("Uganda", "Kampala"),
    c("Western Sahara", "Dakhla"),
    c("Zambia", "Lusaka"),
    c("Zimbabwe", "Harare"),
    c("Saint Helena", "Jamestown (Saint Helena)")
  ],
  americas: [
    c("Anguilla", "The Valley (Anguilla)"),
    c("Antigua and Barbuda", "St. John's (Antigua)"),
    c("Argentina", "Buenos Aires"),
    c("Aruba", "Oranjestad"),
    c("Bahamas", "Nassau"),
    c("Barbados", "Bridgetown"),
    c("Belize", "Belize City"),
    c("Bermuda", "Hamilton (Bermuda)"),
    c("Bolivia", "La Paz"),
    c("Bonaire", "Kralendijk"),
    c("Brazil", "Rio de Janeiro"),
    c("British Virgin Islands", "Road Town"),
    c("Canada", "Toronto"),
    c("Cayman Islands", "George Town (Cayman)"),
    c("Chile", "Santiago"),
    c("Colombia", "Bogotá"),
    c("Costa Rica", "San José"),
    c("Cuba", "Havana"),
    c("Curaçao", "Willemstad"),
    c("Dominica", "Roseau"),
    c("Dominican Republic", "Santo Domingo"),
    c("Ecuador", "Quito"),
    c("El Salvador", "San Salvador"),
    c("Falkland Islands", "Stanley (Falklands)"),
    c("French Guiana", "Cayenne"),
    c("Greenland", "Nuuk"),
    c("Grenada", "St. George's"),
    c("Guadeloupe", "Pointe-à-Pitre"),
    c("Guatemala", "Guatemala City"),
    c("Guyana", "Georgetown"),
    c("Haiti", "Port-au-Prince"),
    c("Honduras", "Tegucigalpa"),
    c("Jamaica", "Kingston"),
    c("Martinique", "Fort-de-France"),
    c("Mexico", "Mexico City"),
    c("Montserrat", "Brades"),
    c("Nicaragua", "Managua"),
    c("Panama", "Panama City"),
    c("Paraguay", "Asunción"),
    c("Peru", "Lima"),
    c("Puerto Rico", "San Juan"),
    c("Saint Kitts and Nevis", "Basseterre"),
    c("Saint Lucia", "Castries"),
    c("Saint Martin", "Marigot"),
    c("Saint Vincent and the Grenadines", "Kingstown"),
    c("Sint Maarten", "Philipsburg"),
    c("Suriname", "Paramaribo"),
    c("Trinidad and Tobago", "Port of Spain"),
    c("Turks and Caicos", "Providenciales"),
    c("United States", "New York"),
    c("Uruguay", "Montevideo"),
    c("US Virgin Islands", "Charlotte Amalie"),
    c("Venezuela", "Caracas")
  ],
  /* Hawaii is drawn here and the country is listed under the Americas. */
  oceania: [
    c("American Samoa", "Pago Pago"),
    c("Australia", "Sydney"),
    c("Christmas Island", "Flying Fish Cove"),
    c("Cocos (Keeling) Islands", "West Island (Cocos)"),
    c("Cook Islands", "Rarotonga"),
    c("Fiji", "Nadi"),
    c("French Polynesia", "Papeete"),
    c("Guam", "Hagåtña"),
    c("Indonesia", "Labuan Bajo"),
    c("Kiribati", "Tarawa"),
    c("Marshall Islands", "Majuro"),
    c("Micronesia", "Kolonia"),
    c("Nauru", "Yaren"),
    c("New Caledonia", "Nouméa"),
    c("New Zealand", "Auckland"),
    c("Niue", "Alofi"),
    c("Norfolk Island", "Kingston (Norfolk)"),
    c("Northern Mariana Islands", "Saipan"),
    c("Palau", "Koror"),
    c("Papua New Guinea", "Port Moresby"),
    c("Pitcairn Islands", "Adamstown"),
    c("Samoa", "Apia"),
    c("Solomon Islands", "Honiara"),
    c("Timor-Leste", "Dili"),
    c("Tokelau", "Atafu"),
    c("Tonga", "Nuku'alofa"),
    c("Tuvalu", "Funafuti"),
    c("Vanuatu", "Port Vila"),
    c("Wallis and Futuna", "Mata-Utu")
  ]
};

/** Stop names present anywhere in the data. */
function collectStopNames() {
  const names = new Set();
  stages.forEach(stage => (stage.pts || []).forEach(stop => names.add(stop.name)));
  return names;
}

/**
 * Countries in COVERAGE with no matching stop, plus a tab that has no list.
 * @param {Set<string>} names
 * @returns {string[]}
 */
function coverageProblems(names) {
  const out = [];
  Object.keys(tabs).forEach(tabId => {
    if (!COVERAGE[tabId]) out.push("Coverage: no expected-country list for tab " + tabId);
  });
  Object.keys(COVERAGE).forEach(tabId => {
    if (!tabs[tabId]) out.push("Coverage list has unknown tab " + tabId);
    COVERAGE[tabId].forEach(entry => {
      if (!entry.stops.length) {
        out.push(tabId + ": " + entry.name + " has an empty stop list in COVERAGE");
        return;
      }
      if (!entry.stops.some(stop => names.has(stop))) {
        out.push(tabId + ": " + entry.name + " has no stop (expected one of: " + entry.stops.join(", ") + ")");
      }
    });
  });
  return out;
}

const names = collectStopNames();
problems.push(...coverageProblems(names));
const coverageCount = Object.keys(COVERAGE).reduce((n, tabId) => n + COVERAGE[tabId].length, 0);

Object.keys(tabs).forEach(tabId => {
  const list = GEP.model.stagesOfTab(tabId);
  const names = new Set();
  list.forEach(s => s.pts.forEach(p => names.add(p.name)));
  console.log(tabId.padEnd(9) + list.length + " stages, " + names.size + " stops, " + GEP.model.arcIds(tabId).length + " arcs, " +
    GEP.model.arcIds(tabId).reduce((n, a) => n + GEP.model.branchIds(a).length, 0) + " branches");
});

if (problems.length) {
  console.error("\n" + problems.length + " problem(s):\n - " + problems.join("\n - "));
  process.exit(1);
}
console.log("\nData OK: " + stages.length + " stages, " + Object.keys(arcs).length + " arcs, " + Object.keys(branches).length + " branches.");
console.log("Coverage OK: " + coverageCount + " countries and territories, every one has a stop.");
