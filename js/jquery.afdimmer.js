/* vim: ft=jquery ts=4 sw=4

Copyright 2012, Stanislav Lechev [AngelFire] (http://0xAF.org)
Licensed under the MIT License (LICENSE.txt).

Description:
fadeIn and fadeOut effect on mouseenter and mouseleave with delays

Version: 2012.03.12.1

Requires: jQuery
Tested on recent version of Chrome(18) and Firefox(10) under linux.

usage:
	$('.dim').afDimmer({
		enter: 1.0,			// dim to this opacity on mouse enter
		enterSpeed: 'fast',	// speed to use when mouse enters
		enterDelay: 500,	// delay start dimming with this ms

		leave: 0.4,			// dim to this opacity on mouse leave
		leaveSpeed: 'fast',	// speed to use when mouse leaves
		leaveDelay: 1000,	// delay start dimming with this ms

		dimOnReady: true,	// dim to 'leave' level on when the page is loaded
		animateOnReady:true,// animate while dimming when page is loaded
	});

*/

// don't declare anything out here in the global namespace
;( function( $ ){ // create private scope (inside you can use $ instead of jQuery)

	$.fn.afDimmer = function( method ){
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.afDimmer' );
		}
	};

	// the default options
	$.fn.afDimmer.defaultOptions = {
		enter: 1.0,				// dim to this opacity on mouse enter
		enterSpeed: 'fast',		// speed to use when mouse enters
		enterDelay: 500,		// delay start dimming with this ms

		leave: 0.4,				// dim to this opacity on mouse leave
		leaveSpeed: 'fast',		// speed to use when mouse leaves
		leaveDelay: 1000,		// delay start dimming with this ms

		dimOnReady: true,		// dim to 'leave' levels on when the page is loaded
		animateOnReady:true,	// animate while dimming when page is loaded

		siblingsAnimate: false,	// animate siblings when entering/leaving the original element
		siblingsEnter: 0.4,
		siblingsLeave: 1.0
	};

	// plugin methods
	var methods = {
		// public methods
		init: function(options) {
			if( this.length ){
				var gsettings = $.extend(true, $.fn.afDimmer.defaultOptions, options );

				return this.each(function () {
					var $this = $(this);
					var lsettings = $.extend(true, [], gsettings);
					lsettings.timer = null;

					if (lsettings.animateOnReady) {
						$(function(){$this.stop().fadeTo(lsettings.leaveSpeed, lsettings.leave, 'linear')});
					} else if (lsettings.dimOnReady) {
						$this.stop().css({ opacity: lsettings.leave });
					}

					$this.mouseenter(function(){
						if (lsettings.timer !== false) clearTimeout(lsettings.timer);
						lsettings.timer = setTimeout(function(){
							if (lsettings.siblingsAnimate)
								$this.siblings().stop().fadeTo(lsettings.enterSpeed, lsettings.siblingsEnter, 'linear');
							$this.stop().fadeTo(lsettings.enterSpeed, lsettings.enter, 'linear');
						}, lsettings.enterDelay);
					}).mouseleave(function() {
						var hadTimer = (lsettings.timer !== false);
						if (hadTimer) clearTimeout(lsettings.timer);
						lsettings.timer = setTimeout(function(){
							if (lsettings.siblingsAnimate)
								$this.siblings().stop().fadeTo(lsettings.leaveSpeed+300, lsettings.siblingsLeave, 'linear');
							$this.stop().fadeTo(lsettings.leaveSpeed, lsettings.leave, 'linear');
						}, lsettings.leaveDelay);
					});

					return true;
				});
			}
		} // init method

	}; // methods

})( jQuery );


