// ==UserScript==
// @name        Wallausbau
// @namespace   NoelzeN
// @include     https://*.die-staemme.de/game.php?village=*&screen=main
// @version     1
// ==/UserScript==

var WALLAUSBAU = true; //Auf true setzen wenn nur Wall ausgebaut werden soll, auf False wenn das Ganze Dorf ausgebaut werden soll. Bisher funktioniert nur der Wallausbau
var first = document.getElementById("buildorder_1");
var second = document.getElementById("buildorder_2");
var third = document.getElementById("buildorder_3");
var fourth = document.getElementById("buildorder_4");
var queuecount = 4;
if (first === null) {
    queuecount--;
}
if (second === null) {
    queuecount--;
}
if (third === null) {
    queuecount--;
}
if (fourth === null) {
    queuecount--;
}
queuecount++; //Assume one building is always there, somehow the first isn't counted
console.log("Build Queue: " + queuecount + " Buildings");
if (WALLAUSBAU) {
    var wallzeile = document.getElementById("main_buildrow_wall");
    var wallstufe = wallzeile.cells[0].childNodes[6].textContent.split(" ")[1];
    console.log("Wallstufe Aktuell: " + wallstufe);
    var klickbutton = wallzeile.cells[6].childNodes[3];
    console.log(klickbutton);
    var freiebauschleife = 5 - queuecount;
    var walldown = 20 - wallstufe;
    if (freiebauschleife > walldown) {
        freiebauschleife = walldown;
    }
    console.log(klickbutton.href);
    await sleep(2000);
    if (freiebauschleife > 0) {
        location.href = klickbutton.href;
    }
} else { //Alles ausbauen
    //TODO: Aufbaureihenfolge festlegen

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}