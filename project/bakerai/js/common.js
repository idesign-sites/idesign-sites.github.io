$(window).load(function(){
      $('.flexslider').flexslider({
        animation: "fade",
        directionNav: false,
        controlsContainer: "container",
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
   


	$('#menu').slicknav({
		prependTo: '.right-menu',
		label: 'АССОРТИМЕНТ'

	});

  /*блочная высота родителя - ....*/
  // $('.pi-img').each(function() {
  //     var height = $('.pi-img').height();
  //     console.log(height);
  //     $('.products-item').css('min-height', height);
  // }); 

  $.fn.equivalent = function (){
        var $blocks = $(this),
            maxH    = $blocks.eq(0).height(); 

        $blocks.each(function(){
            maxH = ( $(this).height() > maxH ) ? $(this).height() : maxH;
           
        });
        $blocks.parent().height(maxH); 
    }
    $('.pi-img').equivalent();  

   $('.mbuild').each(function() {
            var height = $(this).height();
            $(this).siblings().css('height', height);
        });   

});


$(window).resize(function(){ 
 $.fn.equivalent = function (){
        var $blocks = $(this),
            maxH    = $blocks.eq(0).height(); 

        $blocks.each(function(){
            maxH = ( $(this).height() > maxH ) ? $(this).height() : maxH;
           
        });
        $blocks.parent().height(maxH); 
    }
    $('.pi-img').equivalent();
  $('.mbuild').each(function() {
            var height = $(this).height();
            $(this).siblings().css('height', height);
  });     
});