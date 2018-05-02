$('.footer__map').on('load',function(){
    $(this).animate({
        opacity: 0.9
    })
});


$(document).ready(function() {
        e();

        var $menu = $(".header__container");

        $(window).scroll(function () {
            function desctopWidth(){
                if ($(window).width() > 1023) {
                    return true
                }
                    else return false
                };   
   
            if ($(this).scrollTop() > 600 && $menu.hasClass("default") && desctopWidth()){
                $menu.removeClass("default").addClass("fixed"); 
            } else if ($(this).scrollTop() <= 200 && $menu.hasClass("fixed") ) {
                $menu.removeClass("fixed").addClass("default");
            }
        });

        $(window).resize(function() {
            e()
        });
        $(window).scroll(function() {
            e()
        });

        /* Page Scroll to id fn call */
      
        $(".header__menu-link , .menu-mobile__link").mPageScroll2id({
            highlightSelector:".header__menu-link , .menu-mobile__link",
            onStart:function(){
              $('body').removeClass( 'show-menu' );
            }
        });
        
        $(".js-fancybox").fancybox({
            'titleShow'     : true,
            'transitionIn'  : 'false',
            'transitionOut' : 'false',
             helpers : {
                    overlay : {
                        locked: false,
                        type : 'over'
                    }
                }
        });

        $(".js-maps-window").fancybox({
                maxWidth    : 800,
                maxHeight   : 600,
                fitToView   : false,
                width       : '95%',
                height      : 'auto',
                autoSize    : false,
                closeClick  : false,
                openEffect  : 'none',
                closeEffect : 'none',
                 helpers : {
                        overlay : {
                            locked: false,
                            type : 'over'
                        }
                    }                
            });

        var location = document.getElementById('location');
            var p = location.querySelector('p');
       
            p.innerHTML = location.querySelector('p').innerHTML.replace(/[\u2028-\u2029]+/ig, " ");
       
            
              
                console.log(p);



});


function e() {
    $('.js-cottage-slider').owlCarousel({
        loop: true,
        nav: true,
        margin: 10,
        navText: ["<img class='left-arrow' src='img/sprites/left-arrow-white.png'>", "<img class='right-arrow' src='img/sprites/left-arrow-white.png'>"],
        dots: 0,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            960: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });
    $('.js-cottage-slider-text').owlCarousel({
        loop: true,
        nav: true,
        margin: 0,
        smartSpeed: 1000,
        navText: false,
        dots: 0,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            960: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });

    if(!$('.js-fotogallery').hasClass('slick-initialized')) {
        $('.js-fotogallery').slick({
          centerMode: true,
          centerPadding: '20%',
          slidesToShow: 1,
          arrows: true,
          appendArrows: $('span.button-container'),
          prevArrow: $('button.prev-arrow'),
          nextArrow: $('button.next-arrow'),      
          responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '0',
                slidesToShow: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '0',
                slidesToShow: 1
              }
            }
          ]
        });
    }

    // УСТАНОВКА ПОЗИЦИИ ЭЛЕМЕНТОВ ОТНОСИТЕЛЬНО НИЗА КАРТИНКИ
    var activeImgHeight = $(".js-fotogallery .slick-active").height();
    $('.button-container').css('top',activeImgHeight - 60);



    // ПЕРЕДАЧА СОБЫТИЙ КАСТОМНЫМ КНОПКАМ СЛАЙДЕРА
    $(function() {
        var owl = $('.js-cottage-slider');
        var owlText = $('.js-cottage-slider-text');
        var next_button = $(owl).find('.owl-next');
        var prev_button = $(owl).find('.owl-prev');
        next_button.on({
            click: function() {
                owlText.trigger('next.owl.carousel', [1800]);
            }
        });
        prev_button.on({
            click: function() {
                owlText.trigger('prev.owl.carousel', [1800]);
            }
        });
    });


    //  Адаптивное меню  
    (function() {


        var bodyEl = document.body,
            content = document.querySelector( '.content' ),
            openbtn = document.getElementById( 'open-button' ),
            closebtn = document.getElementById( 'close-button' ),
            isOpen = false;

        function init() {
            initEvents();
        }

        function initEvents() {
            openbtn.addEventListener( 'click', toggleMenu );
            if( closebtn ) {
                closebtn.addEventListener( 'click', toggleMenu );
            }

            // close the menu element if the target it´s not the menu element or one of its descendants..
            content.addEventListener( 'click', function(ev) {
                var target = ev.target;
                if( isOpen && target !== openbtn ) {
                    toggleMenu();
                }
            } );
        }

        function toggleMenu() {
            if( isOpen ) {
                classie.remove( bodyEl, 'show-menu' );
            }
            else {
                classie.add( bodyEl, 'show-menu' );
            }
            isOpen = !isOpen;
        }

        init();

    })();

};
/*<!-- BEGIN QUICKCHAT CODE -->*/
(function(){
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://quickchat.pro/script/widget?w=85135d095b';
    var ss = document.getElementsByTagName('script')[0];
    ss.parentNode.insertBefore(s, ss);
})();
/*<!-- END QUICKCHAT CODE -->*/