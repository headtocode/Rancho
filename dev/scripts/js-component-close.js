/**
 * JS Component - Visibility
 *
 * @since 1.0.0-alpha.1
 */

( function( $ ) {
	$('.js-btn-close').click(function(event) {
		event.preventDefault();

		$( this ).parents('.js-visible').hide("fast");
		$( this ).parents('.js-visible').attr( 'aria-hidden', 'true' );

	});
} )( jQuery );
