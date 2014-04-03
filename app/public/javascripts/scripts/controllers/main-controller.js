angular.module('VisApp')
  .controller('MainCtrl', ['DatabaseService','ColorService', 'd3Service', '$scope', '$location', 'ChallengeService',
    function(DatabaseService, ColorService, d3Service, $scope, $location, ChallengeService){
      $scope.showForm = true;
      $scope.showVis = false;
      $scope.showWait = false;
      $scope.url = 'http://en.wikipedia.org/wiki/math';

      // $scope.reset = function(){
      //   $scope.showForm = true;
      //   $scope.showVis = false;
      //   $scope.url = 'http://en.wikipedia.org/wiki/math';
      //   $scope.sourcedata = null;
      //   //this doesn't have promises pattern, as the DatabaseService call below does, why?
      //   $scope.sourcedata = DatabaseService.reset();
      // };

      $scope.getInput = function(){
       // $scope.reset();
        $scope.showForm = false;
        $scope.showVis = true;
        $scope.showWait = true;
        DatabaseService.request($scope.url).then(function(data) {
          // $scope.sourcedata = data;
          $scope.rawdata = data;
          console.log('raw', data);
          $scope.showWait = false;
        });
      };

      $scope.challenge = function(){
        $scope.reset();
        $scope.showForm = false;
        $scope.showVis = true;
        $scope.showWait = true;
        ChallengeService.request().then(function(data) {
          console.log('challenge', data);
          $scope.challenge = data;
          var node 
        // $scope.sourcedata =     
        });
      };


  }]);
