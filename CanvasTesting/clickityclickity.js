"use strict";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", click, false);

// list of things to draw on screen
var entities = new LinkedList();
// pool of objects to reuse
var deadEntities = new LinkedList();

var Entity = {
    x: 0,
    y: 0,
    size: 0,
    type: null, // "sprite", "shape"
    shape: null, // if type = shape, this will describe the shape
    sprite: null, // if type = sprite, this will be the filename 
    dead: false // if true, will get removed from entity list
};



var Bubble = function() {
    this.animate = function() {
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
    // resets the default state:
    this.refresh = function() {
        this.size = 1;
        this.growing = true;
        this.dead = false;
        this.shape = "circle";
        this.type = "shape";
    }
}


function bubbleFactory() {
    if (deadEntities.length != 0) {
        var n = deadEntities.first;
        deadEntities.remove(n);
        var zombie = n.data;
        zombie.refresh();
        return zombie;
    }
    else {
        var newGuy = new Bubble();
        newGuy.prototype = Entity;
        newGuy.refresh();
        return newGuy;
    }
}



function click(event) {
    var x = event.x;
    var y = event.y;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    var b = bubbleFactory();
    b.x = x;
    b.y = y;
    entities.add(b);
}

function animationLoop() {
    clearScreen();
    for (var curr = entities.first; curr != null; curr = curr.next) {
        var entity = curr.data;
        if (entity.dead) {
            // add the entity to the deadlist
            deadEntities.add(entity);
            // remove the *node* from the entities list
            entities.remove(curr);
            continue;
        }
        // draw the entity
        entity.animate();
        drawThing(entity);
    }
} 

// draws entities based on their settings
function drawThing(entity) {
    if (entity.type === "shape") {
        if (entity.shape === "circle") {
            drawCircle(entity.x, entity.y, entity.size/2);
        }
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