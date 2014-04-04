angular.module('VisApp')
  .factory('ChallengeService', ['$http', function($http) {

    doRequest = function() {

      return $http({
        method: 'GET',
        url: '/challenge'
      })
      .then(function(data){
        console.log("challenge is " + data);
        return data;
      })
      .catch(function(e){
        console.log('error', e);
        throw e;
      });
    };

    return {
      request : doRequest,
    };
  }]);
