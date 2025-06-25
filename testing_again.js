const readline = require('readline');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os');

const START_TIME = 1706040313;

// Planet names dictionary
const planetNames = {
    "0": "SUPER EARTH",
    "1": "KLEN DAHTH II",
    "2": "PATHFINDER V",
    "3": "WIDOW'S HARBOR",
    "4": "NEW HAVEN",
    "5": "PILEN V",
    "6": "HYDROFALL PRIME",
    "7": "ZEA RUGOSIA",
    "8": "DARROWSPORT",
    "9": "FORNSKOGUR II",
    "10": "MIDASBURG",
    "11": "CERBERUS IIIc",
    "12": "PROSPERITY FALLS",
    "13": "OKUL VI",
    "14": "MARTYR'S BAY",
    "15": "FREEDOM PEAK",
    "16": "FORT UNION",
    "17": "KELVINOR",
    "18": "WRAITH",
    "19": "IGLA",
    "20": "NEW KIRUNA",
    "21": "FORT JUSTICE",
    "22": "ZEGEMA PARADISE",
    "23": "PROVIDENCE",
    "24": "PRIMORDIA",
    "25": "SULFURA",
    "26": "NUBLARIA I",
    "27": "KRAKATWO",
    "28": "VOLTERRA",
    "29": "CRUCIBLE",
    "30": "VEIL",
    "31": "MARRE IV",
    "32": "FORT SANCTUARY",
    "33": "SEYSHEL BEACH",
    "34": "HELLMIRE",
    "35": "EFFLUVIA",
    "36": "SOLGHAST",
    "37": "DILUVIA",
    "38": "VIRIDIA PRIME",
    "39": "OBARI",
    "40": "MYRADESH",
    "41": "ATRAMA",
    "42": "EMERIA",
    "43": "BARABOS",
    "44": "FENMIRE",
    "45": "MASTIA",
    "46": "SHALLUS",
    "47": "KRAKABOS",
    "48": "IRIDICA",
    "49": "AZTERRA",
    "50": "AZUR SECUNDUS",
    "51": "IVIS",
    "52": "SLIF",
    "53": "CARAMOOR",
    "54": "KHARST",
    "55": "EUKORIA",
    "56": "MYRIUM",
    "57": "KERTH SECUNDUS",
    "58": "PARSH",
    "59": "REAF",
    "60": "IRULTA",
    "61": "EMORATH",
    "62": "ILDUNA PRIME",
    "63": "MAW",
    "64": "MERIDIA",
    "65": "BOREA",
    "66": "CURIA",
    "67": "TARSH",
    "68": "SHELT",
    "69": "IMBER",
    "70": "BLISTICA",
    "71": "RATCH",
    "72": "JULHEIM",
    "73": "VALGAARD",
    "74": "ARKTURUS",
    "75": "ESKER",
    "76": "TERREK",
    "77": "CIRRUS",
    "78": "CRIMSICA",
    "79": "HEETH",
    "80": "VELD",
    "81": "ALTA V",
    "82": "URSICA XI",
    "83": "INARI",
    "84": "SKAASH",
    "85": "MORADESH",
    "86": "RASP",
    "87": "BASHYR",
    "88": "REGNUS",
    "89": "MOG",
    "90": "VALMOX",
    "91": "IRO",
    "92": "GRAFMERE",
    "93": "NEW STOCKHOLM",
    "94": "OASIS",
    "95": "GENESIS PRIME",
    "96": "OUTPOST 32",
    "97": "CALYPSO",
    "98": "ELYSIAN MEADOWS",
    "99": "ALDERIDGE COVE",
    "100": "TRANDOR",
    "101": "EAST IRIDIUM TRADING BAY",
    "102": "LIBERTY RIDGE",
    "103": "BALDRICK PRIME",
    "104": "THE WEIR",
    "105": "KUPER",
    "106": "OSLO STATION",
    "107": "PÖPLI IX",
    "108": "GUNVALD",
    "109": "DOLPH",
    "110": "BEKVAM III",
    "111": "DUMA TYR",
    "112": "VERNEN WELLS",
    "113": "AESIR PASS",
    "114": "AURORA BAY",
    "115": "PENTA",
    "116": "GAELLIVARE",
    "117": "VOG-SOJOTH",
    "118": "KIRRIK",
    "119": "MORTAX PRIME",
    "120": "WILFORD STATION",
    "121": "PIONEER II",
    "122": "ERSON SANDS",
    "123": "SOCORRO III",
    "124": "BORE ROCK",
    "125": "FENRIR III",
    "126": "TURING",
    "127": "ANGEL'S VENTURE",
    "128": "DARIUS II",
    "129": "ACAMAR IV",
    "130": "ACHERNAR SECUNDUS",
    "131": "ACHIRD III",
    "132": "ACRAB XI",
    "133": "ACRUX IX",
    "134": "ACUBENS PRIME",
    "135": "ADHARA",
    "136": "AFOYAY BAY",
    "137": "AIN-5",
    "138": "ALAIRT III",
    "139": "ALAMAK VII",
    "140": "ALARAPH",
    "141": "ALATHFAR XI",
    "142": "ANDAR",
    "143": "ASPEROTH PRIME",
    "144": "BELLATRIX",
    "145": "BOTEIN",
    "146": "OSUPSAM",
    "147": "BRINK-2",
    "148": "BUNDA SECUNDUS",
    "149": "CANOPUS",
    "150": "CAPH",
    "151": "CASTOR",
    "152": "DURGEN",
    "153": "DRAUPNIR",
    "154": "MORT",
    "155": "INGMAR",
    "156": "CHARBAL-VII",
    "157": "CHARON PRIME",
    "158": "CHOEPESSA IV",
    "159": "CHOOHE",
    "160": "CHORT BAY",
    "161": "CLAORELL",
    "162": "CLASA",
    "163": "DEMIURG",
    "164": "DENEB SECUNDUS",
    "165": "ELECTRA BAY",
    "166": "ENULIALE",
    "167": "EPSILON PHOENCIS VI",
    "168": "ERATA PRIME",
    "169": "ESTANU",
    "170": "FORI PRIME",
    "171": "GACRUX",
    "172": "GAR HAREN",
    "173": "GATRIA",
    "174": "GEMMA",
    "175": "GRAND ERRANT",
    "176": "HADAR",
    "177": "HAKA",
    "178": "HALDUS",
    "179": "HALIES PORT",
    "180": "HERTHON SECUNDUS",
    "181": "HESOE PRIME",
    "182": "HEZE BAY",
    "183": "HORT",
    "184": "HYDROBIUS",
    "185": "KARLIA",
    "186": "KEID",
    "187": "KHANDARK",
    "188": "KLAKA 5",
    "189": "KNETH PORT",
    "190": "KRAZ",
    "191": "KUMA",
    "192": "LASTOFE",
    "193": "LENG SECUNDUS",
    "194": "LESATH",
    "195": "MAIA",
    "196": "MALEVELON CREEK",
    "197": "MANTES",
    "198": "MARFARK",
    "199": "MARTALE",
    "200": "MATAR BAY",
    "201": "MEISSA",
    "202": "MEKBUDA",
    "203": "MENKENT",
    "204": "MERAK",
    "205": "MERGA IV",
    "206": "MINCHIR",
    "207": "MINTORIA",
    "208": "MORDIA 9",
    "209": "NABATEA SECUNDUS",
    "210": "NAVI VII",
    "211": "NIVEL 43",
    "212": "OSHAUNE",
    "213": "OVERGOE PRIME",
    "214": "PANDION-XXIV",
    "215": "PARTION",
    "216": "PEACOCK",
    "217": "PHACT BAY",
    "218": "PHERKAD SECUNDUS",
    "219": "POLARIS PRIME",
    "220": "POLLUX 31",
    "221": "PRASA",
    "222": "PROPUS",
    "223": "RAS ALGETHI",
    "224": "RD-4",
    "225": "ROGUE 5",
    "226": "RIRGA BAY",
    "227": "SEASSE",
    "228": "SENGE 23",
    "229": "SETIA",
    "230": "SHETE",
    "231": "SIEMNOT",
    "232": "SIRIUS",
    "233": "SKAT BAY",
    "234": "SPHERION",
    "235": "STOR THA PRIME",
    "236": "STOUT",
    "237": "TERMADON",
    "238": "TIBIT",
    "239": "TIEN KWAN",
    "240": "TROOST",
    "241": "UBANEA",
    "242": "USTOTU",
    "243": "VANDALON IV",
    "244": "VARYLIA 5",
    "245": "WASAT",
    "246": "VEGA BAY",
    "247": "WEZEN",
    "248": "VINDEMITARIX PRIME",
    "249": "X-45",
    "250": "YED PRIOR",
    "251": "ZEFIA",
    "252": "ZOSMA",
    "253": "ZZANIAH PRIME",
    "254": "SKITTER",
    "255": "EUPHORIA III",
    "256": "DIASPORA X",
    "257": "GEMSTONE BLUFFS",
    "258": "ZAGON PRIME",
    "259": "OMICRON",
    "260": "CYBERSTAN"
};

