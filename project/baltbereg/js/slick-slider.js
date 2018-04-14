
// init plugins
$(document).ready(function(){
    

     
    $('.f-close-menu').closeMenuFlyout({});
    $('.main-footer .footer-form').newsletterForm({});
    $('.scrollToTop').scrollToTop();
    $('a.f-open-form').openForm();
    $('.header-primary .navbar ul li.dropdown>a').menuMain({});
    $('.webcam-popup').magnificPopup({type:'iframe'});
    $('img').imageCropper({});
    $('.zimmerseite-tab tr').estateConnect({});
    $('#room-sticky-main').stickyApartmentOnScroll({});
    
	// activate swipe function on bootrap carousel
	$(".carousel").swiperight(function() {  
	    $(".carousel").carousel('prev');  
	});  
	$(".carousel").swipeleft(function() {  
	    $(".carousel").carousel('next');  
	});  

    
});


$(window).load(function(){
    if( $('.peaks-place-slider').length > 0 ) {
        $('.peaks-place-slider').slickSliderButtonContainerPos({});
    };    
}); 

$('.innerlink').click(function() {
    $('html,body').animate({
        scrollTop: 0
    }, 'slow');
    return false;
});

$(".innerlink").click(function() {
    var height = $(".main-banner").height();
    var height1 = $(".main-header").height();
    var line = 49;
    jQuery('body,html').animate({
        scrollTop: (height - height1 - line)
    }, 800);
});


// new init on resize
var resizeTimer;
$(window).on('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
    
        if( $('.peaks-place-slider').length > 0 ) {
            $('.peaks-place-slider').slickSliderButtonContainerPos({});
        }; 
        
         $('#room-sticky-main').stickyApartmentOnScroll({});
        
        var $window = $(window);
        var windowsize = $window.width();
        if (windowsize < 767) {
            if( $('.equipment-icons').length > 0) {
                 $('.equipment-icons').slick({
                     arrows: false
                 });
            }
        }  
                
      }, 250);
      
  

});

function slideUpCustom() {
    $('.booking-slide').slideUp({
        done: function() {
         $('.main-header').removeClass('header-booking-shrink');
        }
    });
}




/*
    Plugin Rohgeruest
*/
(function( $ ) {
    $.fn.xxXX = function(options) {
        var settings = $.extend( {
            
        }, options);
        
        var $this = $(this);
        
        var methods = {
            init: function () {
                var $self = $(this);
                
                $self.click(
                  function (ev) {
                    null;
                    }
                );
            
            }
        }
        
        $(this).each(function() {
            methods.init.apply( this );
        });
    }
})( jQuery );
$(window).on("scroll touchmove", function () {
  $('.main-header').toggleClass('shrink-header', $(document).scrollTop() > 100);
  $('body').toggleClass('shrinked', $(document).scrollTop() > 100);
});

