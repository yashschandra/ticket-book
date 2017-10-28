var from;
var to;
var user;
var pass;
var dt;
var train;
var coach;
var quota;
var names=[];
var age=[];
var gender=[];
var berth=[];
var mobile;
var card;
var month;
var year;
var cvv;

document.addEventListener('DOMContentLoaded', function(){
	init();
	document.getElementById('add').addEventListener('click', function(){
		addPassenger();
	});
	var save=document.getElementById('save');
	save.addEventListener('click', function(){
		saveDetails();
		var detailsForm=document.getElementById('detailsForm');
		detailsForm.parentNode.removeChild(detailsForm);
		chrome.tabs.query({currentWindow: true, active: true}, function(tab){
			chrome.tabs.update(tab.id, {url: 'https://www.irctc.co.in'}, function(){
				console.log('scroll1');
				chrome.tabs.executeScript(tab.id, {file: 'scrollcap1.js'}, function(){
					var redirect=0;
					var input=document.createElement('INPUT');
					input.setAttribute('type', 'text');
					input.setAttribute('id', 'text');
					input.setAttribute('value', 'CAPTCHA 1');
					document.body.appendChild(input);
					var button=document.createElement('BUTTON');
					button.setAttribute('type', 'button');
					button.setAttribute('id', 'btn');
					document.body.appendChild(button);
					button.innerHTML='Click';
					var text=document.getElementById('text');
					var btn=document.getElementById('btn');
					btn.addEventListener('click', function(){
						chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
							console.log(tabs[0]);
							id=tabs[0].id;
							chrome.tabs.executeScript(id, {file: 'login.js'}, function(){
								chrome.tabs.sendMessage(id, {scriptOption: {val: text.value, user: user, pass: pass}}, function(){
									console.log('executed');
									text.parentNode.removeChild(text);
									btn.parentNode.removeChild(btn);
									chrome.tabs.onUpdated.addListener(function(){
										console.log('inside');
										redirect++;
										if(redirect==3){
											if(document.readyState=='complete'){
												findTrains(id);
											}
										}
									});
								});
							});
						});
					});
				});
			});
		});
	});
});

var findTrains=function(id){
	var redirect=0;
	chrome.tabs.executeScript(id, {file: 'findtrains.js'}, function(){
		console.log('inside 2');
		chrome.tabs.sendMessage(id, {scriptOption: {from: from, to: to, dt: dt}}, function(){
			console.log('executed 2');
			chrome.tabs.onUpdated.addListener(function(){
				console.log('inside');
				redirect++;
				if(redirect==3){
					if(document.readyState=='complete'){
						getSeats(id);
					}
				}
			});
		});
	});
};

var getSeats=function(id){
	var redirect=0;
	chrome.tabs.executeScript(id, {file: 'getseats.js'}, function(){
		chrome.tabs.sendMessage(id, {scriptOption: {train: train, coach: coach, quota: quota}}, function(){
			console.log('executed3');
			chrome.tabs.onUpdated.addListener(function(){
				console.log('inside');
				redirect++;
				if(redirect==3){
					if(document.readyState=='complete'){
						details(id);
					}
				}
			});
		});
	});
};

var details=function(id){
	chrome.tabs.executeScript(id, {file: 'scrollcap2.js'}, function(){
		var redirect=0;
		var input=document.createElement('INPUT');
		input.setAttribute('type', 'text');
		input.setAttribute('id', 'cap');
		input.setAttribute('value', 'CAPTCHA 2');
		document.body.appendChild(input);
		var button=document.createElement('BUTTON');
		button.setAttribute('type', 'button');
		button.setAttribute('id', 'btn2');
		document.body.appendChild(button);
		button.innerHTML='Click';
		var cap=document.getElementById('cap');
		var btn=document.getElementById('btn2');
		btn.addEventListener('click', function(){
			chrome.tabs.executeScript(id, {file: 'details.js'}, function(){
				chrome.tabs.sendMessage(id, {scriptOption: {name: names, age: age, gender: gender, berth: berth, mobile: mobile, cap: cap.value}}, function(){
					console.log('executed4');
					cap.parentNode.removeChild(cap);
					btn.parentNode.removeChild(btn);
					chrome.tabs.onUpdated.addListener(function(){
						console.log('inside');
						redirect++;
						if(redirect==3){
							if(document.readyState=='complete'){
								toPay(id);
							}
						}
					});
				});
			});
		});
	});
};

