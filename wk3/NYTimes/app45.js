/********************************************* 
p5 DOM button
*********************************************/

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
	SingingOn = !SingingOn;
	makeHighlighted(0);
});


function setup() {
	noCanvas();
	button = createButton('play');
	button.parent(p5Button);
  	button.position(150, 300);
  	button.style("z-index", "999")
  	//button.mousePressed(generateNewName);
}

/************* End of button ********************/

/********************************************* 
Text analysis & storage

Paragraphs
x get all p 
x label each with paragraph with id tag
- if start with by, add author id tag around names
- ignore xx comments
- ignore time stamps
- ignore if only contain numbers
*********************************************/
var p = document.getElementsByTagName("p");
var paragraphs = []; // PARAGRAPHS TEXT ARE STORED HERE
var pCount = 0;
var tempPara = '';

var authorMatch = null;
var name = '';
var authors = []; // AUTHOR NAMES ARE STORED HERE
var authorCount = 0;
var authorRegex = /^by (\w+\.?)( \w+\.?)( \w+\.?)?( \w+\.?)?/i;

console.log('\n');
console.log('\n');
console.log('\n');
console.log('\n');
console.log('\n');
console.log('PARAGRAPHS\n');


for (var i = 0; i < p.length; i++){
	tempPara = document.getElementsByTagName("p")[i].innerText;
	
	/* 
	If is author label, store in authors array
	*/
	if (authorMatch = tempPara.match(authorRegex)) {
		//tempPara.replace();
		console.log('\n');
		console.log("AUTHORS:\n");
		
		if (authorMatch[1]) name += authorMatch[1];
		if (authorMatch[2]) name += authorMatch[2];
		if (authorMatch[3]) name += authorMatch[3];
		if (authorMatch[4]) name += authorMatch[4];
		//console.log(name);
		authors.push(name);

		document.getElementsByTagName("p")[i].innerText = document.getElementsByTagName("p")[i].innerText.replace(/(\w+\.?)( \w+\.?)( \w+\.?)/g, 
			function(str){
				if (str) {	
					console.log("STRINGS:\n");	
					console.log(str);			
					return '<span id="author-' + authorCount + '">'+str+'</span>';
					authorCount++;
					console.log("author count: "+authorCount);
				}
			}
		);
				
		name = '';

	} else {
		document.getElementsByTagName("p")[i].innerText = '<span id="paragraph-' + pCount + '">'+tempPara+'</span>';		
		//paragraphs.push(document.getElementsByTagName("p")[i].innerText);	
		pCount++;
		paragraphs.push(tempPara);
	}

	
}

for (var i = 0; i < paragraphs.length; i++){
	console.log(paragraphs[i]);
}
for (var i = 0; i < authors.length; i++){
	console.log(authors[i]);
}


/************* End of text analysis ********************/

var SingingOn = false;
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

// loop through each h2
// set span on each word, increment counter
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

makeHighlighted(0);


function makeHighlighted(n) {
	if (n > highlighted) return;
	var el = document.getElementById("highlighted-" + n);

	if (el) {
		el.style.backgroundColor = '#FF0000';
		el.style.color = '#FFFFFF';
		
	}
	setTimeout(function() {
		makeHighlighted(n+1);
	}, 1650)
}

/********************************************* 
Speech Synthesis
*********************************************/

var soundLength; 
//var text = "Bernie Sanders Raises $26 Million, Powered by Online Donations Exceeding Obama’s 2008 Pace";
var voices = window.speechSynthesis.getVoices(); // help iniitalize api, because wtf?
var rate = 0.0;
var pitch = 1.2;

setTimeout(function() {
	voices = window.speechSynthesis.getVoices(); // because it helps since speech chrome api is buggy
	var voice = voices.filter(function(voice) { return voice.name == 'Bruce'; })[0];

	var speakIt = function(text, voice, rate, pitch) {
	  var msg = new SpeechSynthesisUtterance();
	  if (voice) msg.voice = voice;
	  msg.volume = 1;
	  if (rate) msg.rate = rate;
	  if (pitch) msg.pitch = pitch;
	  msg.text = text;
	  // console.log('')
	  // console.log('')
	  //console.log(msg)
	  // console.log('')
	  // console.log('')
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
		//soundLength = 1200 + words[counter].length * 100;
		
		function count() {
			if (SingingOn) {
				if (counter % 10 == 0){
					counter--;
					rate = 1.5;
					pitch = 1.9;
				}
				speakIt( words[counter], voice, rate, pitch);
				console.log(words[counter], words[counter].length);
				rate = 0;
				pitch = 1.1;
				counter++;
			}
			
		}
		//if (SingingOn) {
		setTimeout(count, 1500*counter);
		//}
		//count();
	}

	
}, 1000);

