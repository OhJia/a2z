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
		//console.log("MATCHED LIST!");
		//console.log("MATCHED LIST: "+matchList[1]);
		matchList[1] = matchList[1].replace(/([\w ]+)/gi, "click");
		//console.log("CHANGED: "+matchList[1]);
	    document.getElementsByTagName("li")[l].innerHTML = matchList[1];
	    
	    l++;
	}

	var regexImg = /<img.*src=\"(.*?)\".*>/g;
	var matchImg, img = 0;
	while (matchImg = regexImg.exec(document.body.outerHTML)) {
		//console.log("MATCHED IMAGE!");
		//console.log("MATCHED IMAGE: "+matchImg[1]);
		matchImg[1] = matchImg[1].replace(/(.+)/gi, "./The New York Times - Breaking News, World News & Multimedia_files/replace1.jpg");
		//console.log("CHANGED: "+matchImg[1]);
		document.getElementsByTagName("img")[img].src = matchImg[1];
		//document.getElementById("google_image_div")[img].innerHTML = "";
		img++;
	}

	// var regexIFrames = /<iframe.*?>(.*?)<\/iframe>/g;
	// var matchIFrames, iframe = 0;
	// var iframeEI;
	var replaceElement = document.createElement('span');
	replaceElement.innerHTML = 'ADS!';
	
	// while (matchIFrames = regexIFrames.exec(document.body.outerHTML)) {
	// 	console.log("MATCHED IFRAME!");
	// 	console.log("MATCHED IFRAME: "+matchIFrames);
	// 	matchIFrames[1] = "ADS";
	// 	console.log("CHANGED: "+matchIFrames[1]);
	// 	iframeEI = document.getElementsByTagName("iframe")[iframe];
	// 	iframeEI.parentNode.insertBefore(replaceElement, iframeEI);
	// 	iframeEI.parentNode.removeChild(iframeEI);
	// 	//document.getElementById("google_image_div")[img].innerHTML = "";
	// 	// iframe++;
	// }
	console.log('start iframes')
	var iframes = document.getElementsByTagName('iframe');
	for (var i=0; i<iframes.length; i++){
		console.log('delete iframe ', i, iframes[i])
		//iframes[i].parentNode.replaceChild(replaceElement, iframes[i]);
		iframes[i].parentNode.removeChild(iframes[i]);
		//iframes[i].parentNode.innerHTML = "";
	}
	console.log('end iframes')

	// var regexButtons = /<button.*?>(.*?)<\/button>/g;
	// var matchButtons, b = 0;
	// while (matchButtons = regexButtonsexec(document.body.outerHTML)){
	// 	matchButtons[1] = matchButtons[1].replace(/([\w ]+)/gi, "CLICK!");
	// 	document.getElementsByTagName("button")[b].innerHTML = matchButtons[1];
	// 	b++;
	// }


}

setTimeout(timeOut, 3000);