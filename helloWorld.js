// sortVisualizer!

var N = 60;
var array = newArray(N);
var loopIntervalID;
var canvas;
var ctx;

var listOfSorts = {
	"insertion": insertionSort,
	"bubble": bubbleSort
};




// function switchAlgorithm(algoName) {
// 	currentSortMethod = algoName;
// 	window.clearTimeout(loopIntervalID);
// 	array = newArray(N);
// 	drawBars(array);
// }

// randomly generate a new array of length n and returns it
function newArray(n) {
	var newArray = []
	for (i = 0; i < n; i++) {
		newArray.push(Math.random());
	}
	return newArray;
}

// input: takes array (length N) of numbers between 0 and 1
// output: draws N bars on the canvas
this.drawBars = function(array) {
    //clear screen:
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // set width of bar so it shrinks if the 
    // bars would overflow the screen:
    var barWidth = 10
    if (array.length * barWidth > canvas.width) {
    	barWidth = array.length / barWidth;
    }
    console.log(barWidth);

    // itterate over the array and draw bars
    for (var i = 0; i < array.length; i++) {
        var pos = i*barWidth;
        var height = Math.floor(array[i] * canvas.height)
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
	sortButton = document.createElement("button");
	sortButton.setAttribute("onclick", "buttonPress()");
	var text = document.createTextNode("Sort");
	sortButton.appendChild(text);
	buttonArea.appendChild(sortButton);

	// inserts radioArea, canvas, and sort button into
	// document, in that order.
	element_obj.appendChild(radioArea);
	element_obj.appendChild(canvas);
	element_obj.appendChild(buttonArea);
}


// build and insert HTML elements
var p = document.getElementById("sortVis");
build_GUI(p);
drawBars(array);

// 	//set default:
// 	if (sortType === "insertion") {
// 		button.setAttribute("checked", "checked");
// 	}
// 		radioButtonArea = 		


// 	c.height = 200;
// 	c.width = 400;
// 	var ctx = c.getContext("2d");
// 	ctx.fillStyle = ("#000000");
// 	ctx.strokeStyle = ("#FF0000"); // "stroke" huehuehue
// 	ctx.linewidth = 1;





// 	array = newArray(N);
// 	drawBars(array);




// var listOfSorts = {
// 	"insertion": insertionSort,
// 	"bubble": bubbleSort
// };

// // sort button object
// // takes the actual button Obj as constructer argument
// function sortButtonObj(buttonObj) {
// 	text = "Sort";
// 	actions = {
// 		"Sort" : "'sort()'",
// 		"Restart" : "'restart()'"
// 	}

// 	changeAction = function(action) {
// 		text = action;
// 		buttonObj.setAttribute("onclick", actions[action]);
// 	}
// }

// // Sets up an interval to sort and update the canvas.
// // Triggered by onclick event.
// function sort(buttonCallback) {
// 	if (!sorting) {
// 		sorting = true;
// 		var history = listOfSorts[currentSortMethod](array);
// 		// set up the interval to animate display
// 		loopIntervalID = window.setInterval(function() {
// 			replayHistory(history, loopIntervalID);
//     	}, 50);
//     	// changes button text
//     	var button = document.getElementById("sort");
//     	button.innerHTML = "Restart";
//     }
//     else { // if currently sorting, stop and refresh
//     	sorting = false;
//     	window.clearTimeout(loopIntervalID);
//     	array = newArray();
//     	drawBars(array);
//     	var button = document.getElementById("sort");
//     	button.innerHTML = "Sort this thang";
//     }
// }

// // plays the next thing from the history queue
// function replayHistory(history, id) {
// 	if (history.length > 0) {
// 		drawBars(history.shift());
// 	}
// 	else {
// 		window.clearTimeout(id);
// 		state = 0;
// 		var button = document.getElementById("sort");
// 		button.innerHTML = "Refresh";
// 	}
// }

// // runs when button is clicked, updates the number of bars
// // and redraws the screen.
// // Triggered by onclick event.
// function update_N() {
// 	var new_n = document.getElementById("n_entry").value;
// 	if (isNaN(new_n) === false && new_n > 0) {
// 		if (new_n > c.width/10) {
// 			alert("Number too big!")
// 		}
// 		else {
// 			window.clearTimeout(loopIntervalID);
// 			document.getElementById("current_N").innerHTML = new_n;
// 			N = new_n;
// 			array = newArray(N);
// 			drawBars(array);
// 		}
// 	}
// }

// // fires when radio buttons are clicked; all radio buttons
// // activate this, but pass in the name of whatever sort algo



// // main: stuff that runs first:

// //canvas shit


// document.getElementById("current_N").innerHTML = N;

// // add the radio buttons for the sorting methods
// var buttonArea = document.getElementById("radioButtons");
// console.log(buttonArea);

// for (sortType in listOfSorts) {
// 	var button = document.createElement("input");
// 	// set attributes: onclick, type, name
// 	button.setAttribute("onclick", "switchAlgorithm('" + sortType + "')");
// 	button.setAttribute("type", "radio");
// 	button.setAttribute("name", "sort");
// 	var text = document.createTextNode(sortType);
// 	buttonArea.appendChild(button);
// 	buttonArea.appendChild(text);

// 	//set default:
// 	if (sortType === "insertion") {
// 		button.setAttribute("checked", "checked");
// 	}
// }
// // end radio button shit

// // set up sort button:
// var sb = document.getElementById("sort");
// var sortButton = new sortButtonObj(sb);
