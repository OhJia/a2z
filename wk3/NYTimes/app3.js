
// var headline1 = document.getElementsByTagName("h1");
var headline2 = document.getElementsByTagName("h2");
// var headline3 = document.getElementsByTagName("h3");
// var headline4 = document.getElementsByTagName("h4");
// var paragraphs = document.getElementsByTagName("p");
//var images = document.getElementsByTagName("img");
//var iframes = document.getElementsByTagName("iframe");
//var links = document.getElementsByTagName("li");
var words; 
var temp;
for (var i = 0; i < headline2.length; i++){
	//console.log(headline2[i].outerHTML);
	//while (m = regex.exec(headline2[i].outerHTML)){
		// temp = m[3].replace(/<.*>/g, "");
		// words = temp.match(/\b\w+\b/g);
		// for (var i = 0; i < words.length; i++){

		// }
		// document.getElementsByTagName("h2")[i].innerText.replace(/\b(\w+)\b/g, 
		// 	'<style="background-color:blue">$1</style>')
	temp = headline2[i];
	words = "Hellow World".match(/\b\w+\b/);
		highlight(i);
	//}
}

function highlight(counter){
	function change() {
		document.getElementsByTagName("h2")[counter].innerHTML=document.getElementsByTagName("h2")[counter].innerText.replace(/\b(\w+)\b/g, 
			function(str){
				words(str);
			});
		console.log(document.getElementsByTagName("h2")[counter].innerHTML);
		console.log(counter);
	}
	setTimeout(change, counter * 1000);
}

function words(str){
	function count() {
		return '<span id ="'+counter+'" style="background-color:yellow">'+str+'</span>';
	}
	setTimeout(count, 1000);
}


// var regex = /<(h[1234]|p).*?>\s*(<a.*?>)?(.*?)(<\/a>)?\s*<\/\1>/g;
// var matches;
// var i = 0;
// var single = {};
// var all = [];

// //{headline: "",  }

// while (matches = regex.exec(document.getElementById("main").innerHTML)){
	
// 	matches[3] = matches[3].replace(/<.*>/g, "");

// 	if (matches[1] == "h1" || matches[1] == "h2" || 
// 		matches[1] == "h3" || matches[1] == "h4") {
// 		if(matches[2])
// 			//console.log("headline: " + matches[3]);
// 			//single.headline = matches[3];
// 			all.push(matches[3]);
// 	} else {
// 		//console.log("content: " + matches[3]);
// 		//document.getElementsByTagName("p")[i].innerHTML = matches[3];
// 		//i++;
// 		//single.paragraph = matches[3]; 
// 		all.push(matches[3]);
// 	}
		
// }

// console.log(all);

// var text = "Bernie Sanders Raises $26 Million, Powered by Online Donations Exceeding Obama’s 2008 Pace";
// var voices = window.speechSynthesis.getVoices()  
// var voice = voices[61]; // robo voice

// var speakIt = function(text, voice, rate, pitch) {
//   var msg = new SpeechSynthesisUtterance();
//   if (voice) msg.voice = voice;
//   msg.volume = 1;
//   if (rate) msg.rate = rate;
//   if (pitch) msg.pitch = pitch;
//   msg.text = text;
//   msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Pipe Organ'; 	})[0];
//   window.speechSynthesis.speak(msg)
// };

// speakIt( text, voice, 12.5, 1.2 );

// text, voice, rate, pitch
//speakIt( text, voice, 12.5, 1.2 );


