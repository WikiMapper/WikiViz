angular.module('VisApp')
  .directive('nodeConnections',['d3Service', function(d3Service) {
  	console.log(' from directive: data');
  	return {
  		restrict : 'EA',
  		scope: {},
  		link : link
  	};

  	function link (scope, element, attributes){
      //wait for d3 service to doad
      d3Service.d3().then(function(d3){
        var margin =  20,
            barHeight = 20,
            barPadding = 5;

        var svgCanvas = d3.select(element[0])
          .append('svg')
          .style('width', '100%');

        // Browser onresize event
        window.onresize = function() {
          scope.$apply();
        };

        // hard-code data
        scope.data = [
          {name: "Greg", score: 98},
          {name: "Ari", score: 96},
          {name: 'Q', score: 75},
          {name: "Loser", score: 48}
        ];

        // Watch for resize event
        scope.$watch(function() {
          return angular.element(window)[0].innerWidth;
        }, function() {
          scope.render(scope.data);
        });

        scope.render = function(data) {
          // remove all previous items before render
          svgCanvas.selectAll('*').remove();          

        // If we don't pass any data, return out of the element
        if (!scope.data) return;

        // setup variables
        var width = d3.select(element[0]).node().offsetWidth - margin,
            // calculate the height
            height = scope.data.length * (barHeight + barPadding),
            // Use the category20() scale function for multicolor support
            color = d3.scale.category20(),
            // our xScale
            xScale = d3.scale.linear()
              .domain([0, d3.max(scope.data, function(d) {
                return d.score;
              })])
              .range([0, width]);

        // set the height based on the calculations above
        svgCanvas.attr('height', height);

        console.log(scope.data);
        //create the rectangles for the bar chart
        svgCanvas.selectAll('rect')
          .data(scope.data).enter()
            .append('rect')
            .attr('height', barHeight)
            .attr('width', 140)
            .attr('x', Math.round(margin/2))
            .attr('y', function(d,i) {
              return i * (barHeight + barPadding);
            })
            .attr('fill', function(d) { return color(d.score); })
            .transition()
              .duration(1000)
              .attr('width', function(d) {
                return xScale(d.score);
              });
        }      
      });
  	};
	}]);






/*What we want to be able to do is separate the scope inside a 
directive from the scope outside, and then map the outer scope 
to a directive's inner scope. We can do this by creating what 
we call an isolate scope. To do this, we can use a directive's scope option: */

/* Bug in snake case to camel case from directive attribute!!!! */