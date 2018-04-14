$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}	

	var accordion = new Accordion($('.j-accordion'), false);
});



jQuery(document).ready(function() {
    $('.carousel-stage').jcarousel({
    	wrap: 'circular',
    	visible: 1
    });

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
    //эффект пропадания полоски слева от карты товара при наведении
    $(".product-block").hover(
        function(){
            $(this).prev().addClass("j-no-border")
        },
        function(){
            $(this).prev().removeClass("j-no-border")
        });
});

$(window).load(function() {
  // The slider being synced must be initialized first
  $('.carousel-catalog').flexslider({
    animation: "slide",
    controlNav: true,
    animationLoop: false,
    directionNav: true,

    slideshow: false,
    itemWidth: 35,
    itemMargin: 5,
    asNavFor: '.slider-catalog'
  });
 
  $('.slider-catalog').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: ".carousel-catalog"
  });
});

 //  if (/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
 //  	    $('*').each(function(i,elem) {
	// 			console.log($(this).css("font-family"));    	
	// 	if ($(this).css("font-family") == '"Helvetica Neue Cyr", sans-serif' ) {
	// 			console.log("Helvetica Neue Cyr");
	// 			$(this).css('line-height', '25px');
	// 	} else {
	// 		console.log("no no no Helvetica Neue Cyr");
	// 	}
	// });

 //  } else {
 //  	    $('*').each(function(i,elem) {
	// 			console.log($(this).css("font-family"));    	
	// 	if ($(this).css("font-family") == '"Helvetica Neue Cyr", sans-serif' ) {
	// 			console.log("Helvetica Neue Cyr");
	// 			$(this).css('line-height', '25px');
	// 	} else {
	// 		console.log("no no no Helvetica Neue Cyr");
	// 	}
	// });





 //  }

//footer

// var resizeWindow ;
// $(window).on('resize', function(e) {
//   var resizeWindow = 1;
//   if ($(window).width() <= '974'){
//     $('ul.panel-collapse').hide();  
//     collapseMenuFooter(resizeWindow) ;   
//   }else if($(window).width() > '974'){
//       $('ul.panel-collapse').show(); 
//   }
// });
// $(window).load(function() {
//   var resizeWindow = 1;    
//   if ($(window).width() <= '974'){
//     $('ul.panel-collapse').hide();

//     collapseMenuFooter(); 

//   }else {
//     $('ul.panel-collapse').show();
//   } 
// });

// function collapseMenuFooter(resizeWindow){
//   console.log(resizeWindow);
//   if(resizeWindow){
//       $('span.icon-arrow-down').on('click', function (e) {
//         $(this).parent().next('ul.panel-collapse').slideToggle(300);
        
//       });
//     }
// };      


$(function(){
  var $window = $(window),
      $push = $('span.icon-arrow-down');
        
    $push.each(function(){
      var $this = $(this),
          $nextElem = $this.parent().next('ul.panel-collapse');
            
        $this.on({
            resize: function (){
                if ($window.width() > 974) {
                    $nextElem.show();                   
                }},
            click: function (){
                if ($window.width() < 974) {
                    $nextElem.slideToggle();
                }
            }
        });
    });
});
//меню поиска
$('#search_trigger').on('click', function () {
    $('#searchBlock').slideToggle(300);
    return false;
});

//меню фильтра
$('#filter_trigger').on('click', function () {
    $('#filterBlock').slideToggle(300);
    return false;
});

$('#menu_trigger').on('click', function () {
    $('#menuBlock').slideToggle(300);
    return false;
});
// правое меню в личном кабинете
$('.js-contr-hide').on('click', function (event) {
    event.preventDefault(); 
    var contrMenu = $(this).siblings().parent('.o-menu'); 

    if( contrMenu.hasClass("bg-m") )
      {
        $(this).siblings().slideToggle(300).parent('.o-menu').removeClass('bg-m'); 
      }
      else{
        $(this).siblings().slideToggle(300).parent('.o-menu').addClass('bg-m'); 
      }
    return false;
});


//slider для карточки товара

