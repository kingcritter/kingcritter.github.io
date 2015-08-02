// globals
var N = 30;
var array;
var loopIntervalID;
var currentSortMethod = "insertion";

// Sets up an interval to sort and update the canvas.
// Triggered by onclick event.
function sort() {
	var history = [];
	if (currentSortMethod === "insertion") {
		history = insertionSort(array);
	} else if (currentSortMethod === "bubble") {
		history = bubbleSort(array);
	}

	loopIntervalID = window.setInterval(function() {
		replayHistory(history, loopIntervalID);
    }, 50); 
}

// plays the next thing from the history queue
function replayHistory(history, id) {
	if (history.length > 0) {
		drawBars(history.shift());
	}
	else {
		window.clearTimeout(id);
	}
}


// runs when button is clicked, updates the number of bars
// and redraws the screen.
// Triggered by onclick event.
function update_N() {
	var new_n = document.getElementById("n_entry").value;
	if (isNaN(new_n) === false && new_n > 0) {
		if (new_n > c.width/10) {
			alert("Number too big!")
		}
		else {
			window.clearTimeout(loopIntervalID);
			document.getElementById("current_N").innerHTML = new_n;
			N = new_n;
			array = newArray(N);
			drawBars(array);
		}
	}
}

// fires when radio buttons are clicked; all radio buttons
// activate this, but pass in the name of whatever sort algo
function switchAlgorithm(algoName) {
	currentSortMethod = algoName;
	window.clearTimeout(loopIntervalID);
}

// randomly generate a new array of length N
function newArray(n) {
	var newArray = []
	for (i = 0; i < n; i++) {
		newArray.push(Math.random());
	}
	return newArray;
}

// main: stuff that runs first:

//canvas shit
var c = document.getElementById("canvas");
c.height = 200;
c.width = 400;
var ctx = c.getContext("2d");
ctx.fillStyle = "FF0000";

array = newArray(N);
drawBars(array);

document.getElementById("current_N").innerHTML = N;