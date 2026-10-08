
// ==============================
// GAME DATA
// ==============================

let money = 100;

let iron = 0;
let coal = 0;
let steel = 0;
let sand = 0;
let silica = 0;
let glass = 0;

// ==============================
// MACHINES
// ==============================

let miners = 0;
let coalMiners = 0;
let steelFactories = 0;
let glassFactories = 0;
let sandMiners = 0;
let silicaMiners = 0;

// ==============================
// PRESTIGE
// ==============================

let prestigeLevel = 0;
let prestigeRequirement = 10000;

// Base machine limits
const BASE_IRON_MINERS = 10;
const BASE_COAL_MINERS = 5;
const BASE_STEEL_FACTORIES = 5;
const BASE_GLASS_FACTORIES = 5;
const BASE_SAND_MINERS = 10;
const BASE_SILICA_MINERS = 5;

// ==============================
// DEVELOPER MODE
// ==============================

let devMode = false;

const DEV_PASSWORD = "ParagonElite";

// ==============================
// RESEARCH
// ==============================

let researches = {

    improvedMining: {
        researched: false,
        cost: 250,
        requires: []
    },

    basicMetallurgy: {
        researched: false,
        cost: 500,
        requires: []
    },

    advancedManufacturing: {
        researched: false,
        cost: 1500,
        requires: ["basicMetallurgy"]
    },

    automation: {
        researched: false,
        cost: 5000,
        requires: ["advancedManufacturing"]
    },

    glassmaking: {
        researched: false,
        cost: 1000,
        requires: []
    }

};

// ==============================
// MACHINE LIMITS
// ==============================

function getMaxIronMiners() {

    return BASE_IRON_MINERS + (prestigeLevel * 5);

}


function getMaxCoalMiners() {

    return BASE_COAL_MINERS + (prestigeLevel * 2);

}


function getMaxSteelFactories() {

    return BASE_STEEL_FACTORIES + (prestigeLevel * 2);

}


function getMaxGlassFactories() {

    return BASE_GLASS_FACTORIES;

}

function getMaxSandMiners() {

    return BASE_SAND_MINERS + (prestigeLevel * 2);

}


function getMaxSilicaMiners() {

    return BASE_SILICA_MINERS + (prestigeLevel * 2);

}

// ==============================
// PRESTIGE REQUIREMENT
// ==============================

function calculatePrestigeRequirement() {

    return Math.floor(
        10000 * Math.pow(2.5, prestigeLevel)
    );

}

// ==============================
// TAB SYSTEM
// ==============================

function openTab(tabName) {

    let tabs = document.querySelectorAll(".tab");

    tabs.forEach(function(tab) {

        tab.classList.remove("active");

    });


    let buttons =
        document.querySelectorAll(".tab-button");

    buttons.forEach(function(button) {

        button.classList.remove("active");

    });


    document
        .getElementById(tabName)
        .classList.add("active");


    buttons.forEach(function(button) {

        if (
            button.getAttribute("onclick") ===
            "openTab('" + tabName + "')"
        ) {

            button.classList.add("active");

        }

    });

}

// ==============================
// UPDATE SCREEN
// ==============================

