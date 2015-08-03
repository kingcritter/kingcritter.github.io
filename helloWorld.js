// globals
var N = 30;
var array;
var loopIntervalID;
var currentSortMethod = "insertion";
var state = 0 // 0 for not sorting, 1 for sorting


var listOfSorts = {
	"insertion": insertionSort,
	"bubble": bubbleSort
};

// Sets up an interval to sort and update the canvas.
// Triggered by onclick event.
function sort() {
	if (state === 0) {
		state = 1;
		var history = listOfSorts[currentSortMethod](array);
		// set up the interval to animate display
		loopIntervalID = window.setInterval(function() {
			replayHistory(history, loopIntervalID);
    	}, 50);
    	// changes button text
    	var button = document.getElementById("sort");
    	button.innerHTML = "Restart";
    }
    else { // if currently sorting, stop and refresh
    	state = 0;
    	window.clearTimeout(loopIntervalID);
    	array = newArray();
    	drawBars(array);
    	var button = document.getElementById("sort");
    	button.innerHTML = "Sort this thang";
    }
}

// plays the next thing from the history queue
function replayHistory(history, id) {
	if (history.length > 0) {
		drawBars(history.shift());
	}
	else {
		window.clearTimeout(id);
		state = 0;
		var button = document.getElementById("sort");
		button.innerHTML = "Refresh";
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
	array = newArray(N);
	drawBars(array);
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
ctx.fillStyle = "#000000";
ctx.strokeStyle = "#FF0000";
ctx.linewidth = 1;

array = newArray(N);
drawBars(array);

document.getElementById("current_N").innerHTML = N;

// add the radio buttons for the sorting methods
var buttonArea = document.getElementById("radioButtons");
console.log(buttonArea);

for (sortType in listOfSorts) {
	var button = document.createElement("input");
	// set attributes: onclick, type, name
	button.setAttribute("onclick", "switchAlgorithm('" + sortType + "')");
	button.setAttribute("type", "radio");
	button.setAttribute("name", "sort");
	var text = document.createTextNode(sortType);
	buttonArea.appendChild(button);
	buttonArea.appendChild(text);

	//set default:
	if (sortType === "insertion") {
		button.setAttribute("checked", "checked");
	}
}
