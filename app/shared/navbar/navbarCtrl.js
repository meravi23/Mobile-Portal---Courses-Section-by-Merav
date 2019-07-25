app.controller("navbarCtrl", function($scope) {

    // $scope.toggleBar=function() {
    //     $scope.isOpen = !$scope.isOpen;
    // }
    
$scope.isOpen = false
$scope.openSide=function(){
$scope.isOpen=true
}
    
$scope.closeSide=function(){
$scope.isOpen=false;
}

// $scope.goToCoursesPage = function() {
//     $rootScope.isOpen = false;
//     $state.transitionTo('courses');
// };


})