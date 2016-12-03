/*
 *  Variables
*/

WIDTH_BOOK=1100;  		 	 //WIDTH BOOK
HEIGHT_BOOK=715;  		     //HEIGHT BOOK
ZOOM_STEPS_SIZE = 0.1;   	 //STEPS SIZE FOR ZOOM
ZOOM_STEPS_LENGTH=3;         //STEPS LENGTH FOR ZOOM



/*
 * 
*/

function bookHeightCheck() {
	if ( $('#book').height() > $(window).height()-80 ) {
		higherThanWindow = true;
	} else {
		higherThanWindow = false;
	}
	return higherThanWindow;
}

function calculate_zoom_factor(arg) {
	
	if (arg == true) {	// default
		zoom_factor = $('#page').height() * ZOOM_STEPS_SIZE;
	} else {
		zoom_factor = default_book_height * ZOOM_STEPS_SIZE;
	}	
	
}

function clear_on_focus() {
	function getStartInputValues() {
		$('input[type="text"], input[type="password"], textarea').each( function() {
			var startValue = $(this).val();
			$.data(this, "startValue", startValue);	
		})
	}
	getStartInputValues();
	$('input[type="text"], input[type="password"], textarea').focus(function() {
		startValue = $.data(this, "startValue");		
		if ( this.value == startValue ) {
			this.value = '';
		}
	});
	$('input[type="text"], input[type="password"], textarea').blur(function() {
		if ( this.value == '' ) {
			this.value = startValue;
		}
	})
}


function close_overlay() {
	$('.overlay').removeClass('active');
}


