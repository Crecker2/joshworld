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


function rainbody(){
	rand = Math.random()*100;
	$('body').css('background-color',function(){
		return('hsl(' + (rand)%360 + ',100%,50%)');
	});
}

function playPause(){
	if(sea_shanty.isPlaying == false) {
		sea_shanty.isPlaying = true;
		sea_shanty.audio = context.createBufferSource();
		sea_shanty.audio.loop = true;
		sea_shanty.audio.buffer = sea_shanty.audioData.buffer;
		sea_shanty.startTime = context.currentTime;
		sea_shanty.audio.connect(sea_shanty.modifier);
		sea_shanty.modifier.connect(context.destination);
		sea_shanty.audio.start(0,sea_shanty.duration);
	} else {
		sea_shanty.isPlaying = false;
		sea_shanty.audio.stop();
		sea_shanty.seekAsOfLastPause = context.currentTime - sea_shanty.startTime;
		sea_shanty.duration += sea_shanty.seekAsOfLastPause;
	}
}

$('.playpausebutton').click(function(){
	if(!triggered){

		$('.playpausebutton .material-icons').html("refresh");
		$('.playpausebutton .material-icons').css('transform', 'rotate(3000deg)');

		triggered = !triggered;
		context = new (window.AudioContext || window.webkitAudioContext)();

		get_song = new XMLHttpRequest();


		sea_shanty = { audio: context.createBufferSource(),
			     audioData: context.createBufferSource(),
			     modifier: context.createGain(),
			     file: "../resources/Sea_Shanty2.mp3",
			     vocal: "solo",
			     request: new XMLHttpRequest(),
			     isPlaying: false,
			     startTime: null,
			     seekAsOfLastPause: 0,
			     duration: 0
		}

		allParts = [sea_shanty];

		get_song.open("GET", "resources/Sea_Shanty2.mp3", true);
		get_song.responseType = "arraybuffer";
		get_song.onload = function(){
			//request.response is audio
			context.decodeAudioData(get_song.response, onDecoded);
		}

		function onDecoded(buffer){
			sea_shanty.audioData.buffer = buffer;
			$('.playpausebutton .material-icons').css('transition', '0s all');
			$('.playpausebutton .material-icons').css('transform', 'rotate(0deg)');
			$('.playpausebutton .material-icons').html("pause");
			playPause();			
		}

		get_song.send();

		
		
	} else {
		if($('.playpausebutton .material-icons').html() == "play_arrow"){
				$('.playpausebutton .material-icons').html("pause");
				playPause();
				console.log("playing")
		} else {
				$('.playpausebutton .material-icons').html("play_arrow");
				playPause();
		}
	}

});
window.setInterval(rainbody,2000);

window.setInterval(fun,1000);
