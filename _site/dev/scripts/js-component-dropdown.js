/**
 * JS Component - Dropdown
 *
 * @since 1.0.0-alpha.1
 */

( function( $ ) {

  // Add the toggled-on class when the button is clicked.
  $('.btn--dropdown-toggle').click(function(event) {
    event.preventDefault();
    var dropdownButton = $(this);

    // Close all other open menus when the current toggle button is clicked
    $('.btn--dropdown-toggle').not(dropdownButton).removeClass('toggle-on');
    $('.btn--dropdown-toggle').not(dropdownButton).attr( 'aria-expanded', 'false' );
    $('.btn--sub-toggle').removeClass('toggle-on');
    $('.dropdown, .menu-dropdown').not( dropdownButton.next( '.dropdown, .menu-dropdown' ) ).removeClass('toggled-on');

    // Toggle dropdown classes when the dropdown button is clicked
    dropdownButton.toggleClass( 'toggle-on' );
    dropdownButton.next( '.dropdown, .menu-dropdown' ).toggleClass( 'toggled-on' );
    dropdownButton.attr( 'aria-expanded', dropdownButton.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
  });

  // Sub-menu drop downs.
  $('.btn--sub-toggle').click(function(event) {
    event.preventDefault();
    var toggleButtonSub = $(this);

    // Toggle dropdown classes when the dropdown button is clicked
    toggleButtonSub.toggleClass( 'toggle-on' );
    toggleButtonSub.next( '.dropdown, .menu-dropdown' ).toggleClass( 'toggled-on' );
    toggleButtonSub.attr( 'aria-expanded', toggleButtonSub.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
  });

  // Close all dropdown menues when clicking outside
  $(document).click(function(event) {

    // If the click target IS NOT a child of .dropdown AND the dropdown toggle button...
    if(!$(event.target).closest('.dropdown, .menu-dropdown').length && !$(event.target).closest('.btn--dropdown-toggle').length && !$(event.target).is('.btn--dropdown-toggle')) {

      // ...and if the menues are down, then close all open menues
      if($('.dropdown, .menu-dropdown').is(':visible')) {
        $('.btn--dropdown-toggle').removeClass('toggle-on');
        $('.dropdown, .menu-dropdown').removeClass('toggled-on');
        $('.btn--dropdown-toggle').attr( 'aria-expanded', 'false' );
      }
    }
  });
} )( jQuery );
