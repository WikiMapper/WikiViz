
angular.module('VisApp')
  .service('MemoryStoreService', function(){
    var infoStorage = {};
    
    var storeData = function(data, key){
      infoStorage.key = data;
    };

    var getData = function(key){
      return infoStorage.key;
    };

    return {storeData : storeData, getData : getData};
  });
