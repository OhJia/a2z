
/********************************************* 
start/stop button
*********************************************/

var movingElements = [];
var wordX = [];
var wordY = [];
var wordSize = [];
var circleOpacity;
var moveY = 2;
var circle, circle2;
var btn;

function p5Start(){
	var start = 0;

	btn = document.createElement("BUTTON");		
	if (btn){		
		btn.style.backgroundColor = '#FF0000';		
		btn.style.zIndex = '111111';		
		btn.style.right = window.innerWidth/2+'px';		
		btn.style.bottom = '72px';		
		btn.style.position = 'fixed';		
		btn.style.width = '60px';		
		btn.style.height= '60px';		
		btn.style.borderRadius = '50%';		
		btn.style.outline = 'none';
		btn.style.border = '0px solid transparent';
		//box-shadow: 10px 10px 5px #888888;
		btn.style.boxShadow = '0.5px 0.5px 6px rgba(0,0,0,0.5)'
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
				x = 50;
				circle.style.width = 50 + 'px';		
				circle.style.height = 50 + 'px';
				circle.style.marginRight = 0 + 'px';
				circle.style.marginBottom = 0 + 'px';
				isPlaying = false;
			}
			play = !play;
		}
		
	});

	/************* End of button ********************/
	circle = document.createElement("div");		
	if (circle){		
		circle.style.backgroundColor = '#0000FF';		
		circle.style.zIndex = '11111';		
		circle.style.right = window.innerWidth/2+'px';		
		circle.style.bottom = '72px';		
		circle.style.position = 'fixed';		
		circle.style.width = '50px';		
		circle.style.height= '50px';		
		circle.style.borderRadius = '50%';		
		circle.style.outline = 'none';
		circle.style.border = '0px solid transparent';
		circle.style.opacity=circleOpacity;
		circle.style.marginRight = '5px';
	}		
	document.body.appendChild(circle); 

	circle2 = document.createElement("div");		
	if (circle2){		
		circle2.style.backgroundColor = '#FF0000';		
		circle2.style.zIndex = '11111';		
		circle2.style.right = '72px';		
		circle2.style.bottom = '72px';		
		circle2.style.position = 'fixed';		
		circle2.style.width = '50px';		
		circle2.style.height= '50px';		
		circle2.style.borderRadius = '50%';		
		circle2.style.outline = 'none';
		circle2.style.border = '0px solid transparent';
		circle2.style.opacity=circleOpacity;

	}		
	//document.body.appendChild(circle2); 
	

	//var y = 200;

	for (var i = 0; i < eachWords.length; i++){
		movingElements[i] = document.getElementById('h2Words-'+i);
		// wordX[i] = movingElements[i].position().x;
		// wordY[i] = movingElements[i].position().y;
		// wordSize[i] = movingElements[i].width;
	}
	console.log('***********************')
	console.log(movingElements[5])

}



function setup() {
	noCanvas();
	// console.log('***********')
	// console.log(eachWords)

	
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
		console.log('***********************')
		console.log(movingElements[synthCounter]);
		// movingElements[synthCounter].style("z-index", "999");
		// movingElements[synthCounter].style("font-size", "50px");
		// movingElements[synthCounter].style("background-color", "#0645F9");
		// movingElements[synthCounter].style("color", "#0897F9");
		if (synthCounter > 0){
			movingElements[synthCounter-1].style.fontSize="24px";
		}
			
		movingElements[synthCounter].style.zIndex=999;
		movingElements[synthCounter].style.fontSize="50px";
		movingElements[synthCounter].style.backgroundColor="#0645F9";
		movingElements[synthCounter].style.color="#0897F9";
		window.scrollTo(0, getElementOffset(movingElements[synthCounter]).top-200);

		// else x = 100;
		//x++;
		circleOpacity = 120 / (x*3);
		var x2 = (-x / 2) + 30;
		// circle.size(x, x);
		circle.style.marginRight = x2 + 'px';
		circle.style.marginBottom = x2 + 'px';
		circle.style.width = x + 'px';		
		circle.style.height = x + 'px';
		circle.style.opacity = circleOpacity;

		// circle2.style.marginRight = -x/10 + 'px';
		// circle2.style.marginBottom = -x/10 + 'px';
		// circle2.style.width = 50 + x/5 + 'px';		
		// circle2.style.height = 50 + x/5 + 'px';
		// circle2.style.opacity = circleOpacity;

		btn.style.width = 60 + x/20 + 'px';
		btn.style.height = 60 + x/20 + 'px';
		btn.style.marginRight = -x/40 + 'px';
		btn.style.marginBottom = -x/40 + 'px';
	} 
		
	
}

function play() {
	voices = window.speechSynthesis.getVoices(); // because it helps since speech chrome api is buggy
	voice = voices.filter(function(v) { return v.name == 'Boing'; })[0];
	talk(0);
}


function getElementOffset(element)
{
    var de = document.documentElement;
    var box = element.getBoundingClientRect();
    var top = box.top + window.pageYOffset - de.clientTop;
    var left = box.left + window.pageXOffset - de.clientLeft;
    return { top: top, left: left };
}






// document.addEventListener("DOMContentLoaded", function(e) {
// 	parseHTMLFunc();
// 	p5Start();
// });

var hasStarted = false;

chrome.extension.onRequest.addListener(function(request) {
	if (request['speakSelection'] != undefined) {
		if (hasStarted || !document.hasFocus()) return;
		hasStarted = true;
		parseHTMLFunc();
		p5Start();
	}
});