function loadWarinfoData(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        console.log(`Error loading warinfo data from file: ${e}`);
        return {};
    }
}

function getUnixEpochTimestamp() {
    return Math.floor(Date.now() / 1000);
}

function convertTimestampToTime(unixTimestamp) {
    const utc = new Date(unixTimestamp * 1000).toISOString().replace('T', ' ').substring(0, 19);
    const local = new Date((unixTimestamp + 8 * 3600) * 1000).toISOString().replace('T', ' ').substring(0, 19);
    return [utc, local];
}

function getServerTimeOffset(apiData) {
    const warTime = apiData.time || 0;
    if (warTime) {
        return START_TIME + warTime;
    } else {
        console.log("No 'time' field in API response.");
        return null;
    }
}

function calculateDeviation(serverTime) {
    const currentTimestamp = getUnixEpochTimestamp();
    const deviation = currentTimestamp - serverTime;
    const days = Math.floor(deviation / 86400);
    const hours = Math.floor((deviation % 86400) / 3600);
    const deviationStr = `${days}d ${hours}h`;
    return [deviationStr, deviation];
}

function getColoredPlanetName(race, planetName) {
    if (race === 1) return chalk.hex('#6ebbd3').bold(planetName)
    if (race === 2) return chalk.hex('#ffb900').bold(planetName)
    if (race === 3) return chalk.hex('#ff6263').bold(planetName)
    if (race === 4) return chalk.hex('#6b3aba').bold(planetName)
    return planetName;
}

