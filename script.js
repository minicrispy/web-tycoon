// ==============================
// GAME DATA
// ==============================

let money = 100;

let iron = 0;
let coal = 0;
let steel = 0;

// Machines
let miners = 0;
let coalMiners = 0;
let steelFactories = 0;

// Prestige
let prestigeLevel = 0;
let prestigeRequirement = 10000;

// Base machine limits
const BASE_IRON_MINERS = 10;
const BASE_COAL_MINERS = 5;
const BASE_STEEL_FACTORIES = 5;


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

    // Hide every tab
    let tabs = document.querySelectorAll(".tab");

    tabs.forEach(function(tab) {
        tab.classList.remove("active");
    });


    // Remove active from every button
    let buttons = document.querySelectorAll(".tab-button");

    buttons.forEach(function(button) {
        button.classList.remove("active");
    });


    // Show selected tab
    document.getElementById(tabName).classList.add("active");


    // Find the button that opened this tab
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

    // Money
    document.getElementById("money").textContent = money;

    // Resources
    document.getElementById("iron").textContent = iron;
    document.getElementById("coal").textContent = coal;
    document.getElementById("steel").textContent = steel;

    // Machines
    document.getElementById("miners").textContent = miners;
    document.getElementById("coalMiners").textContent = coalMiners;
    document.getElementById("steelFactories").textContent = steelFactories;


    // ==============================
    // IRON MINER BUTTON
    // ==============================

    let maxIronMiners = getMaxIronMiners();

    let minerBuyButton =
        document.getElementById("minerBuyButton");

    minerBuyButton.disabled =
        miners >= maxIronMiners;

    minerBuyButton.textContent =
        miners >= maxIronMiners
            ? "Limit Reached"
            : "Buy";

    document.getElementById("minerSellButton").disabled =
        miners === 0;


    // ==============================
    // COAL MINER BUTTON
    // ==============================

    let maxCoalMiners = getMaxCoalMiners();

    let coalMinerBuyButton =
        document.getElementById("coalMinerBuyButton");

    coalMinerBuyButton.disabled =
        coalMiners >= maxCoalMiners;

    coalMinerBuyButton.textContent =
        coalMiners >= maxCoalMiners
            ? "Limit Reached"
            : "Buy";

    document.getElementById("coalMinerSellButton").disabled =
        coalMiners === 0;


    // ==============================
    // STEEL FACTORY BUTTON
    // ==============================

    let maxSteelFactories = getMaxSteelFactories();

    let steelFactoryBuyButton =
        document.getElementById("steelFactoryButton");


    if (researches.basicMetallurgy.researched) {

        steelFactoryBuyButton.disabled =
            steelFactories >= maxSteelFactories;

        steelFactoryBuyButton.textContent =
            steelFactories >= maxSteelFactories
                ? "Limit Reached"
                : "Buy";

    }


    document.getElementById("steelFactorySellButton").disabled =
        steelFactories === 0;


    // ==============================
    // PRODUCTION DISPLAYS
    // ==============================

    document.getElementById("ironProduction").textContent =
        miners + " Iron / 3 sec";

    document.getElementById("coalProduction").textContent =
        coalMiners + " Coal / 3 sec";

    document.getElementById("steelProduction").textContent =
        steelFactories + " Steel / 3 sec";


    // ==============================
    // PRESTIGE UI
    // ==============================

    updatePrestigeUI();

}


// ==============================
// BUY IRON MINER
// ==============================

function buyMiner() {

    let maxIronMiners = getMaxIronMiners();

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

        log("Bought an Iron Miner!");

        updateScreen();

    } else {

        log("Not enough money!");

    }

}


// ==============================
// BUY COAL MINER
// ==============================

function buyCoalMiner() {

    let maxCoalMiners = getMaxCoalMiners();

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

        log("Bought a Coal Miner!");

        updateScreen();

    } else {

        log("Not enough money!");

    }

}


// ==============================
// BUY STEEL FACTORY
// ==============================

function buySteelFactory() {

    // Make sure Basic Metallurgy has been researched
    if (!researches.basicMetallurgy.researched) {

        log("Research Basic Metallurgy first!");

        return;
    }


    let maxSteelFactories = getMaxSteelFactories();

    if (steelFactories >= maxSteelFactories) {

        log(
            "You can only own " +
            maxSteelFactories +
            " Steel Factories!"
        );

        return;
    }


    // Check money
    if (money >= 150) {

        money -= 150;

        steelFactories++;

        log("Bought a Steel Factory!");

        updateScreen();

    } else {

        log("Not enough money!");

    }

}


// ==============================
// SELL MACHINES
// ==============================

function sellMiner() {

    if (miners === 0) {

        log("You don't have any Iron Miners!");

        return;
    }


    miners--;

    money += 25;

    log("Sold an Iron Miner for $25.");

    updateScreen();

}


function sellCoalMiner() {

    if (coalMiners === 0) {

        log("You don't have any Coal Miners!");

        return;
    }


    coalMiners--;

    money += 37;

    log("Sold a Coal Miner for $37.");

    updateScreen();

}


function sellSteelFactory() {

    if (steelFactories === 0) {

        log("You don't have any Steel Factories!");

        return;
    }


    steelFactories--;

    money += 75;

    log("Sold a Steel Factory for $75.");

    updateScreen();

}


// ==============================
// RESEARCH SYSTEM
// ==============================

