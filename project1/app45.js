
//while(play) {
/********************************************* 
TEXT ANALYSIS & STORAGE

Paragraphs
x get all p 
x label each with paragraph with id tag
x if start with by, add author id tag around names
X ignore xx comments
- ignore time stamps
- fix authors
x ignore if only contain numbers
- get all words and store in paraWords array

Headlines
x store all h1, add span id tag
x store all h2, add span id tag
x store all h3, add span id tag

All words
x get from paragraphs h1, h2, h3 arrays
x store into allWords array
*********************************************/

/********************************************* 
Parse all headline elements
*********************************************/

/* h1 elements*/
var h1 = document.getElementsByTagName("h1");
var allH1 = [];

for (var i = 0; i < h1.length; i++){
	allH1.push(h1[i].innerText);
	document.getElementsByTagName("h1")[i].innerHTML = '<span id="headline1-' + 
								i + '">'+h1[i].innerText+'</span>';	
}

/* h2 elements*/
var h2 = document.getElementsByTagName("h2");
var allH2 = [];

for (var i = 0; i < h2.length; i++){
	if (h2[i].innerText == ''){
		continue;
	} else {
		allH2.push(h2[i].innerText);
		document.getElementsByTagName("h2")[i].innerHTML = '<span id="headline2-' + 
								i + '">'+h2[i].innerText+'</span>';
	}
		
}

/* h3 elements*/
var h3 = document.getElementsByTagName("h3");
var allH3 = [];

for (var i = 0; i < h3.length; i++){
	allH3.push(h3[i].innerText);
	document.getElementsByTagName("h3")[i].innerHTML = '<span id="headline3-' + 
								i + '">'+h3[i].innerText+'</span>';	
}

/* p element variables */
var p = document.getElementsByTagName("p");
var allParagraphs = []; // PARAGRAPHS TEXT ARE STORED HERE
var pCount = 0;
var tempPara = '';

var authorMatch = null;
var name = '';
var allAuthors = []; // AUTHOR NAMES ARE STORED HERE
var authorCount = -1; 
var authorRegex = /^by (\w+\.?)( \w+\.?)( \w+\.?)?( \w+\.?)?/i;
var nameRegex = /(\w+\.?)( \w+\.?)( \w+\.?)/g;

var onlyNumbersRegex = /^\d+$/;
var commentCountRegex = /\d+ comments?/i;
var nonTextMatch = null;

/********************************************* 
Parse all p elements
*********************************************/
for (var i = 0; i < p.length; i++){
	tempPara = p[i].innerText;
	
	/** If is author label, store in allAuthors array, and add span id tag */
	/** NEED TO FIX */
	if (authorMatch = tempPara.match(authorRegex)) {
		
		if (authorMatch[1]) name += authorMatch[1];
		if (authorMatch[2]) name += authorMatch[2];
		if (authorMatch[3]) name += authorMatch[3];
		if (authorMatch[4]) name += authorMatch[4];
		//console.log(name);
		allAuthors.push(name);

		document.getElementsByTagName("p")[i].innerHTML = 
			document.getElementsByTagName("p")[i].innerText.replace(nameRegex, 
			function(str){
				if (str) {	
					// console.log("STRINGS:\n");	
					// console.log(str);
					authorCount++;			
					return '<span id="author-' + authorCount + '">'+str+'</span>';					
				}
			}
		);
				
		name = '';

	} 
	/** If only contains numbers, ignore */
	else if (nonTextMatch = tempPara.match(onlyNumbersRegex)){
		// console.log('\n');
		// console.log("ONLY NUMBERS:\n");
		// console.log(tempPara);
		continue;
	}
	/** If only contains comment counts, ignore */
	else if (nonTextMatch = tempPara.match(commentCountRegex)){
		// console.log('\n');
		// console.log("ONLY COMMENT COUNTS:\n");
		// console.log(tempPara);
		continue;
	}
	else if (tempPara == ''){
		continue;
	}
	/* For the rest, store in allParagraphs array and add span id tag */
	else {
		document.getElementsByTagName("p")[i].innerHTML = '<span id="paragraph-' + 
								pCount + '">'+tempPara+'</span>';		
		pCount++;
		allParagraphs.push(tempPara);
	}

	
}

