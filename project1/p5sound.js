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

// //var stepNumber = 0;
// var noteNames = ["A.1", "A.2", "B.1"];
// //the repeated callback
// Tone.Transport.setInterval(function(time){
// 	//get the notes at the step
// 	//var column = matrix1.matrix[stepNumber];
// 	for (var i = 0; i < 3; i++){
// 		//if (column[i] === 1){
// 			sampler.triggerAttackRelease(noteNames[i], "2n" + "4n", time);
// 		//}
// 	}
// 	//stepNumber++;
// 	//stepNumber = stepNumber % 16;
// }, "2n");
// //transport settings
// Tone.Transport.loopEnd = "1m";
// Tone.Transport.loop = true;


//listen for when all the samples have loaded
Tone.Buffer.onload = function(){
	//sample.player.loop = true;
	Tone.Transport.setInterval(function(time){
		sampler.triggerAttackRelease("A.1", "1n", time);
		//sampler.triggerAttack("A.1", time + "4n");
		sampler.triggerAttackRelease("A.2", "2n", time);
	}, "4n");
	
};

Tone.Transport.start();

// var keys = new Tone.PolySynth(4, Tone.Sampler, {
// 	"A" : "./audio/casio/A1.mp3",
// 	"C#" : "./audio/casio/Cs2.mp3",
// 	"E" : "./audio/casio/E2.mp3",
// 	"F#" : "./audio/casio/Fs2.mp3",
// }, {
// 	"envelope" : {
// 		"release" : 0.2
// 	}
// }).toMaster();
// keys.volume.value = -15;
// //keep track of steps and notes
// var stepNumber = 0;
// var noteNames = ["A", "C#", "E", "F#"];
// //the repeated callback
// Tone.Transport.setInterval(function(time){
// 	//get the notes at the step
// 	var column = matrix1.matrix[stepNumber];
// 	for (var i = 0; i < 4; i++){
// 		if (column[i] === 1){
// 			keys.triggerAttackRelease(noteNames[i], "32n", time);
// 		}
// 	}
// 	stepNumber++;
// 	stepNumber = stepNumber % 16;
// }, "32n");
// //transport settings
// Tone.Transport.loopEnd = "1m";
// Tone.Transport.loop = true;

