
angular.module('VisApp')
  .factory('DatabaseService', ['$http', function($http) {
    // A service or factory is only called once per app instance and returns
    // a function or an object containing a function


    var doRequest = function(url) {
      console.log('making request for ', url);
      return $http({
        method: 'JSON',
        url: '/urls',
        data: JSON.stringify(url) 
      })
      .then(function(data){
        console.log('Posted: ', data);
        return data;
      })
      .catch(function(e){
        console.log('Request failed:', arguements);
        throw e;
      });
      //return {'url': 'www.hi.com'};
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