$(window).load(function() {
  // The slider being synced must be initialized first
  $('#cardCarousel').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 60,
    itemMargin: 20,
    prevText: "",
    nextText: "",
    asNavFor: '#cardSlider'
  });
 
  $('#cardSlider').flexslider({
    animation: "slide",
    controlNav: false,
    directionNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#cardCarousel"
  });


    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      nextArrow: "<div class='slick-arrow slick-next '></div>",
        prevArrow: "<div class='slick-arrow slick-prev '></div>",
      appendArrows: $('span.button-container'),
      centerMode: true,
      centerPadding: 40,
      focusOnSelect: true,
        responsive: [
        {
          breakpoint: 768,
          settings: {
              infinite: true,
              slidesToShow: 2,
              slidesToScroll: 1,
          }
        },
        {
          breakpoint: 630,
          settings: {
              infinite: true,
              slidesToShow: 3,
              slidesToScroll: 1,
          }
        }        
        ]
    });

      $('.gc-slickslider').slick({
          infinite: true,
          slidesToShow: 8,
          slidesToScroll: 1,
                nextArrow: "<button class='slick-arrow slick-next icon-arrow-right-carusel'></button>",
                prevArrow: "<button class='slick-arrow slick-prev icon-arrow-left-carusel'></button>",
        directionNav: false,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              infinite: true,
              slidesToShow: 4,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 620,
            settings: {
              infinite: true,
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 420,
            settings: {
              infinite: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          }
          ,
          {
            breakpoint: 360,
            settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
            }
          }
        ]
      });

       $('.tl-slickslider').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        dots: true,
        nextArrow: "<button class='slick-arrow slick-next icon-arrow-right-carusel'></button>",
        prevArrow: "<button class='slick-arrow slick-prev icon-arrow-left-carusel'></button>",
        directionNav: false,
        appendArrows: $('span.tl-button-container'), 
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              infinite: true,
              slidesToShow: 5,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 992,
            settings: {
              infinite: true,
              slidesToShow: 4,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 768,
            settings: {
              infinite: true,
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          }
          ,
          {
            breakpoint: 560,
            settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '90px',
            slidesToShow: 1
            }
          }
          ,

          {
            breakpoint: 360,
            settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 1
            }
          }
        ]
      });

       $('.tc-slickslider').slick({
        infinite: true,
        fade: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: "<button class='slick-arrow slick-next icon-arrow-right-carusel'></button>",
        prevArrow: "<button class='slick-arrow slick-prev icon-arrow-left-carusel'></button>",
        directionNav: false,
        dots: true,
        arrows: true,
        appendArrows: $('span.tc-button-container')
       
      });
});



$('.fancybox-thumbs').fancybox({
				prevEffect : 'none',
				nextEffect : 'none',

				closeBtn  : true,
				arrows    : false,
				nextClick : true,

				helpers : {
					thumbs : {
						width  : 50,
						height : 50
					}
				}
			});


(function($) {
$(function() {
    $('select').styler({
        selectSearch: true,
    });
    $('.checkbox input').styler({
        selectSearch: true,
    });    
    $('.table input').styler({
        selectSearch: true,
    });    
});
})(jQuery);
   
$('.restables-origin').resTables({

       merge: {1: [2]},
        move: {1: 0},
        span: [1,0]

});

$('.is-restables-origin').resTables({

      cssClassOrigin: 'is-restables-origin',
      cssClassClone: 'is-restables-clone'

});

    
  if ($(window).width() >= '630'){  
    $("#card-table td:not(.left_col)").on("mouseenter mouseleave", function(){
        if ($(this).parents("#card-table tr").attr("class")!="up_row") {
            
            var td_index=$(this).index();
            
            $(this).parents("tr").toggleClass("lighting_col");
            
            $(this).parents("#card-table").find("tr").each(function(){
                $("td:eq("+td_index + ")",this).toggleClass("lighting_col");
            });

            // $(this).parents("#card-table").find("tr:not(:nth-child(odd))").each(function(){
            //     $("td:eq("+td_index_ + ")",this).toggleClass("lighting_col");
            // });  

            $(this).toggleClass("lighting_cell").attr('title','Заказать'); 
        }
    });
  }

 $('.js-sticky').sticky({
        topspacing: 45,
        stopper: '#footer',
        marginbottom: 0,
        screenlimit: false,
        sticktype: 'directly'
    });

// скроллинг в inner-site
if($(".nano").length >= 1 ){$(".nano").nanoScroller(); }


