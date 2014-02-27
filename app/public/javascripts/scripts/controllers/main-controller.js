angular.module('VisApp')
  .controller('MainCtrl', ['DatabaseService', 'd3Service', '$scope', '$location',
    function(DatabaseService, d3Service, $scope, $location){
      console.log('MainCtrl called. $scope.showForm');

      $scope.showForm = true;
      $scope.showVis = false;
      $scope.url = 'http://en.wikipedia.org/wiki/Lollipop';            ;

      $scope.reset = function(){
        console.log('should call right away');
        $scope.showForm = true;
        $scope.showVis = false;
        $scope.url=null;
      };

      $scope.getInput = function(){
        $scope.showForm = false;
        $scope.showVis = true;
        //DatabaseService.request('http://en.wikipedia.org/wiki/' + $scope.url);
        //DatabaseService.request( $scope.url);
        $scope.sourcedata = DatabaseService.request($scope.url);
      };

  }]);
