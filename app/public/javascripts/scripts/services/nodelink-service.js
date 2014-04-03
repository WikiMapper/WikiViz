angular.module('VisApp')
  .factory('NodeLinkService', ['$http', function($http) {

    var urlid = 0,
        cloudCount = 0,
        cloudIndex = 0,
        d3data = [],
        nodes = [],
        d3links = [],
        d3data = { "nodes" : nodes, "links" : d3links},
        doRequest,
        doReset;

    var reset = function(){
      urlid = 0,
      cloudCount = 0,
      cloudIndex = 0,
      d3data = [],
      nodes = [],
      d3links = [],
      d3data = {  "nodes"       : nodes,
                  "links"       : d3links,
                  "cloudCount"  : cloudCount,
                  "cloudIndex"  : cloudIndex};
      return d3data;
    };

    // doRequest = function(url, urlid) {
    //   if (!count){ urlid = 0 };
    //   cloudIndex++;

    //   return $http({
    //     method: 'POST',
    //     url: '/urls',
    //     data: {url : url} ,
    //     headers : {'Content-Type':'application/json'}
    //   })
    //   .then(function(data){
    //     console.log('Posted: ', data, 'num links:', data.data.links.length);
    //     return format(data.data);
    //   })
    //   .catch(function(e){
    //     console.log('error', e);
    //     throw e;
    //   });

    var formatData =  function(data, urlid) {
      console.log('formatting', data, urlid);
      if (!urlid){ urlid = 0 };
      cloudIndex++;
      cloudCount = data.links.length;

        //data.links.splice(0,1); // if first item in links is repeat of source
        var children = data.links,
            sourceNode = {},
            childNode = {},
            sourceid = urlid;

        //handle first source url data
        if (urlid === 0){
          var sourceNode = {};
          sourceNode.id       = urlid;
          sourceNode.title    = data.title;
          sourceNode.url      = data.url;
          sourceNode.rank     = 12;      //set in initial center center node radius
          sourceNode.x        = window.inner

          nodes.push(sourceNode);
        }

        //add child url data
        angular.forEach(children, function (item, i ){
          urlid++;
          var rank = cloudCount - i;

          var childNode = {};
          childNode.id       = urlid;
          childNode.title    = item.title;
          childNode.url      = item.url;
          childNode.rank     = 15/item.distance;

          nodes.push(childNode);

          var link = {};
          link.source = sourceid;
          link.target = urlid;
          link.distance  = 30*item.distance;
          d3links.push(link);
          if (childNode.title === "Paris"){
            alert('target found in ' + cloudIndex + " clicks");

          }
        });
        console.log('nodes',nodes);
        d3data = {  "nodes" : nodes,
                    "links" : d3links,
                    "cloudCount" : cloudCount,
                    "cloudIndex" : cloudIndex};
        console.log('d3data', d3data.nodes, d3data.links);
        return d3data;
    };

    return {
      formatData : formatData,
      reset   : reset
    };
  }]);
