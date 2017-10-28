chrome.runtime.onMessage.addListener(function(message, sender, response){
	var scriptOption=message.scriptOption;
	var card=document.getElementById('CardNumber');
	var month=document.getElementById('CardMonth');
	var year=document.getElementById('CardYear');
	var cvv=document.getElementById('Securecode');
	var btn=document.getElementById('Paybutton');
	//console.log(scriptOption);
	card.value=scriptOption.card;
	month.value=scriptOption.month;
	year.value=scriptOption.year;
	cvv.value=scriptOption.cvv
	btn.click();	
});
