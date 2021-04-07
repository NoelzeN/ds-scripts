// ==UserScript==
// @name         Getimed Abschicken
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Incs automatisiert auf eine bestimmte Zeit abschicken
// @author       Nils Rehwald
// @match        https://*.die-staemme.de/game.php*&screen=place&try=confirm
// @grant        none
// ==/UserScript==
const timeformat = new RegExp('[0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{3}');
var alert_shown = false;

var AG_ZIELZEITEN = ["22:55:55"];
var AG_MILLISEKUNDEN = [920];
var AG_MSRANGE = [0];
var INC_ZIELZEITEN = ["22:55:55"];
var INC_MILLISEKUNDEN = [600];
var INC_MSRANGE = [100];
var REFRESHINTERVAL = 10; //Script checks timestamp every X ms (Default: 10)

var changename = document.getElementById("attack_name_btn");
changename.addEventListener("click", function() {
    var zielzeit_manuell = document.getElementById("default_name");
    zielzeit_manuell = String(zielzeit_manuell.innerText);
    zielzeit_manuell = zielzeit_manuell.trim();
    if (zielzeit_manuell.includes(" ")) {
        zielzeit_manuell = zielzeit_manuell.split(" ");
        zielzeit_manuell = zielzeit_manuell[zielzeit_manuell.length - 1];
    }
    if (timeformat.test(zielzeit_manuell)) {
        zielzeit_manuell = zielzeit_manuell.split(":");
        AG_ZIELZEITEN = [parseInt(zielzeit_manuell[3])];
        AG_MILLISEKUNDEN = [parseInt(zielzeit_manuell[3])];
        AG_MSRANGE = [0];
        INC_ZIELZEITEN = [parseInt(zielzeit_manuell[3])];
        INC_MILLISEKUNDEN = [parseInt(zielzeit_manuell[3])];
        INC_MSRANGE = [0];
        zielzeit_manuell.pop();
        zielzeit_manuell = zielzeit_manuell.join(":");
        INC_ZIELZEITEN = [zielzeit_manuell];
        AG_ZIELZEITEN = [zielzeit_manuell];
    }
});

(async function() {
    'use strict';
    if (AG_ZIELZEITEN.length != AG_MILLISEKUNDEN.length || AG_MILLISEKUNDEN.length != AG_MSRANGE.length || INC_ZIELZEITEN.length != INC_MILLISEKUNDEN.length || INC_MILLISEKUNDEN.length != INC_MSRANGE.length) {
        alert("Error initializing Parameters. Length difference in Target Arrays");
    }
    var HASAG = document.getElementsByClassName("unit-item-snob")[1].innerText;
    var webpage_timer = document.getElementById("date_arrival").innerText; //Ankunftzeit von der Website crawlen
    var sendbutton = document.getElementById("troop_confirm_go"); //Send Button finden
    webpage_timer = webpage_timer.split(" ");
    webpage_timer = webpage_timer[webpage_timer.length - 1];

    while (true) {
        webpage_timer = document.getElementById("date_arrival").innerText;
        webpage_timer = webpage_timer.split(" ");
        webpage_timer = webpage_timer[webpage_timer.length - 1];

        if (HASAG == 1) { //AG INC
            for (let k = 0; k < AG_ZIELZEITEN.length; k++) {
                if (webpage_timer == AG_ZIELZEITEN[k]) {
                    await sleep(AG_MILLISEKUNDEN[k]);
                    if (AG_MSRANGE[k] > 0) {
                        await sleep(Math.floor(Math.random() * AG_MSRANGE[k]));
                    }
                    sendbutton.click();
                }
            }
        } else { //Normaler INC
            for (let k = 0; k < INC_ZIELZEITEN.length; k++) {
                if (webpage_timer == INC_ZIELZEITEN[k]) {
                    await sleep(INC_MILLISEKUNDEN[k]);
                    if (INC_MSRANGE[k] > 0) {
                        await sleep(Math.floor(Math.random() * INC_MSRANGE[k]));
                    }
                    sendbutton.click();
                }
            }
        }
        await sleep(REFRESHINTERVAL);
    }
})();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
