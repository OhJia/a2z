/********************************************* 
p5 DOM 
*********************************************/
var movingElement;
var play = false;
var btn = document.createElement("BUTTON");
if (btn){
	btn.style.backgroundColor = '#FF0000';
	btn.style.zIndex = '111111';
	btn.style.right = '50px';
	btn.style.bottom = '50px';
	btn.style.position = 'fixed';
	btn.style.width = '50px';
	btn.style.height= '50px';
	btn.style.cornerRadius = '10%';
}
document.body.appendChild(btn); 

var x = 100;
var y = 200;

btn.addEventListener("click", function(){
	play = !play;
	makeHighlighted(0);
});


function setup() {

	noCanvas();
	movingElement = select('#author-0');
	// console.log("MOVING ELEMENT")
	// console.log('moving pos', movingElement.position());

	// button = createButton('play');
	// button.parent(p5Button);
 //  	button.position(150, 300);
 //  	button.style("z-index", "999")
  	//button.mousePressed(generateNewName);
}

// P5 DOM UPDATE

function draw() {
	// console.log('movingEl pos: ', movingElement.position());
	movingElement.position(x, movingElement.position().y)
	x++;
}

/************* End of button ********************/