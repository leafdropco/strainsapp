appControllers.controller('userCtrl', ['$scope', '$rootScope', '$ionicPlatform', '$cordovaDevice', '$mdToast', '$mdBottomSheet', '$timeout', '$stateParams', '$state', 'LogIn', 'isLoggedIn', 'SignUp', '$http', '$firebaseAuth', function ($scope, $rootScope, $ionicPlatform, $cordovaDevice, $mdToast, $mdBottomSheet, $timeout, $stateParams, $state, LogIn, isLoggedIn, SignUp, $http, $firebaseAuth) {
    var devid;
    // $scope.id = "1";
    $scope.errorMsg = "";
    


    // isLoggedIn.start();
    

    // watches change in DEVID
    // $scope.updateID = function () {
    //         devid = $scope.id;
    //         console.log(devid);
    //         return devid;
    //     };
    
    // animate bottom box 
    $scope.initialForm = function () {
        $scope.moveBox = function () {
            // $("#signupbox").fadeOut();
            $('#signupbox').animate({
                'marginTop': "+=170px" //moves down
            });

            $timeout(function () {
                $state.go('app.signup');
            });

            $timeout(function () {
                $('#signupbox').animate({
                    'marginTop': "-=170px" //moves down
                });
            }, 1000);
        } // end animate

        // Toast for empty Fields
        $scope.showAlert = function (menuName, time) {
            //Calling $mdToast.show to show toast.
            $mdToast.show({
                controller: 'toastController',
                templateUrl: 'toast.html',
                hideDelay: time,
                position: 'top',
                locals: {
                    displayOption: {
                        title: menuName
                    }
                }
            });
        }// End showToast.

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
        
        // Email Validation
        $scope.validateEmail = function(email){
            console.log(reg.test(email));
            return reg.test(email);
        };

        // Password Validation
        $scope.validatePass = function(ppw){
            if (ppw.length < 8){
                $scope.errorMsg = "Password must be at least 8 characters long";
            }
        };
        // LOG IN
        $scope.logInNow = function () {
            $scope.signInProg = false;
            var sdata = {
                em: em,
                pw: pw
            };

            if(pw == "" || pw == null){
                $scope.errorSignIn = "Fields cannot be blank";
            }

            else {
                firebase.auth().signInWithEmailAndPassword(sdata.em, sdata.pw)
                .then(function(authData) {
                    console.log("Logged in as:", authData.uid);
                    $state.go('app.types');
                }).catch(function(error) {
                    console.error("Authentication failed:", error);
                    $scope.errorSignIn = "Email or Password is invalid";
                });
            }
        }


        // Send Email Verification
            var sendEmailVerification = function () {
                // [START sendemailverification]
                firebase.auth().currentUser.sendEmailVerification().then(function() {
                    // Email Verification sent!
                    // [START_EXCLUDE]
                    console.log('Email Verification Sent!');
                    // [END_EXCLUDE]
                });
                // [END sendemailverification]
            };





        // Start Sign Up
        var sem, spw, spwc;
        devid = $scope.id;
        $scope.updateSignUpEmail = function () {
            sem = $scope.user.signup.email;
            console.log("SEM: " + sem);
            return sem;
        };
        $scope.updateSignUpPass = function () {
            spw = $scope.user.signup.pass;
            console.log("SPW: " + spw);
            return spw;
        };
        $scope.updateSignUpPassConfirm = function () {
            spwc = $scope.user.signup.passconfirm;
            console.log("SPWC: " + spwc);
            return spwc;
        };


        // SIGN UP
        $scope.signUpNow = function () {
            
            if (spw == "" || spw == null || sem == "" || sem == null){
                var alertMessage = "Fields cannot be blank";
                var timeDelay = 1400;
                $scope.showAlert(alertMessage, timeDelay);
            }
            else{
                var sdata = {
                    em: sem,
                    pw: spw,
                    devid: devid,
                    function: "register_user"
                };
                firebase.auth().createUserWithEmailAndPassword(sdata.em, sdata.pw).then(function(user){
                    var signInMessage = "Please check your email to verify your account";
                    var suDelay = 2800;
                    $scope.showAlert(signInMessage, suDelay);
                    console.log(user);
                    sendEmailVerification();
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // [START_EXCLUDE]
                    if (errorCode == 'auth/weak-password') {
                        $scope.errorMsg = "Password is not strong enough. Please add capital letters and numbers.";
                    } else {
                        $scope.errorMsg = "An unknown error occurred";
                        console.log(errorMessage);
                    }
                    console.log(error);
                    // [END_EXCLUDE]
                });

            }
        }


    };

    $scope.initialForm();




}])
appControllers.controller('loadingCtrl', ['$scope', '$rootScope', '$ionicPlatform', '$cordovaDevice', '$timeout', '$state', 'isLoggedIn', '$firebaseAuth', function ($scope, $rootScope, $ionicPlatform, $cordovaDevice, $timeout, $state, isLoggedIn, $firebaseAuth) {
    
        // check if signed in and redirect
        $timeout(function(){
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    console.log("Signed In: " + user);
                    $state.go('app.types');
                } else {
                    // No user is signed in.
                    // No user is signed in.
                    console.log("Not Signed In: " + user);
                    $state.go('app.signin');
                }
            });
        }, 500);

}]);