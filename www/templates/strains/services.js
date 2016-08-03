appServices.factory('StrainsGet', ['$http', function($http){
    return{
      get: function(type, callback){
          $http.get('http://gigadev.gigatas.com/strains/api.php?strainsbybranch=' + type).success(function(data) {
          // prepare data here
          angular.forEach(data, function(value, key) {
              
              var newTitle = value.title.replace(' Strain Information - Leafly', '');
              value.title = newTitle;
              var strainLink = value.title.replace(' ', '-');
              value.linkTitle = strainLink;
          });
          callback(data);
        });
      }
    };
  }])
  .run(['$rootScope', function($rootScope){
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.toParams = toParams;
    });
  }])
  appServices.factory('FlavorsGet', ['$http', '$rootScope', '$stateParams', '$q', function($http, $rootScope, $stateParams, $q){
    return{
      get: function(flavor, all, callback){
        if(flavor == true && all == true){
          $http.get('http://gigadev.gigatas.com/strains/api.php?allflavors=1').success(function(data) {
            angular.forEach(data, function(value, key) {
              var newFlavor = value.flavors.replace('1. ', '');
              value.flavors = newFlavor;
            });
            callback(data);
          });
        }
        else if($rootScope.toParams.flavor !== "" && all == false){
          flavor = $rootScope.toParams.flavor;
          // flavor = "lemon";
          $http.get('http://gigadev.gigatas.com/strains/api.php?strainsbyflavor=' + flavor).success(function(data) {
            angular.forEach(data, function(value, key) {
              var newTitle = value.title.replace(' Strain Information - Leafly', '');
              value.title = newTitle;
              var strainLink = value.title.replace(' ', '-');
              value.linkTitle = strainLink;
            });
            callback(data);
            console.log(flavor);
          });
        }
      }
    };
  }])
  appServices.factory('EffectsGet', ['$http', '$rootScope', '$stateParams', '$q', function($http, $rootScope, $stateParams, $q){
    return{
      get: function(effect, all, callback){
        if(effect == true && all == true){
          $http.get('http://gigadev.gigatas.com/strains/api.php?alleffects=1').success(function(data) {
            callback(data);
          });
        }
        else if($rootScope.toParams.effect !== "" && all == false){
          effect = $rootScope.toParams.effect;
          $http.get('http://gigadev.gigatas.com/strains/api.php?strainsbyeffect=' + effect).success(function(data) {
            angular.forEach(data, function(value, key) {
              var newTitle = value.title.replace(' Strain Information - Leafly', '');
              value.title = newTitle;
              var strainLink = value.title.replace(' ', '-');
              value.linkTitle = strainLink;
            });
            callback(data);
          });
        }
      }
    };
  }])
  appServices.factory('ViewStrain', ['$http', '$rootScope', '$stateParams', '$q', function($http, $rootScope, $stateParams, $q){
    return{
      get: function(link_id, callback){
          $http({
            url: "http://gigadev.gigatas.com/strains/api.php?strainbyname=" + $rootScope.toParams.link_id, 
            method: "GET",
          }).success(function(data) {
            // fix title
            var newTitle = data.title.replace(' Strain Information - Leafly', '');
            data.title = newTitle;

            // fix flavor nums
            var newF1 = data.flavor1.replace('1. ', '');
            data.flavor1 = newF1;
            var newF2 = data.flavor2.replace('2. ', '');
            data.flavor2 = newF2;
            var newF3 = data.flavor3.replace('3. ', '');
            data.flavor3 = newF3;

             callback(data);
          });
          
      }
    };
  }])
  appServices.filter('searchfilter', function() {
  return function(input, search) {
    if (!input) return input;
    if (!search) return input;
    var expected = ('' + search).toLowerCase();
    var result = {};
    angular.forEach(input, function(value, key) {
      var actual = ('' + value).toLowerCase();
      if (actual.indexOf(expected) !== -1) {
        result[key] = value;
      }
    });
    return result;
  }
  });