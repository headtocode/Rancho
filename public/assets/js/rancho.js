/**
 * JS Component - Accessible Accordions
 *
 * https://a11y.nicolas-hoffmann.net/accordion/
 * Accessed on Dec. 9, 2016
 *
 * MIT License
 *
 * Copyright (c) Nicolas Hoffmann
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @author Nicolas Hoffmann
 * @since 1.0.0-alpha.1
 */

(function ($) {
  'use strict';

  var defaultConfig = {
    headersSelector: '.js-accordion__header',
    panelsSelector: '.js-accordion__panel',
    buttonsSelector: 'button.js-accordion__header',
    button: $('<button></button>', {
      class: 'js-accordion__header',
      type: 'button'
    }),
    buttonSuffixId: '_tab',
    multiselectable: true,
    prefixClass: 'accordion',
    headerSuffixClass: '__title',
    buttonSuffixClass: '__header',
    panelSuffixClass: '__panel',
    direction: 'ltr'
  };

  var Accordion = function ($el, options) {
    this.options = $.extend({}, defaultConfig, options);

    this.$wrapper = $el;
    this.$panels = $(this.options.panelsSelector, this.$wrapper);

    this.initAttributes();
    this.initEvents();
  };

  Accordion.prototype.initAttributes = function () {
    this.$wrapper.attr({
      'role': 'tablist',
      'aria-multiselectable': this.options.multiselectable.toString()
    }).addClass(this.options.prefixClass);

    this.$panels.each($.proxy(function (index, el) {
      var $panel = $(el);
      var $header = $(this.options.headersSelector, $panel);
      var $button = this.options.button.clone().text($header.text());

      $header.attr('tabindex', '0').addClass(this.options.prefixClass + this.options.headerSuffixClass);
      $panel.before($button);

      var panelId = $panel.attr('id') || this.$wrapper.attr('id') + '-' + index;
      var buttonId = panelId + this.options.buttonSuffixId;

      $button.attr({
        'aria-controls': panelId,
        'aria-expanded': 'false',
        'role': 'tab',
        'id': buttonId,
        'tabindex': '-1',
        'aria-selected': 'false'
      }).addClass(this.options.prefixClass + this.options.buttonSuffixClass);

      $panel.attr({
        'aria-labelledby': buttonId,
        'role': 'tabpanel',
        'id': panelId,
        'aria-hidden': 'true'
      }).addClass(this.options.prefixClass + this.options.panelSuffixClass);

      // if opened by default
      if ($panel.attr('data-accordion-opened') === 'true') {
        $button.attr({
          'aria-expanded': 'true',
          'data-accordion-opened': null
        });

        $panel.attr({
          'aria-hidden': 'false'
        });
      }

      // init first one focusable
      if (index === 0) {
        $button.removeAttr('tabindex');
      }
    }, this));

    this.$buttons = $(this.options.buttonsSelector, this.$wrapper);
  };

  Accordion.prototype.initEvents = function () {
    this.$wrapper.on('focus', this.options.buttonsSelector, $.proxy(this.focusButtonEventHandler, this));

    this.$wrapper.on('click', this.options.buttonsSelector, $.proxy(this.clickButtonEventHandler, this));

    this.$wrapper.on('keydown', this.options.buttonsSelector, $.proxy(this.keydownButtonEventHandler, this));

    this.$wrapper.on('keydown', this.options.panelSelector, $.proxy(this.keydownPanelEventHandler, this));
  };

  Accordion.prototype.focusButtonEventHandler = function (e) {
    var $button = $(e.target);

    $(this.options.buttonsSelector, this.$wrapper).attr({
      'tabindex': '-1',
      'aria-selected': 'false'
    });

    $button.attr({
      'aria-selected': 'true',
      'tabindex': null
    });
  };

  Accordion.prototype.clickButtonEventHandler = function (e) {
    var $button = $(e.target);
    var $panel = $('#' + $button.attr('aria-controls'));

    this.$buttons.attr('aria-selected', 'false');
    $button.attr('aria-selected', 'true');

    // opened or closed?
    if ($button.attr('aria-expanded') === 'false') { // closed
      $button.attr('aria-expanded', 'true');
      $panel.attr('aria-hidden', 'false');
    }
    else { // opened
      $button.attr('aria-expanded', 'false');
      $panel.attr('aria-hidden', 'true');
    }

    if (this.options.multiselectable === false) {
      this.$panels.not($panel).attr( 'aria-hidden', 'true');
      this.$buttons.not($button).attr('aria-expanded', 'false');
    }

    setTimeout(function () {
      $button.focus();
    }, 0);

    e.preventDefault();
  };

  Accordion.prototype.keydownButtonEventHandler = function (e) {
    var $button = $(e.target);
    var $firstButton = this.$buttons.first();
    var $lastButton = this.$buttons.last();
    var $prevButton = $button.prevAll(this.options.buttonsSelector).first();
    var $nextButton = $button.nextAll(this.options.buttonsSelector).first();
    var $target = null;

    var k = this.options.direction === 'ltr' ? {
      prev: [38, 37], // up & left
      next: [40, 39], // down & right
      first: 36, // home
      last: 35 // end
    } : {
      prev: [38, 39], // up & left
      next: [40, 37], // down & right
      first: 36, // home
      last: 35 // end
    };

    var allKeyCode = [].concat(k.prev, k.next, k.first, k.last);

    if ($.inArray(e.keyCode, allKeyCode) >= 0 && !e.ctrlKey) {
      this.$buttons.attr({
        'tabindex': '-1',
        'aria-selected': 'false'
      });


      if (e.keyCode === 36) {
        $target = $firstButton;
      }
      // strike end in the tab => last tab
      else if (e.keyCode === 35) {
        $target = $lastButton;
      }
      // strike up or left in the tab => previous tab
      else if ($.inArray(e.keyCode, k.prev) >= 0) {
        // if we are on first one, activate last
        $target = $button.is($firstButton) ? $lastButton : $prevButton;
      }
      // strike down or right in the tab => next tab
      else if ($.inArray(e.keyCode, k.next) >= 0) {
        // if we are on last one, activate first
        $target = $button.is($lastButton) ? $firstButton : $nextButton;
      }

      if ($target !== null) {
        this.goToHeader($target);
      }

      e.preventDefault();
    }
  };

  Accordion.prototype.keydownPanelEventHandler = function (e) {
    var $panel = $(e.target);
    var $button = $('#' + $panel.attr('aria-labelledby'));
    var $firstButton = this.$wrapper.find(this.options.buttonsSelector).first();
    var $lastButton = this.$wrapper.find(this.options.buttonsSelector).last();
    var $prevButton = $button.prevAll(this.options.buttonsSelector).first();
    var $nextButton = $button.nextAll(this.options.buttonsSelector).first();
    var $target = null;

    // strike up + ctrl => go to header
    if ( e.keyCode === 38 && e.ctrlKey ) {
      $target = $button;
    }
    // strike pageup + ctrl => go to prev header
    else if ( e.keyCode === 33 && e.ctrlKey ) {
      $target = $button.is($firstButton) ? $lastButton : $prevButton;
    }
    // strike pagedown + ctrl => go to next header
    else if ( e.keyCode === 34 && e.ctrlKey ) {
      $target = $button.is($lastButton) ? $firstButton : $nextButton;
    }

    if ($target !== null) {
      this.goToHeader($target);
    }
  };

  Accordion.prototype.goToHeader = function ($target) {
    if ($target.length !== 1) {
      return;
    }

    $target.attr({
      'aria-selected': 'true',
      'tabindex': null
    });

    setTimeout(function () {
      $target.focus();
    }, 0);
  };


  var PLUGIN = 'accordion';

  $.fn[PLUGIN] = function (params) {
    var options = $.extend({}, $.fn[PLUGIN].defaults, params);


    return this.each(function () {
      var $el = $(this);

      var specificOptions = {
        multiselectable: $el.attr('data-accordion-multiselectable') === 'true' ? true : options.multiselectable,
        prefixClass: typeof($el.attr('data-accordion-prefix-classes')) !== 'undefined' ? $el.attr('data-accordion-prefix-classes') : options.prefixClass,
        direction: $el.closest('[dir="rtl"]').length > 0 ? 'rtl' : options.direction
      };
      specificOptions = $.extend({}, options, specificOptions);

      $el.data[PLUGIN] = new Accordion($el, specificOptions);
    });
  };

  $.fn[PLUGIN].defaults = defaultConfig;
  $('.js-accordion').accordion();

})(window.jQuery);

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