function getDssHoveringPlanets(spaceStations, planetNames) {
    const hoveringPlanets = [];
    for (const station of spaceStations) {
        const planetIndex = station.planetIndex;
        const planetName = planetNames[String(planetIndex)] || "Unknown";
        const activeEffectIds = station.activeEffectIds || [];
        let text = planetName;
        if (activeEffectIds.length) {
            text += ` (${activeEffectIds.join(', ')})`;
        }
        hoveringPlanets.push(text);
    }
    return hoveringPlanets;
}

function convertToLocalTime(unixTimestamp, serverStartTime, deviation, timezoneOffset) {
    const adjustedTimestamp = serverStartTime + unixTimestamp + deviation;
    const date = new Date((adjustedTimestamp + timezoneOffset * 3600) * 1000);
    return date.toISOString().replace('T', ' ').substring(0, 19);
}

function printGlobalEvents(apiData, deviation, timezoneOffset) {
    const globalEvents = apiData.globalEvents || [];
    if (globalEvents.length) {
        for (const event of globalEvents) {
            const eventId = event.eventId || "Unknown";
            const title = event.title || "No Title";
            const message = event.message || "No Message";
            const race = event.race || 0;
            const flag = event.flag || 0;
            const effectIds = event.effectIds || [];
            const planetIndices = event.planetIndices || [];
            const expireTime = event.expireTime || 0;
            const expireLocalTime = convertToLocalTime(expireTime, START_TIME, deviation, timezoneOffset);
            const effectIdsStr = effectIds.length ? effectIds.join(', ') : "None";
            const raceNames = {1: "Super Earth", 2: "Terminid", 3: "Automaton", 4: "Illuminate"};
            const raceName = raceNames[race] || "Unknown";
            const coloredRace = getColoredPlanetName(race, raceName);
            let coloredPlanetsStr = "None";
            if (planetIndices.length) {
                coloredPlanetsStr = planetIndices.map(idx => getColoredPlanetName(race, String(idx))).join(', ');
            }
            console.log();
            console.log(`Event ID: ${eventId}`);
            console.log(`Title: ${title}`);
            console.log(`Message:\n\n${message}\n`);
            console.log(`Race: ${coloredRace}`);
            console.log(`Flag: ${flag}`);
            console.log(`Effect IDs: ${effectIdsStr}`);
            console.log(`Planet Indices: ${coloredPlanetsStr}`);
            console.log(`Expire Time: ${expireLocalTime}`);
        }
    } else {
        console.log("\nNo ongoing Global Events.");
    }
}

