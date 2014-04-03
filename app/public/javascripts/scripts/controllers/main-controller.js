angular.module('VisApp')
  .controller('MainCtrl', ['DatabaseService','ColorService', 'd3Service', '$scope', 
    '$location', 'ChallengeService', 'NodeLinkService',
    function(DatabaseService, ColorService, d3Service, $scope, $location, 
      ChallengeService, NodeLinkService){

      $scope.showForm = true;
      $scope.showVis = false;
      $scope.showWait = false;
      $scope.url = 'http://en.wikipedia.org/wiki/math';

      $scope.reset = function(){
        $scope.showForm = true;
        $scope.showVis = false;
        $scope.url = 'http://en.wikipedia.org/wiki/math';
        $scope.sourcedata = null;
        //this doesn't have promises pattern, as the DatabaseService call below does, why?
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
            //raw data looks lik this:
            //{url: "http://en.wikipedia.org/wiki/math", title: "Mathematics", links: Array[45], incoming: null, outgoing: 45}
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
          // need to at least have links as a property with empty array
          $scope.sourcedata = NodeLinkService.formatData(fromNode);
          // $scope.challenge = data;
        // $scope.sourcedata =     
        });
      };


  }]);
