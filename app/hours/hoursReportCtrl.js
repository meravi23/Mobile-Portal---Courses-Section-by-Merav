app.controller("hoursReportCtrl", function ($scope, server) {

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
    $scope.GetReports();

    $scope.getReportsFull = function () {
        var rep = JSON.parse(JSON.stringify($scope.reports));

        rep.forEach(function (el) {
            // el.approval = el.approval === 0 ? "ממתין" : el.approval === 1 ? "אושר" : el.approval === -1 ? "נדחה" : "לא מוגדר";

            el.actionid = (($scope.reportingPerimeter[el.projectid] || { projectid: null, subjects: ["לא מוגדר"] }).subjects.filter(function (sel) {
                return el.actionid === sel.reportsubjectid;
            })[0] || { "reportsubjectid": null, "subject": "לא מוגדר" }).subject;
            el.courseid = (($scope.reportingPerimeter[el.projectid] || { projectid: null, courses: ["לא מוגדר"] }).courses.filter(function (cer) {
                return el.courseid === cer.courseid;
            })[0] || { "courseid": null, "courseName": "כללי" }).courseName;
            el.projectid = ($scope.reportingPerimeter[el.projectid] || { "projectid": null, "projectName": "לא מוגדר" }).projectName;
        });
        var str = JSON.stringify(rep);
        str = str.replace(/actionid/g, "action").replace(/courseid/g, "course").replace(/projectid/g, "project");
        rep = JSON.parse(str);
        rep.forEach(function (el) {
            el.date = moment(el.date, "DD/MM/YYYY")._d;
            delete el.userid;
            delete el.reportid;
        });

        var head = { date: "תאריך", project: "פרויקט", action: "נושא פעילות", course: "מס/שם קורס", starthour: "שעת התחלה", finishhour: "שעת סיום", hours: 'סה"כ שעות', carkm: 'רכב פרטי ק"מ', cost: 'תחבורה ציבורית ש"ח', comment: "הערות", approval: "אישור נוכחות", checkdate: 'זמן שינוי סטטוס ע"י מנהל' };
        rep.unshift(head);
        var async = $q.defer();
        async.resolve(rep);
        return async.promise;
    };

    $scope.reportingPerimeter=[];
    $scope.GetReportingPerimeter = function() {
        var data = {};
        server.requestPhp(data, 'GetMyReportingPerimeter').then(function (data) {
            $scope.reportingPerimeter=data;
        });
    };
    $scope.GetReportingPerimeter();

    $scope.sumHours = function ()
    {
        var sum = 0;
        for (var i=0; i<$scope.reports.length; i++)
        {
            if($scope.reports[i].hours)
            {
                sum+=timeStringToAmount($scope.reports[i].hours);
            }
        }
        return sum;
    }

    function timeStringToAmount(timeString)
    {
        var hoursMinutes = timeString.split(":");
        var hours = parseInt(hoursMinutes[0]);
        var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1]) : 0;
        return hours + minutes / 60;
    }

});