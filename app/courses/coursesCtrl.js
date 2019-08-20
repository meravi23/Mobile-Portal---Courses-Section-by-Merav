app.controller("coursesCtrl", function ($rootScope, $scope, server, $location) {

	$rootScope.stateName = "course";

	$scope.courses = [];
	$scope.courseStatus = 1;
	$scope.pageIndex = 0;
	$scope.search = "";

	$scope.getCourses = function () {
		$scope.loading = true;
		var search = $scope.search;
		var sorting = "courseid";
		var desc = false;
		var coursestatus = $scope.courseStatus;
		var page = $scope.pageIndex;

		var data = { 'search': search, 'sorting': sorting, 'desc': desc, 'coursestatus': coursestatus, 'page': page };
		server.requestPhp(data, 'SearchCourses').then(function (data) {
			$scope.courses = data.courses;
			// remove certain courses with damaged data
			for (let i=0; i<$scope.courses.length; i++) {
				if ($scope.courses[i].courseid == "171"){
					$scope.courses.splice(i, 1);
				}
				if ($scope.courses[i].courseid == "227"){
					$scope.courses.splice(i, 1);
				}
			}
			$scope.pageCount = parseInt(data.pages);
			$scope.loading = false;
			$scope.GetMyProfile();
			$scope.GetUserExtendedProfile();
		});

	}
	$scope.getCourses();


	$scope.GetMyProfile = function () {
		var data = {};
		server.requestPhp(data, 'GetMyProfile').then(function (data) {
			$scope.profile = data;
			//console.log(data);
		});
	}

	$scope.GetUserExtendedProfile = function () {
		var data = {};
		server.requestPhp(data, 'GetUserExtendedProfile').then(function (data) {
			$scope.Extendedprofile = data;
			//  console.log($scope.Extendedprofile);
		});
	}

	$scope.pageUp = function () {
		if ($scope.pageIndex < $scope.pageCount) {
			$scope.pageIndex++;
		} else {
			return;
		}
		$scope.getCourses();
	}

	$scope.pageDown = function () {
		if ($scope.pageIndex > 0) {
			$scope.pageIndex--;
		} else {
			return;
		}
		$scope.getCourses();
	}

	$scope.goToActiveTab = function () {
		$scope.pageIndex = 0;
		$scope.courseStatus = 1;
		$scope.getCourses();
	}

	$scope.goToInactiveTab = function () {
		$scope.pageIndex = 0;
		$scope.courseStatus = 0;
		$scope.getCourses();
	}

	$scope.goToCoursePage = function (course) {
		var courseId = course.courseid
		$location.path("/courses/" + courseId);
	}

});