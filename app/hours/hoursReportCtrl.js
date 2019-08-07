app.controller("hoursReportCtrl", function ($scope, server, hoursSrv) {
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

    $scope.calculateHours = function(report)
    {
        hoursSrv.calculateHours(report);
    }

    $scope.sumHours = function () {
        var sum = 0;
        for (var i = 0; i < $scope.reports.length; i++) {
            if ($scope.reports[i].hours) {
                sum += hoursSrv.timeStringToAmount($scope.reports[i].hours);
            }
        }
        return sum;
    }


    $scope.getReportersProjectNameById = function(reportingPerimeter, projectid)
    {
        var res = hoursSrv.getObjectArrayFieldById(reportingPerimeter, "projectid", "projectName", projectid);
        return res;
    }

    $scope.getReportersProjectActionsById = function(reportingPerimeter, projectid)
    {
        var res = hoursSrv.getObjectArrayFieldById(reportingPerimeter, "projectid", "subjects", projectid);
        return res;
    }

    $scope.getReportersActionNameById = function(projectActions, subjectreportid)
    {
        return hoursSrv.getArrayFieldById(projectActions, "reportsubjectid", "subject", subjectreportid);
    }


});