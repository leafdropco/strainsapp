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
  }])
  appServices.factory('isLoggedIn', ['$http', function($http, $firebaseAuth, $q){
    return{
      start: function(){
          // var user = firebase.auth().currentUser;
          return firebase.auth().onAuthStateChanged().then(function(data) {
                if (data) {
                    // data is signed in.
                    console.log("Signed In: " + data);
                    return data;
                } else {
                    // No user is signed in.
                    console.log("NOT Signed In: " + user);
                    return false;
                }
            }, function(error){
                return $q.reject(error.data);
            });
      }
    };
  }]);