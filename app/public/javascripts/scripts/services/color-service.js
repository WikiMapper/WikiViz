angular.module('VisApp')
  .factory('ColorService', ['$http', function($http) {

    var getColor = function(num){
      colormap = {
          1  : "mediumblue", 
          2  : "yellow",
          3  : "darkgreen",
          4  : "tomato",
          5  : "darkviolet",
          6  : "orange",
          7  : "gold", 
          8  : "olivedrab",
          9  : "darkblue",
          10 : "seagreen",
          11 : "red",
          12 : "darkorchid",
          13 : "crimson",
          14 : "mediumslateblue",
          15 :  "maroon",
          16 : "mediumvioletred"
      };
      
      return colormap[num];
    };

    return {
      color : getColor
    };

}]);
