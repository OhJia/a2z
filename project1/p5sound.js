//create one of Tone's built-in synthesizers and connect it to the master output
var synth = new Tone.SimpleSynth().toMaster();

//play a middle c for the duration of an 8th note
synth.triggerAttackRelease("C4", "8n");
// setTimeout(function(){synth.triggerAttackRelease("E4", "8n");}, 800)
// setTimeout(function(){synth.triggerAttackRelease("C4", "8n");}, 2000)
// setTimeout(function(){synth.triggerAttackRelease("E4", "8n");}, 4000)
// setTimeout(function(){synth.triggerAttackRelease("C4", "8n");}, 6000)