function printPlanetEvents(apiData, planetNames, deviation, timezoneOffset) {
    const planetEvents = apiData.planetEvents || [];
    if (planetEvents.length) {
        for (const event of planetEvents) {
            const planetIndex = event.planetIndex;
            const planetName = planetNames[String(planetIndex)] || "Unknown";
            const race = event.race || 0;
            const eventType = event.eventType || "Unknown";
            const eventTypeStr = {
                1: "Defence",
                2: "Invasion",
                3: "Type 3",
                4: "Type 4"
            }[eventType] || "Unknown";
            const startTime = convertToLocalTime(event.startTime, START_TIME, deviation, timezoneOffset);
            const expireTime = convertToLocalTime(event.expireTime, START_TIME, deviation, timezoneOffset);
            const currentHealth = event.health || 0;
            const maxHealth = event.maxHealth || 1300000;
            const liberationPercentage = ((maxHealth - currentHealth) / maxHealth) * 100;
            console.log();
            console.log(`Planet Name: ${getColoredPlanetName(race, planetName)}`);
            console.log(`Planet Index: ${planetIndex}`);
            console.log(`Event Type: ${eventTypeStr}`);
            console.log(`Start Time: ${startTime}`);
            console.log(`Expire Time: ${expireTime}`);
            console.log(`Health: ${currentHealth} / ${maxHealth}`);
            console.log(`Liberation: ${liberationPercentage.toFixed(2)}%`);
            console.log(`Campaign ID: ${event.campaignId}\n`);
        }
    } else {
        console.log("\nNo ongoing Planet Events");
    }
}

function printDssHoveringPlanets(spaceStations, planetNames, apiData) {
    if (spaceStations.length) {
        console.log("DSS is stationed at the following planets:\n");
        const planetStatus = {};
        for (const p of apiData.planetStatus || []) {
            planetStatus[p.index] = p.owner || 0;
        }
        for (const station of spaceStations) {
            const planetIndex = station.planetIndex;
            const planetName = planetNames[String(planetIndex)] || "Unknown";
            const owner = planetStatus[planetIndex] || 0;
            const coloredPlanetName = getColoredPlanetName(owner, planetName);
            const activeEffectIds = station.activeEffectIds || [];
            let label = coloredPlanetName;
            if (activeEffectIds.length) {
                label += ` (${activeEffectIds.join(', ')})`;
            }
            console.log(label);
        }
    } else {
        console.log("\nDSS offline");
    }
}

