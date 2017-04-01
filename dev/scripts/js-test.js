/**
 * JS Test
 *
 * Simple test to see if Javascript is enabled. If enabled, this replaces
 * the .no-js class with a .js class.
 *
 * @author Pete Medina
 * @since 1.0.0-alpha.1
 */

( function( $ ) {
	$("body").removeClass('no-js');
	$("body").addClass('js');
} )( jQuery );
