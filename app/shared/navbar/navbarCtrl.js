app.controller("navbarCtrl", function ($scope, $location) {



    $scope.isOpen = false
    $scope.openSide = function () {
        $scope.isOpen = true
    }

    $scope.closeSide = function () {
        $scope.isOpen = false;
    }

    // $scope.usermenu=false;

    $scope.usermenuclick = function () {
        $scope.usermenu = !$scope.usermenu;

    }

    // $location.absUrl().includes("staff");

    $scope.menuIndex = function () {
        if ($location.path() === "/courses") {
            return "קורסים";
        } else if ($location.absUrl().includes("staff")) {
            return "עובדים";
        } else if ($location.absUrl().includes("student")) {
            return "חניכים";
        } else if ($location.absUrl().includes("new")) {
            return "משתמשים חדשים";
        } else if ($location.path() === "/hours-report") {
            return "דיווח שעות";
        } else if ($location.path() === "/hours-approve") {
            return "אישור שעות";
        }
    }

})