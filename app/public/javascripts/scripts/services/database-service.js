
angular.module('VisApp')
  .factory('DatabaseService', ['$http', function($http) {
    // A service or factory is only called once per app instance and returns
    // a function or an object containing a function

    var count = 0,
        cloudCount = 0,
        cloudIndex = 0,
        d3data = [],
        nodes = [],
        d3links = [],
        d3data = { "nodes" : nodes, "links" : d3links},
        doRequest,
        doReset;

    doReset = function(){
      console.log('doReset called');
      // d3data.nodes = null;
      // d3data.links = null;
      count = 0,
        cloudCount = 0,
        cloudIndex = 0,
        d3data = [],
        nodes = [],
        d3links = [],
        d3data = {  "nodes"       : nodes, 
                    "links"       : d3links, 
                    "cloudCount"  : cloudCount, 
                    "cloudIndex"  : cloudIndex};
        console.log('returning reset d3data', d3data);
        return d3data;
    };    

    doRequest = function(url, urlid) {
      if (!count){ urlid = 0 };
      cloudIndex++;
      console.log('****** making request for ', url, ', urlid', urlid, ', existing d3data array', d3data);

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
        console.log('Request failed:', arguments);
        console.log('error', e);
        throw e;
      });

      function format(data) {
        cloudCount = data.links.length;
        console.log('after http call:', 'd3data.length:', d3data.length);
        console.log('after http call:', 'd3data.nodes[end]',d3data.nodes[d3data.nodes.length-1]);

        //VERIFY IF CORRECT!!!
        //data.links.splice(0,1); //first item in links is repeat of source
        var children = data.links,
            sourceNode = {},
            childNode = {},
            sourceid = urlid;

        console.log('sourceid is:', sourceid);
        //handle first source url data
        if (count === 0){
          var sourceNode = {};
          sourceNode.id       = urlid;
          sourceNode.title    = data.title;
          sourceNode.url      = data.url;
          // sourceNode.incoming = data.incoming;
          // sourceNode.outgoing = data.outgoing;
          sourceNode.rank     = 6;      //set in initial center center node radius
          sourceNode.x        = window.inner

          //d3data.nodes[urlid] = sourceNode; // or should this be done property by property?
          console.log('urlid',urlid, d3data.nodes[urlid]);
          nodes.push(sourceNode);  
        }

        //add child url data
        console.log('before adding new node-urls, d3data', d3data);

        angular.forEach(children, function (item, i ){
          count++;
          var rank = cloudCount - i;

          var childNode = {};
          childNode.id       = count;
          childNode.title    = item.title;
          childNode.url      = item.url;
          childNode.rank     = 15/item.distance;
          nodes.push(childNode);
           
          var link = {};
          link.source = sourceid;
          link.target = count;
          link.distance  = 30*item.distance;
          d3links.push(link);
        });

        //console.log('AFTER adding new node-urls, d3data', d3data, cloudCount);
        d3data = {  "nodes" : nodes, 
                    "links" : d3links, 
                    "cloudCount" : cloudCount, 
                    "cloudIndex" : cloudIndex};
        console.log('AFTER assigning new url data, d3data', d3data,cloudCount);

        return d3data;
      }

    };

    return {
      request : doRequest,
      reset   : doReset
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


