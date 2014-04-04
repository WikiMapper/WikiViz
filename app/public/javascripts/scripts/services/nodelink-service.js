angular.module('VisApp')
  .factory('NodeLinkService', ['$http', function($http) {

    var urlid = 0,
        nodesInCloud = 0,
        runningNodeCount = 0,
        cloudIndex = 0,
        d3data = [],
        nodes = [],
        d3links = [],
        d3data = { "nodes" : nodes, "links" : d3links},
        doRequest,
        doReset;

    var reset = function(){
      urlid = 0,
      nodesInCloud = 0,
      runningNodeCount = 0,
      cloudIndex = 0,
      d3data = [],
      nodes = [],
      d3links = [],
      d3data = {  "nodes"       : nodes,
                  "links"       : d3links,
                  "nodesInCloud"  : nodesInCloud,
                  "cloudIndex"  : cloudIndex};
      return d3data;
    };

    var formatData =  function(data, urlid) {
      console.log('NodeLinkServie dataformatting', data, urlid, 'runningCount', runningNodeCount);
      console.log('Existing data', d3data.nodes);
      //handle 3 start cases:
      //1. single from node for game, urlid is undefined, data.lengths =[]
      //2. call from single node, don't want to generate that nde again
      //3. normal call with center nodes & cloud data, urlid = undefined
      // if (urlid === undefined && data.links.length === 0){ 
      //   console.log('+++++++++++++++++');
      //   urlid = 0; 
      //   runningNodeCount = 0;
      // }
      //reset data after single node call for the challenge
      // if (d3data.nodes){
      //   if (data.title === d3.nodes[0].title){
      //     reset();
      //   }
        
      // }
      cloudIndex++;
      nodesInCloud = data.links.length;
        //handle first source url data
        if (urlid === undefined){
          urlid = 0;
          var sourceNode = {};
          sourceNode.id       = 0;
          sourceNode.title    = data.title;
          sourceNode.url      = data.url;
          sourceNode.rank     = 12;      //set in initial center center node radius
          sourceNode.x        = window.inner

          nodes.push(sourceNode);
        }

        var children = data.links,
            sourceNode = {},
            childNode = {},
            sourceid = urlid;


        //add child url data
        angular.forEach(children, function (item, i ){
          
          runningNodeCount++;
          var rank = nodesInCloud - i;

          var childNode = {};
          childNode.id       = runningNodeCount;
          childNode.title    = item.title;
          childNode.url      = item.url;
          childNode.rank     = 15/item.distance;

          nodes.push(childNode);

          var link = {};
          link.source = sourceid;
          link.target = runningNodeCount;
          console.log('sourceid', sourceid, 'target', runningNodeCount);
          link.distance  = 30*item.distance;
          d3links.push(link);
          if (childNode.title === "Paris"){
            alert('target found in ' + cloudIndex + " clicks");
          }
        });
        //console.log('nodes',nodes);
        d3data = {  "nodes" : nodes,
                    "links" : d3links,
                    "nodesInCloud" : nodesInCloud,
                    "cloudIndex" : cloudIndex};
        //console.log('d3data', d3data.nodes, d3data.links);
        return d3data;
    };

    return {
      formatData : formatData,
      reset   : reset
    };
  }]);
