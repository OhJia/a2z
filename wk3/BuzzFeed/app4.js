//var SingingOn = false;
var headline2 = document.getElementsByTagName("h2");

var words = [];
var wordsAsString = "";
var wordsAsStringArray = [];
var highlighted = 0;
for (var i = 1; i < headline2.length+1; i++){

			try {
				highlight(i);
				//console.log(words);
			} catch(e) {
				//
			}
}

// var btn = document.createElement("BUTTON");
// if (btn){
// 	btn.style.backgroundColor = '#FF0000';
// 	btn.style.zIndex = '111111';
// 	btn.style.right = '50px';
// 	btn.style.bottom = '50px';
// 	btn.style.position = 'fixed';
// 	btn.style.width = '50px';
// 	btn.style.height= '50px';
// 	btn.style.cornerRadius = '10%';
// }
// document.body.appendChild(btn); 

// btn.addEventListener("click", function(){
// 	SingingOn = !SingingOn;
// 	makeHighlighted(0);
// });


// function setup() {
// 	noCanvas();
// 	button = createButton('play');
// 	button.parent(p5Button);
//   	button.position(150, 300);
//   	button.style("z-index", "999")
//   	//button.mousePressed(generateNewName);
// }
// loop through each h2
// set span on each word, increement counter
// then run function, set looping timeout that runs every second, sets new timeout unless incremenet > counter

function highlight(counter){
	document.getElementsByTagName("h2")[counter].innerHTML = document.getElementsByTagName("h2")[counter].innerText.replace(/\b(\w+)\b/g, 
		function(str){
			if (str) {
				highlighted++;
				words.push(str)
				return '<span id="highlighted-' + highlighted + '">'+str+'</span>';
			}
		}
	);

	words.push(" ");
	// console.log(document.getElementsByTagName("h2")[counter].innerHTML);
	// console.log(counter);
}

// save all highlighted-x innerText into array
// turn into a string
// run speakit over string, while highlighting
for (var i = 1; i < words.length+1; i++){
	wordsAsString += words[i] + " ";
	//wordsAsStringArray.push(wordsAsString);
	if (words[i]==" ") {
		wordsAsStringArray.push(wordsAsString);
		wordsAsString = "";		
	}
}

//while (SingingOn){
makeHighlighted(0);
//}
//console.log(wordsAsStringArray);

// WAIT for press

	function makeHighlighted(n) {
		if (n > highlighted) return;
		var el = document.getElementById("highlighted-" + n);

		if (el) {
			el.style.backgroundColor = '#FF0000';
			el.style.color = '#FFFFFF';
			
		}
		setTimeout(function() {
			makeHighlighted(n+1);
		}, 1450)
	}

// function makeHighlighted() {
// 	for ()
// 	var el = document.getElementById("highlighted-" + n);

// 	if (el) {
// 		el.style.backgroundColor = '#FF0000';
// 		el.style.color = '#FFFFFF';
		
// 	}
// 	setTimeout(function() {
// 		makeHighlighted(n+1);
// 	}, 1650)
// }




//var text = "Bernie Sanders Raises $26 Million, Powered by Online Donations Exceeding Obama’s 2008 Pace";
var voices = window.speechSynthesis.getVoices(); // help iniitalize api, because wtf?

setTimeout(function() {
	voices = window.speechSynthesis.getVoices(); // because it helps since speech chrome api is buggy
	var voice = window.speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Bad News'; })[0];

	var speakIt = function(text, voice, rate, pitch) {
	  var msg = new SpeechSynthesisUtterance();
	  if (voice) msg.voice = voice;
	  msg.volume = 1;
	  if (rate) msg.rate = rate;
	  if (pitch) msg.pitch = pitch;
	  msg.text = text;
	  console.log('')
	  console.log('')
	  //console.log(msg)
	  console.log('')
	  console.log('')
	  window.speechSynthesis.cancel();
	  window.speechSynthesis.cancel(); // because it helps since speech chrome api is buggy
	  window.speechSynthesis.speak(msg);
	};


	// text, voice, rate, pitch
	//speakIt( text, voice, 12.5, 1.2 );

	// WAIT for press
	
		for (var i = 0; i < words.length; i++){
			talk(i);
		}



		function talk(counter){
			function count() {
				//if (SingingOn) {
				speakIt( words[counter], voice, 0.5, 2+ Math.sin(counter));
			//}
			}
			setTimeout(count, 1400*counter);
			//count();
		}

	
}, 1000);