function updateScreen() {

    // ==============================
    // MONEY
    // ==============================

    document.getElementById("money").textContent =
        money.toLocaleString();


    // ==============================
    // RESOURCES
    // ==============================

    document.getElementById("iron").textContent =
        iron;

    document.getElementById("coal").textContent =
        coal;

    document.getElementById("steel").textContent =
        steel;

    document.getElementById("sand").textContent =
        sand;

    document.getElementById("silica").textContent =
        silica;

    document.getElementById("glass").textContent =
        glass;

    // ==============================
    // MACHINES
    // ==============================

    document.getElementById("miners").textContent =
        miners;

    document.getElementById("sandMiners").textContent =
        sandMiners;

    document.getElementById("silicaMiners").textContent =
        silicaMiners;

    document.getElementById("coalMiners").textContent =
        coalMiners;

    document.getElementById("steelFactories").textContent =
        steelFactories;

    document.getElementById("glassFactories").textContent =
        glassFactories;


    // ==============================
    // IRON MINER BUTTON
    // ==============================

    let maxIronMiners =
        getMaxIronMiners();

    let minerBuyButton =
        document.getElementById(
            "minerBuyButton"
        );

    minerBuyButton.disabled =
        miners >= maxIronMiners;

    minerBuyButton.textContent =
        miners >= maxIronMiners
            ? "Limit Reached"
            : "Buy";


    document.getElementById(
        "minerSellButton"
    ).disabled =
        miners === 0;


    // ==============================
    // COAL MINER BUTTON
    // ==============================

    let maxCoalMiners =
        getMaxCoalMiners();

    let coalMinerBuyButton =
        document.getElementById(
            "coalMinerBuyButton"
        );

    coalMinerBuyButton.disabled =
        coalMiners >= maxCoalMiners;

    coalMinerBuyButton.textContent =
        coalMiners >= maxCoalMiners
            ? "Limit Reached"
            : "Buy";


    document.getElementById(
        "coalMinerSellButton"
    ).disabled =
        coalMiners === 0;

// ==============================
// SAND MINER BUTTON
// ==============================

let maxSandMiners =
    getMaxSandMiners();

let sandMinerBuyButton =
    document.getElementById(
        "sandMinerBuyButton"
    );

sandMinerBuyButton.disabled =
    sandMiners >= maxSandMiners;

sandMinerBuyButton.textContent =
    sandMiners >= maxSandMiners
        ? "Limit Reached"
        : "Buy";


document.getElementById(
    "sandMinerSellButton"
).disabled =
    sandMiners === 0;


// ==============================
// SILICA MINER BUTTON
// ==============================

let maxSilicaMiners =
    getMaxSilicaMiners();

let silicaMinerBuyButton =
    document.getElementById(
        "silicaMinerBuyButton"
    );

silicaMinerBuyButton.disabled =
    silicaMiners >= maxSilicaMiners;

silicaMinerBuyButton.textContent =
    silicaMiners >= maxSilicaMiners
        ? "Limit Reached"
        : "Buy";


document.getElementById(
    "silicaMinerSellButton"
).disabled =
    silicaMiners === 0;

    // ==============================
    // STEEL FACTORY BUTTON
    // ==============================

    let maxSteelFactories =
        getMaxSteelFactories();

    let steelFactoryBuyButton =
        document.getElementById(
            "steelFactoryButton"
        );


    if (
        researches.basicMetallurgy.researched
    ) {

        steelFactoryBuyButton.disabled =
            steelFactories >= maxSteelFactories;

        steelFactoryBuyButton.textContent =
            steelFactories >= maxSteelFactories
                ? "Limit Reached"
                : "Buy";

    }
    else {

        steelFactoryBuyButton.disabled = true;

        steelFactoryBuyButton.textContent =
            "🔒 Research Required";

    }


    document.getElementById(
        "steelFactorySellButton"
    ).disabled =
        steelFactories === 0;


    // ==============================
    // GLASS FACTORY BUTTON
    // ==============================

    let maxGlassFactories =
        getMaxGlassFactories();

    let glassFactoryButton =
        document.getElementById(
            "glassFactoryButton"
        );

    let glassFactoryMachine =
        document.getElementById(
            "glassFactoryMachine"
        );


    if (
        researches.glassmaking.researched
    ) {

        glassFactoryButton.disabled =
            glassFactories >= maxGlassFactories;

        glassFactoryButton.textContent =
            glassFactories >= maxGlassFactories
                ? "Limit Reached"
                : "Buy";

        glassFactoryMachine.classList.remove(
            "locked-machine"
        );

    }
    else {

        glassFactoryButton.disabled = true;

        glassFactoryButton.textContent =
            "🔒 Research Required";

    }


    document.getElementById(
        "glassFactorySellButton"
    ).disabled =
        glassFactories === 0;


    // ==============================
    // PRODUCTION DISPLAYS
    // ==============================

    document.getElementById(
        "sandProduction"
    ).textContent =
        sandMiners +
        " Sand / 3 sec";


    document.getElementById(
        "silicaProduction"
    ).textContent =
        silicaMiners +
        " Silica / 3 sec";
    
    document.getElementById(
        "ironProduction"
    ).textContent =
        miners +
        " Iron / 3 sec";


    document.getElementById(
        "coalProduction"
    ).textContent =
        coalMiners +
        " Coal / 3 sec";


    document.getElementById(
        "steelProduction"
    ).textContent =
        steelFactories +
        " Steel / 3 sec";


    document.getElementById(
        "glassProduction"
    ).textContent =
        glassFactories +
        " Glass / 5 sec";


    // ==============================
    // PRESTIGE
    // ==============================

    updatePrestigeUI();

}

