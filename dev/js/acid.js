;(function($) {
  try {
    var __name = 'acid';

      //--
      $.fn[__name] = function(options) {
      //-- Plugin gymnastics - Part 1/3
      //-- ------------------------------------------------------
      var self = this; // prevent from losing the scope
      self.view = $(this);
      self.view.data(__name, self); // store the plugin instance into the element
      //-- ------------------------------------------------------


      //-- init - Part 2/3
      //-- ------------------------------------------------------
      self.defaults = {
        element           : 'acid',
        gradient          : 'trip',
        ratio             : 2.15,
        activeClass       : 'on',
        elementZ          : 1,
        overrideJSGradient: false
      };

      self.initialize = function() {
        // merging defaults with passed arguments
        self.options = $.extend({}, self.defaults, options);
        ignite();
        return self;
      };

      //-- Vars - Part 3/3
      //-- ------------------------------------------------------
      var element, elementBackground, gradient, gradientElement, gradientBackground;

      //-- Start
      //-- ------------------------------------------------------

      function ignite() {

        // Append element that will become gradient
        gradientElement = $('<div class="' + self.options.gradient + '"></div>');
        gradientElement.appendTo('.' + self.options.element);

        // If using dynamic color generation, create colors
        if(self.options.overrideJSGradient !== true) {

          // Get element background color (will return RGB)
          elementBackground  = $('.' + self.options.element).css('background-color');

          // Convert it to Hex
          elementBackground  = rgb2hex(elementBackground);

          // Get complementary using bytecode
          gradientBackground = ('000000' + (('0xffffff' ^ '0x' + elementBackground).toString(16))).slice(-6);
        }

        // Initiate gradient element on hover
        $('.' + self.options.element).hover(
          function () {
            $(this).find('.' + self.options.gradient).addClass(self.options.activeClass);
          },
          function () {
            $(this).find('.' + self.options.gradient).removeClass(self.options.activeClass);
          }
        );

        // Create the movement and dimensions in current element
        $('.' + self.options.element).mousemove(function(event) {
          var leftX = event.pageX - $(this).offset().left,
              topY = event.pageY - $(this).offset().top,
              itemHeight = $(this).height() * self.options.ratio,
              itemWidth = $(this).width() * self.options.ratio;

          // Create CSS for the tripping element
          $(this).find('.' + self.options.gradient).css({
            'position'        : 'absolute',
            'left'            : leftX,
            'top'             : topY,
            'width'           : itemWidth,
            'height'          : itemHeight,
            'margin-left'     : -(itemWidth/2),
            'margin-top'      : -(itemHeight/2),
            'z-index'         : self.options.elementZ
          });
          if(self.options.overrideJSGradient !== true) {
            $(this).find('.' + self.options.gradient).css({
              'background-image': 'radial-gradient(circle at 50% 50%, #' + gradientBackground + ', #' + elementBackground + ')'
            });
          }
        });

      }

      // Convert RGB value to Hex
      function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
      }

    //-
    return self.initialize();
    };
  } catch (e) {
    err(e);
  }
})(jQuery);