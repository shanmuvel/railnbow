(function() {
  'use strict';
  angular.module('app.directives', []).directive('imgHolder', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return Holder.run({
            images: ele[0]
          });
        }
      };
    }
  ]).directive('customPage', function() {
    return {
      restrict: "A",
      controller: [
        '$scope', '$element', '$location', function($scope, $element, $location) {
          var addBg, path;
          path = function() {
            return $location.path();
          };
          addBg = function(path) {
            $element.removeClass('body-wide body-lock');
            switch (path) {
              case '/404':
              case '/500':
              case '/signin':
              case '/signup':
              case '/agents/code-verification':
              case '/agents/profile':
              case '/forgot-password':
                return $element.addClass('body-wide');
              case '/lock-screen':
                return $element.addClass('body-wide body-lock');
            }
          };
          addBg($location.path());
          return $scope.$watch(path, function(newVal, oldVal) {
            if (newVal === oldVal) {
              return;
            }
            return addBg($location.path());
          });
        }
      ]
    };
  }).directive('uiColorSwitch', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return ele.find('.color-option').on('click', function(event) {
            var $this, hrefUrl, style;
            $this = $(this);
            hrefUrl = void 0;
            style = $this.data('style');
            if (style === 'loulou') {
              hrefUrl = 'styles/main.css';
              $('link[href^="styles/main"]').attr('href', hrefUrl);
            } else if (style) {
              style = '-' + style;
              hrefUrl = 'styles/main' + style + '.css';
              $('link[href^="styles/main"]').attr('href', hrefUrl);
            } else {
              return false;
            }
            return event.preventDefault();
          });
        }
      };
    }
  ]).directive("repeatPassword", function() {
    return {
        require: "ngModel",
        link: function(scope, ele, attrs, ctrl) {
            var otherInput = ele.inheritedData("$formController")[attrs.repeatPassword];

            ctrl.$parsers.push(function(value) {
                if(value === otherInput.$viewValue) {
                    ctrl.$setValidity("repeat", true);
                    return value;
                }
                ctrl.$setValidity("repeat", false);
            });

            otherInput.$parsers.push(function(value) {
                ctrl.$setValidity("repeat", value === ctrl.$viewValue);
                return value;
            });
        }
    };
}).directive('goBack', [
    function() {
      return {
        restrict: "A",
        controller: [
          '$scope', '$element', '$window', function($scope, $element, $window) {
            return $element.on('click', function() {
              return $window.history.back();
            });
          }
        ]
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=directives.js.map
