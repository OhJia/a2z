/********************************************* 
p5 DOM 
*********************************************/
var movingElement;

//var button;
var start = 0;

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
		
btn.addEventListener("click", function(){	
	voices = window.speechSynthesis.getVoices(); // because it helps since speech chrome api is buggy
	voice = voices.filter(function(v) { return v.name == 'Boing'; })[0];
	if (start == 0) {
		talk(synthCounter);
		Tone.Transport.start();
		start = -1;
	} else {
		if (!play) {
			window.speechSynthesis.resume();
			Tone.Transport.start();
		} else {
			window.speechSynthesis.pause();
			Tone.Transport.stop();
		}
		play = !play;
	}
	
});

var x = 100;
var y = 200;

function setup() {

	noCanvas();
	movingElement = select('#author-0');

	// play/pause button
	// button = createButton('play');
 //  	button.position(windowWidth-100, windowHeight-100);
 //  	button.size(50, 50);
 //  	button.style("z-index", "999");
 //  	button.style("border", "none");
 //  	button.style("position", "fixed");
 //  	button.mousePressed(play);
  	//button.addEventListener("click", play);
}

// P5 DOM UPDATE

function draw() {
	// console.log('movingEl pos: ', movingElement.position());
	movingElement.position(x, movingElement.position().y)
	x++;
}

function play() {
	voices = window.speechSynthesis.getVoices(); // because it helps since speech chrome api is buggy
	voice = voices.filter(function(v) { return v.name == 'Boing'; })[0];
	talk(0);
}

// function mousePressed() {
// 	voices = window.speechSynthesis.getVoices(); // because it helps since speech chrome api is buggy
// 	voice = voices.filter(function(v) { return v.name == 'Boing'; })[0];
// 	talk(0);
// }

/************* End of button ********************/