/**
 * JS Component - Accessible Modal Modal
 *
 * https://github.com/scottaohara/accessible_modal_window
 *
 * MIT License
 *
 * Copyright (c) 2016 Scott O'Hara
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @since 1.0.0-alpha.1
 */

(function ( $, w, doc ) {

  'use strict';

  var A11yModal = {};

  A11yModal.NS = "A11yModal";
  A11yModal.AUTHOR = "Scott O'Hara";
  A11yModal.VERION = "2.2.2";
  A11yModal.DOCUMENTATION = 'https://github.com/scottaohara/accessible_modal_window';
  A11yModal.LICENSE = "https://github.com/scottaohara/accessible_modal_window/blob/master/LICENSE";


  // setup global class variables
  var modalTrigger      = '[data-action="modal-open"]',

      modal             = '.a11y-modal',

      modalClass        = 'modal',
      modalDoc          = '.'+modalClass,
      modalTitle        = '[data-modal-title]',
      modalClose        = '[data-modal-close]',

      modalAddStyle     = 'data-add-style',

      modalIsOpen       = 'modal-is-open',

      genModalClose     = '<button type="button" data-modal-close class="js-btn-close"><i class="fa fa-2x fa-times-circle" aria-hidden="true"></i></button>',

      $html             = $('html'),

      bodyWrapID        = 'a11y_body_wrap',
      bodyElements      = 'a11y-hide-if-modal-open',

      bodyWrapInit      = 'default',

      safetyModalTitle  = "Dialog Window";


  $.fn.extend({

    a11yModal: function ( e ) {

      return this.each( function () {

        if ( bodyWrapInit !== 'default') {
          bodyWrapID = bodyWrapInit;
        }

        var id = this.id,
            $self = $('#' + id),

        // setup modals properly
        setupA11yModal = function () {

          // setup each modal instance to have the
          // appropriate attributes. These attributes
          // are applied to what would be considered the
          // modal container, or 'overlay'
          $self.each( function () {

            var $this = $(this),
                $findTitle = $this.find(modalTitle),
                $findHeading = $this.find(':header'),
                $thisLabel;


            // first check to see what sort of dialog this should be
            // if a data-modal-alert attribute is set to true, then
            // this is meant to be an alert dialog, so set the role
            // to 'alertdialog'. If it's not set, it's mean to be
            // a normal dialog. So set the role to just 'dialog'
            if ( $this.attr('data-modal-alert') === 'true' ) {
              $this.attr({
                'role': 'alertdialog'
              });
            }
            else {
              $this.attr({
                'role': 'dialog'
              });
            }


            // we will need to set focus to the modal content
            // container for focus trapping reasons, so we
            // need this to have a tabindex
            $this.attr('tabindex', '-1');
            $this.find(modalDoc).attr('tabindex', '-1');


            // check to see if an aria-label was set on the modal
            // if not, then start running checks to apply an aria-labelledby
            if ( !$self[0].hasAttribute('aria-label') ) {

              // if the modal window has a child modalTitle set,
              // then add an aria-labelledby attribute to the dialog,
              // pointing to that element.
              if ( $findTitle.length ) {

                $thisLabel = $findTitle.attr('id');

              } //if $findTitle

              // in the event that a modalTitle wasn't manually set,
              // then we should look to see if there's a heading element
              // present at all, and then make THAT the source for the
              // aria-labelledby
              else if ( $findHeading.length ) {

                // does the heading we found have an id already?
                // let's check
                if ( $findHeading.first().attr('id') ) {

                  $thisLabel = $findHeading.first().attr('id');

                } // if it doesn't, then generate one
                else {
                  $thisLabel = $this.attr('id') + '_title';

                  $findHeading.first().attr('id', $thisLabel);

                } //else

              } // else/if

              $this.attr( 'aria-labelledby', $thisLabel );

            } // if

          });


          // setup each modal content area (the component that
          // contains the actual content)
          $self.find(modalDoc).each( function () {
            var $this = $(this);


            // important for older versions of NVDA to accurately
            // understand a modal's content
            $this.attr({
              'role': 'document' // *
            });


            // Modals need a close button, and it should be the last
            // element in the modal.

            // If a modal doesn't have a close button, create it.
            if ( !$this.find(modalClose).length ) {

              // the best place to add the close button would be
              // in the outro area, so check to see if it exists
              if ( $this.find('.modal__outro').length ) {

                $this.find('.modal__outro').append(genModalClose);

              } else {
                // if the outro area doesn't exist, then just add
                // the close button as the last element in the modal.
                $this.append(genModalClose);

              } // if/else

            } // if

            // Set aria-label to the close trigger.
            $this.find(modalClose).attr({
              'aria-label': 'Close Modal'
            });

          }); // end modalDoc

        },


        // setup modal triggers
        // the following applies needed aria-attributes
        // to the modal triggers, as well as doing a
        // final check to ensure that the modal window
        // has appropriate labeling
        setupA11yModalTriggers = function () {

          $(modalTrigger).each( function () {

            var $this = $(this),
                $grabTarget,
                $modalTarget;

            // if the trigger is a link, we need to give it a
            // button role.
            if ( $this.attr('href') ) {

              $this.attr('role', 'button');

            }


            // The triggers need to point to the modals they control via
            // the aria-controls attribute. So run a check to see if the
            // attribute exists on the button.
            //
            // It's likely that it WON'T exist, as the optimal method for
            // the minimum mark-up is to use a data-modal-open attribute
            // instead. The reason for this is that in situations without
            // JavaScript, we don't want partial ARIA hooks, as that can
            // create confusion for ATs that would expect certain
            // functionality that wouldn't be available due to lack of JS.
            if ( !$this.attr('aria-controls') ) {

              // make sure that the trigger actually triggers something.
              // if it there's no data-modal-open attribute set, then
              // pull the target from the href
              if ( $this.attr('data-modal-open') ) {

                $grabTarget = $this.attr('data-modal-open');
                $this.attr('aria-controls', $grabTarget );

              }
              // if there's no data-modal-open, pull the target from
              // from the href
              else if ( $this.attr('href') ) {

                $grabTarget = $this.attr('href').split('#')[1];
                $this.attr('aria-controls', $grabTarget );

              }
              // if neither of the above are set, then this just
              // won't work and you're clearly expecting this to
              // open by magic.
              else {
                console.log("No target set. A target is set by setting the value of an aria-controls attribute, which if absent, can be generated by the trigger's href URI, or a data-modal-open attribute to the value of the modal window ID you are attempting to open.");
                return false;
              }

            } // end if aria-controls

            // now that the aria-controls is set, point to the modal's target
            // so we can run the next if
            $modalTarget = $('#'+$this.attr('aria-controls') );


            // finally a last check to see if the trigger is meant to launch
            // an alert dialog modal. If the alertdialog role wasn't set during
            // the initial setup function, then look to see if the 'data-modal-alert'
            // attribute is present on the trigger, and if so, apply the alertdialog
            // role to the modal on trigger activation.
            if ( $this.attr('data-modal-alert') === 'true' && $modalTarget.attr('role') !== 'alertdialog' ) {
              $modalTarget.attr('role', 'alertdialog');
            }

          });
        },


        // When modal dialogs overlays, focus should not be able to escape them.
        // To ensure this, we will reorder the DOM to move modal windows out of
        // their original place in the document order, and while wrapping all
        // normal content in a new wrapper div.
        organizeDOM = function () {

          var $body = $('body'),
              $bodyWrap = '<div id="'+bodyWrapID+'" />';


          // Wrap all contents of the <body> in a new div.
          // This div will be important in toggling screen reader's abilities
          // to interact with this content, when a modal window is open.
          // If this statement is not true, then it's because you already
          // have a wrapper element you can use for this purpose, and you
          // have passed in the ID.
          if ( bodyWrapInit === 'default' ) {
            $('body > *').wrapAll($bodyWrap);
          }


          // place all the modal dialogs at the top of the DOM, as the
          // first children of BODY. This will allow for backwards tabbing
          // into the browser's address bar, where as if the modals were
          // not located at the top of the DOM, keyboard focus would be
          // completely trapped within the modal window.
          $body.prepend($(modal));

        },


        openA11yModal = function ( e ) {

          // setup vars
          var $this = $(this),
              $modalTarget = $('#' + $this.attr('aria-controls') );


          // if this trigger has a data attribute of 'data-add-style', take the value
          // of this attribute and add it as a class to the target modal window
          if ( $this[0].hasAttribute(modalAddStyle) ) {

            var $grabClass = $(this).attr(modalAddStyle);

            $modalTarget.find(modalDoc).attr('class', modalClass + ' ' + $grabClass);
          }

          // Check to see if the modal has either an aria-label or labelledby attribute
          // if not, that means that the modal didn't have a manually set aria-label,
          // nor does the modal have any sort of heading element to draw a title from.
          // In this instance, pull the safetyModalTitle var in as an aria-label
          if ( !$modalTarget[0].hasAttribute('aria-labelledby') && !$modalTarget[0].hasAttribute('aria-label') ) {

            // Last ditch effort to allow control over what the aria-label will be.
            // If the data-set-modal-title attribute is set to the modal trigger,
            // its value will be set as the modal's aria-label
            if ( $this[0].hasAttribute('data-set-modal-title') ) {
              safetyModalTitle = $this.attr('data-set-modal-title');
            }

            // set an aria-label to the modal
            $modalTarget.attr('aria-label', safetyModalTitle );

          } // if


          // traps focus while the modal is open
          trapFocus();

          // if modal trigger is an <a>, make sure that URI isn't
          // updated and more importantly that the document doesn't
          // auto-jump to the DOM location of the modal window.
          e.preventDefault();


          // set that modal be visible, controlled by the
          // aria-hidden attribute and CSS
          // then shift focus to it
          $modalTarget.attr('aria-hidden', 'false');


          // add a class to the HTML, to allow for a CSS hook
          // to help restrict document scroll while the modal
          // is open
          $html.addClass(modalIsOpen);


          // Hide main document content from screen readers by
          // applying an aria-hidden attribute to the primary document content
          // e.g. the wrapper around all things not modal windows
          $('body').find('#'+bodyWrapID).attr('aria-hidden', 'true');


          // finally, apply focus to the newly opened modal window
          $modalTarget.find(modalDoc).focus();

        },


        // Bind to both the button click and the escape key to
        // close the modal window  but only if isModalOpen is set to true
        closeA11yModal = function ( e ) {

          var returnFocus = $('[aria-controls="'+$self.attr('id')+'"]');

          e.preventDefault();

          $html.removeClass(modalIsOpen);
          $self.attr('aria-hidden', 'true');

          // remove the aria-hidden that was applied during modal open
          $('body').find('#'+bodyWrapID).removeAttr('aria-hidden');

          returnFocus.focus();

        },


        // on click of the modal overlay, close the modal
        overlayA11yModal = function ( e ) {

          if ( e.target === $self.find(modalDoc).parent().get(0) ) {
            closeA11yModal( e );
          }

        },


        // keyboard controls specific to the modal dialog windows
        keytrollsA11yModalTrigger = function ( e ) {

          var keyCode = e.keyCode || e.which;

          switch ( keyCode ) {

            // space & enter
            case 32:
            case 13:
              e.stopPropagation();
              $(this).trigger('click');
              break;

          } // switch

        },


        // keyboard controls for opened modals
        keytrollsA11yModal = function ( e ) {

          var keyCode = e.keyCode || e.which;

          if ( $html.hasClass(modalIsOpen) ) {

            switch ( keyCode ) {

              // tab
              case 9:
                if ( !e.shiftKey && $self.find(modalClose).is(':focus') ) {
                  $(modalDoc).focus();
                }
                break;

              // esc
              case 27:
                closeA11yModal( e );
                break;

              // space & enter
              case 32:
              case 13:
                if ( $self.find(modalClose).is(':focus') ) {
                  e.stopPropagation();
                  closeA11yModal( e );
                }
                break;

            } // switch

          }

        },


        // trap focus within the modal window, because otherwise
        // users can tab to obscured elements, and that's just
        // bad UX.
        trapFocus = function () {
          var $trapArea = $self.find(modalDoc),
              $trapAreaClose = $self.find(modalClose);

          $(document).on('focusin.' + $self, function ( e ) {

            if ( $trapArea[0] !== e.target && !$trapArea.has(e.target).length) {
              $trapAreaClose.focus();
            }

          });

        }; // trap focus


        // run setup functions
        organizeDOM();
        setupA11yModal();
        setupA11yModalTriggers();


        // events specific to modal dialogs
        $self.on('keydown', keytrollsA11yModal.bind(this) );
        $self.on('click touchstart', overlayA11yModal.bind(this) );
        $self.find(modalClose).on('click', closeA11yModal.bind(this) );


        // open Modals aren't inside the modal component, hence the $(document)
        $(document).on('click', modalTrigger, openA11yModal );
        $(document).on('keydown', modalTrigger, keytrollsA11yModalTrigger );

      }); // end: return this.each()

    } // end: a11yModal: function

  }); // end: $.fn.extend

  $(modal).a11yModal();

} )( jQuery, this, this.document );

