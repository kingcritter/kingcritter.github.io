// sortVisualizer!
// as it's one and only argument, it
// takes the document ID into which it creates it's GUI elements
function sortVisualizer(
	this.N = 30;
	this.array;
	this.loopIntervalID;
	this.currentSortMethod = "insertion";
	this.sorting = false // 0 for not sorting, 1 for sorting

	var c = document.getElementById("canvas");
	this.graphics = new Graphics(c);








	array = newArray(N);
	drawBars(array);




var listOfSorts = {
	"insertion": insertionSort,
	"bubble": bubbleSort
};

// sort button object
// takes the actual button Obj as constructer argument
function sortButtonObj(buttonObj) {
	this.text = "Sort";
	this.actions = {
		"Sort" : "'sort()'",
		"Restart" : "'restart()'"
	}

	this.changeAction = function(action) {
		this.text = action;
		buttonObj.setAttribute("onclick", this.actions[action]);
	}
}

// Sets up an interval to sort and update the canvas.
// Triggered by onclick event.
function sort(buttonCallback) {
	if (!sorting) {
		sorting = true;
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
    	sorting = false;
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
// end radio button shit

// set up sort button:
var sb = document.getElementById("sort");
var sortButton = new sortButtonObj(sb);
