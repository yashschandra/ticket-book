chrome.runtime.onMessage.addListener(function(message, sender, response){
	var scriptOption=message.scriptOption;
	var user=document.getElementsByName('j_username')[0];
	var pass=document.getElementsByName('j_password')[0];
	var cap1=document.getElementsByName('nlpAnswer')[0];
	var cap2=document.getElementsByName('j_captcha')[0];
	var btn=document.getElementById('loginbutton');
	user.setAttribute('value', scriptOption.user);
	pass.setAttribute('value', scriptOption.pass);
	try{
		cap1.setAttribute('value', scriptOption.val);
	}
	catch(err){
		console.log('cap1 not found.');
	}
	try{
		cap2.setAttribute('value', scriptOption.val);
	}
	catch(err){
		console.log('cap2 not found.');
	}
	btn.click();
});
