// ==UserScript==
// @name         Getimed Abschicken
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Incs automatisiert auf eine bestimmte Zeit abschicken
// @author       Nils Rehwald
// @match        https://*.die-staemme.de/game.php?village=*&screen=place&try=confirm
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    var ZIELZEIT = "22:59:59" //Zeitpung auf wann der Inc geschickt werden soll (Es geht nur der Zeitpunkt, nicht das Datum).
    var REFRESHAT = "22:59:30" //Zeitpunkt wann der Tab neu geladen werden soll, da die Uhrzeit nicht passt wenn der Tab laenger offen ist
    var GENAUTIMEN = false; //Will man versuchen genau zu timen --> True, Will man einfach nur die Sekunde treffen --> False
    var MILLIS = 800; //Millisekunde die man treffen will
	var randomdelay = false; //True if you want to have some random delay before sending the attach so you don't hite the same millisecond with each inc
	var mindelay = 100; //Minimum delay in milliseconds
	var maxdelay = 600; //Maximum delay in milliseconds
    var test = document.getElementById("date_arrival").innerText;
    var lastupdated = new Date();
    test = test.split(" ");
    test = test[test.length - 1];
    while(test != ZIELZEIT) {
		if(GENAUTIMEN) {
			await sleep(10);
		} else {
        	await sleep(500);
        }
        test = document.getElementById("date_arrival").innerText;
        test = test.split(" ");
        test = test[test.length - 1];
        if(test == REFRESHAT) {
        	browser.tabs.reload();
        }
    }
    if(GENAUTIMEN) {
    	await sleep(MILLIS);
    }
    if(randomdelay) {
    	var delay = Math.floor(Math.random() * (maxdelay - mindelay)) + mindelay
    }
    var sendbutton = document.getElementById("troop_confirm_go");
    sendbutton.click();
})();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
