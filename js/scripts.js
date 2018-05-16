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
	window.setTimeout(playPause,1000);
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

function animateRotate(spawn) {
    // caching the object for performance reasons
    var $elem = spawn;

    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({deg: 0}).animate({deg: 2880}, {
        duration: 40000,
        step: function(now) {
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}

function fun(){
	var num = Math.random();
	var spawn;
	var offset = Math.floor(Math.random()*100)
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

function animation(spawn){
	$(spawn).css('position-x',)
}




window.setInterval(fun,1000);