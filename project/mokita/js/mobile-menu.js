
(function() {

	var bodyEl = document.body,
		content = document.querySelector( 'main' ),
		openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		menuMobile = document.getElementsByClassName('mobile-menu')[0],
  		closelink = menuMobile.getElementsByClassName( 'header__menu-item-link' ),
		isOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}
		for (var i = 0; i < closelink.length; i++) {
    		closelink[i].addEventListener( 'click', toggleMenu );
  		}
		
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