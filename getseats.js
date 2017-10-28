chrome.runtime.onMessage.addListener(function(message, sender, response){
	var scriptOption=message.scriptOption;
	var quotas=document.getElementsByName('quota');
	for(i=0; i<quotas.length; i++){
		if(quotas[i].getAttribute('value')==scriptOption.quota){
			quotas[i].checked=true;
			break;
		}
	}
	for(i=0; i<4; i++){
		var id='cllink'+'-'+scriptOption.train+'-'+scriptOption.coach+'-'+i;
		var link=document.getElementById(id);
		console.log(id, link);
		if(link!==undefined && link){
			link.click();
			var book=scriptOption.train+'-'+scriptOption.coach+'-'+scriptOption.quota+'-'+'0';
			var interval=setInterval(function(){
				var link=document.getElementById(book);
				console.log(book, link);
				if(link!==undefined && link){
					link.click();
					clearInterval(interval);
				}
			}, 500);
		}
	}
});