// ==============================
// BUY IRON MINER
// ==============================

function buyMiner() {

    let maxIronMiners =
        getMaxIronMiners();


    if (miners >= maxIronMiners) {

        log(
            "You can only own " +
            maxIronMiners +
            " Iron Miners!"
        );

        return;

    }


    if (money >= 50) {

        money -= 50;

        miners++;

        log(
            "Bought an Iron Miner!"
        );

        updateScreen();

    }
    else {

        log(
            "Not enough money!"
        );

    }

}

// ==============================
// BUY COAL MINER
// ==============================

function buyCoalMiner() {

    let maxCoalMiners =
        getMaxCoalMiners();


    if (coalMiners >= maxCoalMiners) {

        log(
            "You can only own " +
            maxCoalMiners +
            " Coal Miners!"
        );

        return;

    }


    if (money >= 75) {

        money -= 75;

        coalMiners++;

        log(
            "Bought a Coal Miner!"
        );

        updateScreen();

    }
    else {

        log(
            "Not enough money!"
        );

    }

}

// ==============================
// BUY STEEL FACTORY
// ==============================

function buySteelFactory() {

    if (
        !researches.basicMetallurgy.researched
    ) {

        log(
            "Research Basic Metallurgy first!"
        );

        return;

    }


    let maxSteelFactories =
        getMaxSteelFactories();


    if (
        steelFactories >=
        maxSteelFactories
    ) {

        log(
            "You can only own " +
            maxSteelFactories +
            " Steel Factories!"
        );

        return;

    }


    if (money >= 150) {

        money -= 150;

        steelFactories++;

        log(
            "Bought a Steel Factory!"
        );

        updateScreen();

    }
    else {

        log(
            "Not enough money!"
        );

    }

}

// ==============================
// BUY SAND MINER
// ==============================

function buySandMiner() {

    let maxSandMiners =
        getMaxSandMiners();

    if (sandMiners >= maxSandMiners) {

        log(
            "You can only own " +
            maxSandMiners +
            " Sand Miners!"
        );

        return;

    }

    if (money >= 100) {

        money -= 100;

        sandMiners++;

        log(
            "Bought a Sand Miner!"
        );

        updateScreen();

    }
    else {

        log(
            "Not enough money!"
        );

    }

}


// ==============================
// BUY SILICA MINER
// ==============================

function buySilicaMiner() {

    let maxSilicaMiners =
        getMaxSilicaMiners();

    if (silicaMiners >= maxSilicaMiners) {

        log(
            "You can only own " +
            maxSilicaMiners +
            " Silica Miners!"
        );

        return;

    }

    if (money >= 125) {

        money -= 125;

        silicaMiners++;

        log(
            "Bought a Silica Miner!"
        );

        updateScreen();

    }
    else {

        log(
            "Not enough money!"
        );

    }

}

// ==============================
// BUY GLASS FACTORY
// ==============================

function buyGlassFactory() {

    if (
        !researches.glassmaking.researched
    ) {

        log(
            "Research Glassmaking first!"
        );

        return;

    }


    let maxGlassFactories =
        getMaxGlassFactories();


    if (
        glassFactories >=
        maxGlassFactories
    ) {

        log(
            "You can only own " +
            maxGlassFactories +
            " Glass Factories!"
        );

        return;

    }


    if (money >= 750) {

        money -= 750;

        glassFactories++;

        log(
            "Bought a Glass Factory!"
        );

        updateScreen();

    }
    else {

        log(
            "Not enough money!"
        );

    }

}

// ==============================
// SELL MACHINES
// ==============================

function sellMiner() {

    if (miners === 0) {

        log(
            "You don't have any Iron Miners!"
        );

        return;

    }


    miners--;

    money += 25;

    log(
        "Sold an Iron Miner for $25."
    );

    updateScreen();

}


