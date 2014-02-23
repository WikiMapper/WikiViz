angular.module('VisApp')
  .controller('CreditsCtrl', ['$scope', '$location',
    function($scope, $location){
      $scope.todo = 'd3 fun';
      $scope.names = ['autumn', 'michael', 'joseph', 'james', 'fahrad'];
  }]);