angular.module('VisApp')
  .directive('nodeConnections',['DatabaseService','ColorService', 'd3Service', '$window', '$position',
    function(DatabaseService, ColorService, d3Service, $window, $position) {
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
      var groupCount = 1;
      d3Service.d3().then(function(d3){
        
        var el = element[0],
            width = d3.select('body').node().offsetWidth ,
            height = $window.innerHeight,
            //height = 700 ,
            r = 12,
            gravity = 0.05,   //force at center of layout
            charge,
            linkDistance,
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

        //Watch for resize event
        scope.$watch(function() {
          return angular.element($window)[0].innerWidth;
        }, function() {
          scope.render(scope.data); // TODO: make sure this is correct scope for incoming data!
        });

        scope.$watch('data', function(data){
          console.log('watching', data, 'num nodes:', data.nodes.length);
          scope.data = data;   // TODO: make sure this is correct scope
          if(!data) return;
          return scope.render(data);
        });

        scope.tooltipText = function(data) {
          var text = " <span class='bold'> Title:"  + "</span> "+ data.title;
          return text
        };

        // construct the force-directed layout
        var forceLayout = d3.layout.force()
          .gravity(gravity)
          .size([width, height]);  //size of force layout

        // tick = delta_t for simulation
        // set functions tor run on tick event for node & link positions
        forceLayout.on("tick", function() {
          console.log('tick');
          link.attr("x1", function(d) { return d.source.x; })  //pos of source node
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })  //pos of target node
              .attr("y2", function(d) { return d.target.y; });
           gnodes.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          // node.attr("cx", function(d) {return d.x})
          //     .attr("cy", function(d) {return d.y});
        });

        charge = function(nodeCount) {
          return -(50+7200/(Math.abs(Math.pow(nodeCount,1.4)-2*nodeCount)));
        };//repulsive force between nodes

        linkDistance = function(d) {
          //console.log('check distance', d)
          return d.distance;
        };

        var link, gnodes, nodeCount, scale, radius, colorScale;

        scope.render = function(data) {
          console.log('±±±±±±±±±±start render. data:', data);
          console.log('start render selectAll:', svgCanvas.selectAll('*'));
          console.log('before remove',svgCanvas.selectAll('*')[0].length)

          forceLayout
            .nodes(data.nodes)
            .links(data.links);

          nodeCount = data.cloudCount; //need nodeCount 
          scale = d3.scale.linear()
            .domain([0, nodeCount]).range([2, 10]);
          radius = function(d) { return scale(d.rank); };
          colorScale = d3.scale.linear()
            .domain([10, data.cloudCount])
            .interpolate(d3.interpolateRgb)
            .range(["whitesmoke", ColorService.color(groupCount)])

          console.log('nodeCount',nodeCount, 'scale', scale(10));

          forceLayout
            //.linkDistance(linkDistance(data.links.distance))
            .linkDistance(linkDistance)
            .charge(charge(nodeCount));

          // add data to links
          link = svgCanvas.selectAll("line").data(data.links)
          link.enter().append("line")
            .attr("class", "node-link");

          //create node group to hold node + text
          gnodes = svgCanvas.selectAll("g").data(data.nodes);
          gnodesEnter = gnodes.enter()
            .append("g")          //g element used to group svg shapes 
            .attr("class", "node-group");
          gnodesEnter
            .append('circle')
            .attr('class', 'node')
            .attr('r', radius)
            .style('fill', function(d) { return colorScale(d.rank); })
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("click", function(d, i) {
              console.log('CLICKED:', d.title, d.id, d.url, 'groupcnt', groupCount, ColorService.color());
                DatabaseService.request(d.url, d.id).then(function(data){
                scope.render(data);
              })
             });

          //svg element consisting of text
          gnodesEnter.append("svg:text")   
            .attr('class', 'label')
            .attr("x", '10')
            .attr("y", '.64em')
            .text(function(d) { return d.title; } );

            function mouseover(d) { 
              console.log('mouseover: id', d.id);
              tooltip_div
                  .html(scope.tooltipText(d)) //must immediately follow tooltip_div or doesn't work
                  .transition().style("opacity", 1)
                  .style("left", (width-210) + "px")
                  .style("top", 80 + "px");
              d3.select(this)
                  .transition().duration(150)
                  .attr('r', 40);
            }

            function mouseout(){
              tooltip_div.transition().style("opacity", 1e-6);
              d3.select(this)
                .transition().duration(450)
              .attr('r', radius)
            }

          forceLayout.start();
          groupCount++;
        };      
      });
  	};
	}]);






/*What we want to be able to do is separate the scope inside a 
directive from the scope outside, and then map the outer scope 
to a directive's inner scope. We can do this by creating what 
we call an isolate scope. To do this, we can use a directive's scope option: */

/* Bug in snake case to camel case from directive attribute!!!! */
