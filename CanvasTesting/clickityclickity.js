"use strict";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", click, false);

// list of things to draw on screen
var entities = [];

class Entity {
    constructor() {
        this.x;
        this.y;
        this.size;
        this.type; // "sprite", "shape"
        this.dead = false; // if true, will get removed from entity list
    }
}

class Bubble extends Entity {
    constructor(x, y) {
        super();
        this.growing = true;
        this.x = x;
        this.y = y;
        this.size = 1;
    }
    animate() {
        if (this.growing) {
            this.size++;
        } else {
            this.size--;
        }
        if (this.growing && this.size > 20) {
            this.growing = false;
        }
        else if (!this.growing && this.size < 1) {
            this.dead = true;
        }
    }
}

function click(event) {
    var x = event.x;
    var y = event.y;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    var b = new Bubble(x, y);
    entities.push(b);    
}

function animationLoop() {
    clearScreen();
    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        if (entity.dead) {
            // entities.splice(i, 1);
            continue;
        }
        // draw the entity
        entity.animate();
        drawCircle(entity.x, entity.y, entity.size/2);
    }
} 

function drawCircle(x, y, radius) {
    if (radius < 0) {
        radius = 0;
    }
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.stroke();
}

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.setInterval(function() {
    animationLoop();
}, 50);