var toPay=function(id){
	var redirect=0;
	chrome.tabs.executeScript(id, {file: 'topay.js'}, function(){
		chrome.tabs.sendMessage(id, {scriptOption: {}}, function(){
			console.log('executed5');
			chrome.tabs.onUpdated.addListener(function(){
				console.log('inside');
				redirect++;
				if(redirect==3){
					if(document.readyState=='complete'){
						selectCard(id);
					}
				}
			});
		});
	});
};

var selectCard=function(id){
	var redirect=0;
	chrome.tabs.executeScript(id, {file: 'selectcard.js'}, function(){
		chrome.tabs.sendMessage(id, {scriptOption: {}}, function(){
			console.log('executed6');
			chrome.tabs.onUpdated.addListener(function(){
				console.log('inside');
				redirect++;
				if(redirect==3){
					if(document.readyState=='complete'){
						payment(id);
					}
				}
			});
		});
	});
};


var payment=function(id){
	var redirect=0;
	chrome.tabs.executeScript(id, {file: 'payment.js'}, function(){
		chrome.tabs.sendMessage(id, {scriptOption: {card: card, month: month, year: year, cvv: cvv}}, function(){
			console.log('executed7');
			chrome.tabs.onUpdated.addListener(function(){
				console.log('inside');
			});
		});
	});
};

var saveDetails=function(){
	from=document.getElementById('from').value;
	to=document.getElementById('to').value;
	user=document.getElementById('user').value;
	pass=document.getElementById('pass').value;
	dt=document.getElementById('dt').value;
	train=document.getElementById('train').value;
	coach=document.getElementById('coach').value;
	quota=document.getElementById('quota').value;
	mobile=document.getElementById('mobile').value;
	card=document.getElementById('card').value;
	month=document.getElementById('month').value;
	year=document.getElementById('year').value;
	cvv=document.getElementById('cvv').value;
	for(i=0; i<document.getElementsByName('name').length; i++){
		if(document.getElementsByName('name')[i].value && document.getElementsByName('age')[i].value && document.getElementsByName('gender')[i].value && document.getElementsByName('berth')[i].value){
			console.log(name);
			gender.push(document.getElementsByName('gender')[i].value);
			names.push(document.getElementsByName('name')[i].value);
			age.push(document.getElementsByName('age')[i].value);
			berth.push(document.getElementsByName('berth')[i].value);
		}
	}
};

var addPassenger=function(){
	var passenger=document.getElementById('passenger');
	var input1=document.createElement('INPUT');
	input1.setAttribute('name', 'name');
	input1.setAttribute('type', 'text');
	passenger.appendChild(input1);
	var input2=document.createElement('INPUT');
	input2.setAttribute('name', 'age');
	input2.setAttribute('type', 'text');
	passenger.appendChild(input2);
	var select1=document.createElement('SELECT');
	select1.setAttribute('name', 'gender');
	var option1=document.createElement('OPTION');
	option1.setAttribute('value', 'M');
	var option2=document.createElement('OPTION');
	option2.setAttribute('value', 'F');
	passenger.appendChild(select1);
	select1.appendChild(option1);
	select1.appendChild(option2);
	option1.innerHTML='M';
	option2.innerHTML='F';
	var select2=document.createElement('SELECT');
	select2.setAttribute('name', 'berth');
	var option3=document.createElement('OPTION');
	option3.setAttribute('value', 'MB');
	var option4=document.createElement('OPTION');
	option4.setAttribute('value', 'LB');
	var option5=document.createElement('OPTION');
	option5.setAttribute('value', 'UB');
	passenger.appendChild(select2);
	select2.appendChild(option3);
	select2.appendChild(option4);
	select2.appendChild(option5);
	option3.innerHTML='MB';
	option4.innerHTML='LB';
	option5.innerHTML='UB';
};

var init=function(){
	document.getElementById('from').value=data['from'];
	document.getElementById('to').value=data['to'];
	document.getElementById('user').value=data['user'];
	document.getElementById('pass').value=data['pass'];
	document.getElementById('dt').value=data['dt'];
	document.getElementById('train').value=data['train'];
	document.getElementById('coach').value=data['coach'];
	document.getElementById('quota').value=data['quota'];
	document.getElementsByName('gender')[0].value=data['gender'];
	document.getElementsByName('name')[0].value=data['name'];
	document.getElementsByName('age')[0].value=data['age'];
	document.getElementsByName('berth')[0].value=data['berth'];
	document.getElementById('mobile').value=data['mobile'];
	document.getElementById('card').value=data['card'];
	document.getElementById('month').value=data['month'];
	document.getElementById('year').value=data['year'];
	document.getElementById('cvv').value=data['cvv'];
};
