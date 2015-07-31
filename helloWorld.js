var N = 30;

var sort_i=1;
var sort_j=1;

// so this is a step-by-step insertion sort, because "sleep"
// doesn't exist. Every time this function is called, 
// the list gets one step close to being sorted.
function insertionSort(A, id) {
	if (sort_i >= A.length) {
		window.clearTimeout(id);
<<<<<<< HEAD
		sort_i = 1;
		sort_j = 1;
=======
>>>>>>> 6eb1471196d00eddbb1932104fe898e8145f8e88
	}
	else {

		if (sort_j > 0 && A[sort_j-1].value > A[sort_j].value) {
			var temp = A[sort_j];
			A[sort_j] = A[sort_j-1];
			A[sort_j-1] = temp;
			sort_j--;
		}
		if (sort_j <= 0 || A[sort_j-1].value <= A[sort_j].value) {
			sort_i++;
			sort_j=sort_i;
		}
	}

}

function barObj() {
	value = 0;
	x = 0;
	y = 0;
	width = 10;
	height = 20;
}

var c = document.getElementById("canvas");
c.height = 200;
c.width = 400;
var ctx = c.getContext("2d");
ctx.fillStyle = "FF0000";

// all bars are gonna be in this array
var bars = [];
// initilize bar objects and populate bars
function generate_bars() {
	// clear bars list:
	bars = []
	for (var i = 0; i < N; i++) {
		var bar = new barObj();
		bars.push(bar);
		bar.value = Math.random();
		bar.height = Math.floor(bar.value*c.height);
		bar.y = c.height;
		bar.x = i*10;
		bar.width = 10;
	}
}

// draw the bars:
function drawBars() {
	//clear screen:
	ctx.clearRect(0, 0, c.width, c.height);
	for (var i = 0; i < bars.length; i++) {
		var bar = bars[i];
		bar.x = i*10;
		bar.height = Math.floor(bar.value*c.height)
		ctx.fillRect(bar.x, bar.y, bar.width, -bar.height);
	}
}

function sort() {
	var intervalID = window.setInterval(function() {
	insertionSort(bars, intervalID);
	drawBars();
    }, 50); 
<<<<<<< HEAD
}

function update_N() {
	var new_n = document.getElementById("n_entry").value;
	if (isNaN(new_n) === false && new_n > 0) {
		document.getElementById("current_N").innerHTML = new_n;
		N = new_n;
		generate_bars();
		drawBars();
	}
=======
>>>>>>> 6eb1471196d00eddbb1932104fe898e8145f8e88
}

// main: stuff that runs first:
generate_bars();
drawBars();
document.getElementById("current_N").innerHTML = N;