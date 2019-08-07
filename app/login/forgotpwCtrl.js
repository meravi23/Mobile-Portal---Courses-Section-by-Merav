app.controller("forgotpwCtrl", function ($scope, server, $location, $rootScope, $uibModal, $uibModalInstance) {

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    

});