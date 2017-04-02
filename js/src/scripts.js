$(document).ready(function () {
    var tune = new Audio('assets/audio/02_Three_Little_Birds.mp3','assets/audio/02_Three_Little_Birds.ogg');
    
    var play = $('.play');
    var pause = $('.pause');
    var rewind = $('.rewind');
    var fastforward = $('.fastforward');
    var interval;
    
    if (tune.canPlayType('audio/mpeg;')) {
  	     tune.type= 'audio/mpeg';
  	     tune.src= 'assets/audio/02_Three_Little_Birds.mp3';
	} else {
  	     tune.type= 'audio/ogg';
  	     tune.src= 'assets/audio/02_Three_Little_Birds.ogg';
	}
    
    play.on('click', function(e) {
		tune.play();

		$(this).hide();
        pause.fadeIn();
	});
    
    pause.on('click', function(e) {
		tune.pause();
        
        $(this).hide();
        play.fadeIn();
	});
    
    rewind.on('mousedown', function () {
        interval = setInterval( function () {
            var currentTime = tune.currentTime;
            tune.currentTime = (currentTime >= 3.0) ? currentTime - 3.0 : 0;
            tune.playbackRate = -3.0;
        }, 500);
        
    });
    rewind.on('mouseup', function () {
        clearInterval(interval);
        tune.playbackRate = 1.0;
    });
    
    fastforward.on('mousedown', function () {
        tune.playbackRate = 3.0;
    });
    
    fastforward.on('mouseup', function () {
        tune.playbackRate = 1.0;
    });
    
    tune.addEventListener("timeupdate", function() {
        var currentTime = tune.currentTime;
        var duration = tune.duration;
        $('.player-progress').stop(true,true).animate({'width':(currentTime+0.25)/duration*100+'%'},250,'linear');
        
        var mins = "0" + Math.floor(currentTime / 60);
        var secs = "0" +  Math.floor(currentTime - mins * 60);
        var progress = mins.substr(-1) + ":" + secs.substr(-2);
        $('.player-start').html(progress);
    });
});