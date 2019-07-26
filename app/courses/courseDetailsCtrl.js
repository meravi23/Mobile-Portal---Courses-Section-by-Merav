app.controller("courseDetailsCtrl", function($scope, $location) {
    $scope.courseid = ($location.path()).substr(9);
    console.log("Course ID: " + $scope.courseid);

});