function printPlanetDetails(apiData, planetNames, warinfoData) {
    const campaigns = apiData.campaigns || [];
    const campaignPlanetIndices = campaigns.map(c => c.planetIndex);
    const totalPlayers = (apiData.planetStatus || []).reduce((sum, p) => sum + (p.players || 0), 0);
    console.log(`Total active players across all planets: ${totalPlayers}`);

    const planetInfos = warinfoData.planetInfos || [];
    const planetMaxHealth = {};
    for (const p of planetInfos) planetMaxHealth[p.index] = p.maxHealth;

    const effectIdToName = {
        1202: "Jet Brigade",
        1243: "Predator Strain",
        1244: "Spore Burst",
        1248: "Incendiary Corps"
    };
    const subfactionColors = {
        "Predator Strain": "#51ff30",
        "Jet Brigade": "#ffffff", // Placeholder
        "Spore Burst": "#ffffff", // Placeholder
        "Incendiary Corps": "#ffffff" // Placeholder
    };
    const planetEffects = {};
    for (const effect of apiData.planetActiveEffects || []) {
        const idx = effect.index;
        const galacticId = effect.galacticEffectId;
        if (effectIdToName[galacticId]) {
            if (!planetEffects[idx]) planetEffects[idx] = [];
            planetEffects[idx].push(effectIdToName[galacticId]);
        }
    }

    const filteredPlanets = (apiData.planetStatus || []).filter(p => campaignPlanetIndices.includes(p.index));
    console.log("Planets with active campaigns:");
    if (filteredPlanets.length) {
        for (const planet of filteredPlanets) {
            const planetIndex = planet.index;
            const planetName = planetNames[String(planetIndex)] || "Unknown";
            const planetPlayers = planet.players || 0;
            const playerPercentage = totalPlayers > 0 ? (planetPlayers / totalPlayers) * 100 : 0;
            const currentHealth = planet.health || 0;
            const maxHealth = planetMaxHealth[planetIndex];
            let maxHealthStr, liberationStr, decayStr, regenStr;
            if (maxHealth === undefined) {
                maxHealthStr = "Unknown";
                liberationStr = "Unknown";
                decayStr = "Unknown";
                regenStr = "Unknown";
            } else {
                maxHealthStr = String(maxHealth);
                const liberationPercentage = ((maxHealth - currentHealth) / maxHealth) * 100;
                liberationStr = `${liberationPercentage.toFixed(2)}%`;
                const regenPerSecond = planet.regenPerSecond || 0;
                const regenPerHour = Math.round(regenPerSecond * 3600);
                const decay = maxHealth ? ((regenPerHour / maxHealth) * 100).toFixed(2) : 0;
                const decay1m = ((regenPerHour / 1_000_000) * 100).toFixed(2);
                regenStr = `${regenPerHour} (${regenPerSecond})`;
                decayStr = `${decay}% (${decay1m}%/1M)`;
            }
            const campaign = campaigns.find(c => c.planetIndex === planetIndex);
            const campaignTypeMap = {
                0: "Liberation",
                1: "Recon",
                2: "High Priority Campaign",
                3: "3",
                4: "Event"
            };
            const campaignTypeNum = campaign ? campaign.type : "Unknown";
            const campaignType = campaignTypeMap[campaignTypeNum] || "Unknown";

            console.log();
            console.log(`Planet Name: ${getColoredPlanetName(planet.owner, planetName)}`);
            console.log(`Planet Index: ${planetIndex}`);
            console.log(`Health: ${currentHealth} / ${maxHealthStr}`);
            console.log(`Liberation: ${liberationStr}`);
            console.log(`Regen: ${regenStr}`);
            console.log(`Decay: ${decayStr}`);
            console.log(`Players: ${planetPlayers} (${playerPercentage.toFixed(2)}%)`);
            console.log(`CampaignType: ${campaignType}`);

            const effects = planetEffects[planetIndex];
            if (effects) {
                for (const effect of effects) {
                    const color = subfactionColors[effect] || "#ffffff";
                    console.log(chalk.hex(color)(`${effect} detected!`));
                }
            }
        }
    } else {
        console.log("\nNo planets found with active campaigns.");
    }
}

