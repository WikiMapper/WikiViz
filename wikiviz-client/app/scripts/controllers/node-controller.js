angular.module('VisApp')
  .controller('NodeCtrl', ['d3Service', '$scope', '$location',
    function(d3Service, $scope, $location){

      $scope.greeting = "Hi! We're going to show you some data";

      // get json data and assign to global variable
      d3Service.d3().then(function(d3){
        d3.json("data/testdata.json", function(jsondata){
          $scope.sourcedata = jsondata;
          console.log('got data',$scope.sourcedata);
          $scope.$apply();  //this makes sourcedata available to directive
        });
      });

      
      $scope.nodeOnClick = function(item){
        //need $apply b/c click event happens ourside current context
        $scope.$apply(function(){
          if (!$scope.showDetail) 
            $scope.showDetail = true;
          $scope.detailItem = item;
          console.log('clicked', $scope.detailItem);
       });
      };
  }]);

