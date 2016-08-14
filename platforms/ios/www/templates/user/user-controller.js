appControllers.controller('userCtrl', function ($scope, $rootScope, $ionicPlatform, $cordovaDevice, $mdToast, $mdBottomSheet, $timeout, $stateParams, $state, LogIn, SignUp, $http) {
    var devid;
    $scope.id = "1";
    $scope.test = "222";

    
    $timeout(function () {
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            console.log(device.cordova);
            $scope.id = $cordovaDevice.getUUID();
            return $scope.id;
        }


    }, 1000);


    $scope.updateID = function () {
            devid = $scope.id;
            console.log(devid);
            return devid;
        };
    

    $scope.initialForm = function () {
        $scope.moveBox = function () {
            // $("#signupbox").fadeOut();
            $('#signupbox').animate({
                'marginTop': "+=170px" //moves down
            });

            $timeout(function () {
                $state.go('app.signup');
            }, 500);

            $timeout(function () {
                $('#signupbox').animate({
                    'marginTop': "-=170px" //moves down
                });
            }, 1000);
        } // end animate

        // Start LogIn
        var em, pw;
        $scope.user = {};
        $scope.updateEmail = function () {
            em = $scope.user.email;
            console.log(em);
            return em;
        };
        $scope.updatePass = function () {
            pw = $scope.user.pass;
            console.log(pw);
            return pw;
        };
        $scope.logInNow = function () {
            var data = {
                em: em,
                pw: pw,
                function: "login_user"
        };
            LogIn.post(data)
            .then(function(response){
                if(response.data){
                    var login = response.data;
                    console.log(login);
                    if (login.authenticated == "TRUE"){
                        $state.go("app.types");
                    }
                    else if (login.authenticated == "FALSE"){
                        $scope.errorSignIn = "Incorrect Username or Password";
                    }
                    else {
                        $scope.errorSignIn = "An Unknown Error Occurred :(";
                    }
                } 
            })
            .catch(function(response) {
                console.log(response);
            });
        }





        // Start Sign Up
        var sem, spw, spwc;
        devid = $scope.id;
        $scope.errorMsg = "";
        $scope.updateSignUpEmail = function () {
            sem = $scope.user.signup.email;
            console.log(sem);
            return sem;
        };
        $scope.updateSignUpPass = function () {
            spw = $scope.user.signup.pass;
            console.log(spw);
            return spw;
        };
        $scope.updateSignUpPassConfirm = function () {
            spwc = $scope.user.signup.passconfirm;
            console.log(spwc);
            return spwc;
        };
        $scope.signUpNow = function () {
            if(spw != spwc){
                $scope.errorMsg = "Passwords do not match";
            }
            else if(spw == "" || spw == null, spwc == "" || spwc == null, sem == "" || sem == null){
                $scope.errorMsg = "Fields can not be blank";
            }
            else {
                var sdata = {
                    em: sem,
                    pw: spw,
                    devid: devid,
                    function: "register_user"
                };
                SignUp.post(sdata)
                .then(function(response){
                    if (response.data == "Existing"){
                        $scope.errorMsg = "An account already exists for this email";
                        return $scope.errorMsg;
                    }
                    
                })
                .catch(function(response) {
                    console.error('Sign Up Error');
                });
            }
        }


    };

    $scope.initialForm();




})
appControllers.controller('loadingCtrl', function ($scope, $rootScope, $ionicPlatform, $cordovaDevice, $mdToast, $mdBottomSheet, $timeout, $stateParams, $state, LogIn, SignUp, $http) {
    

    $scope.startLoad = function () {
       $timeout(function () {
            $state.go("app.signin");
        }, 1000);
    };

    $scope.startLoad();




});