function sellCoalMiner() {

    if (coalMiners === 0) {

        log(
            "You don't have any Coal Miners!"
        );

        return;

    }


    coalMiners--;

    money += 37;

    log(
        "Sold a Coal Miner for $37."
    );

    updateScreen();

}


function sellSteelFactory() {

    if (steelFactories === 0) {

        log(
            "You don't have any Steel Factories!"
        );

        return;

    }


    steelFactories--;

    money += 75;

    log(
        "Sold a Steel Factory for $75."
    );

    updateScreen();

}


function sellGlassFactory() {

    if (glassFactories === 0) {

        log(
            "You don't have any Glass Factories!"
        );

        return;

    }


    glassFactories--;

    money += 375;

    log(
        "Sold a Glass Factory for $375."
    );

    updateScreen();

}

// ==============================
// SELL SAND MINER
// ==============================

function sellSandMiner() {

    if (sandMiners === 0) {

        log(
            "You don't have any Sand Miners!"
        );

        return;

    }

    sandMiners--;

    money += 50;

    log(
        "Sold a Sand Miner for $50."
    );

    updateScreen();

}


// ==============================
// SELL SILICA MINER
// ==============================

function sellSilicaMiner() {

    if (silicaMiners === 0) {

        log(
            "You don't have any Silica Miners!"
        );

        return;

    }

    silicaMiners--;

    money += 62;

    log(
        "Sold a Silica Miner for $62."
    );

    updateScreen();

}

// ==============================
// RESEARCH SYSTEM
// ==============================

function canResearch(researchName) {

    let research =
        researches[researchName];


    if (!research) {
        return false;
    }


    if (research.researched) {
        return false;
    }


    if (money < research.cost) {
        return false;
    }


    for (
        let requirement of research.requires
    ) {

        if (
            !researches[
                requirement
            ].researched
        ) {

            return false;

        }

    }


    // Glassmaking requires Prestige 1
    if (
        researchName === "glassmaking" &&
        prestigeLevel < 1
    ) {

        return false;

    }


    return true;

}

// ==============================
// RESEARCH
// ==============================

function research(researchName) {

    let researchData =
        researches[researchName];


    if (!researchData) {

        log(
            "Research not found!"
        );

        return;

    }


    if (researchData.researched) {

        log(
            "You already researched this!"
        );

        return;

    }


    // Glassmaking Prestige requirement

    if (
        researchName === "glassmaking" &&
        prestigeLevel < 1
    ) {

        log(
            "You need Prestige 1 first!"
        );

        return;

    }


    // Other requirements

    for (
        let requirement of
        researchData.requires
    ) {

        if (
            !researches[
                requirement
            ].researched
        ) {

            log(
                "You need to research " +
                requirement +
                " first!"
            );

            return;

        }

    }


    // Check money

    if (
        money < researchData.cost
    ) {

        log(
            "You need $" +
            researchData.cost +
            " to research this!"
        );

        return;

    }


    // Pay

    money -= researchData.cost;

    researchData.researched = true;


    log(
        "Research completed!"
    );


    updateResearchUI();

    updateScreen();

}

// ==============================
// UPDATE RESEARCH UI
// ==============================

