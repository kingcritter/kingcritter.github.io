// Handles drawing to the canvas. 
// Said canvas is passed in to the constructor 
c.height = 200;
c.width = 400;
var ctx = c.getContext("2d");
ctx.fillStyle = ("#000000");
ctx.strokeStyle = ("#FF0000"); // "stroke" huehuehue
ctx.linewidth = 1;
barWidth = 10;
// draw the bars:
this.drawBars = function(array) {
    //clear screen:
    ctx.clearRect(0, 0, c.width, c.height);
    // itterate over the array and draw bars
    for (var i = 0; i < array.length; i++) {
        var pos = i*10;
        var height = Math.floor(array[i] * c.height)
        ctx.fillRect(pos, c.height, barWidth, -height);
        ctx.strokeRect(pos, c.height, barWidth, -height);
    }
}