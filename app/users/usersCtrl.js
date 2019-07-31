app.controller("usersCtrl", function ($scope, server, $location) {

	SwitchUser = function (userType) {
		var userTypeForServer;
		switch (userType.type) {
			case "staff":
				userTypeForServer = "SearchStaffUnderMe";
				break;
			case "student":
				userTypeForServer = "SearchStudentsUnderMe";
				break;
			case "new":
				userTypeForServer = "SearchNewUsers";
				break
			default:
				userTypeForServer = "SearchStaffUnderMe";

		}
		return userTypeForServer;
	};
	$scope.loading = true;
	$scope.search = "";
	$scope.users = [];
	$scope.userStatus = 1;
	$scope.pageIndex = 0;
	$scope.userType = $location.search();
	$scope.getUsers = function () {
		var search = $scope.search;
		var sorting = $scope.sortingField = "userid"
		var desc = $scope.reverseOrder = "false";
		var userstatus = $scope.userStatus;
		var page = $scope.pageIndex;

		var userClassificationFetchMethod = SwitchUser($scope.userType);

		var data = { 'search': search, 'sorting': sorting, 'desc': desc, 'userstatus': userstatus, 'page': page };
		server.requestPhp(data, userClassificationFetchMethod).then(function (data) {
			$scope.users = data.users;
			$scope.pageCount = parseInt(data.pages);
			$scope.loading = false;
		});
	}

	$scope.getUsers();

	$scope.goToUserPage = function (user) {
		var userId = user.userid;
		$location.path("/users/" + userId);
	}

	$scope.goToActiveTab = function () {
		$scope.pageIndex = 0;
		$scope.userStatus = 1;
		$scope.getUsers();
	}

	$scope.goToInactiveTab = function () {
		$scope.pageIndex = 0;
		$scope.userStatus = 0;
		$scope.getUsers();
	}

	$scope.pageUp = function () {
		if ($scope.pageIndex < $scope.pageCount) {
			$scope.loading=true;
			$scope.pageIndex++;
		} else {
			return;
		}
		$scope.getUsers();
	}

	$scope.pageDown = function () {
		if ($scope.pageIndex > 0) {
			$scope.loading=true;
			$scope.pageIndex--;
		} else {
			return;
		}
		$scope.getUsers();
	}

});