// webcam btn
$(document).ready(function(){
    $('.webcam').click(function() {
        $('.main-header').toggleClass('panorama');
    });
    
    // webcam close button
    $('.booking .close').click(function() {
        $('.main-header').removeClass('panorama');
    });
    
    $('.webcam').off();
    $('.webcam').click(function(ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        $('.main-header').toggleClass('panorama');
        
    });
});
// Datepicker
$(document).ready(function() {
    var lang = $('html').attr('lang');
    switch(lang) {
        case 'de':
            var daysMin = [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ];
            var months = [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ];
            var monthsShort = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
            break;
        case 'en':
            var daysMin = ['Su','Mo','Tu','We','Th','Fr','Sa'];
            var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            var monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            break;
    }
    
    
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate()+3);
    
    $('.arrivalDate').datepicker({
        onSelect: function(dateValue, inst) {
            var departureElem = $('.departureDate');
            var splitArrDate = dateValue.split('.');
            var arrDate = new Date(splitArrDate[2], splitArrDate[1] - 1, splitArrDate[0]);
            arrDate.setDate(arrDate.getDate() + 3);
            
            var splitDepDate = departureElem.datepicker('getDate');
            var depDate = new Date(splitDepDate[2], splitDepDate[1] - 1, splitDepDate[0]);
            
            if(arrDate > depDate) {
                departureElem.datepicker('setDate', arrDate);
                setDateInForm(1);
            }
            departureElem.datepicker('option', 'minDate', arrDate);
            setDateInForm(0);
            setDateInForm(1);
        },
        numberOfMonths: 1,
        dayNamesMin: daysMin,
        monthNames: months,
        monthNamesShort: monthsShort,
        minDate: 0,
        prevText: '',
        nextText: '',
        dateFormat: "dd.mm.yy",
        beforeShow: function(date, inst)
        {
            var widget = $(this).datepicker("widget");
            $('.arrivalDate').closest('.wrapDate').append(widget);
        }
    });

    $('.departureDate').datepicker({
        onSelect: function(dateValue, inst) {
            setDateInForm(1);
        },
        numberOfMonths: 1,
        dayNamesMin: daysMin,
        monthNames: months,
        monthNamesShort: monthsShort,
        minDate: tomorrow,
        prevText: '',
        nextText: '',
        dateFormat: "dd.mm.yy",
        beforeShow: function(date, inst)
        {
            var widget = $(this).datepicker("widget");
            $('.departureDate').closest('.wrapDate').append(widget);
        }
    });
    
    $('.arrivalDate').datepicker('setDate',today);
    $('.departureDate').datepicker('setDate',tomorrow);
    setDateInForm(0);
    setDateInForm(1);
    
    function setDateInForm(type) {
        var selector = type == 0 ? 'arrival' : 'departure';
        var monthNamesShort = $('.'+selector+'Date').datepicker( 'option', 'monthNamesShort' );
        var d = $('.'+selector+'Date').datepicker('getDate');
        
        var year = d.getFullYear();
        var month = monthNamesShort[d.getMonth()];
        var day = d.getDate();
        
        day = day < 10 ? '0'+day : day;
        
        $('.'+selector+'DateVis').val(day+".");
        $('.'+selector+'MonthYear').text(month+". "+year);
    }
    
    $('.ad, .arrivalDateVis').click(function() {
        $('.arrivalDate').datepicker('show');
    });
    $('.dd, .departureDateVis').click(function() {
        $('.departureDate').datepicker('show');
    }); 
    
});


/*==============================================================*/
    // Booking
/*==============================================================*/

