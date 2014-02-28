
angular.module('VisApp')
  .factory('DatabaseService', ['$http', function($http) {
    // A service or factory is only called once per app instance and returns
    // a function or an object containing a function

    var count = 0,
        d3data = [],
        nodes = [],
        d3links = []
        d3data ={ "nodes" : nodes, "links" : d3links};

    var doRequest = function(url, urlid) {
      if (!count){ urlid = 0 };
      console.log('****** making request for ', url, 'urlid', urlid, 'existing d3data array', d3data);

      return $http({
        method: 'POST',
        url: '/urls',
        data: {url : url} ,
        headers : {'Content-Type':'application/json'}
      })
      .then(function(data){
        console.log('Posted: ', data, 'num links:', data.data.links.length);
        return format(data.data);
      })
      .catch(function(e){
        console.log('Request failed:', arguements);
        throw e;
      });

      function format(data) {
        console.log('*************current status', 'd3nodes[0]:', d3data.nodes[0]);
        console.log('*************current status', 'd3data.nodes[end]',d3data.nodes[d3data.nodes.length-1]);

        data.links.splice(0,1); //first item in links is repeat of source
        var children = data.links,
            sourceNode = {},
            childNode = {},
            sourceid = urlid;

        //handle source url data
        var sourceNode = {};
        console.log('what is sourceid', sourceid);
        sourceNode.id = urlid;
        sourceNode.title    = data.title;
        sourceNode.url      = data.url;
        sourceNode.incoming = data.incoming;
        sourceNode.outgoing = data.outgoing;
        sourceNode.rank     = 30;
        // sourceNode.title    = data.title;
        // sourceNode.url      = data.url;
        // sourceNode.incoming = data.incoming;
        // sourceNode.outgoing = data.outgoing;
        // sourceNode.rank     = 20;
        d3data.nodes[urlid] = sourceNode; // or should this be done property by property?
        //nodes.push(sourceNode);

        //add child url data
        //should we limit number of child links??
        console.log('before adding new node-urls, d3data', d3data);
        //angular.forEach(children, function (item, i ){
        var queryCount = 20;  //the number of nodes per query
        for (var i = 0; i < queryCount; i++){
          item = children[i];
          count++;
          var rank = queryCount - i;
      
          var childNode = {};
          childNode.id       = count;
          childNode.title    = item.title;
          childNode.url      = item.url;
          childNode.rank     = rank;
          childNode.distance = item.distance;
          //console.log('assembled childNode', childNode);
          nodes.push(childNode);
          //console.log('checking array of nodes', nodes);
          var link = {};
          link.source = sourceid;
          link.target = count;
          link.value  = 70;
          d3links.push(link);
        };

        console.log('after node addition nodes.length', nodes.length, 'count', count);
        //console.log('we got some nodes', nodes);
        d3data = { "nodes" : nodes, "links" : d3links, "queryCount" : queryCount };
        return d3data;
      }

    };

    return {
      request : doRequest
    };
  }]);

    


  //   var count = 0,
  //       dummydata,
  //       nodes = [],
  //       links = [];

  //   var doRequest = function(url){
  //     console.log('doRequest called', url, 'count', count);

  //     if (nodes.length) {
  //       sourceid = url;
  //       startNode = nodes.length;
  //     }else{
  //       sourceid = 0; 
  //       startNode = 0;
  //     }
       

  //     angular.forEach(_.range(startNode, startNode+url), function(value){
  //       var node = {};
  //       node.id       = value;
  //       node.title    = 'Article ' + count + value + ' Title';
  //       node.url      = 'www.wikepedia.com';
  //       node.linksTo  = Math.floor(Math.random()*10+10);
  //       node.summary  = 'This is a summary of article '+ count + value +'.  It contains all the secrets of life and a map of the universe and lots of stories about pirates.'
  //       nodes.push(node);
  //       var link = {};
  //       if (value !== 0){
  //         link.source = sourceid;
  //         link.target = value;
  //         link.value  = 100;
  //         links.push(link);
  //       }
  //     });

  //     dummydata = { "nodes" : nodes, "links" : links };
  //     console.log('count', count, 'dummydataservice dummydata', dummydata);
  //     //debugger;
  //     count++;
  //     return dummydata;
  //   };
    
  //   return {
  //     request : doRequest
  //   };
  // }]);

/**
 * this service will :
 * query table 1 in database for the url
 * query table 2 to get parent & children
 * put this data into array of objects
 * query table 1 to get title, other info
 * 
 */

//
// Creating a service simply returns a function that returns an object. 
// This object is created with the creation of the application instance 
// (remember, it’s a singleton object).
// AhHa! it's putting the returned function 'out there' - able to be called at any time
// returning a static value defeats the purpose.  

//Extends the destination object dst by copying all of the properties from the src object(s) to dst. You can specify multiple src objects.

