/* =====================================================
   CYBERQUEST GAME ENGINE
===================================================== */

let xp = 0;
let completedMissions = 0;
let streak = 0;


/* =====================================================
   SCREEN CONTROL
===================================================== */

function hidePages() {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });

}


function openHome() {

    hidePages();

    document.getElementById("home").classList.remove("hidden");

}


function openAbout() {

    hidePages();

    document.getElementById("about").classList.remove("hidden");

}


function openDashboard() {

    hidePages();

    document.getElementById("dashboard").classList.remove("hidden");

    updateDashboard();

}


/* =====================================================
   MISSIONS
===================================================== */

function startPhishing() {

    hidePages();

    document.getElementById("phishing").classList.remove("hidden");

}


function startPassword() {

    hidePages();

    document.getElementById("password").classList.remove("hidden");

}


function startSocial() {

    hidePages();

    document.getElementById("social").classList.remove("hidden");

}


/* =====================================================
   XP SYSTEM
===================================================== */

function addXP(amount) {

    xp += amount;

    updateDashboard();

}


function getLevel() {

    if (xp >= 1000) {
        return 3;
    }

    if (xp >= 500) {
        return 2;
    }

    return 1;

}


/* =====================================================
   DASHBOARD UPDATE
===================================================== */

function updateDashboard() {

    const level = getLevel();


    document.getElementById("nav-xp").innerText =
        "XP " + String(xp).padStart(3, "0");


    document.getElementById("nav-level").innerText =
        "LVL 0" + level;


    document.getElementById("level").innerText =
        "0" + level;


    document.getElementById("total-xp").innerText =
        String(xp).padStart(3, "0");


    document.getElementById("mission-count").innerText =
        completedMissions + "/3";


    document.getElementById("streak").innerText =
        streak;


    const score =
        Math.round((completedMissions / 3) * 100);


    document.getElementById("security-score").innerText =
        score + "%";


    document.getElementById("xp-text").innerText =
        xp + " / 1500";


    const progress =
        Math.min((xp / 1500) * 100, 100);


    document.getElementById("xp-progress").style.width =
        progress + "%";


    updateAchievements();

}


/* =====================================================
   ACHIEVEMENTS
===================================================== */

function updateAchievements() {

    if (completedMissions >= 1) {

        document
            .getElementById("badge-first")
            .classList.remove("locked");

        document
            .getElementById("badge-first")
            .classList.add("unlocked");

    }


    if (completedMissions >= 2) {

        document
            .getElementById("badge-hunter")
            .classList.remove("locked");

        document
            .getElementById("badge-hunter")
            .classList.add("unlocked");

    }


    if (completedMissions >= 3) {

        document
            .getElementById("badge-master")
            .classList.remove("locked");

        document
            .getElementById("badge-master")
            .classList.add("unlocked");

    }

}


/* =====================================================
   COMPLETE MISSION
===================================================== */

function completeMission(name) {

    completedMissions++;

    streak++;

    addXP(500);


    const badge =
        document.getElementById("complete-" + name);


    if (badge) {

        badge.classList.remove("hidden");

    }


    updateDashboard();

}


/* =====================================================
   MISSION 01 — PHISHING
===================================================== */

function checkPhishing() {

    const checked =
        document.querySelectorAll(
            '#phishing input:checked'
        );


    const selected =
        Array
            .from(checked)
            .map(item => item.value);


    const correct = ["1", "2", "3"];


    const correctAnswer =

        selected.length === 3 &&

        selected.every(
            item => correct.includes(item)
        );


    const result =
        document.getElementById(
            "phishing-result"
        );


    if (correctAnswer) {

        result.innerHTML =
            "✓ THREAT IDENTIFIED! " +
            "Excellent analysis. " +
            "+500 XP unlocked.";

        result.style.color =
            "var(--green)";


        if (
            !document
                .getElementById("complete-phishing")
                .classList
                .contains("hidden")
        ) {

            return;

        }


        completeMission("phishing");


        setTimeout(
            openDashboard,
            1800
        );

    }

    else {

        result.innerHTML =
            "✕ ANALYSIS FAILED. " +
            "Look at the sender address, " +
            "urgency and verification request.";

        result.style.color =
            "var(--pink)";

    }

}


/* =====================================================
   MISSION 02 — PASSWORD
===================================================== */

function checkPassword(choice) {

    const result =
        document.getElementById(
            "password-result"
        );


    if (choice === 3) {

        result.innerHTML =
            "✓ VAULT UNLOCKED! " +
            "Strong choice. " +
            "+500 XP unlocked.";

        result.style.color =
            "var(--green)";


        if (
            !document
                .getElementById("complete-password")
                .classList
                .contains("hidden")
        ) {

            return;

        }


        completeMission("password");


        setTimeout(
            openDashboard,
            1800
        );

    }

    else {

        result.innerHTML =
            "✕ ACCESS DENIED. " +
            "Choose a longer and less predictable password.";

        result.style.color =
            "var(--pink)";

    }

}


/* =====================================================
   MISSION 03 — SOCIAL ENGINEERING
===================================================== */

function checkSocial(choice) {

    const result =
        document.getElementById(
            "social-result"
        );


    if (choice === 2) {

        result.innerHTML =
            "✓ THREAT BLOCKED! " +
            "Never share passwords through unsolicited requests. " +
            "+500 XP unlocked.";

        result.style.color =
            "var(--green)";


        if (
            !document
                .getElementById("complete-social")
                .classList
                .contains("hidden")
        ) {

            return;

        }


        completeMission("social");


        /*
           IMPORTANT:
           This is the FINAL mission,
           so we show the final results screen.
        */

        setTimeout(
            showFinalResult,
            1800
        );

    }

    else {

        result.innerHTML =
            "✕ SOCIAL ENGINEERING DETECTED. " +
            "Never share your password. " +
            "Report suspicious requests instead.";

        result.style.color =
            "var(--pink)";

    }

}


/* =====================================================
   FINAL RESULT SCREEN
===================================================== */

function showFinalResult() {

    hidePages();


    document
        .getElementById("result")
        .classList
        .remove("hidden");


    document
        .getElementById("final-xp")
        .innerText =
        String(xp).padStart(3, "0");


    document
        .getElementById("final-score")
        .innerText =
        Math.round(
            (completedMissions / 3) * 100
        ) + "%";


    document
        .getElementById("final-missions")
        .innerText =
        completedMissions + "/3";

}