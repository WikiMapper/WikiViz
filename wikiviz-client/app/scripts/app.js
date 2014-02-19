// App configuration

angular.module('VisApp', ['ngRoute', 'd3']);

angular.module('VisApp')
  .controller('MainCtrl', ['$scope', '$location',
    function($scope, $location){
      $scope.greeting = "Hola from the main controller";
  }]);

angular.module('VisApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'NodeCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'});
  }]);
