//------------------------------------
$(function() {
	$(window).scroll(function() {
		if ($(this).scrollTop() >= 148) {
			$('.menu-top').addClass('stickytop');
		} else {
			$('.menu-top').removeClass('stickytop');
		}
	});
});
//------------------------------------
(function($) {
	$(function() {
		$('.form-zakaz select, .form-in input , input:checkbox').styler({
			selectSearch: true,
		});
	});
})(jQuery);
// обёртка для L R пунктов меню
$('.menu-top ul li:lt(3) ').wrapAll("<li class='left-block'><ul></ul></li>");
$('.menu-top ul li').slice(9, 12).wrapAll("<li class='right-block'><ul></ul></li>");
$('.slider-for').slick({
	infinite: true,
	slidesToShow: 4,
	slidesToScroll: 1,
	nextArrow: "<div class='slick-arrow slick-next icon-right-arrow-form'></div>",
	prevArrow: "<div class='slick-arrow slick-prev icon-left-arrow-form'></div>",
	directionNav: false,
	appendArrows: $('span.sf-button-container'),
	responsive: [{
		breakpoint: 1200,
		settings: {
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
		}
	}, {
		breakpoint: 630,
		settings: {
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
		}
	}, {
		breakpoint: 482,
		settings: {
			arrows: true,
			centerMode: true,
			centerPadding: '45px',
			slidesToShow: 1
		}
	}, {
		breakpoint: 410,
		settings: {
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
		}
	}]
});
$('.gc-slickslider').slick({
	infinite: true,
	slidesToShow: 6,
	slidesToScroll: 1,
	nextArrow: "<button class='slick-arrow slick-next icon-right-arrow'></button>",
	prevArrow: "<button class='slick-arrow slick-prev icon-left-arrow'></button>",
	directionNav: false,
	appendArrows: $('span.button-container'),
	responsive: [{
		breakpoint: 992,
		settings: {
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
		}
	}, {
		breakpoint: 620,
		settings: {
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
		}
	}, {
		breakpoint: 420,
		settings: {
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
		}
	}, {
		breakpoint: 360,
		settings: {
			arrows: true,
			centerMode: true,
			centerPadding: '40px',
			slidesToShow: 1
		}
	}]
});
$(window).resize(function() {
	function setEqualHeight(columns) {
		var tallestcolumn = 0;
		columns.each(function() {
			currentHeight = $(this).height();
			if (currentHeight > tallestcolumn) {
				tallestcolumn = currentHeight;
			}
		});
		columns.height(tallestcolumn);
	}
	if ($(window).width() >= 768) {
		setEqualHeight($(".news-bl"));
		// setEqualHeight($(".pv-h"));   
	}
	/*блочная высота родителя - ....*/
	if ($(window).width() >= 768) {
		$('.vv-h').each(function() {
			var height = $(this).height();
			$(this).siblings().css('height', height);
		});
	} else {
		$('.vv-h').each(function() {
			$(this).siblings().css('height', 'auto');
		});
	};
});
jQuery(document).ready(function($) {
	function setEqualHeight(columns) {
		var tallestcolumn = 0;
		columns.each(function() {
			currentHeight = $(this).height();
			if (currentHeight > tallestcolumn) {
				tallestcolumn = currentHeight;
			}
		});
		columns.height(tallestcolumn);
	}
	if ($(window).width() >= 768) {
		setEqualHeight($(".news-bl"));
		// setEqualHeight($(".pv-h"));   
	}
	/*блочная высота родителя - ....*/
	if ($(window).width() >= 768) {
		$('.vv-h').each(function() {
			var height = $(this).height();
			$(this).siblings().css('height', height);
		});
	} else {
		$('.vv-h').each(function() {
			$(this).siblings().css('height', 'auto');
		});
	};
	// затемнение экрана при открытии меню
	$('.navbar-toggle').bind('click', function(event) {
		event.preventDefault();
		$('#TB_overlay').toggleClass('overlay');
	});
	// паралакс - блок с желтым трактором
	$('.img-holder').imageScroll({
		// coverRatio: 1
	});
	// форма калькулятора + скрытие меню
	//open the lateral panel
	$('.button-calc').on('click', function(event) {
		event.preventDefault();
		console.log("выезжаю");
		$('.cd-panel').addClass('is-visible');
		$('.menu-top').addClass('iscalc-hidden-menu');
		$('body').css('overflow-Y', 'hidden');
	});
	//clode the lateral panel
	$('.cd-panel').on('click', function(event) {
		if ($(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close')) {
			$('.cd-panel').removeClass('is-visible');
			$('body').css('overflow-Y', 'auto');
			setTimeout(function() {
				$('.menu-top').removeClass('iscalc-hidden-menu');
			}, 700);
			event.preventDefault();
		}
	});
	$(function() {
		$('.js-datetimepicker').datetimepicker({
			language: 'ru',
			minuteStepping: 10,
			daysOfWeekDisabled: [0, 6]
		});
	});
	$('.slider-pro').sliderPro({
		// width: 670,
		height: 450,
		autoplay: false,
		fade: true,
		allowScaleUp: true,
		orientation: 'vertical',
		loop: false,
		arrows: false,
		buttons: false,
		thumbnailsPosition: 'right',
		thumbnailPointer: true,
		thumbnailWidth: 90,
		breakpoints: {
			1178: {
				height: 400,
				thumbnailWidth: 90,
				thumbnailHeight: 70,
				thumbnailsPosition: 'bottom',
				orientation: 'horizontal'
			}
		}
	});
	$('.fancybox').fancybox();
	window.onload = function() {
		if (document.getElementById("video")) {
			var videoPlayer = document.getElementById("video"); // id=""video 
			console.log(videoPlayer);
			videoPlayer.addEventListener("click", function() { //кликаем по video тэгу 
				if (this.paused) { //запускаем видео, если оно не проигрывается 
					this.play();
				} else { // запускаем нужное действие при клике на работающее видео 
					this.pause(); // мобильный хром/дефолтный андроидный вебкит и без этой строки встают на паузу, для хрома треба ещё раз кликнуть по видео для запуска, а вэбкит запустится только если перевернуть экран ((, но пох, главное, что срабатывает следующая строчка 
				}
			}, false);
			// если дефолтное зацикливание (loop в тэге video) баннера не сработало, обходим средствами js. Пусть баннер крутится. 
			videoPlayer.addEventListener("ended", function() {
				this.play();
			}, false);
		}
	}
	$(document).on('af_complete', function(event, response) {
		if (response.success) {
			response.form.hide();
			$("#success-response").fadeIn(700);
		}
		response.message = '';
	});
	$(document).on('click', '#onemore-feedback', function(e) {
		$("#success-response").fadeOut();
		$("#contactform").fadeIn();
		e.preventDefault();
	});

	//переход на форму заказа в автопарке
   	$(document).on('click', '.js-go-zakaz', function () {
        $('html, body').animate({ scrollTop:  $('.form-zakaz').offset().top }, 500 ); 
        return false;
    });

});

