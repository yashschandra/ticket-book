chrome.runtime.onMessage.addListener(function(message, sender, response){
	var scriptOption=message.scriptOption;
	var from=document.getElementsByName('jpform:fromStation')[0];
	var to=document.getElementsByName('jpform:toStation')[0];
	var dt=document.getElementsByName('jpform:journeyDateInputDate')[0];
	var btn=document.getElementById('jpform:jpsubmit');
	from.setAttribute('value', scriptOption.from);
	to.setAttribute('value', scriptOption.to);
	dt.setAttribute('value', scriptOption.dt);
	btn.click();
});
