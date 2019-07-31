app.controller('loginCtrl', function ($rootScope, $scope, $location, server) {

	$scope.error_password=false;
	$scope.missing_credential=false;
	$scope.login = function () {
		if(!$scope.pass||!$scope.email)
		{
			 $scope.missing_credential = true;
			// alert("נא להזין פרטי משתמש");
			// return;
		}
		var data = {pass: $scope.pass, email: $scope.email};
        server.requestPhp(data, "login").then(function (data) {
			// if (data['error']) {
			// 	alert(data['error']);
			// }
        	if (data['token']) {
				$rootScope.userToken = data['token'];
				$rootScope.isAdmin = data['isAdmin']==1;
				$rootScope.myEmail = $scope.email;
				localStorage.token = data.token;
				localStorage.isAdmin = $rootScope.isAdmin;
				$location.path('courses');
                // $scope.isFirstEnter = true;
                // // Getting user info and putting on rootscope for use of header directive
                // var data = {};
                // $rootScope.activeUser = {};
                // server.requestPhp(data, 'GetMyProfile').then(function (data) {
                //     $rootScope.activeUser = data;
                //     $rootScope.activeUser.image = ($rootScope.activeUser.image) ? $rootScope.activeUser.image : "img/userBig.png";
                //     localStorage.setItem('activeUser', JSON.stringify($rootScope.activeUser));
                // });
				// $location.path('courses');
			}
			else $scope.error_password=true;
        });
	}
	
	$scope.hideError= function() {
		$scope.error_password=false;
		$scope.missing_credential=false;
	}

	// var waitingForServer=false;
	// $scope.forgotPass={};
	// $scope.forgotPass.resetMail="";
	// $scope.sendForgotPassMail = function () {
    // 	if(waitingForServer)
    // 		return;
    // 	waitingForServer=true;
    //     var data = {};
	// 	data.email=$scope.forgotPass.resetMail;
    //     server.requestPhp(data, "InitPassApp").then(function (data) {
	// 		waitingForServer=false;
	// 		alert("מייל עם לינק לשחזור סיסמה נשלח לכתובת שהוזנה");
	// 		$scope.forgotPass.resetPass = false;
	// 	});
    // }
});