app.controller("navbarCtrl", function($scope) {


    
$scope.isOpen = false
$scope.openSide=function(){
$scope.isOpen=true
}
    
$scope.closeSide=function(){
$scope.isOpen=false;
}

$scope.usermanu=false;

$scope.usermanuclick=function(){
    $scope.usermanu=!$scope.usermanu;
    
}


})