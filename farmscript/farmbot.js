// ==UserScript==
// @name         Farmassi
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Einfaches Script zum B Button klicken auf der Farmassi Seite
// @author       NoelzeN
// @match        https://*.die-staemme.de/game.php?village=*&screen=am_farm*
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    var all = document.getElementsByTagName("*"); //Get all elements from the page
    var belements = [];
    var lkavHome = 0;
    var splitSize = 5; //Default Split size. Will try to get the split size from the page itself. Assuming only light cavalerie is used for farming
    for (var lol = 0; lol < all.length; lol++) {
        if (all[lol].name === "light") {
            if (all[lol].type === "text") {
                if (all[lol].value > 0) {
                    splitSize = all[lol].value; //Get configured split size from page
                }
            }
        }
    }
    //Get all B Button Elements from the Page
    for (var i = 0, max = all.length; i < max; i++) {
        if (all[i].classList.contains("unit-item-light")) {
            lkavHome = all[i].innerText; //Get number of LKav in the village. Used to calculate how many splits can be sent
        }
        if (all[i].classList.contains("farm_icon_b")) {
            belements.push(all[i]); //Collect all B Button elements in the array
        }
    }
    if (Number(belements.length - 1) > Number(lkavHome)) {
        //There are not enough units home to send a split to every available village from the farming assistant. If you only want to send farm incs in case all villages can be attacked, uncomment the line with return here.
        //By default, incs will be sent even if not enough uits are home. Some villages will not be attacked in this case
        //console.log("Not enough LKav. " + Number(lkavHome) + " home but " + Number(belements.length-1) + " needed!");
        //return;
    }
    //If you want to randomize the order of villages attacks are sent to, uncomment the next line. Implemented to avoid script detection but also works fine without the shuffling
    //belements = shuffle(belements);
    var aleng = belements.length;
    if (Number(lkavHome) < (aleng * splitSize)) {
        aleng = Number(lkavHome) / splitSize; //Calculate the number of attacks that can be sent from the split size and units home
    }
    //Iterate over B Buttons
    for (i = 0; i < aleng; i++) {
        // Click Button
        belements[i].click();
        //In 10% of the cases simulate a missclick by sleeping 1 second before the next click
        var missClick = Math.floor(Math.random() * 100);
        if (missClick > 90) {
            await sleep(Math.floor(Math.random() * 300) + 1200);
        } else {
            //Sleep for a random time between 250 and 400 ms
            await sleep(Math.floor(Math.random() * 150) + 250);
        }

    }
})();

function clickButton(b) {
    b.click();
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}