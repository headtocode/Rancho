/**
 * Menu Nested Dropdown
 *
 * @since 1.0.0-alpha.1
 */

( function( $ ) {

  /**
   * Child-menu Dropdown
   *
   * Creates a dropdown button and adds dropdown functionality
   * to child menues.
   */

  // Add dropdown toggle that displays child menu items.
  $( '.js-auto-dropdown > a' ).after(
    '<button class="btn btn--dropdown-toggle drop-nav-toggle" aria-expanded="false">\n'+
      '<span class="sr-only">Sub-Menu</span>\n'+
      '&nbsp;&nbsp;<i class="fa fa-lg fa-caret-down" aria-hidden="true"></i>\n'+
    '</button>'
  );

  // Add additional button class for nested sub-menues.
  $('.dropdown__nested-content > .contaner-dropdown > .btn--dropdown-toggle drop-nav-toggle').addClass('dropdown-toggle--sub').removeClass('dropdown-toggle');

} )( jQuery );
