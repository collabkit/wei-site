$(document).ready( function() {
	var $window = $(window);
	var elements = {
		'logo': { '$': $( '#logo' ), 'fixed': null, 'limit': 0, 'hidden': false },
		'menu': { '$': $( '#menu' ), 'fixed': null, 'limit': 0, 'hide': 'logo' }
	};
	function reflow() {
		for ( key in elements ) {
			e = elements[key];
			if ( e.hidden ) {
				continue;
			}
			if ( e.fixed === null ) {
				e.fixed = $window.scrollTop() >= e.$.offset().top;
				if ( e.fixed ) {
					e.$.addClass( 'fixed' );
					e.limit = e.$.outerHeight();
				}
			} else if ( !e.fixed && $window.scrollTop() >= e.$.offset().top ) {
				e.$.addClass( 'fixed' );
				e.fixed = true;
				e.limit = $window.scrollTop();
			} else if ( e.fixed && $window.scrollTop() < e.limit - 1 ) {
				e.$.removeClass( 'fixed' );
				e.fixed = false;
			}
			if ( e.hide in elements ) {
				elements[e.hide].$[e.fixed ? 'hide' : 'show']();
				elements[e.hide].hidden = e.fixed;
			}
		}
	}
	$window.bind( 'load scroll mousewheel', reflow );
	$( 'a[href^=#]' ).click( function() {
		setTimeout( reflow, 0 );
	} );
	$( '#posts' ).PaRSS(
		'http://collabkit.com/blog/?feed=rss2', 3, 'M jS g:i a', true
	);
} );