appControllers.controller('userCtrl', function ($scope, $rootScope, $mdToast, $mdBottomSheet, $timeout, $stateParams, $state) {

    $scope.initialForm = function () {
        $scope.moveBox = function () {
            // $("#signupbox").fadeOut();
            $('#signupbox').animate({
                    'marginTop' : "+=170px" //moves down
                });

            $timeout(function() {
                $state.go('app.signup');
            }, 500);

            $timeout(function() {
                $('#signupbox').animate({
                    'marginTop' : "-=170px" //moves down
                });
            }, 1000);
        }
       
    };

    $scope.initialForm();
})