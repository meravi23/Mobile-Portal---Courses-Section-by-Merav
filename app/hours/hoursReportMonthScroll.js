app.controller("hoursReportMonthScrollCtrl", function($scope) {

    $scope.months={
        "1":"ינואר",
        "2":"פברואר",
        "3":"מרץ",
        "4":"אפריל",
        "5":"מאי",
        "6":"יוני",
        "7":"יולי",
        "8":"אוגוסט",
        "9":"ספטמבר",
        "10":"אוקטובר",
        "11":"נובמבר",
        "12":"דצמבר"
    };
    
    //const rowsPerPage = 15;

    $scope.month = "";
    $scope.year = "";
    $scope.monthindex = "";
    $scope.loading=true;
    $scope.pageIndex=0;

    $scope.GetCurrentDate = function()
    {
        //console.log("GetCurrentDate");
        var today = new Date();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();

        $scope.year = yyyy;
        
        $scope.month = $scope.months[mm];
        $scope.monthindex = mm;
    }

    $scope.GetCurrentDate();
    $scope.GetReports();

    $scope.goLeft = function()
    {
        $scope.monthindex = $scope.monthindex - 1;
        if($scope.monthindex==0)
        {
            $scope.monthindex = 12;
            $scope.year = $scope.year - 1;
        }
        $scope.month = $scope.months[$scope.monthindex];
        $scope.pageIndex=0;
        $scope.GetReports();
    }

    $scope.goRight = function()
    {
        var tempMonth = $scope.monthindex + 1;
        var tempYear = $scope.year;
        if(tempMonth==13)
        {
            tempMonth = 1;
            tempYear+=1;
        }
        var today = new Date();
        var nextMonth = new Date(tempYear, tempMonth-1, 1);
        if(nextMonth>today)
            return;
        $scope.monthindex = tempMonth;
        $scope.year = tempYear;
        $scope.month = $scope.months[$scope.monthindex];
        $scope.pageIndex=0;
        $scope.GetReports();
    }
   
})
