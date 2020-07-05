// ==UserScript==
// @name        Automatische Forschung
// @description Auf der Dorfuebersichtsseite im Forschungsmodus einfach alles erforschen (Praktisch bei 10 Stufen Forschung ohne Account Manager, sonst useless)
// @namespace   NoelzeN
// @include     https://*.die-staemme.de/game.php?village=*&screen=overview_villages&mode=tech*
// @version     1
// ==/UserScript==

var buttons = document.getElementsByClassName("research_tech_button");
var size = buttons.length;

clickbuttons(buttons);

async function clickbuttons(buttons) {
    for (var i = 0; i < size; i++) {
        buttons[i].click();
        await sleep(100); //Zwischen 2 klicks 100ms schlafen
    }
    return;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}