$(document).ready(function(){
    
    
    if ($.browser.msie && $.browser.version < 10) {
        
        $('.booking-btn').click(function() {
            $lang = $('html').attr('lang');
            if ( $lang ) {
                var url = "https://tbooking.toubiz.de/TDS00020010709771366/tbooking?globalReset=1&lang="+$lang;
            } else {
                var url = "https://tbooking.toubiz.de/TDS00020010709771366/tbooking?globalReset=1&lang=de";
            }
            window.open(url, '_blank');
        });
    } else {
        $('.booking-btn, .booking-body').click(function() {
            if($('.main-header').hasClass('header-booking-shrink')) {
                slideUpCustom();
                $('body').css('overflow', 'auto');
                
            } else {
                $('body').css('overflow', 'hidden');
                $('.booking-slide').slideDown();
                $('.main-header').addClass('header-booking-shrink');
                
            }
        });
    }
    
    

    
    $('.booking .close').click(function() {
        slideUpCustom();
        $('body').css('overflow', 'auto');
        
    });
    
    
    
    $('.countAdults').spinner({
        max: 8,
        min: 1
    }).val(2);
    
    $('.countChildren').spinner({
        max: 4,
        min: 0
    });
    
    
    $('.f-createUrl').click(function(ev) {
        $lang = $('html').attr('lang');
        if ( $lang ) {
            var baseUrl = "https://tbooking.toubiz.de/TDS00020010709771366/tbooking?globalReset=1&lang="+$lang;
        } else {
            var baseUrl = "https://tbooking.toubiz.de/TDS00020010709771366/tbooking?globalReset=1&lang=de";
        }
        
            
        var url = "";
        //build up url & fetch data
        var parameter = "";
        var dateFrom = $.datepicker.formatDate('dd.mm.yy',$('.arrivalDate').datepicker('getDate'));
        if( dateFrom != undefined )
            if( dateFrom.length > 1 ) parameter += "&date_from="+dateFrom;
        
        var dateTo = $.datepicker.formatDate('dd.mm.yy',$('.departureDate').datepicker('getDate'));
        if( dateTo != undefined )
            if( dateTo.length > 1 ) parameter += "&date_to="+dateTo;
        
        var numberAdult = $('.countAdults').val();
        if( numberAdult != undefined && numberAdult <= 8 && numberAdult >= 1 )
            if( numberAdult > 0 )  parameter += "&number_adult[0]="+numberAdult;
        
        var numberChildren = $('.countChildren').val();
        if( numberChildren != undefined && numberChildren <= 4 && numberChildren >= 0 ) 
            if( numberChildren > 0 ) {
                parameter += "&number_child[0]="+numberChildren;
                for(var i = 0; i <= numberChildren; i++) {
                    parameter += "&age_child"+i+"[0]="+$('.childage_'+i).find('.childage_data').val();
                }
            }
        parameter += "&doSearch=1";
        
        url = baseUrl+parameter;
        
        //read cookie and get id append it to the url
        if(document.cookie) {
            var cookieString = document.cookie;
            var cookies = cookieString.split(';');
            $.each(cookies, function(index, value) {
                var cPair = value.trim().split("=");
                var cName = cPair[0];
                var cValue = cPair[1];
                if(cName == '_ga') {
                    url += "&_ga="+cValue;
                }
            });
        }
    
        $(this).attr('href',url);
    });

    $('.countChildren').change(function(ev) {
        if($(this).val() < 0) {
            $(this).val(0);
        }
        if($(this).val() > 4) {
            $(this).val(4);
        }
    });

    $('.countAdults').change(function(ev) {
        if($(this).val() < 1) {
            $(this).val(1);
        }
        if($(this).val() > 8) {
            $(this).val(8);
        }
    });
    
    var childElements = 0;
    $('.childanchor').find('.ui-spinner-up').click(function(ev) {
        if(childElements < 4) {
            var childElement = $('.childAgeContainer').clone(false);
            childElement.removeClass('childAgeContainer');
            childElement.find('.child').text('Kind '+$('.countChildren').val());
            childElement.addClass('childage_'+$('.countChildren').val());
            $('.childanchor').append(childElement);
            childElements++;
        }
    });

    $('.childanchor').find('.ui-spinner-down').click(function() {
        if(childElements > 0) {
            var last_id = parseInt($('.countChildren').val()) + 1;
            $('.childage_'+last_id).remove();
            childElements--;
        }
    });

});
//Click event to scroll to top
$('.scrollToTop').click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
    return false;
});

/*==============================================================*/
//  Scroll To Top - START CODE
/*==============================================================*/
    

(function( $ ) {
    $.fn.scrollToTop = function(options) {
        var settings = $.extend( {
            
        }, options);
        
        var $this = $(this);
        var innerHeight = $('body').height();
        var displayHeight = innerHeight*0.66;
        var methods = {
            init: function () {
                var $self = $(this);
                $self.click(
                    function (ev) {
                        ev.preventDefault();
                        $('html, body').animate({
                            scrollTop: 0
                        }, 1000);
                    }
                
                );
            
            },
           checkDisplay: function () {
                if ( $(window).scrollTop() > displayHeight ) {
                    $this.each(
                        function () {
                            $(this).fadeIn();
                        }
                        
                    );
                } else {
                    $this.each(
                    function () {
                        $(this).fadeOut();
                    }
                    
                );                  
                }
           }
        }
        $(window).scroll(methods.checkDisplay);
        $(this).each(function() {
            methods.init.apply( this );
        });
    }
})( jQuery );
/*==============================================================*/
    //  Searchbox
/*==============================================================*/
$(document).ready(function(){
    $('#search a').click(function() {
        $('#searchbox').toggleClass('searchbox-open');
    });
    
    $('.close-btn').click(function() {
        $('#searchbox').removeClass('searchbox-open');
    });
});
/*==============================================================*/
    //  Slider
/*==============================================================*/