function updateResearchUI() {

    // ==============================
    // IMPROVED MINING
    // ==============================

    let improvedMining =
        document.getElementById(
            "improvedMiningResearch"
        );

    let improvedMiningButton =
        improvedMining.querySelector(
            "button"
        );


    if (
        researches.improvedMining.researched
    ) {

        improvedMining.classList.add(
            "researched"
        );

        improvedMiningButton.textContent =
            "✅ Researched";

        improvedMiningButton.disabled =
            true;

    }


    // ==============================
    // BASIC METALLURGY
    // ==============================

    let basicMetallurgy =
        document.getElementById(
            "basicMetallurgyResearch"
        );

    let basicMetallurgyButton =
        basicMetallurgy.querySelector(
            "button"
        );


    if (
        researches.basicMetallurgy.researched
    ) {

        basicMetallurgy.classList.add(
            "researched"
        );

        basicMetallurgyButton.textContent =
            "✅ Researched";

        basicMetallurgyButton.disabled =
            true;


        // Unlock Steel Factory

        let steelButton =
            document.getElementById(
                "steelFactoryButton"
            );

        steelButton.disabled = false;

        steelButton.textContent =
            "Buy";


        document
            .getElementById(
                "steelFactoryMachine"
            )
            .classList.remove(
                "locked-machine"
            );

    }


    // ==============================
    // ADVANCED MANUFACTURING
    // ==============================

    let advanced =
        document.getElementById(
            "advancedManufacturingResearch"
        );

    let advancedButton =
        advanced.querySelector(
            "button"
        );


    if (
        researches.advancedManufacturing.researched
    ) {

        advanced.classList.add(
            "researched"
        );

        advancedButton.textContent =
            "✅ Researched";

        advancedButton.disabled =
            true;

    }
    else if (
        researches.basicMetallurgy.researched
    ) {

        advanced.classList.remove(
            "locked-research"
        );

        advancedButton.disabled =
            false;

        advancedButton.textContent =
            "Research — $1,500";

    }


    // ==============================
    // AUTOMATION
    // ==============================

    let automation =
        document.getElementById(
            "automationResearch"
        );

    let automationButton =
        automation.querySelector(
            "button"
        );


    if (
        researches.automation.researched
    ) {

        automation.classList.add(
            "researched"
        );

        automationButton.textContent =
            "✅ Researched";

        automationButton.disabled =
            true;

    }
    else if (
        researches.advancedManufacturing.researched
    ) {

        automation.classList.remove(
            "locked-research"
        );

        automationButton.disabled =
            false;

        automationButton.textContent =
            "Research — $5,000";

    }


    // ==============================
    // GLASSMAKING
    // ==============================

    let glassmaking =
        document.getElementById(
            "glassmakingResearch"
        );

    let glassmakingButton =
        glassmaking.querySelector(
            "button"
        );


    if (
        researches.glassmaking.researched
    ) {

        glassmaking.classList.remove(
            "locked-research"
        );

        glassmaking.classList.add(
            "researched"
        );

        glassmakingButton.textContent =
            "✅ Researched";

        glassmakingButton.disabled =
            true;

    }
    else if (
        prestigeLevel >= 1
    ) {

        glassmaking.classList.remove(
            "locked-research"
        );

        glassmakingButton.disabled =
            false;

        glassmakingButton.textContent =
            "Research — $1,000";

    }
    else {

        glassmakingButton.disabled =
            true;

        glassmakingButton.textContent =
            "🔒 Requires Prestige 1";

    }

}

// ==============================
// SELL IRON
// ==============================

function sellIron() {

    if (iron > 0) {

        let amount = iron;

        money += amount * 10;

        iron = 0;


        log(
            "Sold " +
            amount +
            " Iron for $" +
            (amount * 10) +
            "."
        );


        updateScreen();

    }
    else {

        log(
            "You don't have any Iron!"
        );

    }

}

// ==============================
// SELL COAL
// ==============================

function sellCoal() {

    if (coal > 0) {

        let amount = coal;

        money += amount * 15;

        coal = 0;


        log(
            "Sold " +
            amount +
            " Coal for $" +
            (amount * 15) +
            "."
        );


        updateScreen();

    }
    else {

        log(
            "You don't have any Coal!"
        );

    }

}

// ==============================
// SELL STEEL
// ==============================

function sellSteel() {

    if (steel > 0) {

        let amount = steel;

        money += amount * 50;

        steel = 0;


        log(
            "Sold " +
            amount +
            " Steel for $" +
            (amount * 50) +
            "."
        );


        updateScreen();

    }
    else {

        log(
            "You don't have any Steel!"
        );

    }

}

// ==============================
// PRESTIGE UI
// ==============================

