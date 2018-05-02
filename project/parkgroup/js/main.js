$( document ).ready(function() {
	// карта
    if ($(".form__place").length == true) {
		$("select[name='time'] , select[name='park_mest'] , select[name='district']").styler();
	};

	if ($(".rc-gallery").length == true) {

		$("a[rel=example_group]").fancybox({
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'titlePosition' 	: 'over',
			'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
				return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
			}
		});
	};

	$(".right__content").one('click', '.js-open-window', function(event) {
		$("a[rel=example_group]").trigger('click')		

	});
	


    // форма модального окна 
    $('.open_modal').click(function (e){
        e.preventDefault();
        $('.popup, .overlay').css({'opacity':'1', 'visibility':'visible', 'display':'block'});
        $(".fofm").css({"display":"block"});
        $('body').css({'overflow':'hidden'}); 


        var domInputPark_mest = $('select[name="park_mest"] option:selected').text();
        var domInputTime = $('select[name="time"] option:selected').text();
		$('.count').val(domInputPark_mest);
		$('.period').val(domInputTime); 

		var domInputPlace_from = $('input[name="place-from"]').val();
		var domInputPlace_to = $('input[name="place-to"]').val();

		var domInputPrice_from = $('input[name="price-from"]').val();
		var domInputPrice_to = $('input[name="price-to"]').val();		

		var domSelectDistrict = $('select[name="district"] option:selected').text();			

		$('input[name="place_from"]').val(domInputPlace_from);
		$('input[name="place_to"]').val(domInputPlace_to);
		$('input[name="price_from"]').val(domInputPrice_from);
		$('input[name="price_to"]').val(domInputPrice_to);
		$('input[name="district"]').val(domSelectDistrict);


    });
    //закрытие модального окна
    $('.close_modal, .overlay').click(function (){
        $('.popup, .overlay').css({'opacity':'0', 'visibility':'hidden'});
        $('body').css({'overflow':'auto'});          
    });
    
    $(document).on('af_complete', function(event, response) {
        var fields = {
            name: "Имя",
            email: "Email",
            phone: "Телефон",
            "g-recaptcha-response": "Каптча"
        };
        if (response.success) {
            response.form.hide();
            $('.popup, .overlay').css({'opacity':'0', 'visibility':'hidden'});
            $('body').css({'overflow':'auto'});     
            
            if (document.getElementsByClassName('g-recaptcha').length) grecaptcha.reset();
            $(".popup2").css({'opacity':'1'}).fadeIn(700);
        } else {
            for (var prop in response.data) {
                AjaxForm.Message.error("Заполните поле '"+fields[prop]+"'");
            }
        }
        response.message='';
    });

    $('.popup2').on('click', '.close_modal', function(e) {
        $(".popup2").fadeOut();

        e.preventDefault();
    });
    
    	if ($(window).width() < 1008) {			
		    $('.open__block').removeClass('desktop');	    
		    $('.open__block').addClass('mobile');
		    $('.content').removeClass('menu-desktop');	    
		    $('.content').addClass('menu-mobile');	


		}else{
		    $('.open__block').removeClass('mobile');	    
		    $('.open__block').addClass('desktop'); 
		    $('.content').removeClass('menu-mobile');	    
		    $('.content').addClass('menu-desktop'); 
		}
		
	$(".left__block").on('click', '.left__block-btn', function() {

		// двигаем контент-wrap при открытом меню

		$(".open__block.mobile").toggle();
		$(".open__block.desktop").toggle();		

		
		if($(".open__block").is(":hidden")){
		    	$(".wrap").css('margin-left','0');// 1-ое действие
		    	$(".content.menu-mobile").fadeIn();

		   	}

	  		else if($(".open__block").is(":visible")){
		    	$(".wrap").css('margin-left', widthMenu + 60);// 2-ое действие	
		    	$(".content.menu-mobile").fadeOut();		    	
		   	}    
		});	
	
});

$(window).on('load resize', function(){

	var windowHeight = $(window).outerHeight(true);  // высота окна

	var heightHeader = $('.header-blocks').outerHeight(true)  //высота шапки

	var heightContentCenter = $(".center__content").outerHeight(true)

	var heightContentRight = $(".right__content").outerHeight(true)

	var heightOpenBlock = windowHeight - heightHeader; 

	/*var windowHeight = $(".open__block").outerHeight()  + heightHeader;*/

	var maxHeightContent = ( heightContentCenter > heightContentRight ) ? heightContentCenter : heightContentRight;
	if (maxHeightContent < 700) {
		maxHeightContent = windowHeight;
	}

	$(".open__block").css('min-height', maxHeightContent - heightHeader);


	$(".content").css('height', $(".open__block").outerHeight()  + heightHeader);

	widthMenu = $('.open__block').width();
	$(".right__block").css('margin-left', widthMenu + 40);
	$(".wrap").css('margin-left', widthMenu + 60);
	$(".center__content-pic , .right__content, .news__block").css('padding-top', heightHeader + 60);

    $(window).on('resize', function(){

    	if ($(window).width() < 1008) {			
		    $('.open__block').removeClass('desktop');	    
		    $('.open__block').addClass('mobile');
		    $('.content').removeClass('menu-desktop');	    
		    $('.content').addClass('menu-mobile');	


		}else{
		    $('.open__block').removeClass('mobile');	    
		    $('.open__block').addClass('desktop'); 
		    $('.content').removeClass('menu-mobile');	    
		    $('.content').addClass('menu-desktop'); 
		}

    });

});