function canResearch(researchName) {

    let research = researches[researchName];

    if (!research) {
        return false;
    }


    if (research.researched) {
        return false;
    }


    if (money < research.cost) {
        return false;
    }


    for (let requirement of research.requires) {

        if (!researches[requirement].researched) {
            return false;
        }

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
        return;
    }


    if (researchData.researched) {

        log("You already researched this!");

        return;
    }


    // Check requirements

    for (let requirement of researchData.requires) {

        if (!researches[requirement].researched) {

            log(
                "You need to research " +
                requirement +
                " first!"
            );

            return;
        }

    }


    // Check money

    if (money < researchData.cost) {

        log(
            "You need $" +
            researchData.cost +
            " to research this!"
        );

        return;
    }


    // Pay for research

    money -= researchData.cost;

    researchData.researched = true;


    log("Research completed!");


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
        improvedMining.querySelector("button");


    if (researches.improvedMining.researched) {

        improvedMining.classList.add("researched");

        improvedMiningButton.textContent =
            "✅ Researched";

        improvedMiningButton.disabled = true;

    }


    // ==============================
    // BASIC METALLURGY
    // ==============================

    let basicMetallurgy =
        document.getElementById(
            "basicMetallurgyResearch"
        );

    let basicMetallurgyButton =
        basicMetallurgy.querySelector("button");


    if (researches.basicMetallurgy.researched) {

        basicMetallurgy.classList.add("researched");

        basicMetallurgyButton.textContent =
            "✅ Researched";

        basicMetallurgyButton.disabled = true;


        // Unlock Steel Factory
        let steelButton =
            document.getElementById(
                "steelFactoryButton"
            );

        steelButton.disabled = false;

        steelButton.textContent = "Buy";


        document
            .getElementById("steelFactoryMachine")
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
        advanced.querySelector("button");


    if (researches.advancedManufacturing.researched) {

        advanced.classList.add("researched");

        advancedButton.textContent =
            "✅ Researched";

        advancedButton.disabled = true;

    }
    else if (
        researches.basicMetallurgy.researched
    ) {

        advanced.classList.remove(
            "locked-research"
        );

        advancedButton.disabled = false;

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
        automation.querySelector("button");


    if (researches.automation.researched) {

        automation.classList.add("researched");

        automationButton.textContent =
            "✅ Researched";

        automationButton.disabled = true;

    }
    else if (
        researches.advancedManufacturing.researched
    ) {

        automation.classList.remove(
            "locked-research"
        );

        automationButton.disabled = false;

        automationButton.textContent =
            "Research — $5,000";

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

    } else {

        log("You don't have any Iron!");

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

    } else {

        log("You don't have any Coal!");

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

    } else {

        log("You don't have any Steel!");

    }

}


// ==============================
// PRESTIGE SYSTEM
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


    // Update prestige level
    if (prestigeLevelElement) {

        prestigeLevelElement.textContent =
            prestigeLevel;

    }


    // Update requirement
    if (prestigeRequirementElement) {

        prestigeRequirementElement.textContent =
            prestigeRequirement.toLocaleString();

    }


    // Update prestige button
    if (prestigeButton) {

        prestigeButton.disabled =
            money < prestigeRequirement;

    }


    // ==============================
    // MACHINE BONUS
    // ==============================

    if (nextMachineBonus) {

        nextMachineBonus.textContent =
            "+5 Iron Miners, " +
            "+2 Coal Miners, " +
            "+2 Steel Factories";

    }


    // ==============================
    // GLASSMAKING UNLOCK
    // ==============================

    if (prestigeUnlock) {

        if (prestigeLevel >= 1) {

            prestigeUnlock.textContent =
                "🪟 Glassmaking unlocked!";

        } else {

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


    // Make sure the player can prestige
    if (money < prestigeRequirement) {

        log(
            "You need $" +
            prestigeRequirement.toLocaleString() +
            " to Prestige!"
        );

        return;
    }


    // ==============================
    // INCREASE PRESTIGE
    // ==============================

    prestigeLevel++;


    // Calculate new requirement
    prestigeRequirement =
        calculatePrestigeRequirement();


    // ==============================
    // RESET MONEY
    // ==============================

    money = 100;


    // ==============================
    // RESET RESOURCES
    // ==============================

    iron = 0;
    coal = 0;
    steel = 0;


    // ==============================
    // RESET MACHINES
    // ==============================

    miners = 0;
    coalMiners = 0;
    steelFactories = 0;


    // ==============================
    // RESEARCH STAYS
    // ==============================

    // Nothing happens to researches.
    // Research is permanently kept.


    // ==============================
    // LOG
    // ==============================

    log(
        "⭐ Prestige " +
        prestigeLevel +
        " complete! Your factory has been reset."
    );


    // Update everything
    updateScreen();

    updateResearchUI();

}


// ==============================
// FACTORY PRODUCTION
// ==============================

function produce() {

    // ==============================
    // IRON PRODUCTION
    // ==============================

    if (miners > 0) {

        iron += miners;

    }


    // ==============================
    // COAL PRODUCTION
    // ==============================

    if (coalMiners > 0) {

        coal += coalMiners;

    }


    // ==============================
    // STEEL PRODUCTION
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


    updateScreen();

}


// ==============================
// FACTORY LOG
// ==============================

function log(message) {

    document.getElementById(
        "log"
    ).textContent = message;

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