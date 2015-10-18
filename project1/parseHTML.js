
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

function forEach(array, action){
	for (var i = 0; i < array.length; i++){
		action(array[i]);
	}
}

function map(func, array) {
  var result = [];
  forEach(array, function (element) {
    result.push(func(element));
  });
  return result;
}

/********************************************* 
Parse all headline elements
*********************************************/
var wordRegex = /\b([\w'’"\-.]+)\b/g;

/* h1 elements*/
var h1 = document.getElementsByTagName("h1");
var allH1 = [];

for (var i = 0; i < h1.length; i++){
	h1[i].style.backgroundColor = '#00FF00';
	allH1.push(h1[i].innerText);
	document.getElementsByTagName("h1")[i].innerHTML = '<span id="headline1-' + 
								i + '">'+h1[i].innerText+'</span>';	
}

/* h2 elements*/
var h2 = document.getElementsByTagName("h2");
var allH2 = [];
var h2WordCount = -1;

for (var i = 0; i < h2.length; i++){
	h2[i].style.backgroundColor = '#FF0000';
	if (h2[i].innerText == ''){
		continue;
	} else {
		allH2.push(h2[i].innerText);
		document.getElementsByTagName("h2")[i].innerHTML =
		document.getElementsByTagName("h2")[i].innerText.replace(wordRegex, 
			function(str){
				if (str) {	
					// console.log("STRINGS:\n");	
					// console.log(str);
					h2WordCount++;			
					return '<span id="h2Words-' + h2WordCount + '">'+str+'</span>';					
				}
			}
		);
		document.getElementsByTagName("h2")[i].innerHTML = '<span id="headline2-' + 
								i + '">'+h2[i].innerHTML+'</span>';
	}
		
}
// console.log("document.getElementById('h2Words-5')\n");
// console.log(document.getElementById('h2Words-5'));


var eachWords = []
for (var i = 0; i < allH2.length; i++){
	var words = allH2[i].match(wordRegex);
	if (words) {
		for (var j = 0; j < words.length; j++) {
			eachWords.push(words[j]);
		}
	}
}


/* h3 elements*/
var h3 = document.getElementsByTagName("h3");
var allH3 = [];

for (var i = 0; i < h3.length; i++){
	h3[i].style.backgroundColor = "0000FF"
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
	//p[i].style.backgroundColor = "#FF00FF";
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
		document.getElementsByTagName("p")[i].style.backgroundColor = "#FF00FF";
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
		document.getElementsByTagName("p")[i].style.backgroundColor = "#0000FF";
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
//var wordRegex = /\b([\w'’"\-.]+)\b/g;
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



