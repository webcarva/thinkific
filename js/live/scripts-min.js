/*
 technical 2017-04-02 
*/

$(document).ready(function(){var a=[],b=[],c=0,d=function(){return $(".tune.active source").each(function(c){var d=$(this).attr("src"),e=$(this).attr("type");a[c]=d,b[c]=e}),m=new Audio(a),$.each(b,function(c){if(m.canPlayType(b[c]+";"))return m.type=b[c],m.src=a[c],!1}),m},e=function(){m.addEventListener("timeupdate",function(){$(".player-end").html("0:00");var a=m.currentTime,b=m.duration;$(".player-progress").stop(!0,!0).animate({width:(a+.25)/b*100+"%"},250,"linear");var c="0"+Math.floor(a/60),d="0"+Math.floor(a-60*c),e=c.substr(-1)+":"+d.substr(-2);if($(".player-start").html(e),m.duration){var f="0"+Math.floor(b/60),g="0"+Math.floor(b-60*c),h=f.substr(-1)+":"+g.substr(-2);$(".player-end").html(h)}})};$(".player-playlist ul li").on("click",function(){$(".player-playlist ul li").removeClass("active"),h.trigger("click"),$(this).addClass("active"),$("img.active").attr("src",$(this).data("img")),$(".player-image").css({"background-image":"url(assets/imgs/cover1.jpg)"}),$("h1.title").html($(this).data("title")),$("h2.album").html($(this).data("album")),$("h2.artist").html($(this).data("artist"));var a=$(this).data("asset");a=a.split(",");var b=$(this).data("type");b=b.split(","),$(".player-audio.tune.active source").remove(),$.each(a,function(c){$(".player-audio.tune.active").append('<source src="'+a[c]+'" type="'+b[c]+'">')});d();e()});var f,g=$(".play"),h=$(".pause"),i=$(".rewind"),j=$(".fastforward"),k=$(".next"),l=$(".back");g.on("click",function(a){m.play(),$(this).hide(),h.fadeIn()}),h.on("click",function(a){m.pause(),$(this).hide(),g.fadeIn()}),i.on("mousedown",function(){f=setInterval(function(){var a=m.currentTime;m.currentTime=a>=3?a-3:0,m.playbackRate=-3},500)}),i.on("mouseup",function(){clearInterval(f),m.playbackRate=1}),j.on("mousedown",function(){m.playbackRate=3}),j.on("mouseup",function(){m.playbackRate=1}),k.on("click",function(){c===$(".player-playlist ul li").size()-1?c=0:c++,console.log(c),$(".player-playlist ul li[data-index='"+c+"']").click()}),l.on("click",function(){0===c?c=$(".player-playlist ul li").size()-1:c--,$(".player-playlist ul li[data-index='"+c+"']").click()});var m=d();e()});