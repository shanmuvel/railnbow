(function() {
  'use strict';
  angular.module('app', [
    'ngRoute', 
    'ngAnimate', 
    'ui.bootstrap', 
    'easypiechart', 
    'textAngular', 
    'ui.tree', 
    'ngMap', 
    'ngTagsInput', 
    'angular-loading-bar', 
    'app.controllers', 
    'app.directives', 
    'app.localization', 
    'app.nav', 
    'app.ui.ctrls', 
    'app.ui.directives', 
    'app.ui.services', 
    'app.ui.map', 
    'app.form.validation', 
    'app.ui.form.ctrls', 
    'app.ui.form.directives', 
    'app.tables', 
    'app.task', 
    'app.chart.ctrls', 
    'app.chart.directives', 
    'app.page.ctrls',
    'app.authentication',
    'app.flash'

    ])
  .config(config)
  .run(run);


  config.$inject = ['$routeProvider', '$httpProvider'];

  function config($routeProvider, $httpProvider) {

     var routes, setRoutes;
      routes = [
      'dashboard', 
      'agents/agent-list',
      'agents/signup',
      'agents/code-verification',
      'agents/profile',
      'agents/success-alert',
      'clients/client-list',
      'clients/add-new-client',
      'ui/typography', 
      'ui/buttons', 
      'ui/icons', 
      'ui/grids', 
      'ui/widgets', 
      'ui/components', 
      'ui/timeline', 
      'ui/nested-lists', 
      'ui/pricing-tables', 
      'ui/maps', 
      'tables/static', 
      'tables/dynamic', 
      'tables/responsive', 
      'forms/elements', 
      'forms/layouts', 
      'forms/validation', 
      'forms/wizard', 
      'charts/charts', 
      'charts/flot', 
      'charts/morris', 
      '404', 
      '500', 
      'pages/blank', 
      'forgot-password', 
      'pages/invoice', 
      'lock-screen', 
      'pages/profile', 
      'signin', 
      'signup', 
      'mail/compose', 
      'mail/inbox', 
      'mail/single', 
      'tasks/tasks'
      ];
      setRoutes = function(route) {
        var config, url;
        url = '/' + route;
        config = {
          templateUrl: 'views/' + route + '.html'
        };
        $routeProvider.when(url, config);
        return $routeProvider;
      };
      routes.forEach(function(route) {
        return setRoutes(route);
      });
      return $routeProvider.when('/', {
        redirectTo: '/dashboard'
      })

     .when('/signin', {
                controller: 'LoginController',
                templateUrl: 'views/signin.html',
                controllerAs: 'cfm'
            })

     .when('/agents/signup', {
                controller: 'SignupController',
                templateUrl: 'views/agents/signup.html',
                controllerAs: 'cfm'
            })

     .when('/agents/code-verification', {
                controller: 'CodeVerificationController',
                templateUrl: 'views/agents/code-verification.html',
                controllerAs: 'cfm'
            })

     .when('/agents/profile', {
                controller: 'profileCController',
                templateUrl: 'views/agents/profile.html',
                controllerAs: 'cfm'
            })


      .when('/404', {
        templateUrl: 'views/404.html'
      }).otherwise({
        redirectTo: '/404'
      });

    $httpProvider.interceptors.push('httpResponseInterceptor');
    $httpProvider.interceptors.push('httpTimeStampMarker');
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    delete $httpProvider.defaults.headers.common['Content-Type, X-Requested-With'];
    
    }


run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {

        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/agents/code-verification', '/agents/profile', '/404', '/agents/success-alert']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            var loggedPage = $.inArray($location.path(), ['/agents/code-verification', '/agents/profile']) === -1;
            if (restrictedPage && !loggedIn) {
                $location.path('/signin');
            }
            
            // Restricted this pages for logged in users
            if (!loggedPage && loggedIn) {
                $location.path('/dashboard');
            }


        });
    }

}).call(this);

//# sourceMappingURL=app.js.map
