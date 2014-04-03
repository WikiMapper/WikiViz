angular.module('VisApp', ['ngRoute', 'd3']);

angular.module('VisApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: ''
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: ''
      })
      .when('/credits', {
        templateUrl: 'views/credits.html',
        controller: 'CreditsCtrl'
      })
      .otherwise({
        redirectTo: '/'});
  }]);