$(document).ready(function(){
    

   
   

    $('.offer-slider').slick({
        // dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><i class="pp icon">e</i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="pp icon">A</i></button>'    
    
    });



    
    if ($.browser.msie && $.browser.version < 10) {
        $('.peaks-place-slider').slick({
            centerMode: true,
            centerPadding: '25%',
            slidesToShow: 1,
            autoplay: false,
            autoplaySpeed: 5500,
            arrows: false,
            appendArrows: $('span.button-container'),   
            responsive: [{
                breakpoint: 1281,
                settings: {
                    centerMode: true,
                    centerPadding: '20%',
                    slidesToShow: 1
                }
            }, {
                breakpoint: 769,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '10%',
                    slidesToShow: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 1
                }
            }]
        });
    } else {
        $('.peaks-place-slider').slick({
            centerMode: true,
            centerPadding: '25%',
            slidesToShow: 1,
            autoplay: false,
            autoplaySpeed: 5500,
            arrows: true,
            appendArrows: $('span.button-container'),   
            responsive: [{
                breakpoint: 1281,
                settings: {
                    centerMode: true,
                    centerPadding: '20%',
                    slidesToShow: 1
                }
            }, {
                breakpoint: 769,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '10%',
                    slidesToShow: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 1
                }
            }]
        });
    }

    
    $('.logo-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [{
            breakpoint: 481,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 400,
            settings: {
                slidesToShow: 1
            }
        }]
    });
});
// appartement rooms image set fixed
(function($, viewport){
    
    $( window ).load(function() {
        
        var $window = $(window);
        var windowsize = $window.width();
        
        if (windowsize > 1170) {
            
            if( $('.apartment-title-section').length > 0 ) {
                var $offset     = $('.apartment-title-section');
                var $heightEl   = $('.apartment-title-section').height();
                var $heightEl2  = $('.apartment-title-section + section').height();
                var $el2        = $('.apartment-tabs');
                var $top        = $offset.offset().top;
                            
                $(window).scroll(function () {
                    if ($(this).scrollTop() > $top + $heightEl - 84) {
                        $('.apartment-title-section + section').addClass('set-fixed');
                        $el2.addClass('set-fixed');
                        $el2.css('top', $heightEl2 + 84);
                    } else {
                        $('.apartment-title-section + section').removeClass('set-fixed');
                        $el2.removeClass('set-fixed');
                        $el2.css('top', 'auto');
                    }
                });
                
            }
        
        }
        
    
    if (windowsize < 767) {
        if( $('.equipment-icons').length > 0) {
             $('.equipment-icons').slick({
                 arrows: false,
                 dots: true,
                 centerMode: false,
                 centerPadding: '60px'
             });
        }
    }    
        

        

    }); 
    
})(jQuery, ResponsiveBootstrapToolkit);
// Plugin Formular open on click (special CE)
(function( $ ) {
    $.fn.openForm = function(options) {
        var settings = $.extend( {
            
        }, options);
        
        var $this           = $(this),
            $form           = $(this).closest('section').find('.individual-request-form'),
            $buttonOpen     = $(this).closest('section').find('.f-open-form'),
            $buttonClose    = $(this).closest('section').find('.f-close-form');

        
        var methods = {
            init: function () {
                var $self = $(this);  
                $self.click(
                    function (ev) {
                        ev.preventDefault();
                        if ($form.is(':visible')) {
                            $form.slideUp();
                            $(this).show();
                        } else {
                            $form.slideDown();
                            $(this).hide();
                            $buttonClose.show();
                        }   
                    }
                );
                
                $buttonClose.click(function(ev){
                    ev.preventDefault();
                    $form.slideUp();
                    $(this).hide();
                    $buttonOpen.show();
                });  
                
            }



        }
        
        $(this).each(function() {
            methods.init.apply( this );
        });
    }
    
    
    // Slick Slicker Prev/Next on left/right image on center mode : add feature
    $('.peaks-place-slider').on('click', '.slick-slide', function (e) {
        e.stopPropagation();
        var index = $(this).data("slick-index");
        if ($('.slick-slider').slick('slickCurrentSlide') !== index) {
            $('.slick-slider').slick('slickGoTo', index);
        }
    });
    

    
    
    
})( jQuery );
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
/*
    Plugin Close Menuflyout
*/
(function( $ ) {
    $.fn.closeMenuFlyout = function(options) {
        var settings = $.extend( {
            
        }, options);
        
        var $this               = $(this),
            $closeMenuSection   = $(this).closest('li.dropdown');

        var methods = {
            init: function () {
                var $self = $(this);  
                $self.click(
                    function (ev) {
                        ev.preventDefault(); 
                        $closeMenuSection.removeClass('open');
                    }
                ); 
            }
        }
        
        $(this).each(function() {
            methods.init.apply( this );
        });
    }
        
})( jQuery );
/*
    Plugin Newsletterform Footer open/close
*/
(function( $ ) {
    $.fn.newsletterForm = function(options) {
        var settings = $.extend( {
            
        }, options);
        
        var $this       = $(this),
            $open       = $(this).find('div.email > .button'),
            $container  = $(this).find('.newsletter-form-container'),
            $close      = $(this).find('.info');

        var methods = {
            init: function () {
                
                var $self = $(this);
                               
                $open.click(
                    function (ev) {
                        ev.preventDefault(); 
                        $container.toggleClass('open');
                    }
                ); 
                
                $close.click(
                    function (ev) {
                        ev.preventDefault(); 
                        $container.removeClass('open');
                    }
                );  
                
            }
        }
        
        $(this).each(function() {
            methods.init.apply( this );
        });
    }
        
})( jQuery );


