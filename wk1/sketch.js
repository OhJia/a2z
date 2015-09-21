var input, button, greeting;

function setup() {

  // create canvas
  createCanvas(windowWidth, windowHeight);

  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(150, 65);
  button.mousePressed(generateNewName);

  greeting = createElement('h2', 'Enter your name:');
  greeting.position(20, 5);

  textAlign(CENTER)
  textSize(50);
}

function generateNewName() {
  var name = input.value();
  name = name.toLowerCase();
  var tempName = [];
  var newName;

  for (var i=0; i < name.length; i++) {
  	if (name[i] !== " ") {
  		tempName.push(name[i]);
  	}  	
  }
  
  shuffleArray(tempName);

  // Insert space at random index
  var spaceIndex = Math.floor(Math.random() * (tempName.length - 2 - 2)) + 2;
  tempName.splice(spaceIndex, 0, " ");
  // Make first letters in first and last name uppercase 
  tempName[0] = tempName[0].toUpperCase();
  tempName[spaceIndex+1] = tempName[spaceIndex+1].toUpperCase();
  
  newName = tempName.join('')
  greeting.html('Now you are '+newName+'!');
  input.value('');



  // for (var i=0; i<200; i++) {
  //   push();
  //   fill(random(255), 255, 255);
  //   translate(random(width), random(height));
  //   rotate(random(2*PI));
  //   text(name, 0, 0);
  //   pop();
  // }
}

// Durstenfeld shuffle
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


