/**
 * Mobile Navigation Toggle
 *
 * Creates a single menu toggle for mobile navigation.
 * Includes checks to see if there is anything in the
 * menu, and if not, it'll hide the button.
 *
 * @since 1.0.0-alpha.1
 */

( function( $ ) {

  //  End the script if we don't have a global-nav area.
  var globalNav = $( '#global-nav' );
  if ( ! globalNav ) {
    return;
  }

  //  Search for a menu button in #masthead and end the
  //  script if none is found.
  //
  //  Change this if you place your menu under a different parent.
  button = $( '#masthead' ).find( '.btn--nav-toggle' );
  if ( ! button ) {
    return;
  }

  //  Hide the button if there is no menu and end the script.
  //
  //  This is mostly for use in a CMS where menus are dynamic and
  //  the user can't manually remove the menu button.
  menu = globalNav.find( '.global-nav' );
  if ( ( ! menu || ! menu.children().length ) ) {
    button.hide();
    $(".btn--nav-toggle").attr( 'aria-hidden', 'true' );
    return;
  }

  // Remove the nav-toggle--off class when the button is pushed.
  button.on( 'click', function() {
    globalNav.toggleClass('nav-toggle--off');
    $(this).toggleClass( 'button--toggled-on' );
  } );

} )( jQuery );