var theLanguage = $('html').attr('lang');
function validateNewsletter(a) {
    if (a.gender.value == "Anrede") {
        if(theLanguage == 'de') { alert("Bitte wählen Sie Ihre Anrede aus."); }
        if(theLanguage == 'en') { alert("Please choose your salutation."); }
        
        a.gender.focus();
        return false
    }
    if (a.lastname.value == "") {
        if(theLanguage == 'de') { alert("Bitte tragen Sie Ihren Nachnamen ein."); }
        if(theLanguage == 'en') { alert("Please enter your last name."); }
        a.lastname.focus();
        return false
    }
    if (a.email.value == "") {
        if(theLanguage == 'de') { alert("Bitte tragen Sie die E-Mail Adresse ein."); }
        if(theLanguage == 'en') { alert("Please enter the e-mail address."); }
        
        a.email.focus();
        return false
    }
    if (a.email.value.indexOf("@") == -1) {
        if(theLanguage == 'de') { alert("Bitte geben Sie eine korrekte E-mail Adresse an."); }
        if(theLanguage == 'en') { alert("Please enter a valid e-mail address."); }
        
        a.email.value = a.email.value + "@";
        a.email.focus();
        return false
    }
    if (a.email.value.indexOf(".") == -1) {
        if(theLanguage == 'de') { alert("Bitte geben Sie eine korrekte E-mail Adresse an."); }
        if(theLanguage == 'en') { alert("Please enter a valid e-mail address."); }
        a.email.focus();
        return false
    }
};
(function($){
    $(document).ready(function(){
        
        // Google Maps
        //-----------------------------------------------
        if ($("#map-canvas").length > 0) {
            

            
            var map, myLatlng, myZoom, marker;
            var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/); 
            var isDraggable = !isMobile ? true : false;
            
            // Set the coordinates of your location
            myLatlng = new google.maps.LatLng(46.816945, 9.267318);
            myZoom = 13;
            function initialize() {
                var mapOptions = {
                    zoom: myZoom,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    center: myLatlng,
                    draggable: isDraggable,
                    scrollwheel: false,
                    styles: [
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#7f2200"
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#87ae79"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            },
                            {
                                "color": "#000000"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            },
                            {
                                "gamma": "0.37"
                            },
                            {
                                "weight": "0.49"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.neighborhood",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#e5f2e8"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.man_made",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#fed0d0"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.man_made",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.natural",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.natural.landcover",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.natural.terrain",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#caedcf"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#8b3660"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#EBF4A4"
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "saturation": "12"
                            },
                            {
                                "hue": "#ff0000"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "off"
                            },
                            {
                                "color": "#8dab68"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "invert_lightness": true
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "visibility": "off"
                            },
                            {
                                "color": "#5b5b3f"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#ABCE83"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#EBF4A4"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#fefdff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#9BBF72"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#A4C67D"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#89d597"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }
                ]
                };
                
                
                map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
                
                // var iconPath = '/typo3conf/ext/pp_provider/Resources/Public/Icons/pp_maps_icon.png';
                var myNewIcon = new google.maps.MarkerImage("/typo3conf/ext/pp_provider/Resources/Public/Icons/pp_maps_icon-2x.png", null, null, null, new google.maps.Size(43,63));
                
                
                marker = new google.maps.Marker({
                    map:map,
                    draggable:false,
                    url: 'https://www.google.de/maps/place/Peaks+Place/@46.8169465,9.2651266,17z/data=!3m1!4b1!4m2!3m1!1s0x4784dc407db7deeb:0x36fffbf44060d526',
                    animation: google.maps.Animation.DROP,
                    position: myLatlng,
                    icon: myNewIcon
                });
                
                google.maps.event.addListener(map, 'click', function() {
                    map.setOptions({ draggable: true });
                });  
                
                google.maps.event.addListener(marker, 'click', function() {
                    // window.location.href = marker.url;
                    window.open(
                      marker.url,
                      '_blank'
                    );  
                });
                
                google.maps.event.addDomListener(window, "resize", function() {
                    map.setCenter(myLatlng);
                });

                
            }
            google.maps.event.addDomListener(window, "load", initialize);
        }
    });
})(this.jQuery); 


