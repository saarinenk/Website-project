
var data;
var i = -1;
var response = $.getJSON("https://saarink5.firebaseio.com/.json",response, function() { 
	data = response.responseJSON;
	if(typeof localStorage.currentIndex !== "undefined") {
  	i = Number(localStorage.currentIndex)-1;
  } else {
  	i = -1;
  }
});

window.onload = function() {
	console.log(data);
};

var timerOn;
var timer;

function nextImage() {
	$("#aloituskuva").fadeOut();
	i = (i== data.length - 1) ? 0 : i+1;
	document.getElementById("aloituskuva").src = data[i].url;
	localStorage.currentIndex = i;
	$("#aloituskuva").hide();
	$("#aloituskuva").fadeIn();

	var newText = "<h3>" + data[i].text + "</h3>";
	document.getElementById("tekstikaruselli").innerHTML = newText;
}

function previousImage() {
	$("#aloituskuva").fadeOut();
	i = (i <= 0) ? data.length - 1 : i-1;
	document.getElementById("aloituskuva").src = data[i].url;
	localStorage.currentIndex = i;
	$("#aloituskuva").hide();
	$("#aloituskuva").fadeIn();

	var newText = "<h4>" + data[i].text + "</h4>";
	document.getElementById("tekstikaruselli").innerHTML = newText;
}

function toggleText(button_id)  {
   var text = document.getElementById(button_id).firstChild;
   text.data = text.data == "Play" ? "Pause" : "Play";
}


function startTimer() {
	timer = setInterval(nextImage, 3000);
	timerOn = true;
}

window.onload = function() {
	startTimer();
};

function endOrStartTimer() {
	if(timerOn) {
		window.clearTimeout(timer);
		timerOn = false;
	} else {
		startTimer();
		timerOn = true;
	}
}


