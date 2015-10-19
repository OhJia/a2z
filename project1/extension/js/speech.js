/******************************************* 
Speech Synthesis

x onEnd() trigger next in queue
x try: read one paragraph after another
*********************************************/
var play = false;
var voices = window.speechSynthesis.getVoices(); // help iniitalize api, because wtf?
var rate = 10; // SINGING
var pitchh = 1; // SINGING
var synthCounter = 0;
var wordTimeout;
var voice;
var x = 50;
var isPlaying = false;
var dd;
var speechRate = .86;
var clearSpeechTimeouts = [];

// var pit = [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];
var pit = [1.0, 1.3, 1.6, 2.0, 1.6, 1.3, 1.0];
//var pit = [1.3, 1.2, 1.1, 1.2, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2]; //SINGING
//var pit = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8];
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
		  		isPlaying = false;
		  		x = 120;
		  		// console.log( ((new Date()) - dd ) / 1000)
		  		talk(synthCounter);
		  	}
			  //}, 0)
		  	
		  	
		  	
		  //}
	  };
	  msg.onnomatch = function() {}
	  msg.onerror = function() {}
	  msg.onstart = function() { dd = new Date() }

	  window.speechSynthesis.cancel();
	  console.log (msg); //because it helps since speech chrome api is buggy
	  window.speechSynthesis.speak(msg);
	};

	// talk(synthCounter);

	function talk(counter){	
		var wordStressNumber = RiTa.getStresses(eachWords[counter]).split('/').length;
		// var wordStressNumber = wordStresses.length;
		//console.log(eachWords[counter], wordStressNumber);
		function count() {
			//console.log('count')

			for (var nn=0; nn < clearSpeechTimeouts.length; nn++) {
				clearTimeout( clearSpeechTimeouts[nn] )
			}
			clearSpeechTimeouts = [];

			if (wordStressNumber > 1) {
				for (var nn=1; nn<=wordStressNumber;nn++) {
					clearSpeechTimeouts.push(
						setTimeout(function() {
							console.log("changed x")
							x = 120;
							Tone.Transport.stop();
						}, speechRate * nn * 1000)
					);
				}
			}

			setTimeout(function(){
				speakIt(eachWords[counter].toLowerCase(), voice, rate, pit[counter%7]); // SINGING		
				//speakIt(arpabet[counter], voice, rate, pitchh);
				//x += 10;
				Tone.Transport.start();
				isPlaying = true;
				//updateWordDom(counter);
			}, 5)
			
					
		}
		count();
	}

	// console.log(talk);


//}	
//}, 1000);

// function updateWordDom(counter){
	
// 	var el = document.getElementById('h2Words-' + counter);
// 	console.log(el);
// 	console.log('\n');
// 	if (el)
// 		el.style.color = "#FFFFFF";
// }

/************* End of speech synth ******************/