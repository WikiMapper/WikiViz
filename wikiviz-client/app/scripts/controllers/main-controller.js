angular.module('VisApp')
  .controller('MainCtrl', ['DatabaseService', 'd3Service', '$scope', '$location',
    function(DatabaseService, d3Service, $scope, $location){
      console.log('MainCtrl called. $scope.showForm', $scope.showForm);

      $scope.showForm = true;
      $scope.showVis = false

      $scope.getInput = function(){
        $scope.showForm = false;
        $scope.showVis = true;
        //DatabaseService.request($scope.url);
        $scope.sourcedata = DatabaseService.request($scope.url);
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

  }])
