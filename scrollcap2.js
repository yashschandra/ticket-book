(function(){
	var flag=true;
	var ele=document.getElementById('nlpCaptchaOuterContainer');
	ele.scrollIntoView(true);
	while(flag){
		console.log('here=========');
		flag=false;
		try{
			var cap1=document.getElementsByName('nlpAnswer')[0];
			if(cap1==undefined || cap1.getAttribute('type')=='hidden'){
				throw 'cap 1 hidden';
			}
		}
		catch(err){
			console.log('cap1 not found.');
			try{
				var  cap2=document.getElementsByName('j_captcha')[0];
				if(cap2==undefined || cap2.getAttribute('type')=='hidden'){
					throw 'cap 2 hidden';
				}
			}
			catch(err){
				console.log('cap2 not found.');
				document.getElementsByClassName('nlpRefresh')[0].click();
				flag=true;
			}
		}
	}
})();
