angular.module('VisApp')
  .directive('nodeConnections',['DatabaseService','d3Service', '$window', 
    function(DatabaseService, d3Service, $window) {
  	console.log('nodeConnections directive called');
  	return {
  		restrict : 'EA',
  		scope: {
        data: '='
      },
  		link : link
  	};

  	function link (scope, element, attrs){
      //wait for d3 service to doad
      d3Service.d3().then(function(d3){
        
        var width = d3.select(element[0]).node().offsetWidth ,
          height = 300,
          r = 12,
          gravity = 0.1,   //force at center of layout
          distance = 1,//length of link
          charge = -400,    //repulsive force between nodes
          color = d3.scale.category10();

        // create the canvas for the model
        var svgCanvas = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr('popover', "Woeeęèēeeoöooö!")
          .attr('popover-trigger', 'mouseenter');

        // Browswer onresize event
        window.onresize = function() {
          scope.$apply();
        }  ;

        // Watch for resize event
        scope.$watch(function() {
          return angular.element($window)[0].innerWidth;
        }, function() {
          scope.render(scope.data);
        });

        scope.$watch('data', function(data){
          console.log('watching', data);
          scope.data = data;
          if(!data) return;
          return scope.render(data);
        });

        scope.render = function(data) {
          console.log('start render. data:', data);
          // remove all previous items before render
          svgCanvas.selectAll('*').remove();  
          // construct the force-directed layout
          var forceLayout = d3.layout.force()
            .gravity(gravity)
            .linkDistance(function(link){ return link.value; })
            .charge(charge)
            .size([width, height]);  //size of force layout

          forceLayout.nodes(data.nodes)
          .links(data.links)
          .start();

          // add scope.data to links and nodes
          var link = svgCanvas.selectAll(".link")
            .data(scope.data.links)
            .enter().append("line")
            .attr("class", "nodelink");

          //create node group to hold node + text
          var gnodes = svgCanvas.selectAll("g.gnode")
            .data(scope.data.nodes)
            .enter().append("g")          //g element used to group svg shapes 
            .attr("class", "node")
            .attr('popover', "Woeeęèēeeoöooö!")
            .attr('popover-trigger', 'mouseenter')
          .append('svg:a');
            // .attr('xlink:href', function(d) { return d.url; });

          var node = gnodes.append('circle')
            .attr('class', 'node')
            .attr('r', function(d) { return d.hits })

            .style('fill', function(d) { return color(d.group); })
            .on("click", function(d, i) {
                console.log(d.title);
                scope.render(DatabaseService.request); });

          // add tooltip
          // node.append("svg:title").text(function(d, i) {
          //   return "Yo some info! \n" + d.title + '\n' + d.url;
          // });

          var label = gnodes.append("svg:text")   //svg element consisting of text
            .attr('class', 'label')
            .attr("x", '10')
            .attr("y", '.34em')
            .text(function(d) { return d.title; } );

          // set node & link positions on tick -- d must be calculated from force settings???
          forceLayout.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })  //pos of source node
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })  //pos of target node
                .attr("y2", function(d) { return d.target.y; });
            gnodes.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            // node.attr("cx", function(d) {return d.x})
            //     .attr("cy", function(d) {return d.y});
          });
        };      
      });
  	};
	}]);






/*What we want to be able to do is separate the scope inside a 
directive from the scope outside, and then map the outer scope 
to a directive's inner scope. We can do this by creating what 
we call an isolate scope. To do this, we can use a directive's scope option: */

/* Bug in snake case to camel case from directive attribute!!!! */