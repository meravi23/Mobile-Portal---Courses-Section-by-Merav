
var app = angular.module("portal", ["ngRoute", "ui.bootstrap", "ngTouch", "ngAnimate"]);

app.run(function ($rootScope) {
    // setting the active user to rootscope after refresh + loading token and other stuff from local storage
	var retrievedActiveuser = localStorage.activeUser;
	var retrievedUserToken = localStorage.token;
	$rootScope.isAdmin = (localStorage.isAdmin === 'true');
	if (retrievedActiveuser) {
		$rootScope.activeUser = JSON.parse(retrievedActiveuser);
    }
    $rootScope.userToken = retrievedUserToken;
});

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