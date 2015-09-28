var input, button, nameText, w, color;

function setup() {

  // create canvas
  createCanvas(windowWidth, windowHeight);


  input = createInput(["Enter your name"]);
  input.position(windowWidth/2 - 100, windowHeight/2- 100);
  input.mousePressed(function(){
    input.value('');
  });

  button = createButton('submit');
  button.position(windowWidth/2 + 50, windowHeight/2- 100);
  button.mousePressed(generateNewName);

  textFont("Helvetica");

  textAlign(CENTER)
  nameText = createElement('h2', '');
  var style = nameText.elt.style.display;
  var hidden = nameText.elt.style.display === 'none';
  nameText.elt.style.display = 'block';   
  nameText.position(windowWidth/2, windowHeight/2);
  
  //nameText.center();
  textSize(50);

  text('Name Generator', windowWidth/2, windowHeight/2- 200)

}

function generateNewName() {
  var name = input.value();
  name = name.toLowerCase();
  var tempName = [];
  var newName;
  t = '';

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
  textSize(20);

  nameText.html('You are now ' + newName);
  
  nameText.position(windowWidth/2 - nameText.elt.offsetWidth/2, windowHeight/2);

  input.value('Enter your name');

  for (var i=0; i<200; i++) {
    push();
    fill(random(200, 255), random(200, 255), random(200, 255));
    translate(random(width), random(height));
    rotate(random(2*PI));
    text(newName, 0, 0);
    pop();

  }

}

// Durstenfeld shuffle: modern version of Fisher-Yates
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}




