angular.module('VisApp')
  .controller('CreditsCtrl', ['$scope', '$location',
    function($scope, $location){
      $scope.todo = 'd3 fun';
      $scope.names = ['Autumn (aka Bubbles) - D3 & Angular', 
                      'Michael (aka Cat) - AlgoMan', 
                      'Joseph (aka Confucius) - Mr. Promise',
                      'James (aka Stranger with Candy) - Alchemist', 
                      'Farhad (aka Persian Excursion) - Dozer'];
  }]);
