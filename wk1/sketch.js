var input, button, nameText, w;

function setup() {

  // create canvas
  createCanvas(windowWidth, windowHeight);

  input = createInput(["Enter your name"]);
  input.position(windowWidth/2 - 100, windowHeight/2- 100);

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

  nameText.html('Now you are ' + newName);
  nameText.position(windowWidth/2 - nameText.elt.offsetWidth/2, windowHeight/2);

  input.value('Enter your name');

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



