var wordRegex, allH1, allH2, allH3, eachWords;

var p;
var allParagraphs; // PARAGRAPHS TEXT ARE STORED HERE
var pCount;
var tempPara;

var authorMatch;
var name;
var allAuthors; // AUTHOR NAMES ARE STORED HERE
var authorCount; 
var authorRegex;
var nameRegex;

var onlyNumbersRegex;
var commentCountRegex;
var nonTextMatch;

var allWords;
var pWordCount;
var allPWords;

var concordance;
var keywords;

function parseHTMLFunc() {
	
	/********************************************* 
	TEXT ANALYSIS & STORAGE

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
	wordRegex = /\b([\w'’"\-.]+)\b/g;

	/* h1 elements*/
	var h1 = document.getElementsByTagName("h1");
	allH1 = [];

	for (var i = 0; i < h1.length; i++){
		// h1[i].style.backgroundColor = '#00FF00';
		allH1.push(h1[i].innerText);
		document.getElementsByTagName("h1")[i].innerHTML = '<span id="headline1-' + 
									i + '">'+h1[i].innerText+'</span>';	
	}

	/* h2 elements*/
	var h2 = document.getElementsByTagName("h2");
	allH2 = [];
	var h2WordCount = -1;

	for (var i = 0; i < h2.length; i++){
		// h2[i].style.backgroundColor = '#FF0000';
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


	eachWords = []
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
	allH3 = [];

	for (var i = 0; i < h3.length; i++){
		h3[i].style.backgroundColor = "0000FF"
		allH3.push(h3[i].innerText);
		document.getElementsByTagName("h3")[i].innerHTML = '<span id="headline3-' + 
									i + '">'+h3[i].innerText+'</span>';	
	}

	/* p element variables */
	p = document.getElementsByTagName("p");
	allParagraphs = []; // PARAGRAPHS TEXT ARE STORED HERE
	pCount = 0;
	pWordCount = 0;
	allPWords = [];
	tempPara = '';

	authorMatch = null;
	name = '';
	allAuthors = []; // AUTHOR NAMES ARE STORED HERE
	authorCount = -1; 
	authorRegex = /^(updated)? by (\w+\.?)( \w+\.?)( \w+\.?)?( \w+\.?)?/i;
	nameRegex = /(\w+\.?)( \w+\.?)( \w+\.?)/g;

	onlyNumbersRegex = /^\d+$/;
	commentCountRegex = /\d+ comments?/i;
	nonTextMatch = null;

	/********************************************* 
	Parse all p elements
	*********************************************/
	for (var i = 0; i < p.length; i++){
		//p[i].style.backgroundColor = "#FF00FF";
		tempPara = p[i].innerText;
		
		/** If is author label, store in allAuthors array, and add span id tag */
		/** NEED TO FIX */
		if (authorMatch = tempPara.match(authorRegex)) {
			
			if (authorMatch[2]) name += authorMatch[2];
			if (authorMatch[3]) name += authorMatch[3];
			if (authorMatch[4]) name += authorMatch[4];
			if (authorMatch[5]) name += authorMatch[5];
			//console.log(name);
			allAuthors.push(name);
			// document.getElementsByTagName("p")[i].style.backgroundColor = "#FF00FF";
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
			// document.getElementsByTagName("p")[i].style.backgroundColor = "#E6E7E8";
			document.getElementsByTagName("p")[i].innerHTML =
			document.getElementsByTagName("p")[i].innerText.replace(wordRegex, 
				function(str){
					if (str) {	
						// console.log("STRINGS:\n");	
						// console.log(str);
						//allPWords.push(str);
						pWordCount++;			
						return '<span id="pWords-' + pWordCount + '">'+str+'</span>';					
					}
				}
			);
			document.getElementsByTagName("p")[i].innerHTML = '<span id="paragraph-' + 
									pCount + '">'+p[i].innerHTML+'</span>';
			pCount++;
			allParagraphs.push(tempPara);
		}

		
	}

	for (var i = 0; i < allParagraphs.length; i++){
		var words = allParagraphs[i].match(wordRegex);
		if (words) {
			for (var j = 0; j < words.length; j++) {
				allPWords.push(words[j]);
			}
		}
	}

	console.log(document.getElementById('pWords-5'));
	

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
	allWords = [];
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
	concordance = {};
	keywords = [];

	var junkWords = [
		'am',
		'an',
		'as',
		'at',
		'by','in','is','it','of','on','or','pm','to','so','are','but','for','had','has','how','its','the','from','have','here','said','that','with'
	];
	var junkTempString = "^";
	var junkRegex;

	for (var i = 0; i < junkWords.length-1; i++){
		junkTempString += junkWords[i] + "|";
	}
	junkTempString += junkWords[junkWords.length-1] + "$";
	junkRegex = new RegExp(junkTempString, "i"); // junkRegex is created
	console.log("JUNK REGEX", junkRegex);
	matchSortWords();
	console.log(concordance);
	console.log("keywords: ", keywords);


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


/************* End of text analysis ********************/

}

