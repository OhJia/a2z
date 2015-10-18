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