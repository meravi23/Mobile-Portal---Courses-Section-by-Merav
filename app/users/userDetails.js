app.controller("userDetailsCtrl", function($scope, $location, server, $routeParams) {
    $scope.arrowBackImg = "img/noun_back_arrow_2690272.png";
    $scope.copyImg = "img/noun_copy_573715.png";
    $scope.saveImg = "img/noun_save_2429243.png";   

    $scope.userid = $routeParams.id;
    console.log("User ID: " + $scope.userid);

    $scope.getUser = function () {
        var data = {};
        data.userId = $scope.userid;
        server.requestPhp(data, 'GetUserProfileById').then(function (data) {
            $scope.user = data.profile;
           console.log($scope.user);
        });


        // server.requestPhp(data, 'GetUserById').then(function (data) {
        //     $scope.user = data;
        //     console.log($scope.course);

        // });
    };
    if ($scope.userid) {
        $scope.getUser();

    } else {
        $scope.user = {};
    }

     
});