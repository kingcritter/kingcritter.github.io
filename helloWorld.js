var N = 30;

function barObj() {
	value = 0;
	x = 0;
	y = 0;
	width = 10;
	height = 20;
}


function sort() {
	var intervalID = window.setInterval(function() {
	insertionSort(bars, intervalID);
	drawBars();
    }, 50); 
}

function update_N() {
	var new_n = document.getElementById("n_entry").value;
	if (isNaN(new_n) === false && new_n > 0) {
		document.getElementById("current_N").innerHTML = new_n;
		N = new_n;
		var bars = generate_bars(N);
		drawBars();
	}
}

// main: stuff that runs first:

var c = document.getElementById("canvas");
c.height = 200;
c.width = 400;
var ctx = c.getContext("2d");
ctx.fillStyle = "FF0000";

var bars = generate_bars(N);
drawBars();
document.getElementById("current_N").innerHTML = N;