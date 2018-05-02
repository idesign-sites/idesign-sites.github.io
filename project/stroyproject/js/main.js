jQuery(document).ready(function() {

/* слайдер цен */

jQuery(".js-slide-price").slider({
	min: 0,
	max: 20000000,
	values: [0,20000000],
	range: true,
	stop: function(event, ui) {
		jQuery("input.js-minCost-price").val(jQuery(".js-slide-price").slider("values",0));
		jQuery("input.js-maxCost-price").val(jQuery(".js-slide-price").slider("values",1));
		
    },
    slide: function(event, ui){
		jQuery("input.js-minCost-price").val(jQuery(".js-slide-price").slider("values",0));
		jQuery("input.js-maxCost-price").val(jQuery(".js-slide-price").slider("values",1));
    }
});

jQuery("input.js-minCost-price").change(function(){

	var value1=jQuery("input.js-minCost-price").val();
	var value2=jQuery("input.js-maxCost-price").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input.js-minCost-price").val(value1);
	}
	jQuery(".js-slide-price").slider("values",0,value1);	
});

	
jQuery("input.js-maxCost-price").change(function(){
		
	var value1=jQuery("input.js-minCost-price").val();
	var value2=jQuery("input.js-maxCost-price").val();
	
	if (value2 > 200000000) { value2 = 20000000; jQuery("input.js-maxCost-price").val(20000000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input.js-maxCost-price").val(value2);
	}
	jQuery(".js-slide-price").slider("values",1,value2);
});

/* слайдер метры */

jQuery(".js-slide-area").slider({
	min: 0,
	max: 300,
	values: [0,300],
	range: true,
	stop: function(event, ui) {
		jQuery("input.js-minCost-area").val(jQuery(".js-slide-area").slider("values",0));
		jQuery("input.js-maxCost-area").val(jQuery(".js-slide-area").slider("values",1));
		
    },
    slide: function(event, ui){
		jQuery("input.js-minCost-area").val(jQuery(".js-slide-area").slider("values",0));
		jQuery("input.js-maxCost-area").val(jQuery(".js-slide-area").slider("values",1));
    }
});

jQuery("input.js-minCost-area").change(function(){

	var value1=jQuery("input.js-minCost-area").val();
	var value2=jQuery("input.js-maxCost-area").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input.js-minCost-area").val(value1);
	}
	jQuery(".js-slide-area").slider("values",0,value1);	
});

	
jQuery("input.js-maxCost-area").change(function(){
		
	var value1=jQuery("input.js-minCost-area").val();
	var value2=jQuery("input.js-maxCost-area").val();
	
	if (value2 > 300) { value2 = 300; jQuery("input.js-maxCost-area").val(300)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input.js-maxCost-area").val(value2);
	}
	jQuery(".js-slide-area").slider("values",1,value2);
});

// фильтрация ввода в поля
	jQuery('input').keypress(function(event){
		var key, keyChar;
		if(!event) var event = window.event;
		
		if (event.keyCode) key = event.keyCode;
		else if(event.which) key = event.which;
	
		if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
		keyChar=String.fromCharCode(key);
		
		if(!/\d/.test(keyChar))	return false;
	
	});

	  $('.act-slider').owlCarousel({
	    loop:true,
	    smartSpeed: 0,
	    animateOut: 'fadeOut',
	    nav:true,
	    navContainer : '.slider-nav',
	    dotsContainer: '.owl-dots',
	    navText: ["<button class='btn-slider icon-arrow-left-gray'></button>" , "<button class='btn-slider icon-arrow-right-gray'></button>" ],
	 
	    responsive:{
	        0:{
	            items:1
	        },      
	        545:{
	            items:1
	        },
	        782:{
	            items:1
	        },
	        1000:{
	            items:1
	        }
	    }
	  });



	  $('.how-to-about-slider').owlCarousel({
	    
	    smartSpeed:8000,
	    animateOut: 'fadeOut',
	    nav:true,
	    dots:true,
	    navContainer : '.how-slider-nav',
	    dotsContainer: '.how-owl-dots',
	    navText: ["<button class='btn-slider icon-arrow-left-gray'></button>" , "<button class='btn-slider icon-arrow-right-gray'></button>" ],
	 
	    responsive:{
	        0:{
	            items:1
	        },      
	        545:{
	            items:1
	        },
	        782:{
	            items:1
	        },
	        1000:{
	            items:1
	        }
	    }
	  });

	  $('.real-how-to-about-slider').owlCarousel({
	    
	    smartSpeed:0,
	    animateOut: 'fadeOut',
	    nav:true,
	    dots:true,
	    navContainer : '.real-slider-nav',
	    dotsContainer: '.real-owl-dots',
	    navText: ["<button class='btn-slider icon-arrow-left-gray'></button>" , "<button class='btn-slider icon-arrow-right-gray'></button>" ],
	 
	    responsive:{
	        0:{
	            items:1
	        },      
	        545:{
	            items:1
	        },
	        782:{
	            items:1
	        },
	        1000:{
	            items:1
	        }
	    }
	  });	


	(function($) {
		$(function() {
			$('select, input[type="text"]').styler({
				selectSearch: true,
			});
		});
	})(jQuery);

});