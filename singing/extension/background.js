/*

  Developed by Jiashan Wu <http://fromjia.com>.

  ####################################################################################

*/


chrome.browserAction.onClicked.addListener( function(tab) {
	chrome.tabs.sendRequest( tab.id, {'speakSelection': true});
});


