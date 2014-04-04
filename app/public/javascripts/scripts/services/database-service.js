angular.module('VisApp')
  .factory('DatabaseService', ['$http', function($http) {

    doRequest = function(url) {

      return $http({
        method: 'POST',
        url: '/urls',
        data: {url : url} ,
        headers : {'Content-Type':'application/json'}
      })
      .then(function(data){
        console.log('Posted: ', data, 'num links:', data.data.links.length);
        return data.data;
      })
      .catch(function(e){
        console.log('error', e);
        throw e;
      });
    };

    return {
      request : doRequest
    };
  }]);
