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
	    console.log(match[1]);
	    i++;
	}

	// Matching and replacing all <h1><h2><h3> tags
	var regexHeadline = /<(h[123]).*?>.*?<a.*?>(.*?)<\/a><\/h[123]>/g;
	var matchHeadline, j1 = 0, j2 = 0, j3 = 0;
	while (matchHeadline = regexHeadline.exec(document.body.outerHTML)) {
		console.log('')
		console.log('')
		console.log('')
		console.log('')
		console.log('')
		console.log('')
		console.log(matchHeadline[1], matchHeadline[2]);
		if (matchHeadline[1] == "h1") {
			matchHeadline[2] = matchHeadline[2].replace(/([\w]+)/gi, "H1 ");
			document.getElementsByTagName("h1")[j1].innerHTML = matchHeadline[2];
			j1++;
		} else if (matchHeadline[1] == "h2") {
			console.log("MATCH!");
			console.log(document.getElementsByTagName("h2")[j2]);
			matchHeadline[2] = matchHeadline[2].replace(/([\w]+)/gi, "H2 ");
			console.log("matchHeadline[2]: "+matchHeadline[2]);
			document.getElementsByTagName("h2")[j2].innerHTML = matchHeadline[2];
			j2++;
		} else if (matchHeadline[1] == "h3") {
			matchHeadline[2] = matchHeadline[2].replace(/([\w]+)/gi, "H3 ");
			document.getElementsByTagName("h2")[j3].innerHTML = matchHeadline[2];
			j3++;
		}
		
	}
}

setTimeout(timeOut, 5000);