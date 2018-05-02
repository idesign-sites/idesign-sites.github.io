$(document).ready(function() { 
    // фиксируем меню
    $(".js-fix-header").sticky({ topSpacing: 0, className: 'header__menu-mobile', wrapperClassName: 'wrapper' });
    
    // скроллинг к блокам скриптом PageScroll2id
    (function($){
        $(window).on("load",function(){
            
            /* Page Scroll to id fn call */
            $(".header__menu a, .mobile-menu .menu a ,a[href='#top'],a[rel='m_']").mPageScroll2id({
                highlightSelector:".header__menu a",
                onComplete:function(){
                    myCustomFn2();
                }
            });
            function myCustomFn2(){

                 jQuery(function ($) {
                  // custom formatting example
                  $('.js-count-number').data('countToOptions', {
                    formatter: function (value, options) {
                      return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
                    }
                  });
                  
                  // start all the timers
                  $('.timer').each(count);  
                  
                  function count(options) {
                    var $this = $(this);
                    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
                    $this.countTo(options);
                  }
                });
               
            }

        });

    })(jQuery);
    Revealator.effects_padding = '-300';

});
   

$(window).on("load resize scroll", function() {


    // слайдер верхний 
    $('.js-header__bottom-slider').owlCarousel({
        loop: true,
        nav: true,
        margin: 50,
        navText: ["<img class='left-arrow' src='img/header/slider-arrow-left.png'>", "<img class='right-arrow' src='img/header/slider-arrow-right.png'>"],
        dots: 1,
        items: 1

    });


    // слайдер блоков событий
    var $owl = $('.js-events__slider');   

    $owl.each(function(indx, element){

        var $this  = $(this);

        $this.owlCarousel({
            loop: true,
            nav: true,
            margin: 0,
            navText: 0,
            dots: 1,
            items: 1,
            autoHeight: true
        });

        var widthImg = $this.find('.owl-item.active img').width();
        var widthControls = $this.find('.owl-dots').width();
        var heightImg = $this.find('.owl-item.active img').height();
        var postopImg = $this.find('.owl-item.active img').offset();

        widthControls = widthControls / 2;
        postopImg.left = postopImg.left + widthImg/2 - widthControls;
        postopImg.top = postopImg.top + heightImg - 40;

        $this.find('.owl-dots').offset(postopImg);

    });


});