function isiPhone(){
    return (
        (navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPod") != -1)
    );
}


function contact_form() {

	$('#contact .req').each(function() {
		startValue = $(this).val();
		$.data(this, "startValue", startValue);
	});

	$('#contact button[type="submit"]').click(function() {

		$('#contact .req').removeClass('error');
		$('#contact button').fadeOut('fast');

		var isError = 0;

		// Get the data from the form
		var name	= $('#contact #name').val();
		var email	= $('#contact #email').val();
		var message	= $('#contact #message').val();

		// Validate the data
		$('#contact .req').each(function() {
			startValue = jQuery.data(this, "startValue");
			if ( ($(this).val() == '') || (this.value == startValue) ) {
				$(this).addClass('error');
				isError = 1;
			}
		});

		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (reg.test(email)==false) {
			$('#contact #email').addClass('error');
			isError=1;
		}

		// Terminate the script if an error is found
		if (isError == 1) {
			$('#contact button').fadeIn('fast');
			return false;
		}

		$.ajaxSetup ({
			cache: false
		});

		var dataString = 'name='+ name + '&email=' + email + '&message=' + message;  
		
		$.ajax({
			type: "POST",
			url: "php/submit-form-ajax.php",
			data: dataString,
			success: function(msg) {
				
				// Check to see if the mail was successfully sent
				if (msg == 'Mail sent') {
					$("#contact fieldset").hide();
					$("#contact fieldset.thanks").show();
					
					setTimeout(function() {
						close_overlay();
					}, 5000);
					
				} else {
					$('#contact button').fadeIn('fast');
					alert('The problem with sending it, please try again!');
				}
			},

			error: function(ob,errStr) {
				alert('The problem with sending it, please try again.');
			}
		});
		return false;
	});

	$('#contact .close').click(function() {
		close_overlay();
	})
}



var Book = {

	arrows: function() {
		$('.nav_arrow.prev').click(function() {
			$('#book').turn('previous');
		});
		$('.nav_arrow.next').click(function() {
			$('#book').turn('next');
		});
	},

	all_pages: function() {

		var summary = 0;
		var self = this;
		var slider_width = $('#slider').width();
		
		$('#slider').append('<li></li>');
		
		$('#slider li').each(function() {
			li_width = $(this).outerWidth();
			summary += li_width;
		})
	
		$('#slider').css('width', summary);
	
		$("#menu_holder").mousemove(function(e) {
	
			if ( $(this).width() < $("#slider").width() ) {
	
				var distance = e.pageX - $(this).offset().left;
				var percentage = distance / $(this).width();
				var targetX = -Math.round(($("#slider").width() - $(this).width()) * percentage);
				
				$('#slider').animate({left: [targetX+"px", "easeOutCirc"]}, { queue:false, duration: 200 });
			}
		});
		
		$('#all_pages').bind("swipeleft", function() {
			offset = -$("#slider", this).offset().left;
			if (offset < summary-slider_width) {
				$('#slider').animate({ left: "-=320px"}, { queue:false, duration: 200 });
			}
		});
		
		$('#all_pages').bind("swiperight", function() {
			offset = -($("#slider", this).offset().left);
			if (offset > 0) {
				$('#slider').animate({ left: "+=320px" }, { queue:false, duration: 200 });
			}
		});
		
		

		$('#slider li').click(function() {
		
			page_index = $(this).attr('class').substring(4);
			tmp = parseInt(page_index);

			close_overlay();

			$('#book').turn('page', tmp);

		})

		$(document).click(function(e) {
			var target = $(e.target);
			if ( target.hasClass('overlay') ) close_overlay();
		});
	
	},

	book_grab: function() {
		if ($.browser.webkit) {
			$('#page').css('cursor', '-webkit-grab'); 
		}
		if ($.browser.mozilla) {
			$('#page').css('cursor', '-moz-grab');
		}
		if ($.browser.msie) {
			$('#page').css('cursor', 'url(../img/openhand.cur)');
		}
	},

	book_grabbing: function() {
		if ($.browser.webkit) {
			$('#page').css('cursor', '-webkit-grabbing');
		}
		if ($.browser.mozilla) {
			$('#page').css('cursor', '-moz-grabbing');
		}
		if ($.browser.msie) {
			$('#page').css('cursor', 'url(../img/closedhand.cur)');
		}
	},

	book_position: function() {
		book_height	= $('#page').height();
		book_width	= $('#page').width();
		
		half_height	= (book_height/2)+30;
		half_width	= book_width/2;
		$('#page').css({ left: '50%', top: '50%', margin: '-'+half_height+'px auto 0 -'+half_width+'px' });
	},

	drag: function(e) {
		
		$el = $(this);
		$dragged = $el.addClass('draggable');

		$('#page').unbind('mousemove', Book.book_grab);
		$('#page').bind('mousemove', Book.book_grabbing);

        d_h = $dragged.outerHeight(),
        d_w = $dragged.outerWidth(),
        pos_y = $dragged.offset().top + d_h - e.pageY,
        pos_x = $dragged.offset().left + d_w - e.pageX;
        
        $dragged.parents().on("mousemove", function(e) {
            $('.draggable').offset({
                top:e.pageY + pos_y - d_h,
                left:e.pageX + pos_x - d_w
            });
        });
        e.preventDefault();
	},
	
	drop: function() {
		Book.book_grab();
		$('#page').bind('mousemove', Book.book_grab);
		$('#page').removeClass('draggable');
	},

	dragdrop_init: function() {
		bookHeightCheck();

		if ( higherThanWindow == false ) {
			$('#page').unbind('mousedown', Book.drag);
			$('#page').unbind('mouseup', Book.drop);
			$('#page').unbind('mousemove', Book.book_grab);
			$('#page').unbind('mousemove', Book.book_grabbing);
			$('#page').css('cursor', 'default');
		} else {
			$('#page').bind('mousedown', Book.drag);
			$('#page').bind('mouseup', Book.drop);
			$('#page').bind('mousemove', Book.book_grab);
		}
	},

	init: function() {
		
		       
		default_book_width	= WIDTH_BOOK;
		default_book_height	= HEIGHT_BOOK;
		default_page_width	= WIDTH_BOOK;
		default_page_height	= HEIGHT_BOOK;
		window_height		= $(window).height();
		window_width		= $(window).width();
		zoom_steps			= ZOOM_STEPS_LENGTH;
		current_zoom_step	= 0;
		dbl_clicked = false;
		on_start = true;
		self = this;
		
		$('#book').turn({
			display: 'double',
			acceleration: true,
			elevation:50,
			when: {
				first: function(e, page) {
					$('.nav_arrow.prev').hide();
				},
				
				turned: function(e, page) {
					if (page > 1) {
						$('.nav_arrow.prev').fadeIn();
						$('#about').hide();
					}
					if ( page < $(this).turn('pages') ) {
						$('.nav_arrow.next').fadeIn();
					}
				},
				
				turning: function(e, page) {
					if (page < 2) {
						$('#about').show();
					}
				},
				
				last: function(e, page) {
					$('.nav_arrow.next').hide();
				}	
			}
		});
		Book.arrows();
	},

	scaleHorizontal: function() {
		new_width	= $(window).width()-100;
		ratio		= new_width / $('#page').width();
		new_height	= $('#page').height() * ratio;
		$('#page').css({ width: new_width, height: new_height });
		$('#book').turn('size', new_width, new_height);
	},

	scaleStart: function() {
		if ( on_start == true ) {
			bookHeightCheck();			
			if ( higherThanWindow == true ) {
				Book.scaleVertical();
				if ( $('#page').width() > $(window).width() ) {
					Book.scaleHorizontal();
				}
			} else {
				Book.scaleHorizontal();
			}
			on_start = false;
		}
	},

	scaleVertical: function() {
		new_height		= $(window).height() - 116;
		ratio			= new_height / $('#page').height();			
		new_width		= $('#page').width() * ratio;
		$('#page').css({ width: new_width, height: new_height });
		$('#book').turn('size', new_width, new_height);
	},

	zoom_auto: function() {
       
		dbl_clicked = false;
		current_zoom_step = 0;
		calculate_zoom_factor(true);
		
		screen_height	= $(window).height();
		book_width		= $('#book').width();
		
		screen_width	= $(window).width()-100;
		book_height		= $('#book').height();

		if (isiPhone()) {
		
			var new_height		= screen_height - 100;
			var ratio			= new_height / book_height;			
			var new_width		= book_width * ratio;
			
			$('#page').css({ width: new_width, height: new_height });
			$('#book').turn('size', new_width, new_height);

		} else {
		
			Book.scaleStart();
		
			current_window_width = $(window).width();
			current_window_height = $(window).height();

			if (current_window_width != window_width) {
				if( $('#page').height() < ($(window).height() - 96) ) {
					Book.scaleVertical();
				}
				if( $('#page').width() > ($(window).width() - 100) ) {
					Book.scaleHorizontal();
				} 
			}
			
			if (current_window_height != window_height) {
				if( $('#page').width() < ($(window).width() - 100) ) {
					Book.scaleVertical();
				}
				
				if( $('#page').height() > ($(window).height() - 96) ) {
					Book.scaleVertical();
				}
			}
			
			deltaW= $('#page').width()-current_window_width;
			deltaH= $('#page').height()-current_window_height;
			
			if(deltaW>deltaH){
				//Book.scaleHorizontal();
			}else{
				//Book.scaleVertical();
			}
			
 
			if (( $(window).width() > default_book_width ) && ( $(window).height() > (default_book_height+100) )) {
				
				$('#page').css({ width: default_page_width, height: default_page_height });
				$('#book').turn('size',default_book_width,default_book_height);
			}

		}
	},

	zoom_in: function(dbl) {
		if ( dbl_clicked == false ) {
			
			if (dbl == true) {
				zoom_factor = $('#book').height() * (ZOOM_STEPS_SIZE*3);
			}

			current_zoom_step ++;
			book_height		= $('#book').height();
			book_width		= $('#book').width();
			new_height		= book_height + zoom_factor;
			ratio			= new_height / book_height;			
			new_width		= book_width * ratio;
	
			$('#page').css({ width: new_width, height: new_height });
			$('#book').turn('size', new_width, new_height);

			Book.dragdrop_init();
			
		}
	},
	
	zoom_out: function() {
		if ( dbl_clicked == false ) {
				
			
			current_zoom_step --;
			book_height		= $('#book').height();
			book_width		= $('#book').width();
			new_height		= book_height - zoom_factor;
			ratio			= new_height / book_height;			
			new_width		= book_width * ratio;
	
			$('#page').css({ width: new_width, height: new_height });
			$('#book').turn('size', new_width, new_height);
		
			Book.dragdrop_init();

		} else {
			Book.zoom_auto();
		}
	}

}



var Navigation = {
	
	tooltip: function() {

		$('.menu li').filter(':not(.goto)').each(function() {
			description = $('a', this).attr('title');
			tooltip = '<span class="tooltip">'+description+'<b></b></span>';
			$('a', this).removeAttr("title");
			$(this).append(tooltip);
		});
		
		$('.menu li').mousemove(function(e) {
			var offset = $(this).offset(); 
			var relX = e.pageX - offset.left;
			var relY = e.pageY - offset.top;
			$('.tooltip', this).css({ left: relX, top: relY-45 });
		})
		
		$('.menu li').hover(function() { 
			$('.tooltip').stop();
			$('.tooltip', this).fadeIn();
		}, function() {
			$('.tooltip').hide();
		});

	},


	init: function() {
	
		self = this;		

		// Double Click
		$('#page').dblclick(function() {
			current_zoom_step = 0;

			if ( dbl_clicked == true ) {
				$('#page').css('cursor', 'default');
				Book.zoom_auto();
				Book.dragdrop_init();
				dbl_clicked = false;
				calculate_zoom_factor(true);
			} else {
				Book.book_grab();
				Book.zoom_auto();
				Book.zoom_in(true);
				dbl_clicked = true;
			}
			Book.book_position();
		});

		// Home 
		$('nav .home').on('click', function() {
			$('#book').turn('page', 1);
		});
	
		// Zoom Original
		$('nav .zoom_original').click(function() {
			current_zoom_step = 0;

			$('#page').css({ width: default_page_width, height: default_page_height });
			$('#book').turn('size', default_book_width, default_book_height);
			Book.book_position();
			Book.dragdrop_init();
		});
	
		// Zoom Auto
		$('nav .zoom_auto').on('click', function() {
			Book.zoom_auto();
			Book.book_position();
			Book.dragdrop_init();
		});

		// Zoom In
		$('nav .zoom_in').on('click', function() {
			if ( current_zoom_step < zoom_steps ) {
				Book.zoom_in();
				Book.book_position();
			}				
		});
	
		// Zoom Out
		$('nav .zoom_out').on('click', function() {
			if ( current_zoom_step > -zoom_steps ) {
				Book.zoom_out();
				Book.book_position();
			}
		});

		// All Pages
		$('nav .show_all').on('click', function() {
			$('#all_pages').
				addClass('active').
				css('opacity', 0).
				animate({ opacity: 1 }, 1000);
			Book.all_pages();
			return false;
		})
		
		// Goto Page
		$('#page-number').keydown(function(e) {
			if (e.keyCode == 13) $('#book').turn('page', $('#page-number').val());
		});
		
		$('.goto button').click(function(e) {
			$('#book').turn('page', $('#page-number').val());
		});


		// Contact
		$('nav .contact').click(function() {
			$('#contact').addClass('active').animate({ opacity: 1 }, 1000);
			contact_form();
			clear_on_focus();
			return false;
		})
		
		if (!isiPhone()) {
			self.tooltip();
		}
		
	}
}



/* = Start
-------------------------------------------------------------- */

$(window).bind('keydown', function(e){

	if (e.keyCode==37)
		$('#book').turn('previous');
	else if (e.keyCode==39)
		$('#book').turn('next');

});	

$(window).load(function(){
	$('#page').show();
	Book.init();

	if (isiPhone()) {
		$('#page').addClass('mobile');
	} else {
		Book.zoom_auto();
		Book.book_position();
	}
	
	Book.dragdrop_init();

	Navigation.init();
	calculate_zoom_factor();
	
});


$(window).resize(function() {

if (!isiPhone()) {
	Book.book_position();
	Book.zoom_auto();
	Book.dragdrop_init();
}
	calculate_zoom_factor();

});

function resizeDetect() {
	var rtime = new Date(1, 1, 1, 1,00,00);
	var timeout = false;
	var delta = 200;
	
	$(window).resize(function() {
	    rtime = new Date();
	    if (timeout === false) {
	        timeout = true;
	        setTimeout(resizeend, delta);
	    }
	});
	
	function resizeend() {
		if (new Date() - rtime < delta) {
			setTimeout(resizeend, delta);
		} else {
			timeout = false;
			window_width = $(window).width();
			window_height = $(window).height();
			
			if ( $(window).width() > $(window).height() ) {
				//Book.scaleVertical();
			} else {
				
				
			}
			
			
		}               
	}
}

resizeDetect();

/*
 * $ Easing v1.3 - http://gsgd.co.uk/sandbox/$/easing/
 *
 * Uses the built in easing capabilities added In $ 1.1
 * to offer multiple easing options
*/

$.easing["jswing"]=$.easing["swing"];$.extend($.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return $.easing[$.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;if(!g)g=e*.3*1.5;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;if((b/=e/2)<1)return d/2*b*b*(((f*=1.525)+1)*b-f)+c;return d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-$.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){if((b/=e)<1/2.75){return d*7.5625*b*b+c}else if(b<2/2.75){return d*(7.5625*(b-=1.5/2.75)*b+.75)+c}else if(b<2.5/2.75){return d*(7.5625*(b-=2.25/2.75)*b+.9375)+c}else{return d*(7.5625*(b-=2.625/2.75)*b+.984375)+c}},easeInOutBounce:function(a,b,c,d,e){if(b<e/2)return $.easing.easeInBounce(a,b*2,0,d,e)*.5+c;return $.easing.easeOutBounce(a,b*2-e,0,d,e)*.5+d*.5+c}})

