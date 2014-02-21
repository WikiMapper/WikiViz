angular.module('VisApp')
  .controller('MainCtrl', ['DatabaseService', 'd3Service', '$scope', '$location',
    function(DatabaseService, d3Service, $scope, $location){

      $scope.greeting = "Hi! We're going to show you some data";

      $scope.showForm = true;
      $scope.showVis = false

      $scope.getInput = function(){
        console.log('got info', $scope.somedata);
        $scope.showForm = false;
        $scope.showVis = true;
        $scope.sourcedata = DatabaseService.request;
        $scope.$apply();
      };



      //get json data and assign to global variable
      // function testData(){
      //   console.log('shold not see this');
      //   d3Service.d3().then(function(d3){
      //     d3.json("data/testdata.json", function(jsondata){
      //       $scope.sourcedata = jsondata;
      //       console.log('got data',$scope.sourcedata);
      //       $scope.$apply();  //this makes sourcedata available to directive
      //     });
      //   });
      // };

  }]);


var PopoverDemoCtrl = function ($scope) {
  $scope.dynamicPopover = "Hello, World!";
  $scope.dynamicPopoverTitle = "Title";
};