// for (var i = 0; i < allParagraphs.length; i++){
// 	console.log(allParagraphs[i]);
// }
// for (var i = 0; i < allAuthors.length; i++){
// 	console.log(allAuthors[i]);
// }

/********************************************* 
All words
*********************************************/
// console.log('\n');
// console.log('\n');
// console.log('\n');
// console.log('ALL PARAGRAPH WORDS:\n');
var allWords = [];
//var wordRegex = /(?=.*\w)^(\w|')+$/g;
var wordRegex = /\b([\w'’"\-.]+)\b/g;
for (var i = 0; i < allParagraphs.length; i++){
	var words = allParagraphs[i].match(wordRegex);
	// console.log('w', words);
	if (words) {
		for (var j = 0; j < words.length; j++) {
			allWords.push(words[j]);
		}
	}
}

for (var i = 0; i < allH1.length; i++){
	//allWords += ' ' + allH1[i].match(wordRegex);
	var words = allH1[i].match(wordRegex);
	if (words) {
		for (var j = 0; j < words.length; j++) {
			allWords.push(words[j]);
		}
	}
}

for (var i = 0; i < allH2.length; i++){
	//allWords += ' ' + allH2[i].match(wordRegex);
	var words = allH2[i].match(wordRegex);
	if (words) {
		for (var j = 0; j < words.length; j++) {
			allWords.push(words[j]);
		}
	}
}

for (var i = 0; i < allH3.length; i++){
	//allWords += ' ' + allH3[i].match(wordRegex);
	var words = allH3[i].match(wordRegex);
	if (words) {
		for (var j = 0; j < words.length; j++) {
			allWords.push(words[j]);
		}
	}
}

/********************************************* 
Concordance
*********************************************/
var concordance = {};
var keywords = [];

var junkWords = [];
var junkTempString = "^";
var junkRegex;
var txtFile = new XMLHttpRequest();
txtFile.open("GET", "junk.txt", true);
txtFile.onreadystatechange = function() {
  if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
    if (txtFile.status === 200) {  // Makes sure it's found the file.
        junkWords = txtFile.responseText.split("\n"); 
		for (var i = 0; i < junkWords.length-1; i++){
			junkTempString += junkWords[i] + "|";
		}
		junkTempString += junkWords[junkWords.length-1] + "$";
		junkRegex = new RegExp(junkTempString, "i"); // junkRegex is created
		console.log("JUNK REGEX", junkRegex);
		matchSortWords();
		console.log(concordance);
		console.log("keywords: ", keywords);
    }
  }
}
txtFile.send(null);

function matchSortWords(){
	for (var i = 0; i < allWords.length; i++){
		// var word = allWords[i].toLowerCase();
		var word = allWords[i];
		// console.log("WORDS: ", word);
		if (word.length > 1) {
			if (word.match(onlyNumbersRegex)){
				continue;
			} else if (word.match(junkRegex)){
				continue;
			}else {
				if (concordance[word] == undefined) {
					concordance[word] = 1;
					keywords.push(word);
				} else {
					concordance[word]++;
				}
			}
		}
	}

	keywords.sort(function(a, b) {
	  return (concordance[b] -  concordance[a]);
	});
}


// for (var i = 0; i < keywords.length; i++) {
//   console.log(keywords[i] + ': ' + concordance[keywords[i]]);
// }
// console.log('\n');
// console.log('\n');
// console.log('\n');
// console.log('SYLLABLES:\n');
//arpabet = RiTa.getStresses("computer");
// var arpabet = [];
// //var arpabet = RiTa.tokenize("An elephant is a mammal");

// for (var i = 0; i < 100; i++){
// 	// var syllableCount = new_count(keywords[i]);
// 	// console.log(keywords[i], syllableCount);
// 	arpabet.push(RiTa.getPhonemes(keywords[i]));
// 	console.log(keywords[i], arpabet);
// }

/********************************************* 
Count syllables
*********************************************/
// function new_count(word) {
//   word = word.toLowerCase();                                     //word.downcase!
//   if(word.length < 3) { return 1; }                             //return 1 if word.length <= 3
//   word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ''); 
//   console.log("word1: ", word);  //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
//   word = word.replace(/^y/, ''); 
//   console.log("word2: ", word);                                 //word.sub!(/^y/, '')
//   return word.match(/[aeiouy]{1,2}/g).length;                    //word.scan(/[aeiouy]{1,2}/).size
// }

/************* End of text analysis ********************/



/********************************************* 
Speech Synthesis

x onEnd() trigger next in queue
x try: read one paragraph after another
*********************************************/
var play = false;
var voices = window.speechSynthesis.getVoices(); // help iniitalize api, because wtf?
var rate = 0; // SINGING
var pitchh = 1; // SINGING
var synthCounter = 0;
var wordTimeout;
var voice;

//var pit = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8];
var pit = [1.3, 1.2, 1.1, 1.2, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2]; //SINGING

var eachWords = []
for (var i = 0; i < allH2.length; i++){
	var words = allH2[i].match(wordRegex);
	if (words) {
		for (var j = 0; j < words.length; j++) {
			eachWords.push(words[j]);
		}
	}
}

//setTimeout(function() {
//if (play){
	voices = window.speechSynthesis.getVoices(); // because it helps since speech chrome api is buggy
	var voice = voices.filter(function(v) { return v.name == 'Boing'; })[0];

	var speakIt = function(text, voice, rate, pitch) {
	  window.speechSynthesis.cancel(); // because it helps since speech chrome api is buggy

	  var msg = new SpeechSynthesisUtterance();
	  if (voice) msg.voice = voice;
	  msg.volume = 1;
	  if (rate) msg.rate = rate;
	  if (pitch) {
	  	msg.pitch = pitch;
	  }
	  //console.log(text)
	  msg.text = text;
	  msg.onresume = true;

	
	//  UNCOMMENT THIS
	  msg.onend = function(e) {
		  //console.log('Finished in ' + event.elapsedTime + ' seconds.');
		  // move to the next word in queue
		  //if (synthCounter < words.length){
		  	//console.log('onend' + this.text)
		  	//console.log (e);
		  	//clearTimeout(wordTimeout)
		  	//setTimeout(function(){
	  		if (synthCounter < eachWords.length){
		  		synthCounter++;
		  		talk(synthCounter);
		  	}
			  //}, 0)
		  	
		  	
		  	
		  //}
	  };
	  msg.onnomatch = function() {}
	  msg.onerror = function() {}
	  msg.onstart = function() {}

	  window.speechSynthesis.cancel();
	  console.log (msg); //because it helps since speech chrome api is buggy
	  window.speechSynthesis.speak(msg);
	};

	// talk(synthCounter);

	function talk(counter){		
		function count() {
			//console.log('count')
			
			setTimeout(function(){
				speakIt(eachWords[counter], voice, rate, pit[counter%11]); // SINGING		
				//speakIt(arpabet[counter], voice, rate, pitchh);
			}, 5)
			
					
		}
		count();
	}


//}	
//}, 1000);

/************* End of speech synth ********************/

var sampler = new Tone.Sampler({
	A : {
		1 : "./audio/505/kick.mp3",
		2 : "./audio/505/snare.mp3"
	},
	B: {
		1 : "./audio/505/hh.mp3"
	}
}, {
	"envelope" : {
		"release" : 0.2
	}
}).toMaster();

sampler.volume.value = -20;


//listen for when all the samples have loaded
Tone.Buffer.onload = function(){
	//sample.player.loop = true;
	Tone.Transport.setInterval(function(time){
		sampler.triggerAttackRelease("A.1", "2n", time);
		sampler.triggerAttackRelease("A.1", "2n", "+2n");
		//sampler.triggerAttack("A.1", time + "4n");
		sampler.triggerAttackRelease("A.2", "2n", "+8n");
		sampler.triggerAttackRelease("A.1", "8n", "+4n");
	}, "2n");
	
};
Tone.Transport.loop = true;
// Tone.Transport.start();

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



//} // while play end
// save elements into a variable and call position in a draw()
//selectAll('span')[i].position(x,y)f

