// ==============================
// GAME DATA
// ==============================

let money = 100;

let iron = 0;
let coal = 0;
let steel = 0;

let miners = 0;
let coalMiners = 0;
let steelFactories = 0;
const MAX_MACHINES = 5;

// Research
let metallurgyResearched = false;


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

        if (button.getAttribute("onclick") === "openTab('" + tabName + "')") {

            button.classList.add("active");
        }
    });
}


// ==============================
// UPDATE SCREEN
// ==============================

function updateScreen() {

    document.getElementById("money").textContent = money;

    document.getElementById("iron").textContent = iron;

    document.getElementById("coal").textContent = coal;

    document.getElementById("steel").textContent = steel;

    document.getElementById("miners").textContent = miners;

    document.getElementById("coalMiners").textContent = coalMiners;

    document.getElementById("steelFactories").textContent = steelFactories;

    let minerBuyButton = document.getElementById("minerBuyButton");
    minerBuyButton.disabled = miners >= MAX_MACHINES;
    minerBuyButton.textContent = miners >= MAX_MACHINES ? "Limit Reached" : "Buy";
    document.getElementById("minerSellButton").disabled = miners === 0;

    let coalMinerBuyButton = document.getElementById("coalMinerBuyButton");
    coalMinerBuyButton.disabled = coalMiners >= MAX_MACHINES;
    coalMinerBuyButton.textContent = coalMiners >= MAX_MACHINES ? "Limit Reached" : "Buy";
    document.getElementById("coalMinerSellButton").disabled = coalMiners === 0;

    let steelFactoryBuyButton = document.getElementById("steelFactoryButton");
    if (researches.basicMetallurgy.researched) {
        steelFactoryBuyButton.disabled = steelFactories >= MAX_MACHINES;
        steelFactoryBuyButton.textContent =
            steelFactories >= MAX_MACHINES ? "Limit Reached" : "Buy";
    }
    document.getElementById("steelFactorySellButton").disabled = steelFactories === 0;


    // Update production displays

    document.getElementById("ironProduction").textContent =
        miners + " Iron / 3 sec";

    document.getElementById("coalProduction").textContent =
        coalMiners + " Coal / 3 sec";

    document.getElementById("steelProduction").textContent =
        steelFactories + " Steel / 3 sec";
}


// ==============================
// BUY IRON MINER
// ==============================

function buyMiner() {

    if (miners >= MAX_MACHINES) {
        log("You can only own 5 Iron Miners!");
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

    if (coalMiners >= MAX_MACHINES) {
        log("You can only own 5 Coal Miners!");
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
// RESEARCH SYSTEM
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
// CHECK RESEARCH REQUIREMENTS
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

    let researchData = researches[researchName];

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

    // Improved Mining

    let improvedMining =
        document.getElementById("improvedMiningResearch");

    let improvedMiningButton =
        improvedMining.querySelector("button");


    if (researches.improvedMining.researched) {

        improvedMining.classList.add("researched");

        improvedMiningButton.textContent =
            "✅ Researched";

        improvedMiningButton.disabled = true;

    }


    // Basic Metallurgy

    let basicMetallurgy =
        document.getElementById("basicMetallurgyResearch");

    let basicMetallurgyButton =
        basicMetallurgy.querySelector("button");


    if (researches.basicMetallurgy.researched) {

        basicMetallurgy.classList.add("researched");

        basicMetallurgyButton.textContent =
            "✅ Researched";

        basicMetallurgyButton.disabled = true;


        // Unlock Steel Factory

        let steelButton =
            document.getElementById("steelFactoryButton");

        steelButton.disabled = false;

        steelButton.textContent =
            "Buy";


        document
            .getElementById("steelFactoryMachine")
            .classList.remove("locked-machine");

    }


    // Advanced Manufacturing

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


    // Automation

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
// BUY STEEL FACTORY
// ==============================

function buySteelFactory() {

    // Make sure Basic Metallurgy has been researched
    if (!researches.basicMetallurgy.researched) {

        log("Research Basic Metallurgy first!");

        return;
    }

    if (steelFactories >= MAX_MACHINES) {
        log("You can only own 5 Steel Factories!");
        return;
    }


    // Check if you have enough money
    if (money >= 150) {

        money -= 150;

        steelFactories++;

        log("Bought a Steel Factory!");

        updateScreen();

    } else {

        log("Not enough money!");
    }
}


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
// FACTORY PRODUCTION
// ==============================

function produce() {

    // Iron production
    if (miners > 0) {

        iron += miners;
    }


    // Coal production
    if (coalMiners > 0) {

        coal += coalMiners;
    }


    // Steel production
    for (let i = 0; i < steelFactories; i++) {

        // 2 Iron + 1 Coal = 1 Steel

        if (iron >= 2 && coal >= 1) {

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

    document.getElementById("log").textContent = message;
}


// ==============================
// PRODUCTION TIMER
// ==============================

setInterval(produce, 3000);


// ==============================
// START GAME
// ==============================

updateScreen();
updateResearchUI();