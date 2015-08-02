// globals, for now:
barWidth = 10;

// draw the bars:
function drawBars(array) {
    //clear screen:
    ctx.clearRect(0, 0, c.width, c.height);
    for (var i = 0; i < array.length; i++) {
        var pos = i*10;
        var height = Math.floor(array[i] * c.height)
        ctx.fillRect(pos, c.height, barWidth, -height);
    }
}