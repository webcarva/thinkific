$(document).ready(function () {
    
    var tuneSrcArray = [];
    var tuneTypeArray = [];
    var playerIndex = 0;
    
    var init = function () {
        $('.tune.active source').each(function (index) {
            var tuneSrc = $(this).attr('src');
            var tuneType = $(this).attr('type');

            tuneSrcArray[index] = tuneSrc;
            tuneTypeArray[index]= tuneType;
        });

        tune = new Audio(tuneSrcArray);

        $.each(tuneTypeArray, function (index) {
            if (tune.canPlayType(tuneTypeArray[index]+';')) {
                tune.type= tuneTypeArray[index];
                tune.src= tuneSrcArray[index];
                return false;
            }
        });
        
        return tune;
    };
    
    var tune = init();
    
    $('.player-playlist ul li').on('click', function () {
        $('.player-playlist ul li').removeClass('active');
        pause.trigger('click');
        
        $(this).addClass('active');
        
        $('img.active').attr('src', $(this).data('img')); 
        $('h1.title').html($(this).data('title')); 
        $('h2.album').html($(this).data('album')); 
        $('h2.artist').html($(this).data('artist')); 
        
        var assets = $(this).data('asset');
        assets = assets.split(',');
        var types = $(this).data('type');
        types = types.split(',');
        $('.player-audio.tune.active source').remove();
       
        $.each(assets, function (i) {
            $('.player-audio.tune.active').append('<source src="'+assets[i]+'" type="'+types[i]+'">');
        });
        
        var tune = init();
        
        tuneEvents();
    });
    
    var play = $('.play');
    var pause = $('.pause');
    var rewind = $('.rewind');
    var fastforward = $('.fastforward');
    var interval;
    var next = $('.next');
    var back = $('.back');
   
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
    
    var tuneEvents = function () {
        tune.addEventListener('timeupdate', function() {
            $('.player-end').html('0:00');
            
            var currentTime = tune.currentTime;
            var duration = tune.duration;
            $('.player-progress').stop(true,true).animate({'width':(currentTime+0.25)/duration*100+'%'},250,'linear');

            var mins = "0" + Math.floor(currentTime / 60);
            var secs = "0" +  Math.floor(currentTime - mins * 60);
            var progress = mins.substr(-1) + ":" + secs.substr(-2);
            $('.player-start').html(progress);
            
            if (tune.duration) { 
                var minsx = "0" + Math.floor(duration / 60);
                var secsx = "0" +  Math.floor(duration - mins * 60);
                var durationFormat = minsx.substr(-1) + ":" + secsx.substr(-2);
                $('.player-end').html(durationFormat);
            }
        });
    };
    
    next.on('click', function () {
        if (playerIndex === ( $(".player-playlist ul li").size() - 1 ) ) {
            playerIndex = 0;
        } else {
            playerIndex++;
        }
        console.log(playerIndex);
        $(".player-playlist ul li[data-index='" + playerIndex + "']").click();
    });
    back.on('click', function () {
       if (playerIndex === 0) {
            playerIndex = ( $(".player-playlist ul li").size() - 1);
        } else {
            playerIndex--;
        }
        $(".player-playlist ul li[data-index='" + playerIndex + "']").click();
    });
});