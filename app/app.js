
var app = angular.module("portal", ["ngRoute", "ui.bootstrap", "ngTouch", "ngAnimate"]);

app.config(function($routeProvider) {
    $routeProvider.
    when("/", {
        templateUrl: "app/login/login.html",
        controller: "loginCtrl"
    }).when("/courses", {
        templateUrl: "app/courses/courses.html",
        controller: "coursesCtrl"
    }).when("/courses/:id", {
        templateUrl: "app/courses/courseDetails.html",
        controller: "courseDetailsCtrl"
    }).when("/users", {
        templateUrl: "app/users/users.html",
        controller: "usersCtrl"
    }).when("/users/:id", {
        templateUrl: "app/users/userDetails.html",
        controller: "userDetailsCtrl"
    }).when("/hours-report", {
        templateUrl: "app/hours/hoursReport.html",
        controller: "hoursReportCtrl"
    }).when("/hours-approve", {
        templateUrl: "app/hours/hoursApprove.html",
        controller: "hoursApproveCtrl"
    })
})