$(function() {
    generateGoogleMapImg('.googleMapImg');
});

/**
 * The Google Maps Image Generator Function
 *
 * @param The element ID or Class.
 * @return Image HTML element.
 */
function generateGoogleMapImg(e) {
  $(e).each(function(){
    
    /** Lets create some settings */
    var address = $(this).data('address');
    var marker = $(this).data('marker');
    var markerSize = $(this).data('marker-size') ? $(this).data('marker-size') : 'normal';
    var markerColor = $(this).data('marker-color') ? $(this).data('marker-color') : 'red';
    var mapWidth = $(this).data('width') ? $(this).data('width') : 181;
    var mapHeight = $(this).data('height') ? $(this).data('height') : 181;
    var mapZoom = $(this).data('zoom') ? $(this).data('zoom') : 15;
    var mapType = $(this).data('type') ? $(this).data('type') : 'roadmap';
    
    /** If the address is set, generate the map image */
    if(address) {
      
      /** Create the map URL */
      var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + address + '&zoom=' + mapZoom + '&size=' + mapWidth + 'x' + mapHeight + '&maptype=' + mapType;
      
      /** Check for the marker */
      if(marker){
        url += '&markers=size:' + markerSize + '%7Ccolor:' + markerColor + '%7C' + address;
      }
      
      /** Create the map image */
      $(this).html('<img class="img-circle" src="' + url + '">');
      
    /** If the address is empty remove the map wrapper */
    } else {
      $(this).css("display", "none");
    }
  });
}
/*
    Image Cropper
*/
(function( $, viewport ) {
    $.fn.imageCropper = function(options) {
        var settings = $.extend( {
            
        }, options);
        var $this = $(this);
        var $viewport = 'xs';
        var $retina = window.devicePixelRatio > 1.5;
        
        

        var $this = $(this);
        
        var methods = {
            init: function () {
                var $self = $(this);
                $self.data('cropper-org-src',$self.attr('src'));
                
            }, 
            checkViewPort: function () {
                if ( viewport.is('xs') ) {
                    $viewport = 'xs';
                } else if ( viewport.is('md') ) {
                    $viewport = 'md';
                } else if ( viewport.is('sm') ) {  
                    $viewport = 'sm';
                } else if ( viewport.is('lg') ) {  
                    $viewport = 'md';
                }
                
                
            },
            changeSource: function () {
                $this.each(
                    function() {
                        if ( $retina ) {
                            if ( $(this).data('cropper_'+$viewport+'-retina') != "" ) {
                                $(this).attr('src', $(this).data('cropper_'+$viewport+'-retina'));
                            } else if ( $(this).data('cropper_'+$viewport) != "" ) {
                                $(this).attr('src', $(this).data('cropper_'+$viewport));
                                
                            }   
                            
                        } else {
                            if ( $(this).data('cropper_'+$viewport) != "" ) {
                                $(this).attr('src', $(this).data('cropper_'+$viewport));
                            }                       
                        }
    
                    }
                );
            }
        }
        /*
         * Todo check viewport muss noch ausgeführt werden
         * 
         */
        $(this).each(function() {
            methods.init.apply( this );
        });
        methods.checkViewPort();
        methods.changeSource();
    }
})( jQuery, ResponsiveBootstrapToolkit );
/*
    menuMain
*/
(function( $ ) {
    $.fn.menuMain = function(options) {
        var settings = $.extend( {
            
        }, options);
        
        var $this = $(this);
        
        var methods = {
            init: function () {
                var $self = $(this);
                
                $self.click(
                function (ev) {
                  ev.preventDefault();
                  $(this).closest('li').siblings().removeClass("open");
                  $(this).closest('li').toggleClass('open');
                }
                );
            
            }
        }
        
        $(this).each(function() {
            methods.init.apply( this );
        });
    }
})( jQuery );


