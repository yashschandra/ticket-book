chrome.runtime.onMessage.addListener(function(message, sender, response){
	var scriptOption=message.scriptOption;
	var btn=document.getElementById('validate');
	var cap1=document.getElementsByName('nlpAnswer')[0];
	var cap2=document.getElementsByName('j_captcha')[0];
	for(var i=0; i<scriptOption.name.length; i++){
		var row=document.getElementById('addPassengerForm:psdetail:'+i);
		row.cells[1].getElementsByTagName('input')[0].value=scriptOption.name[i];
		row.cells[2].getElementsByTagName('input')[0].value=scriptOption.age[i];
		row.cells[3].getElementsByTagName('select')[0].value=scriptOption.gender[i];
		row.cells[4].getElementsByTagName('select')[0].value=scriptOption.berth[i];
	}
	document.getElementsByName('addPassengerForm:mobileNo')[0].value=scriptOption.mobile;
	try{
		cap1.setAttribute('value', scriptOption.cap);
	}
	catch(err){
		console.log('cap1 not found.');
	}
	try{
		cap2.setAttribute('value', scriptOption.cap);
	}
	catch(err){
		console.log('cap2 not found.');
	}
	btn.click();
});
