const LINE_SPACING_RATIO = 0.05;
const USABLE_WIDTH_RATIO = 0.94;
const PREFERRED_HEIGHT_RATIO = 0.20;

var format = function(width, height, ctx, font, text) {
  const preferredHeight = height * PREFERRED_HEIGHT_RATIO;
  const usableWidth = width * USABLE_WIDTH_RATIO;
  let numLines = 1;
  let resizeRatio = 1; // multiplier by which to shrink text size and word width

  // have to set this before we measure text
  let fontSize = Math.round(preferredHeight *  resizeRatio);
  ctx.font = fontSize + "px " + font;

  // get an array of words that have the text and the width at the starting font size
  let words = [];
  for (let word of text.split(" ")) {
    words.push({
      text: word,
      width: ctx.measureText(word).width
    });
  }
  console.log("words");
  console.log(words);
  let spaceWidth = ctx.measureText(" ").width;
  let currentLine = 1;
  let lineWidth = 0;
  let lineBreaks = [0]; // each entry is the index of the first word on a line


  // sexy nested function because I don't know how to program
  const calculateResizeRatio = function () {
    if (numLines > 1) {
      resizeRatio = 1 / ((1 - LINE_SPACING_RATIO) * numLines);
    }
  };

  for (let i = 0; i < words.length; i++) {
    console.log(resizeRatio);
    lineWidth += (words[i].width + spaceWidth) * resizeRatio;
    if (lineWidth > usableWidth) {
      if (numLines > currentLine) {
        currentLine++;
        lineWidth = 0;
        lineBreaks.push(i);
        i--;
        continue;
      }
      else {
        numLines++;
        lineWidth = 0;
        i = -1;
        lineBreaks = [0];
        currentLine = 1;
        calculateResizeRatio();
      }
    }
  }

  // don't need the width anymore
  words = words.map(word => word.text);

  // split words into lines according to the values in lineBreaks
  lineBreaks.push(words.length);
  let lineData = [];
  for (let i = 0; i < lineBreaks.length - 1; i++) {
    lineData.push(words.slice(lineBreaks[i], lineBreaks[i + 1]));
  }

  fontSize = Math.round(preferredHeight *  resizeRatio);
  let fontString = fontSize + "px " + font;

  return {
    fontSize: fontSize,
    font: fontString,
    lines: lineData.map(x => x.join(" ")),
  };
};


if (typeof module !== 'undefined') {
  module.exports = format;
}

