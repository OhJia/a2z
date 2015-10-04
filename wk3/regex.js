function timeOut() {
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')

	// Matching and replacing all <p> tags
	//var rawContent = /<p class="summary">(.*?)<\/p>/gm;
	var regexSummary = /<p.*?>(.*?)<\/p>/gm;	
	var match, i = 0;
	while (match = regexSummary.exec(document.body.outerHTML)) {
	    match[1] = match[1].replace(/([\w]+)/gi, "BLAH ");
	    document.getElementsByTagName("p")[i].innerHTML = match[1];
	    //console.log(match[1]);
	    i++;
	}

	// Matching and replacing all <h1><h2><h3> tags
	//var regexHeadline = /<(h[123]).*?>\s*<a.*?>(.*?)<\/a>\s*<\/\1>/g;
	var regexHeadline = /<(h[1234]).*?>\s*(<a.*?>)?(.*?)(<\/a>)?\s*<\/\1>/g;
	var matchHeadline, j1 = 0, j2 = 0, j3 = 0, j4 = 0;
	while (matchHeadline = regexHeadline.exec(document.body.outerHTML)) {
		// console.log('')
		// console.log('')
		// console.log('')
		// console.log('')
		// console.log('')
		// console.log('')
		//console.log(matchHeadline[1], matchHeadline[2]);
		if (matchHeadline[1] == "h1") {
			matchHeadline[3] = matchHeadline[3].replace(/([\w ]+)/gi, "H1 ");
			document.getElementsByTagName("h1")[j1].innerHTML = matchHeadline[3];
			j1++;
		} else if (matchHeadline[1] == "h2") {
			//console.log("MATCH!");
			//console.log(document.getElementsByTagName("h2")[j2]);
			matchHeadline[3] = matchHeadline[3].replace(/([\w ]+)/gi, "H2 ");
			document.getElementsByTagName("h2")[j2].innerHTML = matchHeadline[3];
			j2++;
		} else if (matchHeadline[1] == "h3") {
			//console.log("MATCH h3!");
			//console.log(document.getElementsByTagName("h3")[j3]);
			matchHeadline[3] = matchHeadline[3].replace(/([\w ]+)/gi, "H3 ");
			document.getElementsByTagName("h3")[j3].innerHTML = matchHeadline[3];
			j3++;
		} else if (matchHeadline[1] == "h4") {
			//console.log("MATCH h3!");
			//console.log(document.getElementsByTagName("h3")[j3]);
			matchHeadline[3] = matchHeadline[3].replace(/([\w ]+)/gi, "H4 ");
			document.getElementsByTagName("h4")[j4].innerHTML = matchHeadline[3];
			j4++;
		}
		
	}

	//var regexList = /<li.*?>\s*(<a.*?>)?.*(.*?)(<\/a>)?\s*<\/li>/g;
	var regexList = /<li.*?>\s*.*?(.*?)\s*.*?<\/li>/g;
	//var regexList = /<li.*?>(.*?)<\/li>/g;
	var matchList, l = 0;
	while (matchList = regexList.exec(document.body.outerHTML)) {
		console.log("MATCHED LIST!");
		console.log("MATCHED LIST: "+matchList[1]);
		matchList[1] = matchList[1].replace(/([\w ]+)/gi, "click");
		console.log("CHANGED: "+matchList[1]);
	    document.getElementsByTagName("li")[l].innerHTML = matchList[1];
	    
	    l++;
	}

	// var regexButtons = /<button.*?>(.*?)<\/button>/g;
	// var matchButtons, b = 0;
	// while (matchButtons = regexButtonsexec(document.body.outerHTML)){
	// 	matchButtons[1] = matchButtons[1].replace(/([\w ]+)/gi, "CLICK!");
	// 	document.getElementsByTagName("button")[b].innerHTML = matchButtons[1];
	// 	b++;
	// }


}

setTimeout(timeOut, 500);