// globals
var N = 30;
var bars;
var loopIntervalID;
var currentSortMethod = "insertion";

// Sets up an interval to sort and update the canvas.
// Triggered by onclick event.
function sort() {
	loopIntervalID = window.setInterval(function() {
	insertionSort(bars, loopIntervalID);
	drawBars();
    }, 50); 
}

// runs when button is clicked, updates the number of bars
// and redraws the screen.
// Triggered by onclick event.
function update_N() {
	var new_n = document.getElementById("n_entry").value;
	if (isNaN(new_n) === false && new_n > 0) {
		resetInsertionSortLoop(loopIntervalID);
		document.getElementById("current_N").innerHTML = new_n;
		N = new_n;
		bars = generate_bars(N);
		drawBars();
	}
}

// fires when radio buttons are clicked; all radio buttons
// activate this, but pass in the name of whatever sort algo
function switchAlogrithm(algoName) {
	currentSortMethod = algoName;
}


// main: stuff that runs first:

var c = document.getElementById("canvas");
c.height = 200;
c.width = 400;
var ctx = c.getContext("2d");
ctx.fillStyle = "FF0000";

bars = generate_bars(N);
drawBars();
document.getElementById("current_N").innerHTML = N;