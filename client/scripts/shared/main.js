(function() {
  'use strict';
  angular.module('app.controllers', []).controller('AppCtrl', [
    '$scope', '$rootScope', function($scope, $rootScope) {
      var $window;
      $window = $(window);
      $scope.main = {
        brand: 'KRCFM',
        name: 'Admin'
      };
      $scope.pageTransitionOpts = [
        {
          name: 'Scale up',
          "class": 'ainmate-scale-up'
        }, {
          name: 'Fade up',
          "class": 'animate-fade-up'
        }, {
          name: 'Slide in from right',
          "class": 'ainmate-slide-in-right'
        }, {
          name: 'Flip Y',
          "class": 'animate-flip-y'
        }
      ];
      $scope.admin = {
        layout: 'wide',
        menu: 'vertical',
        fixedHeader: true,
        fixedSidebar: false,
        pageTransition: $scope.pageTransitionOpts[0]
      };
      $scope.$watch('admin', function(newVal, oldVal) {
        if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
          $rootScope.$broadcast('nav:reset');
          return;
        }
        if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
          if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
            $scope.admin.fixedHeader = true;
            $scope.admin.fixedSidebar = true;
          }
          if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
            $scope.admin.fixedHeader = false;
            $scope.admin.fixedSidebar = false;
          }
          return;
        }
        if (newVal.fixedSidebar === true) {
          $scope.admin.fixedHeader = true;
        }
        if (newVal.fixedHeader === false) {
          $scope.admin.fixedSidebar = false;
        }
      }, true);
      return $scope.color = {
        primary: '#248AAF',
        success: '#3CBC8D',
        info: '#29B7D3',
        infoAlt: '#666699',
        warning: '#FAC552',
        danger: '#E9422E'
      };
    }
  ])

  .controller('HeaderCtrl', ['$scope', function($scope) {}])

  .controller('NavContainerCtrl', ['$scope', function($scope) {}])

  .controller('NavCtrl', [
    '$scope', 'taskStorage', 'filterFilter', function($scope, taskStorage, filterFilter) {
      var tasks;
      tasks = $scope.tasks = taskStorage.get();
      $scope.taskRemainingCount = filterFilter(tasks, {
        completed: false
      }).length;
      return $scope.$on('taskRemaining:changed', function(event, count) {
        return $scope.taskRemainingCount = count;
      });
    }
  ])

  .controller('LoginController', LoginController)

  .controller('SignupController', SignupController)

  .controller('DashboardCtrl', ['$scope', function($scope) {}]);

  LoginController.$inject = ['$scope', '$location', 'AuthenticationService', 'FlashService'];

  function LoginController($scope, $location, AuthenticationService, FlashService) {
     $scope.main = {
        brand: 'KRCFM',
      };

      var cfm = this;
      cfm.login = login;

      (function initController() {
         // reset login status
         AuthenticationService.ClearCredentials();
      })();

      function login() {
        // vm.dataLoading = true;
        AuthenticationService.Login(cfm.username, cfm.password, function (response) {
          if (response.success) {
            AuthenticationService.SetCredentials(cfm.username, cfm.password);
            $location.path('/');
          } 
          else {
            FlashService.Error(response.message);
            cfm.error = response.message;
            // vm.dataLoading = false;
          }
        });
      };
  }


  SignupController.$inject = ['$scope', '$location', '$http'];

  function SignupController($scope, $location, $http) {

    var cfm = this;
    cfm.signup = signup;

    function signup() {
        // vm.dataLoading = true;
        var headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        };

        var request = $http({
          method: "post",
          url: "http://localhost/kohana/user/signup",
          data: {
            email: cfm.email
          },

          headers: headers
        });

        request.success(function (response) {
          alert(response.message);
          cfm.success = response.success;
          cfm.message = response.message;
        });
      };
    }

}).call(this);

//# sourceMappingURL=main.js.map
