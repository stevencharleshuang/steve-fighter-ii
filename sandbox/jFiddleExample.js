var allowedToNavigate = true;
function initNav(e){
    $(window).on('keyup.nav', reInitNav);
    if(e.keyCode == 40 || e.keyCode == 38){
        e.preventDefault();
    }
    if(allowedToNavigate){
        allowedToNavigate = false;
        //prevent default arrow key behavior
        var $targetElement;
        //arrow Down
        if (e.keyCode == 40) {
            $targetElement = $('.active').next('div');
            e.preventDefault();
        }
        //arrow Up
        else if (e.keyCode == 38) {
            $targetElement = $('.active').prev('div');
            e.preventDefault();
        }

        if (!$targetElement || !$targetElement.length) {
            return;
        }
        $('.active').removeClass('active');
        $targetElement.addClass('active');

        //scroll into view
        $('html, body').clearQueue().animate({
            scrollTop: $targetElement.offset().top
        }, 600);
    }
}
function reInitNav(e){
    $(window).off('keyup.nav');
    allowedToNavigate = true;
}
/*!  Mousewheel by Brandon Aaron */
(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery)





/****! RELEVENT CODE ****/

var lastAnimation = 0;
var animationTime = 600; // in ms
var quietPeriod = 0; // in ms, time after animation to ignore mousescroll

function scrollThis(event, delta, deltaX, deltaY) {
    var timeNow = new Date().getTime();

    // change this to deltaX/deltaY depending on which
    // scrolling dir you want to capture
    deltaOfInterest = deltaY;

    if (deltaOfInterest == 0) {
        // Uncomment if you want to use deltaX
        // event.preventDefault();
        return;
    }

    // Cancel scroll if currently animating or within quiet period
    if(timeNow - lastAnimation < quietPeriod + animationTime) {
        event.preventDefault();
        return;
    }

    if (deltaOfInterest < 0) {
        if ($('.active').next('div').length) {
            lastAnimation = timeNow;
            $('.active').removeClass('active').next('div').addClass('active');
            $('html,body').clearQueue().animate( {
                scrollTop: $('.active').offset().top -=20 }, animationTime);
        }
    } else {
        if ($('.active').prev('div').length) {
            lastAnimation = timeNow;
            $('.active').removeClass('active').prev('div').addClass('active');
            $('html,body').clearQueue().animate( {
                scrollTop: $('.active').offset().top -=20 }, animationTime);
        }
    }
    return false;
}

$(document).mousewheel(scrollThis);
$(window).on('keydown.nav', initNav);