$(document).ready(function(){
    $('.header-primary .navbar-default .navbar-nav li').click(function() {
        if($(this).hasClass('open')) {
            
            $('body').css('overflow', 'hidden');
            $('header.main-header').addClass('header-nav-is-open');
            
            // window height
            windowHeight = $(window).height();
            // get height of document - height header
            headerHeight = $('header.main-header').height();
            
            // get height of dropdown-menu
            dropdownHeight = $(this).find('.dropdown-menu').height();
            
            
                    
            // fill new height menu inner variable
            menuHeightInner = windowHeight - headerHeight;        
            // set new height menu inner
            if( dropdownHeight > menuHeightInner && !$('header.main-header').hasClass('header-booking-shrink') ) {
                $(this).find('.dropdown-menu').css({
                    'height' : menuHeightInner,
                    'overflow-y' : 'scroll',
                    'oveflow-x' : 'hidden'
                });  
            } else if ( dropdownHeight > menuHeightInner ) {
                $(this).find('.dropdown-menu').css({
                    'height' : dHeight,
                    'overflow-y' : 'auto',
                    'oveflow-x' : 'hidden'
                });       
            }
    
            
    
            
        } else {
            
            $('body').css('overflow', 'auto');
            $('header.main-header').removeClass('header-nav-is-open');
        }
    });
});
/*
    estateConnect
*/
(function( $ ) {
    $.fn.estateConnect = function(options) {
        var settings = $.extend( {
            
        }, options);
        
        var $this = $(this);
        var methods = {
            init: function () {
                var $self = $(this);
                if ( $self.data('href') !== undefined && $self.data('href') != "" ) {
                
                    $self.click(
                        function (ev) {
                            ev.preventDefault();
                            window.open( $self.data('href') ,'_blank');
                        }
                    );
                }
                if ( $self.data('connect') !== undefined ) {
                    var id = $self.data('connect');
                    $('#'+id).data('connectel',$(this));
                    $('#'+id).hover(
                        function(ev) {
                            $(this).data('connectel').addClass('active');
                        },
                        function (ev) {
                            $(this).data('connectel').removeClass('active');
                        }
                        
                    );
                    $self.hover(
                        function(ev) {
                            var id = $self.data('connect');
                            
                            $('#'+id).find('a').addClass('active');
                        },
                        function(ev) {
                            var id = $self.data('connect');
                            $('#'+id).find('a').removeClass('active');
                        }
                    );
                }
                /*
                $self.over(
                  function (ev) {
                    null;
                    }
                );
                */
            
            }
        }
        
        $(this).each(function() {
            methods.init.apply( this );
        });
    }
})( jQuery );
if ( window.location.hash ) scroll(0,0);
// void some browsers issue
setTimeout( function() { scroll(0,0); }, 1);

$(window).load(function(){
    if ( location.hash != "" ) {
        $('html,body').animate({
              scrollTop: ($(location.hash).offset().top-80)
            }, 1000);       
    }
    $(function() {
          $('a[href*=#]:not([href=#])').click(function() {
        	  

        	  
              if ( $(this).attr('role') == "" || $(this).attr('role') == undefined) {
          
                if ( location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                  var target = $(this.hash);
                  if ( this.hash.slice(1) != "" ) {
                  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                      if (target.length) {
                        $('html,body').animate({
                          scrollTop: (target.offset().top-80)
                        }, 1000);
                        return false;
                      }
                   }
                }
            }
          });
        });
});
/*==============================================================*/
    // Room Modal
