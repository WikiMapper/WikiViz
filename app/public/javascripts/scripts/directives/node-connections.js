angular.module('VisApp')
  .directive('nodeConnections',['DatabaseService','ColorService', 'd3Service', '$window',
    function(DatabaseService, ColorService, d3Service, $window) {
  	return {
  		restrict : 'EA',
  		scope: {
        data: '='           //sets up two-way databinding
      },
  		link : link
  	};

  	function link (scope, element, attrs){
      //wait for d3 service to doad
      d3Service.d3().then(function(d3){
        var el = element[0],
            width = d3.select('body').node().offsetWidth ,
            height = $window.innerHeight,
            r = 12,
            gravity = 0.3,   //force at center of layout
            charge = -1500,
            linkDistance,
            color = d3.scale.category10();

        // create the canvas for the model
        var svgCanvas = d3.select(element[0])
          .append("svg")
            .attr("width", width)
            .attr("height", height)
          .append('svg:g')            //append extra svg for zoom
            .call(d3.behavior.zoom().on("zoom", redraw))
          .append('svg:g');

        function redraw() {
          svgCanvas.attr("transform",
              "translate(" + d3.event.translate + ")"
              + " scale(" + d3.event.scale + ")");
        }

        var tooltip_div = d3.select(element[0]).append("div")
          .attr("class", "tooltip d3tooltip slateblue effect1")
          .style("opacity", 1e-6);

        scope.tooltipText = function(data) {
          var text = " <span> Title: " + data.title + "</span>";
          return text;
        };

        scope.$watch('data', function(data){

<<<<<<< HEAD
        scope.tooltipText = function(data) {
          var text = " <span> Title: " + data.title + "</span>";
          return text
        };
=======
          scope.data = data;
          if(!data){
            return;
          }else{
            return scope.render(data);
          };
        }, true);
>>>>>>> f35bb4ea366f47b4e6c5e44fc881e056f1667f9f

        // construct the force-directed layout
        var forceLayout = d3.layout.force()
          .gravity(gravity)
          .size([width, height]);  //size of force layout

        // tick = delta_t for simulation, set functions tor run on tick event for node & link positions
        forceLayout.on("tick", function() {
          link.attr("x1", function(d) { return d.source.x; })  //pos of source node
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })  //pos of target node
              .attr("y2", function(d) { return d.target.y; });
           gnodes.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });

        function getColor(colorIndex, rank) {
          colorScale = d3.scale.linear()
            .domain([-2, 10])
            .interpolate(d3.interpolateRgb)
            .range(["whitesmoke", ColorService.color(colorIndex)]);
          return colorScale(rank);
        }

        scale = d3.scale.linear()
          .domain([0, nodeCount]).range([2, 10]);

        function linkDistance(d) {
          return d.distance;
        }

        function radius(d) {
          return 2*d.rank;
        }

        function mouseover(d) {
            tooltip_div
                .html(scope.tooltipText(d))
                .transition().style("opacity", 1)
                .attr("class", "tooltip")
            d3.select(this)
                .transition().duration(150)
                .attr('r', 30);
        }

        function mouseout(){
          tooltip_div.transition().style("opacity", 1e-6);
          d3.select(this)
            .transition().duration(450)
          .attr('r', radius)
        }

        var link, gnodes, nodeCount, scale, radius, colorScale;

        scope.render = function(data) {
          nodeCount = data.cloudCount;

          forceLayout
            .nodes(data.nodes)
            .links(data.links);

          forceLayout
            .linkDistance(linkDistance)
            .charge(charge);

          // add data to links
          link = svgCanvas.selectAll("line").data(data.links)
          link.enter().append("line")
            .attr("class", "node-link");
          link.exit().remove();

          //create node group to hold node + text
          gnodes = svgCanvas.selectAll("g").data(data.nodes);
          gnodesEnter = gnodes.enter()
            .append("g")          //g element used to group svg shapes
            .attr("class", "node-group");
          gnodesEnter
            .append('circle')
            .attr('class', 'node')
            .attr('r', radius)
            .style('fill', function(d) { return getColor(data.cloudIndex, d.rank); })
            //.style('fill', function(d) { return colorScale(d.rank); })
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("click", function(d, i) {
                DatabaseService.request(d.url, d.id).then(function(data){
                scope.render(data);
              })
            });
          gnodes.exit().remove();

          //svg element consisting of text
          gnodesEnter.append("svg:text")
            .attr('class', 'label')
            .attr("x", '6')
            .attr("y", '.14em')
            .text(function(d) { return d.title; } );

          forceLayout.start();
        };
      });
  	};
	}]);
