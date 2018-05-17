var triggered = false;

function fun(){
	var num = Math.random();
	var spawn;
	var offset = Math.floor(Math.random()*80)
	if(num <= .33){
		$('body').append('<img class="spawn kent" style="left:'+ offset + '%" src="resources/sexy.png">');
	} else if( num > .33 && num <= .66){
		$('body').append('<img class="spawn otto" style="left:'+ offset + '%" src="resources/sexy_overload.png">');
	} else{
		$('body').append('<img class="spawn jimbo" style="left:'+ offset + '%" src="resources/also_sexy.png">');
	}
	$('.spawn').animate({
		top: $(window).height()
	}, 10000, function(){
		$(this).remove();
	});
}


var context = new (window.AudioContext || window.webkitAudioContext)();

var get_song = new XMLHttpRequest();


var worlds_greatest = { audio: context.createBufferSource(),
	     audioData: context.createBufferSource(),
	     modifier: context.createGain(),
	     file: "../resources/worlds_greatest.mp3",
	     vocal: "solo",
	     request: new XMLHttpRequest(),
	     isPlaying: false,
	     startTime: null,
	     seekAsOfLastPause: 0,
	     duration: 0
}

allParts = [worlds_greatest];

get_song.open("GET", "resources/worlds_greatest.mp3", true);
get_song.responseType = "arraybuffer";
get_song.onload = function(){
	//request.response is audio
	context.decodeAudioData(get_song.response, onDecoded);
}

function onDecoded(buffer){
	worlds_greatest.audioData.buffer = buffer;
	$('.playpausebutton .material-icons').html("play_arrow");
	$('.playpausebutton').css('background-color','#eee')
	$('.playpausebutton').click(function(){
		if($('.playpausebutton .material-icons').html() == "play_arrow"){
			$('.playpausebutton .material-icons').html("pause");
			playPause();
			console.log("playing")
		} else {
			$('.playpausebutton .material-icons').html("play_arrow");
			playPause();
		}
	});
}

get_song.send();

function playPause(){
	if(worlds_greatest.isPlaying == false) {
		worlds_greatest.isPlaying = true;
		worlds_greatest.audio = context.createBufferSource();
		worlds_greatest.audio.loop = true;
		worlds_greatest.audio.buffer = worlds_greatest.audioData.buffer;
		worlds_greatest.startTime = context.currentTime;
		worlds_greatest.audio.connect(worlds_greatest.modifier);
		worlds_greatest.modifier.connect(context.destination);
		worlds_greatest.audio.start(0,worlds_greatest.duration);
	} else {
		worlds_greatest.isPlaying = false;
		worlds_greatest.audio.stop();
		worlds_greatest.seekAsOfLastPause = context.currentTime - worlds_greatest.startTime;
		worlds_greatest.duration += worlds_greatest.seekAsOfLastPause;
	}
}

function rainbody(){
	rand = Math.random()*100;
	$('body').css('background-color',function(){
		return('hsl(' + (rand)%360 + ',100%,50%)');
	});
}

window.setInterval(rainbody,2000);

window.setInterval(fun,1000);