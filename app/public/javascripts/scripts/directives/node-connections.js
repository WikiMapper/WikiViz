angular.module('VisApp')
  .directive('nodeConnections',['DatabaseService','d3Service', '$window', '$position',
    function(DatabaseService, d3Service, $window, $position) {
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
        
        var el = element[0],
            width = d3.select('body').node().offsetWidth ,
            height = 600 ,
            r = 12,
            gravity = 0.05,   //force at center of layout
            color = d3.scale.category10();

        // create the canvas for the model
        var svgCanvas = d3.select(element[0]).append("svg")
          .attr("width", width)
          .attr("height", height);

        var tooltip_div = d3.select(element[0]).append("div")
          .attr("class", "tooltip d3tooltip slateblue effect1")
          .style("opacity", 1e-6);

        // Browswer onresize event
        window.onresize = function() {
          scope.$apply();
        };

        // Watch for resize event
        // scope.$watch(function() {
        //   return angular.element($window)[0].innerWidth;
        // }, function() {
        //   scope.render(scope.data); // TODO: make sure this is correct scope for incoming data!
        // });

        scope.$watch('data', function(data){
          console.log('watching', data);
          scope.data = data;   // TODO: make sure this is correct scope
          if(!data) return;
          return scope.render(data);
        });

        scope.tooltipText = function(data) {
          return "This article is <span class='bold'>" + data.title + "</span> and has <span class='red'>" + data.linksTo + "</span> sites pointing to it links.";
        };

        

        scope.render = function(data) {
          console.log('±±±±±±±±±±start render. data:', data);
          console.log('start render selectAll:', svgCanvas.selectAll('*'));
          console.log('before remove',svgCanvas.selectAll('*')[0].length)

          // remove all previous items before render  UNLESS ADDING NEW!!!!!!!
          svgCanvas.selectAll('*').remove();

          var nodeCount = data.nodes.length;
          var charge = function(nodeCount) {
                return -(50+7200/(Math.abs(Math.pow(nodeCount,1.4)-2*nodeCount)));
              },    //repulsive force between nodes
              linkDistance = function(nodeCount) {
                return (50 * Math.log(nodeCount));
              };
          
          // construct the force-directed layout
          var forceLayout = d3.layout.force()
            .gravity(gravity)
            .linkDistance(linkDistance(nodeCount))
            .charge(charge(nodeCount))
            .size([width, height]);  //size of force layout
          
          forceLayout
            .nodes(data.nodes)
            .links(data.links)
            .start();

          // add data to links
          var link = svgCanvas.selectAll("line")
            .data(data.links)
            .enter().append("line")
            .attr("class", "node-link");

          //create node group to hold node + text
          var gnodes = svgCanvas.selectAll("g")
            .data(data.nodes)
            .enter().append("g")          //g element used to group svg shapes 
            .attr("class", "node-group");
          //.append('svg:a');
            // .attr('xlink:href', function(d) { return d.url; });

          var node = gnodes.append('circle')
            .attr('class', 'node')
            .attr('r', function(d) { return d.linksTo })
            .style('fill', function(d) { return color(d.linksTo); })
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("click", function(d, i) {
              console.log('CLICKED:', d.title, d.id);
              scope.render(DatabaseService.request(d.id)) })

          var label = gnodes.append("svg:text")   //svg element consisting of text
            .attr('class', 'label')
            .attr("x", '10')
            .attr("y", '.34em')
            .text(function(d) { return d.id; } );

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
        
          function mouseover(d) { 
            console.log('mouseover: id', d.id);
            tooltip_div
                .html(scope.tooltipText(d)) //must immediately follow tooltip_div or doesn't work
                .transition().style("opacity", 1)
                .style("left", (width-400) + "px")
                .style("top", 100 + "px");
            d3.select(this)
                .transition().duration(150)
                .attr('r', 50);
          }

          function mouseout(){
            tooltip_div.transition().style("opacity", 1e-6);
            d3.select(this)
              .transition().duration(450)
            .attr('r', function(d) { return d.linksTo })
          }


        };      
      });
  	};
	}]);






/*What we want to be able to do is separate the scope inside a 
directive from the scope outside, and then map the outer scope 
to a directive's inner scope. We can do this by creating what 
we call an isolate scope. To do this, we can use a directive's scope option: */

/* Bug in snake case to camel case from directive attribute!!!! */
