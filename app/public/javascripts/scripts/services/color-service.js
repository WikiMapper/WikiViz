angular.module('VisApp')
  .factory('ColorService', ['$http', function($http) {

    var getColor = function(num){
      colormap = {
          1  : "darkblue",
          2  : "crimson",
          3  : "darkgreen",
          4  : "tomato",
          5  : "darkviolet",
          6  : "orange",
          7  : "gold",
          8  : "mediumslateblue",
          9  : "darkblue",
          10 : "seagreen",
          11 : "red",
          12 : "darkorchid"
      };
      
      return colormap[num];
    };

    return {
      color : getColor
    };

}]);
