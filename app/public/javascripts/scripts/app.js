angular.module('VisApp', ['ngRoute', 'd3'])
  .run(['ChallengeService', 'MemoryStoreService', function(ChallengeService, MemoryStoreService){
     ChallengeService.request().then(function(data) {
          console.log('challenge', data);
          MemoryStoreService.storeData(data, 'tofrom');
        });
  }]);

angular.module('VisApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: ''
      })
      .when('/credits', {
        templateUrl: 'views/credits.html',
        controller: 'CreditsCtrl'
      })
      .otherwise({
        redirectTo: '/'});
  }]);
