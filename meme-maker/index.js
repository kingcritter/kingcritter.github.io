//const Canvas = require("canvas");
//const fs = require("fs");
//const Image = Canvas.Image;
//const FormatText = require("./FormatText");

//if (typeof module !== 'undefined') {
//  module.exports = ImageMacro;
//}

const FormatText = format;

const ImageMacro = function ImageMacro(canvas, img, topText, bottomText) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.ctx.strokeStyle = "#fff";
  this.ctx.lineWidth = 3;
  this.ctx.textAlign = "center";
  this.ctx.textBaseline = "bottom";


  this.ctx.drawImage(img, 0, 0, img.width, img.height);

  let topTextFormat = FormatText(this.canvas.width, this.canvas.height, this.ctx, "Impact", topText);
  let lineNum = 1;
  for (let line of topTextFormat.lines) {
    this.ctx.font = topTextFormat.font;
    this.ctx.fillText(line, this.canvas.width / 2, lineNum * (topTextFormat.fontSize + 10));
    this.ctx.strokeText(line, this.canvas.width / 2, lineNum * (topTextFormat.fontSize + 10));
    lineNum++;
  }

  let bottomTextFormat = FormatText(this.canvas.width, this.canvas.height, this.ctx, "Impact", bottomText);
  lineNum = bottomTextFormat.lines.length - 1;
  for (let line of bottomTextFormat.lines) {
    this.ctx.font = bottomTextFormat.font;
    this.ctx.fillText(line, this.canvas.width / 2, this.canvas.height - (lineNum * (bottomTextFormat.fontSize + 10)));
    this.ctx.strokeText(line, this.canvas.width / 2, this.canvas.height - (lineNum * (bottomTextFormat.fontSize + 10)));
    lineNum--;
  }
};


//ImageMacro.prototype.writeImage = function() {
//  let out = fs.createWriteStream(__dirname + '/test.jpg');
//  let stream = this.canvas.jpegStream({
//    bufsize: 4096 // output buffer size in bytes, default: 4096
//    , quality: 75 // JPEG quality (0-100) default: 75
//    , progressive: false // true for progressive compression, default: false
//  });
//
//  stream.on('data', function(chunk){
//    out.write(chunk);
//  });
//
//  stream.on('end', function(){
//    console.log('saved image');
//  });
//};


// CONTROLLER LOGIC

const images = {
  Critter: "images/critter.jpg",
  Boulder: "images/boulder.jpg",
  Jacob:   "images/jacob.jpg"
};

function populateSpinner() {
  const spinner = document.getElementById("image-selector");
  for (let name in images) {
    const option = document.createElement("option");
    option.text = name;
    option.value = images[name];
    spinner.add(option);
  }
}

function makeMeme() {
  let topText    = document.getElementById("top-text").value;
  let bottomText = document.getElementById("bottom-text").value;
  let canvas     = document.getElementById("canvas");
  let spinner    = document.getElementById("image-selector");
  let picture = spinner.options[spinner.selectedIndex].value;

  let img = new Image();
  img.src = picture;
  img.onload = function() {
    const WIDTH = 400;
    const resizeRatio = WIDTH / img.width;
    img.width  = Math.round(img.width  * resizeRatio);
    img.height = Math.round(img.height * resizeRatio);
    canvas.width = img.width;
    canvas.height = img.height;
    let meme = new ImageMacro(canvas, img, topText, bottomText);
  };
}


// DOCUMENT ONLOAD
window.onload = function() {
  populateSpinner();
  makeMeme();
};

