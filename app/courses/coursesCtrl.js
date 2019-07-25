app.controller("coursesCtrl", function ($rootScope, $scope, server, $location) {

	$rootScope.stateName = "course";

	$scope.courses = [];
	$scope.pageIndex = 0;
	$scope.search = "";

	$scope.getCourses = function () {
		$scope.loading = true;
		var search = $scope.search;
		var sorting = "courseid";
		var desc = false;
		var coursestatus = 1;
		var page = $scope.pageIndex;

		var data = { 'search': search, 'sorting': sorting, 'desc': desc, 'coursestatus': coursestatus, 'page': page };
		console.log(data);
		server.requestPhp(data, 'SearchCourses').then(function (data) {
			$scope.courses = data.courses;
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


	// $scope.refreshResults=function()
	// {
	// 	$location('.', {
	// 		search : $scope.search,
	// 		page: $scope.pageIndex
	// 	},
	// 	{
	// 		notify: false
	// 	});
	// 	$scope.getCourses();
	// }

	// $scope.goToPage = function(pageNum)
	// {
	// 	if(pageNum>=0&&pageNum<=$scope.pageCount)
	// 	{
	// 		$scope.pageIndex=pageNum;
	// 		$scope.refreshResults();
	// 	}
	// }


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

});