function printPlanetRegions(apiData, planetNames, warinfoData, showRegions) {
    if (!showRegions) return;
    const planetRegions = apiData.planetRegions || [];
    const warinfoPlanetRegions = warinfoData.planetRegions || [];
    const planetInfos = warinfoData.planetInfos || [];
    const planetMaxHealth = {};
    for (const p of planetInfos) planetMaxHealth[p.index] = p.maxHealth;

    if (planetRegions.length) {
        for (const region of planetRegions) {
            const planetIndex = region.planetIndex;
            const regionIndex = region.regionIndex;
            const owner = region.owner || 0;
            const health = region.health || 0;
            const players = region.players || 0;
            const isAvailable = region.isAvailable || false;
            const availabilityFactor = region.availabilityFactor || 0.0;
            const regenPerSecond = region.regerPerSecond || 0;
            const warinfoRegion = warinfoPlanetRegions.find(r => r.planetIndex === planetIndex && r.regionIndex === regionIndex) || {};
            const maxHealth = warinfoRegion.maxHealth;
            const regionSize = warinfoRegion.regionSize || 0;
            let regionSizeStr;
            if (regionSize === 0) regionSizeStr = "Settlement";
            else if (regionSize === 1) regionSizeStr = "Town";
            else if (regionSize === 2) regionSizeStr = "City";
            else if (regionSize === 3) regionSizeStr = "Mega City";
            else regionSizeStr = "Unknown";
            let maxHealthStr, liberationStr, regenStr, decayStr;
            if (maxHealth === undefined) {
                maxHealthStr = "Unknown";
                liberationStr = "Unknown";
                regenStr = "Unknown";
                decayStr = "Unknown";
            } else {
                maxHealthStr = String(maxHealth);
                const regenPerSecondRounded = Math.round(regenPerSecond * 10) / 10;
                const regenPerHourRounded = Math.round(regenPerSecond * 3600 / 10) * 10;
                regenStr = `${regenPerSecondRounded} (${regenPerHourRounded})`;
                const decay = maxHealth ? ((regenPerHourRounded / maxHealth) * 100).toFixed(2) : 0;
                const decay1m = ((regenPerHourRounded / 1_000_000) * 100).toFixed(2);
                decayStr = `${decay}% (${decay1m}%/1M)`;
                const liberationPercentage = ((maxHealth - health) / maxHealth) * 100;
                liberationStr = `${liberationPercentage.toFixed(2)}%`;
            }
            const planetName = planetNames[String(planetIndex)] || "Unknown";
            const planetOwner = (apiData.planetStatus || [])[planetIndex]?.owner || 0;
            const coloredPlanetName = getColoredPlanetName(planetOwner, planetName);
            console.log();
            console.log(`Planet: ${coloredPlanetName} (Index: ${planetIndex})`);
            console.log(`Region Size: ${regionSizeStr}`);
            console.log(`Region Index: ${getColoredPlanetName(owner, String(regionIndex))}`);
            console.log(`Players in Region: ${players}`);
            console.log(`Regen: ${regenStr}`);
            console.log(`Decay: ${decayStr}`);
            console.log(`Health: ${health} / ${maxHealthStr}`);
            console.log(`Liberation: ${liberationStr}`);
            console.log(`Available: ${isAvailable ? 'Yes' : 'No'}`);
            console.log(`Availability Factor: ${availabilityFactor.toFixed(4)}`);
        }
    } else {
        console.log("\nNo planet region data available.");
    }
}