/**
 * JS Component - Accessible Tabs
 *
 * http://simplyaccessible.com/article/danger-aria-tabs/
 * Accessed on Dec. 9, 2016
 *
 * MIT License
 *
 * Copyright (c) 2016 by Jeff Smith (http://codepen.io/jeffsmith/pen/mPByya)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @author Scott O'Hara
 * @since 1.0.0-alpha.1
 */


( function( $ ) {
  var tabs = $(".tabs");

  // For each individual tab DIV, set class and aria-hidden attribute, and hide it
  $(tabs).find("> div").attr({
      "class": "tabs__panel",
      "aria-hidden": "true"
  }).hide();

  // Get the list of tab links
  var tabs__list = tabs.find("ul:first").attr({
      "class": "tabs__list",
  });

  // For each item in the tabs list...
  $(tabs__list).find("li > a").each(
      function(a){
          var tab = $(this);

          // Create a unique id using the tab link's href
          var tabId = "tab-" + tab.attr("href").slice(1);

          // Assign tab id and aria-selected attribute to the tab control, but do not remove the href
          tab.attr({
              "id": tabId,
              "aria-selected": "false",
          }).parent().attr("role", "presentation");

          // Assign aria attribute to the relevant tab panel
          $(tabs).find(".tabs__panel").eq(a).attr("aria-labelledby", tabId);

          // Set the click event for each tab link
          tab.click(
              function(e){
                  var tabs__panel;

                  // Prevent default click event
                  e.preventDefault();

                  // Change state of previously selected tabList item
                  $(tabs__list).find("> li.current").removeClass("current").find("> a").attr("aria-selected", "false");

                  // Hide previously selected tabs__panel
                  $(tabs).find(".tabs__panel:visible").attr("aria-hidden", "true").hide();

                  // Show newly selected tabs__panel
                  tabs__panel = $(tabs).find(".tabs__panel").eq(tab.parent().index());
                  tabs__panel.attr("aria-hidden", "false").show();

                  // Set state of newly selected tab list item
                  tab.attr("aria-selected", "true").parent().addClass("current");

                  // Set focus to the first heading in the newly revealed tab content
                  tabs__panel.children("h2").attr("tabindex", -1).focus();
              }
          );
      }
  );

  // Set keydown events on tabList item for navigating tabs
  $(tabs__list).delegate("a", "keydown",
      function (e) {
          var tab = $(this);
          switch (e.which) {
              case 37: case 38:
                  if (tab.parent().prev().length!==0) {
                      tab.parent().prev().find("> a").click();
                  } else {
                      $(tabs__list).find("li:last > a").click();
                  }
                  break;
              case 39: case 40:
                  if (tab.parent().next().length!==0) {
                      tab.parent().next().find("> a").click();
                  } else {
                      $(tabs__list).find("li:first > a").click();
                  }
                  break;
          }
      }
  );

  // Show the first tabs__panel
  $(tabs).find(".tabs__panel:first").attr("aria-hidden", "false").show();

  // Set state for the first tabs__list li
  $(tabs__list).find("li:first").addClass("current").find(" > a").attr({
      "aria-selected": "true",
      "tabindex": "0"
  });

} )( jQuery );

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
