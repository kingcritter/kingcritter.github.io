var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", click, false);

// list of things to draw on screen
var entities = []

function click(event) {
    var x = event.x;
    var y = event.y;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    clearScreen();
    bubble(x, y);
    
}

function bubble(x, y) {
    var r = 0;
    var growing = true;
    var id = window.setInterval(function() {
        if (growing) {
            r++;
        } else {
            r--;
        }

        drawCircle(x, y, r);
        
        if (r > 20) {
            growing = false;
        }
        // kill interva:
        if (r < 1) {
            window.clearTimeout(id);
        }
    }, 50);
}

function drawCircle(x, y, radius) {
    clearScreen();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.stroke();
}

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}