// sortVisualizer!

// some globals
var N = 30;
var array = newArray(N);
var loopIntervalID;
var sorting = false;
var currentSortMethod = "insertion";
// references to dom objects (I think? HTML elements anyway)
// that will be assigned later on in build_GUI():
var canvas;
var ctx;
var sortButtonElement;

// only thing needed to add a sorting algorithm
// is to write it and edit this list
var listOfSorts = {
	"insertion": insertionSort,
	"bubble": bubbleSort
};

var sortButton = {
	action : 'sort', // sort/refresh
	node : null,
	press : function() {
		if (this.action === 'sort') {
			sorting = true;
			this.action = 'refresh';
			this.updateElement(this.action);
			var history = listOfSorts[currentSortMethod](array);
			loopIntervalID = window.setInterval(function() {
	 			replayHistory(history);
	 			if (history.length <= 0) {
	 				sorting = false;
	 			}
	 		}, 50)
		}
		else {
			sorting = false;
			this.action = 'sort';
			window.clearTimeout(loopIntervalID);
			this.updateElement(this.action);
			totalRefresh();
		}
	}, 
	updateElement : function(label) {
		this.action = label
		this.node.nodeValue = label;
	}
}

function switchAlgorithm(algoName) {
	currentSortMethod = algoName;
	totalRefresh();
}

// generates a new array, kills the loop if it exists,
// updates the button, and redraws the screen.
function totalRefresh() {
	sortButton.updateElement('sort');
	array = newArray(N);
	window.clearTimeout(loopIntervalID);
	drawBars(array);
}

// randomly generate a new array of length n and returns it
function newArray(n) {
	var newArray = []
	for (i = 0; i < n; i++) {
		newArray.push(Math.random());
	}
	return newArray;
}

// // displays the next array from the history queue
function replayHistory(history) {
	if (history.length > 0) {
		drawBars(history.shift());
	}
}

// input: takes array (length N) of numbers between 0 and 1
// output: draws N bars on the canvas
function drawBars(A) {
    //clear screen:
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // set width of bar so it shrinks if the 
    // bars would overflow the screen:
    var barWidth = 10
    if (A.length * barWidth > canvas.width) {
    	barWidth = A.length / barWidth;
    }

    // itterate over the array and draw bars
    for (var i = 0; i < A.length; i++) {
        var pos = i*barWidth;
        var height = Math.floor(A[i] * canvas.height)
        ctx.fillRect(pos, canvas.height, barWidth, -height);
        //ctx.strokeRect(pos, canvas.height, barWidth, -height);
    }
}

function build_GUI(element_obj) {
	// creates canvas and sets default values
	canvas = document.createElement("canvas");
	canvas.height = 200;
	canvas.width = 400;
	ctx = canvas.getContext("2d");
	ctx.fillStyle = ("#000000");
	ctx.strokeStyle = ("#FF0000"); // "stroke" huehuehue
	ctx.linewidth = 1;

	// creates radio buttons from listOfSorts
	var radioArea = document.createElement("p");
	var first = true;
	for (sortType in listOfSorts) {
		var radio = document.createElement("input");
		radio.setAttribute("onclick", "switchAlgorithm('" + sortType + "')");
		radio.setAttribute("type", "radio");
		radio.setAttribute("name", "sort");
		var text = document.createTextNode(sortType);
		radioArea.appendChild(radio);
		radioArea.appendChild(text);
		if (first) {
			radio.setAttribute("checked", "checked");
			first = false;
		}
	}

	// creates the sort button:
	var buttonArea = document.createElement("p")
	sortButtonElement = document.createElement("button");
	sortButtonElement.setAttribute("onclick", "sortButton.press()");
	sortButton.node = document.createTextNode("Sort");
	sortButtonElement.appendChild(sortButton.node);
	buttonArea.appendChild(sortButtonElement);

	// inserts radioArea, canvas, and sort button into
	// document, in that order.
	element_obj.appendChild(radioArea);
	element_obj.appendChild(canvas);
	element_obj.appendChild(buttonArea);
}


// build and insert HTML elements
var p = document.getElementById("sortVis");
build_GUI(p);
totalRefresh();