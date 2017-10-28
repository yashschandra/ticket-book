chrome.runtime.onMessage.addListener(function(message, sender, response){
	var scriptOption=message.scriptOption;
	var debitOption=document.getElementById('CREDIT_CARD');
	debitOption.click();
	var opt=document.getElementsByName('CREDIT_CARD')[4];
	var btn=document.getElementById('validate');
	opt.checked=true;
	opt.dispatchEvent(new Event('change'));
	btn.click();	
});