/*==============================================================*/
$(document).ready(function(){
    $('#myModal').find('.close').click(function(ev) {
        $('#myModal').modal('toggle');
    });
});

$(window).load(function() {
    var imgAmount = $('#myModal').find('.slider-for').find('img').length;
    if(imgAmount > 1) {
        var desktop = imgAmount <= 5 ? imgAmount-1 : 5;
        var vpBiggest = imgAmount <= 4 ? imgAmount-1 : 4;
        var vpBig = imgAmount <= 3 ? imgAmount-1 : 3;
        var vpSmall = imgAmount <= 2 ? 1 : 2;
        var vpSmallest = imgAmount <= 2 ? 1 : 2;
        
        $('.slider-for').slick({
            lazyLoad:'progressive',
            slidesToShow: 1,
            infinite: false,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: '.slider-nav',
            initialSlide: -1
        });
        $('.slider-nav').slick({
            slidesToShow: desktop,
            infinite: false,
            slidesToScroll: 1,
            slidesToShow: 1,
            asNavFor: '.slider-for',
            dots: false,
            arrows: false,
            centerMode: true,
            focusOnSelect: true,
            variableWidth: true,
            useCSS: false,
            responsive: [{
                breakpoint: 5120,
                settings: {
                    slidesToShow: vpBiggest
                }
            }, {
                breakpoint: 1399,
                settings: {
                    slidesToShow: vpBiggest
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: vpBig
                }
            }, {
                breakpoint: 641,
                settings: {
                    slidesToShow: vpSmall
                }
            }, {
                breakpoint: 481,
                settings: {
                    slidesToShow: vpSmallest
                }
            }]
        });
    }
});

$(document).ready(function(){
    $('.zimmer-gallery').find('a:not(.no-gallery), span').each(function() {
        $(this).click(function(ev) {
            ev.preventDefault();
            if($('#myModal').find('img').length > 1) {
                var index = parseInt($(this).data('imgindex'));
                
                $('.slider-for').slick('slickGoTo', index);
                
                $('#myModal').fadeIn();
            }
        });
    });
});
/*==============================================================*/
    // wetter
/*==============================================================*/
$(document).ready(function(){
    $('.weather-default').click(function(ev) {
        ev.preventDefault();
    });
});
/*
    Sticky on Scroll (Apartment Description)
*/
(function( $ ) {
    $.fn.stickyApartmentOnScroll = function(options) {
        var settings = $.extend( {
            
        }, options);
        
        var $this = $(this),
            $windowsize = $(window).width();
        
        var methods = {
            init: function () {
                var $self = $(this);

                if ($windowsize > 991) {
                    $("#room-sticky-images, #room-sticky-main").stick_in_parent({
                        offset_top:150,
                        parent: '#room-sticky-parent'
                    });
                    
                    $("#room-sticky-images, #room-sticky-main").stick_in_parent()
                    .on('sticky_kit:bottom', function(e) {
                        $('#room-sticky-main').parent().addClass('is-static');
                    }).on('sticky_kit:unstick', function(e) {
                        $('#room-sticky-main').parent().removeClass('is-static');
                    }).on('sticky_kit:stick', function(e) {
                        $('#room-sticky-main').parent().removeClass('is-static');
                    }).on('sticky_kit:unbottom', function(e) {
                        $('#room-sticky-main').parent().removeClass('is-static');
                    }); 
                    
                }
                
                
                
            }
        }
        
        $(this).each(function() {
            methods.init.apply( this );
        });
    }
})( jQuery );
$(document).ready(function(){
    $('.mobile-site-menu .navbar-default .navbar-toggle').on('click',function(e){
        $('body').toggleClass('nav-expanded');
    });
});
$(document).ready(function(){
    $('html.no-placeholder input[placeholder], html.no-placeholder textarea[placeholder]').placeholder();
});

$('.pp-accordion .panel-heading').on('click', function() {	
	var $this = $(this);
	if ($(this).hasClass('pp-panel-collapse-in')) {
		$(this).removeClass('pp-panel-collapse-in');
	}
	else {
		$(".pp-accordion .panel-heading").removeClass("pp-panel-collapse-in");
		$(this).toggleClass('pp-panel-collapse-in');	
	}	
});