    app.controller("usersCtrl", function($scope, server) {

        var fetchMethods={
            "student":"SearchStudentsUnderMe",
            "staff":"SearchStaffUnderMe",
            "new":"SearchNewUsers",
            "excel":"SearchStaffUnderMeForExcel"
        };

		// $rootScope.stateName = "course";

		// $scope.courses=[];
		// $scope.pageIndex=0;
		// $scope.search = "";
	
		// $scope.getCourses = function() {
		// 	$scope.loading=true;
		// 	var search = $scope.search;
		// 	var sorting = "courseid";
		// 	var desc = false;
		// 	var coursestatus = 1;
		// 	var page = 0;
	
		// 	var data ={'search': search, 'sorting': sorting, 'desc':desc, 'coursestatus': coursestatus, 'page': page};
		// 	console.log(data);
		// 	server.requestPhp(data, 'SearchCourses').then(function (data) {
		// 		$scope.courses = data.courses;
		// 		$scope.pageCount = parseInt(data.pages);
		// 		$scope.loading=false;
		// 		$scope.GetMyProfile();
		// 		$scope.GetUserExtendedProfile();
		// 	});
		// }
		// $scope.getCourses();
		

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

		
	// // $scope.search=$stateParams.search;
	// // $scope.sortingField=$stateParams.sorting?$stateParams.sorting:"staffid";
    // $scope.pageIndex = 1;
	// // $scope.pageCount;
	// $scope.staffList=[];
	// $scope.staffStatus=1;
	
	// $scope.getStaff = function() {
    //     $scope.loading=true;
	// 	var search = $scope.search;
	// 	var sorting = $scope.sortingField;
	// 	var desc = $scope.reverseOrder;
	// 	var userstatus = $scope.staffStatus;
	// 	var page = $scope.pageIndex;

	// 	var data ={'search': search, 'sorting': sorting, 'desc':desc, 'userstatus': userstatus, 'page': page};
        
	// 	server.requestPhp(data, 'SearchStaff').then(function (data) {
	// 		$scope.staffList = data.staff;
	// 		$scope.pageCount = parseInt(data.pages);
	// 		$scope.loading=false;
	// 	});
	// }
	// $scope.getStaff();
	
	// $scope.goToActiveTab = function()
	// {
	// 	$scope.pageIndex=0;
	// 	$scope.staffStatus=1;
	// 	$scope.getStaff();
	// }
	
	// $scope.goToInactiveTab = function()
	// {
	// 	$scope.pageIndex=0;
	// 	$scope.staffStatus=0;
	// 	$scope.getStaff();
	// }
	
	$scope.goToUserPage = function(staff)
	{
		$state.transitionTo('userDetails', {
			userId : user.id
		});
	}
	
	$scope.fileUpload=false;
	
});