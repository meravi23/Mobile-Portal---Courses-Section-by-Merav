app.controller("hoursApproveCtrl", function($scope, server) {
    
    // $scope.months={"1":"ינואר","2":"פברואר","3":"מרץ","4":"אפריל","5":"מאי","6":"יוני","7":"יולי","8":"אוגוסט","9":"ספטמבר","10":"אוקטובר","11":"נובמבר","12":"דצמבר"};
    // $scope.month = "";
    // $scope.year = "";
    // $scope.monthindex = "";
    $scope.loading = true;
    // $scope.pageIndex=0;
    var usefulReporters = [];
    const rowsPerPage = 15;

    $scope.reporterHeaderOpen= false;

    // $scope.GetCurrentDate = function()
    // {
    //     //console.log("GetCurrentDate");
    //     var today = new Date();
    //     var mm = today.getMonth()+1;
    //     var yyyy = today.getFullYear();

    //     $scope.year = yyyy;
        
    //     $scope.month = $scope.months[mm];
    //     $scope.monthindex = mm;
    // }

    // $scope.GetCurrentDate();

    $scope.GetReports = function () {
        
        usefulReporters = [];
        $scope.loading=true;
        var data={'month': $scope.monthindex, 'year': $scope.year};
        server.requestPhp(data, 'GetAllReporters').then(function (data) {
            for(var i=0;i<data.length; i++)
            {
                if(data[i].reports.length>0||data[i].status==1)
                {
                    for (var j=0; j<data[i].reports.length; j++)
                    {
                        var report = data[i].reports[j];
                        // convert approval to string
                        $scope.calculateHours(report);
                    }

                    $scope.calculateHoursSummary(data[i]);
                    usefulReporters.push(data[i]);
                }
            }
            $scope.loading=false;  
            usefulReporters.sort(function(a, b){
                var x = a.firstname;
                var y = b.firstname;
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
              });
              
            var searchedReporters = usefulReporters;
            if($scope.search)
            {
                searchedReporters = usefulReporters.filter(searchNames);
            }

            //split final results into pages for pagination
            // we stil need to think how to add the pagination to the page
            $scope.pageCount = (parseInt((searchedReporters.length-1)/rowsPerPage));
            $scope.allreporters = [];
            for (var i=0; i<rowsPerPage; i++) 
            {
                if(searchedReporters[i])
                {
                    $scope.allreporters.push(searchedReporters[i]);
                }
            }
        });
        
    }
    // $scope.GetReports();


    // $scope.goLeft = function()
    // {
    //     $scope.monthindex = $scope.monthindex - 1;
    //     if($scope.monthindex==0)
    //     {
    //         $scope.monthindex = 12;
    //         $scope.year = $scope.year - 1;
    //     }
    //     $scope.month = $scope.months[$scope.monthindex];
    //     $scope.pageIndex=0;
    //     $scope.GetReports();
    // }

    // $scope.goRight = function()
    // {
    //     var tempMonth = $scope.monthindex + 1;
    //     var tempYear = $scope.year;
    //     if(tempMonth==13)
    //     {
    //         tempMonth = 1;
    //         tempYear+=1;
    //     }
    //     var today = new Date();
    //     var nextMonth = new Date(tempYear, tempMonth-1, 1);
    //     if(nextMonth>today)
    //         return;
    //     $scope.monthindex = tempMonth;
    //     $scope.year = tempYear;
    //     $scope.month = $scope.months[$scope.monthindex];
    //     $scope.pageIndex=0;
    //     $scope.GetReports();
    // }

    $scope.calculateHours = function(report)
    {
        if(report.finishhour && report.starthour){
            var t1 = moment(report.finishhour, "hh:mm");
            var t2 = moment(report.starthour, "hh:mm");
            var t3 = moment.utc(moment(t1,"HH:mm").diff(moment(t2,"HH:mm"))).format("HH:mm");
            report.hours = t3;
        }
    }

    $scope.calculateHoursSummary = function(reporter)
    {
        var reported = 0;
        var approved = 0;
        var unapproved = 0;
        var rejected = 0;
        for (var i=0; i<reporter.reports.length; i++)
        {
            if(reporter.reports[i].hours)
            {
                var reportHours=timeStringToAmount(reporter.reports[i].hours);
                reported+=reportHours;
                if(reporter.reports[i].approval=='1')
                {
                    approved+=reportHours;
                }
                else if (reporter.reports[i].approval == '-1') {
                    rejected += reportHours;
                } else {
                    unapproved+=reportHours;
                }
            }
        }
        reporter.reportedHours=reported;
        reporter.approvedHours=approved;
        reporter.unapprovedHours=unapproved;
        reporter.rejectedHours = rejected;
    }

    
    function timeStringToAmount(timeString) {
        var hoursMinutes = timeString.split(":");
        var hours = parseInt(hoursMinutes[0]);
        var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1]) : 0;
        return hours + minutes / 60;
    }

     //function used to filter search string on first and last names
     function searchNames(name)
     {
         var inSearch = name.firstname.includes($scope.search) || name.lastname.includes($scope.search)
         return inSearch;
 
     }

     $scope.refreshResults=function()
	{
        var data = usefulReporters.filter(searchNames);
        $scope.pageCount = (parseInt((data.length-1)/rowsPerPage));
        // put in comment - for now no support for pagination
        $scope.goToPage(0);
    }

    // This fucntion is still not in use - as we do not habe yet pagination
    $scope.goToPage = function(pageNum)
	{
        // pagenmb = pageNum;
        $scope.allreporters = [];
		if(pageNum>=0&&pageNum<=$scope.pageCount)
		{
            $scope.pageIndex=pageNum;
            
            var data = usefulReporters;
            // use search string to filter results;
            if($scope.search)
            {
                data = usefulReporters.filter(searchNames);
            }

            //split final results into pages for pagination
            $scope.pageCount = (parseInt((data.length-1)/rowsPerPage));
            $scope.allreporters = [];
            for (var i=0; i<rowsPerPage; i++) 
            {
                if(data[($scope.pageIndex*rowsPerPage)+i])
                {
                $scope.allreporters.push(data[($scope.pageIndex*rowsPerPage)+i])
            }
            }

            for (var i=0; i<$scope.allreporters.length; i++)
            {
                for (var j=0; j<$scope.allreporters[i].reports.length; j++)
                {
                    $scope.calculateHours($scope.allreporters[i].reports[j]);

                }
                $scope.calculateHoursSummary($scope.allreporters[i]);
            }
		}
    }

    $scope.chooseAll = function(reporter)
    {
        reporter.chooseAll=!reporter.chooseAll;
        for(var i=0; i<reporter.reports.length; i++)
        {
            //if(reporter.reports[i].status2)
                reporter.reports[i]["choose"] = reporter.chooseAll;
        }
    }

    $scope.ApproveRows = function(reps, reporter)
    {   
        if (reps.approval == 1){
            // nothing to do - it is already approved
            return;
        }
        SetReportApproval(reps, 1, reporter)
    }
    $scope.UnapproveRows = function(reps, reporter)
    {
        SetReportApproval(reps, 0, reporter)
    }
    $scope.RejectRows = function(reps, reporter)
    {
        SetReportApproval(reps, -1, reporter)

    }
    function SetReportApproval(reps, reportStatus, reporter)
    {

        var reportids=getColumnInArray(reps, "reportid");
        var data = {'reportids' : reportids, 'status' : reportStatus, 'checkdate2':true};
        //var data = {'reportids' : reportids, 'status' : reportStatus};
        server.requestPhp(data, 'SetReportApproval').then(function(data) {
            if(data&&!data.error)
            {
                //console.log(data);
                for (var i=0; i<reps.length; i++)
                {
                    reps[i].approval = reportStatus;
                    reps[i].checkdate = data;
                    // reps[i].status2=true;
                }
                $scope.calculateHoursSummary(reporter);
                if(data === true)
                    alert("נשמר בהצלחה");
                else if(data === "no ids supplied")
                    alert("יש לבחור רשומות תחילה");
            }
            else
            {
                alert("הפעולה לא הצליחה - נא לפנות לנטלי מזרחי או לדניאל סעאת ולדווח להם על הבעיה.");
            }
        });
        unCheckRows(reps,reporter);
    }

    function unCheckRows(reps,reporter)
    {
        for (var i=0; i<reps.length; i++)
        {
            if(reps[i]["choose"])
                reps[i]["choose"]=!reps[i]["choose"];
            if(reporter.chooseAll)
                reporter.chooseAll=!reporter.chooseAll;
        }
    }

    function getColumnInArray(arr, colName)
    {
        var res = [];
        for (var i=0; i<arr.length; i++)
        {
            res.push(arr[i][colName])
        }
        return res;
    }

    $scope.getReportersProjectNameById = function(reporter, projectid)
    {
        var res = getObjectArrayFieldById(reporter.reportingPerimeter, "projectid", "projectName", projectid);
        return res;
    }

    $scope.getReportersProjectCoursesById = function(reporter, projectid)
    {
        var res = getArrayFieldById(reporter.reportingPerimeter, "projectid", "courses", projectid);
        return res;
    }
    $scope.getReportersCourseNameById = function(projectCourses, courseid)
    {
        if (courseid == null || courseid =="")
        {
            return "כללי";
        }
        var res =  getObjectArrayFieldById(projectCourses, "courseid", "name", courseid);
        if (res == null || res=="")
            res = "כללי";
        return res;
    }


    function getObjectArrayFieldById (arr, idField, targetField, id)
    // the structure hold id and object - it is not typical array
    {
        if(arr==null||id==null)
            return null;
        if (arr[id][idField]===id)
        {
            return arr[id][targetField];
        }
        return null;
    }

    $scope.getReportersProjectActionsById = function(reporter, projectid)
    {
        var res = getObjectArrayFieldById(reporter.reportingPerimeter, "projectid", "subjects", projectid);
        return res;
    }
    $scope.getReportersActionNameById = function(projectActions, subjectreportid)
    {
        return getArrayFieldById(projectActions, "reportsubjectid", "subject", subjectreportid);
    }

    function getArrayFieldById (arr, idField, targetField, id)
    {
        if(arr==null||id==null)
            return null;

        for (var i=0; i<arr.length; i++)
        {
            if (arr[i][idField]===id)
            {
                return arr[i][targetField];
            }
        }
        return null;
    }

    $scope.getSelectedRows = function(reporters)
    {
        var keys = Object.keys(reporters.reports);
        var selected=[];
        for(var i=0 ; i < keys.length ; i++)
        {
            if(reporters.reports[i]["choose"]==true)
            {
                selected.push(reporters.reports[i]);
            }
        }
        return selected;
    }
});