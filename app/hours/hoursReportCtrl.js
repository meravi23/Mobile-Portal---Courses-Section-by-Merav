app.controller("hoursReportCtrl", function ($scope, server) {
    const rowsPerPage = 15;

    $scope.GetReports = function () {
        $scope.loading = true;
        var data = {
            month: $scope.monthindex,
            year: $scope.year
        };
        server.requestPhp(data, 'GetReports').then(function (data) {
            $scope.reports = [];
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    var report = data[i];
                    if (report["carkm"])
                        report["carkm"] = parseFloat(report["carkm"]);
                    if (report["cost"])
                        report["cost"] = parseFloat(report["cost"]);
                    if (report["missingreportsubject"])
                        report["missingreportsubject"] = parseFloat(report["missingreportsubject"]);
                    if (report["automatic"])
                        report["automatic"] = parseFloat(report["automatic"]);
                    if (report["approval"])
                        report["approval"] = parseFloat(report["approval"]);
                    if (!report.checkdate) {
                        report.checkdate = "לא התרחש שינוי עדיין";
                        // console.log(report.checkdate);
                    }
                    $scope.reports.push(report);
                }
            }
            $scope.loading = false;
        });
    };
    // first call is from directive that present the month
    // $scope.GetReports();

    $scope.reportingPerimeter = [];
    $scope.GetReportingPerimeter = function () {
        var data = {};
        server.requestPhp(data, 'GetMyReportingPerimeter').then(function (data) {
            $scope.reportingPerimeter = data;
        });
    };
    $scope.GetReportingPerimeter();

    $scope.calculateHours = function(report) {
        if (report.finishhour && report.starthour) {
            var t1 = moment(report.finishhour, "HH:mm");
            var t2 = moment(report.starthour, "HH:mm");
            var t3 = moment.utc(moment(t1, "HH:mm").diff(moment(t2, "HH:mm"))).format("HH:mm");
            report.hours = t3;
            report.copyreport.hours=t3;
        }
    };

    $scope.sumHours = function () {
        var sum = 0;
        for (var i = 0; i < $scope.reports.length; i++) {
            if ($scope.reports[i].hours) {
                sum += timeStringToAmount($scope.reports[i].hours);
            }
        }
        return sum;
    }

    function timeStringToAmount(timeString) {
        var hoursMinutes = timeString.split(":");
        var hours = parseInt(hoursMinutes[0]);
        var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1]) : 0;
        return hours + minutes / 60;
    }

    $scope.getReportersProjectNameById = function(reportingPerimeter, projectid)
    {
        var res = getObjectArrayFieldById(reportingPerimeter, "projectid", "projectName", projectid);
        return res;
    }

    function getObjectArrayFieldById (arr, idField, targetField, id)
    // the structure hold id and object - it is not typical array
    {
        if(arr==null || arr==undefined || id==null || id == undefined)
            return null;
        if (arr[id] == undefined)
            return null;
        if (arr[id][idField]===id)
        {
            return arr[id][targetField];
        }
        return null;
    }
    $scope.getReportersProjectActionsById = function(reportingPerimeter, projectid)
    {
        var res = getObjectArrayFieldById(reportingPerimeter, "projectid", "subjects", projectid);
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

});