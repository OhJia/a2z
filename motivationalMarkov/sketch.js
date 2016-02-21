// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// An array of lines from a text file
var lines;

// The Markov Generator object
var markov;


// Preload the seed data
function preload() {
  lines = loadStrings('hmail.txt');
}


function setup() {
  noCanvas();
  // The Markov Generator
  // First argument is N-gram length, second argument is max length of generated text
  markov = new MarkovGenerator(5, 500);
  // Feed all the lines from the text file into the generator
  for (var i = 0; i < lines.length; i++) {
    markov.feed(lines[i]);
  }
  // Set up a button
  var button = select('#button');
  button.mousePressed(generate);

  var clearButton = select('#clear');
  clearButton.mousePressed(clearIt);
}

function clearIt() {
  var markovs = selectAll('.markov');
  for (var i = 0; i < markovs.length; i++) {
    markovs[i].remove();
  }
}

function generate() {
  // Display the generated text
  // var output = select('#name');
  var text = markov.generate();
  // output.html(text);
  var sentences = text.split(/([.?!])/);
  var newText = "";

  for (var i = 0; i < 2; i++){
    newText += sentences[i];
  }

  var par = createP(newText);
  par.class('markov');
  par.parent('results');
}
