app.controller("courseDetailsCtrl", function ($scope, $location, server) {
    $scope.courseid = ($location.path()).substr(9);
    console.log("Course ID: " + $scope.courseid);

    $scope.getCourse = function () {
        var data = {};
        data.courseid = $scope.courseid;
        server.requestPhp(data, 'GetCourseById').then(function (data) {
            $scope.course = data;
            console.log($scope.course);

            //an array keeping a list of subjects that should be deleted once course id is saved
            // $scope.course.subjectsToDelete = [];
            // getProjects();
            // getCustomFields();
            // $scope.getEnrolledUsersInRole(1);
            // $scope.getEnrolledUsersInRole(2)
        });
    };


    if ($scope.courseid) {
        $scope.getCourse();

    } else {
        $scope.course = {};
        $scope.course.status = 1;
        $scope.course.subjects = [];
    }


    $scope.goBack = function () {
        $location.path('/courses');
    }
});