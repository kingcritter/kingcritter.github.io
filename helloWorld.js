var N = 30

function insertionSort(A) {
	for (var i = 1; i < A.length; i++) {
		var j = i;
		while (j > 0 && A[j-1].value > A[j].value) {
			var temp = A[j];
			A[j] = A[j-1];
			A[j-1] = temp;
			j--;
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
for (var i = 0; i < N; i++) {
	var bar = new barObj();
	bars.push(bar);
	bar.value = Math.random();
	bar.height = Math.floor(bar.value*c.height);
	bar.y = c.height;
	bar.x = i*10;
	bar.width = 10;
	
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
	insertionSort(bars);
	drawBars();
}

// main: stuff that runs first:
drawBars();