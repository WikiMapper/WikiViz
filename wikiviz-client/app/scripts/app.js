// App configuration

var visApp = angular.module('VisApp', ['ngRoute']);

var testdata = "hello world";

visApp.controller('MainCtrl', function($scope, $location){
  $scope.data = testdata;
  });

visApp.config(function ($routeProvider) {
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
});