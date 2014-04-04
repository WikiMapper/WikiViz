angular.module('VisApp')
  .controller('MainCtrl', ['DatabaseService','ColorService', 'd3Service', '$scope', 
    '$location', 'ChallengeService', 'NodeLinkService',
    function(DatabaseService, ColorService, d3Service, $scope, $location, 
      ChallengeService, NodeLinkService){

      $scope.showForm = true;
      $scope.showVis = false;
      $scope.showWait = false;
      $scope.url = 'http://en.wikipedia.org/wiki/lollipop';

      $scope.reset = function(){
        $scope.showForm = true;
        $scope.showVis = false;
        // $scope.url = 'http://en.wikipedia.org/wiki/math';
        $scope.sourcedata = null;
        $scope.sourcedata = NodeLinkService.reset();
      };

      $scope.getInput = function(){
        $scope.reset();
        $scope.showForm = false;
        $scope.showVis = true;
        $scope.showWait = true;
        DatabaseService.request($scope.url)
          .then(function(data) {
            $scope.rawdata = data;
            console.log('raw', data);
            $scope.sourcedata = NodeLinkService.formatData(data);
            $scope.showWait = false;
          });
      };

      $scope.challenge = function(){
        $scope.reset();
        $scope.showForm = false;
        $scope.showVis = true;
        $scope.showWait = true;
        ChallengeService.request().then(function(data) {
          console.log('challenge', data.data);
          var fromNode = data.data.from;
          fromNode.links =[];
          $scope.sourcedata = NodeLinkService.formatData(fromNode);
        });
      };

      $scope.clickActions = function(){
        console.log('******WOOoooooo clickActions*****');
      };

  }]);
