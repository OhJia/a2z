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

// var eachWords = []
// for (var i = 0; i < allH2.length; i++){
// 	var words = allH2[i].match(wordRegex);
// 	if (words) {
// 		for (var j = 0; j < words.length; j++) {
// 			eachWords.push(words[j]);
// 		}
// 	}
// }

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
				updateWordDom(counter);
			}, 5)
			
					
		}
		count();
	}


//}	
//}, 1000);

function updateWordDom(counter){
	
	var el = document.getElementById('h2Words-' + counter);
	console.log(el);
	console.log('\n');
	if (el)
		el.style.color = "#FFFFFF";
}

/************* End of speech synth ********************/