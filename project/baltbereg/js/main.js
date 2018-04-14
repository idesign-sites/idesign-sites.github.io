

$(window).load(function() {

//КНОПКА НАВЕРХ

    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() != 0) {
                $('#toTop').fadeIn();
            } else { $('#toTop').fadeOut(); }
        });
        $('#toTop').click(function() {
            $('body,html').animate({ scrollTop: 0 }, 800);
        });
    });

});

var resizeTimer;
$(document).ready(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {    
    if( $('.slider').length > 0 ) {
        $('.slider').slickSliderButtonContainerPos({});
    }; 
    }, 250);
});

// new init on resize

$(window).on('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
    
        if( $('.slider').length > 0 ) {
            $('.slider').slickSliderButtonContainerPos({});
        }; 
                   
      }, 250);
        
});

/*
    Plugin Slick Slider set Button container position
*/
(function( $ ) {
    $.fn.slickSliderButtonContainerPos = function(options) {
        var settings = $.extend( {
            
        }, options);
        
        var $this                           = $(this),
            $slickSliderItemWidth           = $(this).find('.slick-slide figure').width(),
            $slickSliderButtonContainer     = $(this).closest('.fhoto-slider').find('.button-container');

        var methods = {
            init: function () {
                var $self = $(this);
               
                
                $slickSliderButtonContainer.css({
                    'width': $slickSliderItemWidth + "px",
                    'margin-left': '-' + ($slickSliderItemWidth/2) + 'px'
                });
            }
        }
        
        $(this).each(function() {
            methods.init.apply( this );
        });
    }

})( jQuery );