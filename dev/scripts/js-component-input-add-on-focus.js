/**
 * Input Add-On Focus Classes
 *
 * Applies an in-focus class to elements that are displayed inline with a
 * form input using the input-add-on class.
 *
 * @since 1.0.0-alpha.1
 */

( function( $ ) {

  $(".input-add-on__field").focus(function() {
    $(this).siblings(".input-add-on__item").addClass( 'in-focus' );
  }).blur(function () {
      $(this).siblings().removeClass('in-focus');
  });

} )( jQuery );
