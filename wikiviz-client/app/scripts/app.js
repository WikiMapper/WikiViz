// App configuration

angular.module('VisApp', ['ngRoute', 'd3']);

var testdata = "hello world";

angular.module('VisApp')
  .controller('MainCtrl', ['$scope', '$location',
    function($scope, $location){
      $scope.data = testdata;
  }]);

angular.module('VisApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'});
  }]);
