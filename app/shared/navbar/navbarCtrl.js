app.controller("navbarCtrl", function($scope) {


    
$scope.isOpen = false
$scope.openSide=function(){
$scope.isOpen=true
}
    
$scope.closeSide=function(){
$scope.isOpen=false;
}

// $scope.usermenu=false;

$scope.usermenuclick=function(){
    $scope.usermenu=!$scope.usermenu;
    
}


})