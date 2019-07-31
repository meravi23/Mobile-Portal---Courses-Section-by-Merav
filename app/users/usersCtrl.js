    app.controller("usersCtrl", function($scope, server, $location) {

        var fetchMethods={
            "student":"SearchStudentsUnderMe",
            "staff":"SearchStaffUnderMe",
            "new":"SearchNewUsers",
            "excel":"SearchStaffUnderMeForExcel"
        };
		
		$scope.search = "";
    	$scope.users=[];
        $scope.getUsers = function() {
            $scope.loading=true;
            var search = $scope.search;
            var sorting = $scope.sortingField = "userid"
            var desc = $scope.reverseOrder = "false";
            var userstatus = $scope.userStatus = 1;
			var page = $scope.pageIndex = 0;			
            
            var userClassificationFetchMethod = fetchMethods[$scope.userType] = "SearchStaffUnderMe";
    
            var data ={'search': search, 'sorting': sorting, 'desc':desc, 'userstatus': userstatus, 'page': page};
            server.requestPhp(data, userClassificationFetchMethod).then(function (data) {
                $scope.users = data.users;
                $scope.pageCount = parseInt(data.pages);
                $scope.loading=false;
            });
        }
    
        $scope.getUsers();

	$scope.goToUserPage = function(user)
	{
		var userId = user.id;
		$location.path("/users/" + userId);
	}
	
	$scope.fileUpload=false;
	
});