
/********************************************* 
start/stop button
*********************************************/

function p5Start(){
	var start = 0;

	var btn = document.createElement("BUTTON");		
	if (btn){		
		btn.style.backgroundColor = '#FF0000';		
		btn.style.zIndex = '111111';		
		btn.style.right = '72px';		
		btn.style.bottom = '72px';		
		btn.style.position = 'fixed';		
		btn.style.width = '60px';		
		btn.style.height= '60px';		
		btn.style.borderRadius = '50%';		
		btn.style.outline = 'none';
		btn.style.border = '0px solid transparent';
	}		
	document.body.appendChild(btn); 		
			
	btn.addEventListener("click", function(){	
		voices = window.speechSynthesis.getVoices(); // because it helps since speech chrome api is buggy
		voice = voices.filter(function(v) { return v.name == 'Bad News'; })[0];
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
				x = 100;
				isPlaying = false;
			}
			play = !play;
		}
		
	});

	/************* End of button ********************/

	var movingElements = [];
	var wordX = [];
	var wordY = [];
	var wordSize = [];
	var circleOpacity;
	var moveY = 2;

	//var y = 200;

	function setup() {

		noCanvas();
		for (var i = 0; i < eachWords.length; i++){
			movingElements[i] = select('#h2Words-'+i);
			wordX[i] = movingElements[i].position().x;
			wordY[i] = movingElements[i].position().y;
			wordSize[i] = movingElements[i].width;
		}
		
		circleOpacity = 100 / x;
		// play/pause button
		// circle = createButton('');
	 //  	circle.position(windowWidth-120, windowHeight-120);
	 //  	circle.size(x, x);
	 //  	circle.style("z-index", "999");
	 //  	circle.style("background-color", "#0000FF");
	 //  	// circle.style("right", "72px");
	 //  	// circle.style("bottom", "72px");
	 //  	circle.style("opacity", circleOpacity);
	 //  	circle.style("border", "none");
	 //  	circle.style("position", "fixed");
	 //  	circle.style("borderRadius", "50%");
	 //  	circle.style("style", "none");
	  	//circle.mousePressed(play);
	  	//button.addEventListener("click", play);
	}


	// P5 DOM UPDATE

	function draw() {
		// console.log('movingEl pos: ', movingElement.position());
		
		
		
		// movingElements[synthCounter].size(wordSize[synthCounter], wordSize[synthCounter]);
		// wordSize[synthCounter]++;
		//movingElements[synthCounter].position(wordX[synthCounter]-1, wordY[synthCounter])
		// if (moveY > 0)
		// 	wordY[synthCounter]--;
		//ellipse(windowWidth-100, windowHeight-100, 1000, 1000);
		if (isPlaying) {
			x++;
			movingElements[synthCounter].style("z-index", "999");
			movingElements[synthCounter].style("font-size", "50px");
			movingElements[synthCounter].style("background-color", "#0645F9");
			movingElements[synthCounter].style("color", "#0897F9");
		}
		// else x = 100;
		//x++;
		circleOpacity = 120 / (x*5);
		var x2 = -x / 2;
		circle.size(x, x);
		circle.style('margin-left', x2 + 'px')
		circle.style('margin-top', x2 + 'px')
		circle.style("opacity", circleOpacity);
	}

	function play() {
		voices = window.speechSynthesis.getVoices(); // because it helps since speech chrome api is buggy
		voice = voices.filter(function(v) { return v.name == 'Boing'; })[0];
		talk(0);
	}


}

document.addEventListener("DOMContentLoaded", function(e) {
  p5Start();
});


