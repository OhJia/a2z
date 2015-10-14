/********************************************* 
p5 DOM button
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
	console.log("MOVING ELEMENT")
	console.log('moving pos', movingElement.position());

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
		console.log('\n');
		console.log("ONLY NUMBERS:\n");
		console.log(tempPara);
	}
	/** If only contains comment counts, ignore */
	else if (nonTextMatch = tempPara.match(commentCountRegex)){
		console.log('\n');
		console.log("ONLY COMMENT COUNTS:\n");
		console.log(tempPara);
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

for (var i = 0; i < allParagraphs.length; i++){
	console.log(allParagraphs[i]);
}
// for (var i = 0; i < allAuthors.length; i++){
// 	console.log(allAuthors[i]);
// }

/********************************************* 
All words
*********************************************/
console.log('\n');
console.log('\n');
console.log('\n');
console.log('ALL PARAGRAPH WORDS:\n');
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

var concordance = {};
var junkRegex = /^an|the|of|or|is|to|are|as|at|by|but|for|from|has|have|here|that|in|it|its|on|with$/i;
var keywords = [];

for (var i = 0; i < allWords.length; i++){
	// var word = allWords[i].toLowerCase();
	var word = allWords[i];
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

//console.log(concordance);

// for (var i = 0; i < keywords.length; i++) {
//   console.log(keywords[i] + ': ' + concordance[keywords[i]]);
// }
/********************************************* 
Count syllables
*********************************************/
// function new_count(word) {
//   word = word.toLowerCase();                                     //word.downcase!
//   if(word.length <= 3) { return 1; }                             //return 1 if word.length <= 3
//   word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
//   word = word.replace(/^y/, '');                                 //word.sub!(/^y/, '')
//   return word.match(/[aeiouy]{1,2}/g).length;                    //word.scan(/[aeiouy]{1,2}/).size
// }

/************* End of text analysis ********************/

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

x onEnd() trigger next in queue
x try: read one paragraph after another
*********************************************/

//var text = "Bernie Sanders Raises $26 Million, Powered by Online Donations Exceeding Obama’s 2008 Pace";
var voices = window.speechSynthesis.getVoices(); // help iniitalize api, because wtf?
var rate = 1;
var pitchh = 0;
var synthCounter = 0;
var wordTimeout;

var eachWords = []
for (var i = 0; i < allH2.length; i++){
	var words = allH2[i].match(wordRegex);
	if (words) {
		for (var j = 0; j < words.length; j++) {
			eachWords.push(words[j]);
		}
	}
}

setTimeout(function() {

	voices = window.speechSynthesis.getVoices(); // because it helps since speech chrome api is buggy
	var voice = voices.filter(function(v) { return v.name == 'Bad News'; })[0];

	var speakIt = function(text, voice, rate, pitch) {
	  window.speechSynthesis.cancel(); // because it helps since speech chrome api is buggy

	  var msg = new SpeechSynthesisUtterance();
	  if (voice) msg.voice = voice;
	  msg.volume = 1;
	  if (rate) msg.rate = rate;
	  if (pitch) {
	  	msg.pitch = pitch;
	  }
	  console.log(text)
	  msg.text = text;
	  msg.onresume = true;

	 //  if (msg.text.replace(/\s+/g, '') == '') {
	 //  	console.log('skipping blank words')
	 //  	synthCounter++;
		// talk(synthCounter);
		// return;
	 //  }

	 // wordTimeout = setTimeout(function() {
	 // 	console.log('timeoutz')
		// if (synthCounter < allParagraphs.length){
		//   		synthCounter++;
		//   		talk(synthCounter);
		//   	}
	 // }, 10000)

	  msg.onend = function(e) {
		  //console.log('Finished in ' + event.elapsedTime + ' seconds.');
		  // move to the next word in queue
		  //if (synthCounter < words.length){
		  	//console.log('onend' + this.text)
		  	console.log (e);
		  	//clearTimeout(wordTimeout)
		  	//setTimeout(function(){
	  		if (synthCounter < allParagraphs.length){
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
	  console.log (msg);
	  window.speechSynthesis.speak(msg);
	};

	talk(0);

	function talk(counter){		
		function count() {
			console.log('count')
			setTimeout(function(){
				speakIt(allParagraphs[counter], voice, rate, pitchh + sin(count));
			}, 5)							
		}
		count();
	}

	
}, 1000);

/************* End of speech synth ********************/



//} // while play end
// save elements into a variable and call position in a draw()
//selectAll('span')[i].position(x,y)f

