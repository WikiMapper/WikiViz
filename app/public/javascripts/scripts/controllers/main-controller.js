angular.module('VisApp')
  .controller('MainCtrl', ['DatabaseService','ColorService', 'd3Service', '$scope', '$location',
    function(DatabaseService, ColorService, d3Service, $scope, $location){
      $scope.showForm = true;
      $scope.showVis = false;
      $scope.url = 'http://en.wikipedia.org/wiki/Dog';

      $scope.reset = function(){
        console.log('should call right away');
        $scope.showForm = true;
        $scope.showVis = false;
        $scope.url = null;
        $scope.sourcedata = null;

      };

      $scope.getInput = function(){
        $scope.showForm = false;
        $scope.showVis = true;
        //DatabaseService.request('http://en.wikipedia.org/wiki/' + $scope.url);
        //DatabaseService.request( $scope.url);
        $scope.returnedPromise = DatabaseService.request($scope.url);
        // console.log('check $scope.sourcedata',$scope.sourcedata.then);
        $scope.returnedPromise.then(function(data) {
          $scope.sourcedata = data;
          console.log('datareturned $scope.sourcedata', $scope.sourcedata)
        });
      };

  }]);
