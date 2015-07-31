// bar object; everything needed to draw a
// vertical bar onto a canvas. Note that
// it also holds a value.
function barObj() {
    value = 0;
    x = 0;
    y = 0;
    width = 10;
    height = 20;
}

// initilize bar objects and populate bars
// returns an arra contaniing bar objects
function generate_bars(n) {
    // clear bars list:
    var bars = []
    for (var i = 0; i < n; i++) {
        var bar = new barObj();
        bars.push(bar);
        bar.value = Math.random();
        bar.height = Math.floor(bar.value*c.height);
        bar.y = c.height;
        bar.x = i*10;
        bar.width = 10;
    }
    return bars;
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