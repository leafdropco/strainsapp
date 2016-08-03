// Controller of menu toggle.
// Learn more about Sidenav directive of angular material
// https://material.angularjs.org/latest/#/demo/material.components.sidenav
appControllers.controller('typesCtrl', function ($scope, $rootScope, $mdToast, $mdBottomSheet, $timeout, $stateParams) {

    $scope.initialForm = function () {
        // Loading progress.
        $timeout(function () {
            if ($scope.isAndroid) {
                jQuery('#product-detail-loading-progress').show();
            }
            else {
                jQuery('#product-detail-loading-progress').fadeIn(700);
            }
        }, 400);
        $timeout(function () {
            jQuery('#product-detail-loading-progress').hide();
            jQuery('#product-detail-content').fadeIn();
        }, 3000);// End loading progress.
    };// End initialForm.

    // sharedProduct fro show shared social bottom sheet by calling sharedSocialBottomSheetCtrl controller.
    $scope.sharedProduct = function ($event, product) {
        $mdBottomSheet.show({
            templateUrl: 'bottom-sheet-shared.html',
            controller: 'sharedSocialBottomSheetCtrl',
            targetEvent: $event,
            locals: {
                product: product
            }
        });
    };// End sharedProduct.

    $scope.initialForm();
})
appControllers.controller('flavorsCtrl', function ($scope, $rootScope, $mdToast, $mdBottomSheet, $timeout, $stateParams, FlavorsGet, $ionicScrollDelegate) {

 $scope.initialForm = function () {
        // Loading progress.
        $timeout(function () {
            if ($scope.isAndroid) {
                jQuery('#flavor-detail-loading-progress').show();
            }
            else {
                jQuery('#flavor-detail-loading-progress').fadeIn(700);
            }
        }, 400);
        $timeout(function () {
            jQuery('#flavor-detail-loading-progress').hide();
            jQuery('#flavor-detail-content').fadeIn();
        }, 3000);// End loading progress.
    };// End initialForm.

    // sharedProduct fro show shared social bottom sheet by calling sharedSocialBottomSheetCtrl controller.
    $scope.sharedProduct = function ($event, product) {
        $mdBottomSheet.show({
            templateUrl: 'bottom-sheet-shared.html',
            controller: 'sharedSocialBottomSheetCtrl',
            targetEvent: $event,
            locals: {
                product: product
            }
        });
    };// End sharedProduct.

    $scope.initialForm();

    FlavorsGet.get(true, true, function(data){
        $scope.flavors = data;
    });

    $scope.scrollTop = function() {
        $ionicScrollDelegate.scrollTop(true);
    };
})
appControllers.controller('flavorsListCtrl', function ($scope, FlavorsGet, $stateParams, $rootScope, $ionicNavBarDelegate) {
   // $ionicNavBarDelegate.showBackButton(true);
    $scope.kind = $rootScope.toParams.flavor;
    FlavorsGet.get($scope.kind, false, function(data){
        $scope.flavors = data;
        console.log(data);
        $scope.leng = Object.keys(data).length;
    });
    
})
appControllers.controller('effectsCtrl', function ($scope, $rootScope, $mdToast, $mdBottomSheet, $timeout, $stateParams, EffectsGet, $ionicScrollDelegate) {

 $scope.initialForm = function () {
        // Loading progress.
        $timeout(function () {
            if ($scope.isAndroid) {
                jQuery('#flavor-detail-loading-progress').show();
            }
            else {
                jQuery('#flavor-detail-loading-progress').fadeIn(700);
            }
        }, 400);
        $timeout(function () {
            jQuery('#flavor-detail-loading-progress').hide();
            jQuery('#flavor-detail-content').fadeIn();
        }, 3000);// End loading progress.
    };// End initialForm.

    // sharedProduct fro show shared social bottom sheet by calling sharedSocialBottomSheetCtrl controller.
    $scope.sharedProduct = function ($event, product) {
        $mdBottomSheet.show({
            templateUrl: 'bottom-sheet-shared.html',
            controller: 'sharedSocialBottomSheetCtrl',
            targetEvent: $event,
            locals: {
                product: product
            }
        });
    };// End sharedProduct.

    $scope.initialForm();

    EffectsGet.get(true, true, function(data){
        $scope.effects = data;
    });

    $scope.scrollTop = function() {
        $ionicScrollDelegate.scrollTop(true);
    };
})
appControllers.controller('effectsListCtrl', function ($scope, EffectsGet, $stateParams, $rootScope, $ionicNavBarDelegate) {
   console.log($rootScope.toParams.effect);
   $scope.kind = $rootScope.toParams.effect;
    EffectsGet.get($scope.kind, false, function(data){
        $scope.effects = data;
        $scope.leng = Object.keys(data).length;
    });
})
appControllers.controller('sativaCtrl', function ($scope, StrainsGet) {
    // Scrolls button to top
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true);
  };

    var type = "sativa";
    StrainsGet.get(type, function(data){
        $scope.sativa = data;
        $scope.leng = Object.keys(data).length;
    });
    
})
appControllers.controller('indicaCtrl', function($scope, StrainsGet) {
    // Scrolls button to top
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true);
  };

  var type = "indica";
  StrainsGet.get(type, function(data){
    $scope.indica = data;
    $scope.leng = Object.keys(data).length;
  });
})
appControllers.controller('hybridCtrl', function($scope, StrainsGet, $ionicScrollDelegate) {
  // Scrolls button to top
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true);
  };
  
  var type = "hybrid";
  StrainsGet.get(type, function(data){
    $scope.hybrid = data;
    $scope.leng = Object.keys(data).length;
  });
})
appControllers.controller('ViewStrainCtrl', function($scope, ViewStrain, $stateParams) {
  link_id = $stateParams.linkTitle;
  ViewStrain.get(link_id, function(data){
    $scope.view = data;
  });
});