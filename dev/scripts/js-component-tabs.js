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
