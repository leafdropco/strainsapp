appServices.factory('LogIn', ['$http', function($http){
    return{
      post: function(data){
          var request = $http({
                url: "http://gigadev.gigatas.com/strains/api.php",
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(data)
            });
            return request;
      }
    };
  }])
  appServices.factory('SignUp', ['$http', function($http){
    return{
      post: function(data){
          var request = $http({
                url: "http://gigadev.gigatas.com/strains/api.php",
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(data)
            });
            return request;
      }
    };
  }]);