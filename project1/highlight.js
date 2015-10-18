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
	document.getElementsByTagName("h2")[counter].innerHTML = 
	document.getElementsByTagName("h2")[counter].innerText.replace(/\b(\w+)\b/g, 
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