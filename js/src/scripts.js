$(document).ready(function () {
    var tune = new Audio('assets/audio/02_Three_Little_Birds.mp3','assets/audio/02_Three_Little_Birds.ogg');
    
    var play = $('.play');
    var pause = $('.pause');
    
    if (tune.canPlayType('audio/mpeg;')) {
  	     tune.type= 'audio/mpeg';
  	     tune.src= 'assets/audio/02_Three_Little_Birds.mp3';
	} else {
  	     tune.type= 'audio/ogg';
  	     tune.src= 'assets/audio/02_Three_Little_Birds.ogg';
	}
    
    $('.play').on('click', function(e) {
		e.preventDefault();
		tune.play();

		$(this).hide();
        pause.fadeIn();
        
		//container.addClass('containerLarge');
		//cover.addClass('coverLarge');
		//$('#close').fadeIn(300);
		//$('#seek').attr('max',song.duration);
	});
    
    $('.pause').on('click', function(e) {
		e.preventDefault();
		tune.pause();
        
        $(this).hide();
        play.fadeIn();

		//$(this).replaceWith('<a class="button gradient" id="pause" href="" title=""></a>');
		//container.addClass('containerLarge');
		//cover.addClass('coverLarge');
		//$('#close').fadeIn(300);
		//$('#seek').attr('max',song.duration);
	});
    
    tune.addEventListener("timeupdate", function() {
        var currentTime = tune.currentTime;
        var duration = tune.duration;
        $('.player-progress').stop(true,true).animate({'width':(currentTime +0.25)/duration*100+'%'},250,'linear');
        
        var mins = "0" + Math.floor(currentTime / 60);
        var secs = "0" +  Math.floor(currentTime - mins * 60);
        var progress = mins.substr(-1) + ":" + secs.substr(-2);
        $('.player-start').html(progress);
    });
});