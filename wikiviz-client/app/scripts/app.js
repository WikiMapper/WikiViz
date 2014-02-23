// App configuration

angular.module('VisApp', ['ngRoute', 'd3', 'ui.bootstrap']);

angular.module('VisApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: ''
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: ''
      })
      .otherwise({
        redirectTo: '/'});
  }]);