function updatePrestigeUI() {

    prestigeRequirement =
        calculatePrestigeRequirement();


    let prestigeLevelElement =
        document.getElementById(
            "prestigeLevel"
        );

    let prestigeRequirementElement =
        document.getElementById(
            "prestigeRequirement"
        );

    let prestigeButton =
        document.getElementById(
            "prestigeButton"
        );

    let nextMachineBonus =
        document.getElementById(
            "nextMachineBonus"
        );

    let prestigeUnlock =
        document.getElementById(
            "prestigeUnlock"
        );


    if (prestigeLevelElement) {

        prestigeLevelElement.textContent =
            prestigeLevel;

    }


    if (prestigeRequirementElement) {

        prestigeRequirementElement.textContent =
            prestigeRequirement.toLocaleString();

    }


    if (prestigeButton) {

        prestigeButton.disabled =
            money < prestigeRequirement;

    }


    if (nextMachineBonus) {

        nextMachineBonus.textContent =
            "+5 Iron Miners, " +
            "+2 Coal Miners, " +
            "+2 Steel Factories";

    }


    if (prestigeUnlock) {

        if (prestigeLevel >= 1) {

            prestigeUnlock.textContent =
                "🪟 Glassmaking unlocked!";

        }
        else {

            prestigeUnlock.textContent =
                "🔒 Glassmaking unlocks at Prestige 1.";

        }

    }

}

// ==============================
// PRESTIGE
// ==============================

function prestige() {

    prestigeRequirement =
        calculatePrestigeRequirement();


    if (
        money < prestigeRequirement
    ) {

        log(
            "You need $" +
            prestigeRequirement.toLocaleString() +
            " to Prestige!"
        );

        return;

    }


    prestigeLevel++;


    prestigeRequirement =
        calculatePrestigeRequirement();


    // Reset money

    money = 100;


    // Reset resources

    iron = 0;
    coal = 0;
    steel = 0;
    sand = 0;
    silica = 0;
    glass = 0;


    // Reset machines

    miners = 0;
    coalMiners = 0;
    steelFactories = 0;
    glassFactories = 0;
    sandMiners = 0;
    silicaMiners = 0;


    // Research remains permanently unlocked


    log(
        "⭐ Prestige " +
        prestigeLevel +
        " complete! Your factory has been reset."
    );


    updateScreen();

    updateResearchUI();

}

// ==============================
// FACTORY PRODUCTION
// ==============================

function produce() {

    // ==============================
    // IRON
    // ==============================

    if (miners > 0) {

        iron += miners;

    }


    // ==============================
    // COAL
    // ==============================

    if (coalMiners > 0) {

        coal += coalMiners;

    }

    // ==============================
    // SAND
    // ==============================

    if (sandMiners > 0) {

        sand += sandMiners;

    }


    // ==============================
    // SILICA
    // ==============================

    if (silicaMiners > 0) {

        silica += silicaMiners;

    }


    // ==============================
    // STEEL
    // ==============================

    for (
        let i = 0;
        i < steelFactories;
        i++
    ) {

        // 2 Iron + 1 Coal = 1 Steel

        if (
            iron >= 2 &&
            coal >= 1
        ) {

            iron -= 2;

            coal -= 1;

            steel++;

        }

    }


    // ==============================
    // GLASS
    // ==============================

    /*
        Glass recipe:

        2 Sand + 1 Silica
        =
        1 Glass

        Sand and Silica production
        will be added later.
    */

    for (
        let i = 0;
        i < glassFactories;
        i++
    ) {

        if (
            sand >= 2 &&
            silica >= 1
        ) {

            sand -= 2;

            silica -= 1;

            glass++;

        }

    }


    updateScreen();

}

// ==============================
// DEVELOPER MODE
// ==============================

function unlockDevMode() {

    const password =
        document.getElementById(
            "devPassword"
        ).value;


    if (
        password === DEV_PASSWORD
    ) {

        devMode = true;

        document.getElementById(
            "devPanel"
        ).style.display =
            "block";

        log(
            "🛠️ Developer Mode activated!"
        );

    }
    else {

        log(
            "❌ Incorrect developer password."
        );

    }

}


function devGiveMoney() {

    const amount =
        Number(
            document.getElementById(
                "devMoneyAmount"
            ).value
        );


    if (
        amount <= 0 ||
        isNaN(amount)
    ) {

        log(
            "❌ Enter a valid amount."
        );

        return;

    }


    money += amount;


    updateScreen();


    log(
        `💰 Developer added $${amount.toLocaleString()}`
    );

}

// ==============================
// FACTORY LOG
// ==============================

function log(message) {

    document.getElementById(
        "log"
    ).textContent =
        message;

}

// ==============================
// PRODUCTION TIMER
// ==============================

setInterval(
    produce,
    3000
);

// ==============================
// START GAME
// ==============================

updateScreen();

updateResearchUI();
