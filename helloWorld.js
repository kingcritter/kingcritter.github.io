// globals
var N = 30;
var array;
var loopIntervalID;
var currentSortMethod = "insertion";
var state = 0 // 0 for not sorting, 1 for sorting

// object used to describe sort methods:
function sortMethod(name, method) {
	this.name = name;
	this.method = method;
}

// global list of all sorts:
var listOfSorts = [
	new sortMethod("insertion", "insertionSort()"),
	new sortMethod("bubble", "bubbleSort()")
];

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
		var button = document.getElementById("sort");
		button.setAttribute("onclick", "refresh()");
		button.innerHTML = "Refresh";
	}
}

function refresh() {
	array = newArray(N);
	drawBars(array);
	var button = document.getElementById("sort");
	button.setAttribute("onclick", "sort()");
	button.innerHTML = "Sort this thang";
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

for (i = 0; i < listOfSorts.length; i++) {
	var sortType = listOfSorts[i]; 
	var button = document.createElement("input");
	// set attributes: onclick, type, name
	button.setAttribute("onclick", "switchAlgorithm('" + sortType.name + "')");
	button.setAttribute("type", "radio");
	button.setAttribute("name", "sort");
	var text = document.createTextNode(sortType.name);
	buttonArea.appendChild(button);
	buttonArea.appendChild(text);

	//set default:
	if (i === 0) {
		button.setAttribute("checked", "checked");
	}
}
