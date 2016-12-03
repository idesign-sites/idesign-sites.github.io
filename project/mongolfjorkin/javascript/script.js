
/*scroll*/

$(document).ready(function() { 

$('a[href^="#"]').click(function(){ 
var el = $(this).attr('href'); 
$('body').animate({ 
scrollTop: $(el).offset().top}, 2000); 
return false; 
}); 

});

/*scroll up_back*/

$('#scroll').on('click', function (e) {             // отслеживаем событие на элементе #scroll-top
e.preventDefault();
var current_position = $(document).scrollTop();       // получаем позицию скролла
var scroll_time = current_position / 3;               // подсчитываем время анимации
$('body,html').animate({'scrollTop':0},scroll_time);  // собственно, анимируем
});
$(window).on('scroll', function(e) {                    // отслеживаем событие на элементе window
show_scroll_top_btn();                                // на любой скролл запускаем функцию
});
show_scroll_top_btn();                                  // после готовности DOM тоже запустим функцию
function show_scroll_top_btn() {
if( $(document).scrollTop() > 500 ) {                 // если скролл более чем на 500px
$('#scroll').fadeIn(150);                       // то покажем кнопку перемотки вверх
}
else {                                                // иначе
$('#scroll').fadeOut(150);                      // скроем кнопку перемотки
}
}


/*slider*/

$(document).ready(function() {
 
  $("#owl-demo").owlCarousel({
 
      autoPlay: 2000, //Set AutoPlay to 3 seconds
 
      items : 4,
      itemsDesktop : false,
      itemsScaleUp:true,
      responsiveBaseWidth:window,
      itemsDesktopSmall : false
  });
 
});

/*Countdown*/

$(function () {
	
	var austDay = new Date();
	austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 0);
	$('#defaultCountdown').countdown({until: austDay});
	$('#year').text(austDay.getFullYear());
	$('#frenchCountdown').countdown($.countdown.regionalOptions['ru']);
});