function fetchAndPrintAll(apiData, warinfoData, planetNames, timezoneOffset, deviation) {
    console.log("\n--- Metadata ---");
    const [utcTime] = convertTimestampToTime(getUnixEpochTimestamp());
    const localTime = new Date((getUnixEpochTimestamp() + timezoneOffset * 3600) * 1000).toISOString().replace('T', ' ').substring(0, 19);
    console.log(`UTC Time: ${utcTime}`);
    console.log(`Local Time (UTC${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset}): ${localTime}`);
    console.log(`\nCollating data from API response...\n`);
    const serverTime = getServerTimeOffset(apiData);
    if (serverTime) {
        const [deviationStr, deviationVal] = calculateDeviation(serverTime);
        console.log(`Deviation (RealTime - ServerTime): ${deviationStr} (${deviationVal} seconds)`);
    }
    console.log("\n--- DSS/Space Station Data ---");
    const spaceStations = apiData.spaceStations || [];
    printDssHoveringPlanets(spaceStations, planetNames, apiData);
    console.log("\n--- Global Events ---");
    printGlobalEvents(apiData, deviation, timezoneOffset);
    console.log("\n--- Planet Details ---");
    printPlanetDetails(apiData, planetNames, warinfoData);
    console.log("\n--- Planet Regions ---");
    const showRegions = true;
    printPlanetRegions(apiData, planetNames, warinfoData, showRegions);
    console.log("\n--- Planet Events ---");
    printPlanetEvents(apiData, planetNames, deviation, timezoneOffset);
}

function clearTerminal() {
    if (os.platform() === 'win32') {
        process.stdout.write('\x1Bc');
    } else {
        process.stdout.write('\x1B[2J\x1B[0f');
    }
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function ask(question) {
        return new Promise(resolve => rl.question(question, resolve));
    }

    let timezoneOffset;
    while (true) {
        try {
            const input = await ask("Enter your desired timezone offset (from -12 to 14): ");
            timezoneOffset = parseInt(input);
            if (timezoneOffset < -12 || timezoneOffset > 14) {
                console.log("Invalid timezone offset. Please enter a value between -12 and 14.");
                continue;
            }
            break;
        } catch {
            console.log("Invalid input. Please enter an integer between -12 and 14.");
        }
    }

    const STATUS_API_URL = "https://api.live.prod.thehelldiversgame.com/api/warseason/801/status";
    const WARINFO_API_URL = "https://api.live.prod.thehelldiversgame.com/api/warseason/801/warinfo";
    const HEADERS = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": "en-GB"
    };

    while (true) {
        let warinfoData = {};
        let apiData = null;
        try {
            console.log("Fetching warinfo data from API...");
            const response = await fetch(WARINFO_API_URL, { headers: HEADERS });
            warinfoData = await response.json();
        } catch (e) {
            console.log(`Error fetching warinfo data from API: ${e}`);
        }
        try {
            console.log("Fetching status data from API...");
            const response = await fetch(STATUS_API_URL, { headers: HEADERS });
            apiData = await response.json();
        } catch (e) {
            console.log(`Error fetching status data from API: ${e}`);
        }

        if (apiData) {
            clearTerminal();
            const serverTime = getServerTimeOffset(apiData);
            let deviation = 0;
            if (serverTime) {
                [, deviation] = calculateDeviation(serverTime);
            }
            fetchAndPrintAll(apiData, warinfoData, planetNames, timezoneOffset, deviation);
        } else {
            console.log("API data not available. Exiting...");
            break;
        }

        const userInput = (await ask("\nType 'refresh' to update, or press Enter to exit: ")).trim().toLowerCase();
        if (userInput !== "refresh") {
            break;
        }
    }
    rl.close();
}

if (require.main === module) {
    main();
}