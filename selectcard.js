chrome.runtime.onMessage.addListener(function(message, sender, response){
	var card=document.getElementsByName('Visa')[0];
	card.click();	
});
