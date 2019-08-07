app.controller("courseDetailsCtrl", function ($scope, $location, server, $routeParams) {
    $scope.arrowBackImg = "img/noun_back_arrow_2690272.png";
    $scope.copyImg = "img/noun_copy_573715.png";
    $scope.saveImg = "img/noun_save_2429243.png";

    $scope.courseid = $routeParams.id;
    console.log("Course ID: " + $scope.courseid);

    $scope.getCourse = function () {
        var data = {};
        data.courseid = $scope.courseid;
        server.requestPhp(data, 'GetCourseById').then(function (data) {
            $scope.course = data;
            console.log($scope.course);

            //an array keeping a list of subjects that should be deleted once course id is saved
            $scope.course.subjectsToDelete = [];
            getProjects();
            // getCustomFields();
            // $scope.getEnrolledUsersInRole(1);
            // $scope.getEnrolledUsersInRole(2)
        });
    };


    if ($scope.courseid) {
        $scope.getCourse();

    } else {
        $scope.course = {};
        $scope.course.status = 1;
        $scope.course.subjects = [];
    }


    $scope.projects = [];

    var getProjects = function () {
        var data = {};
        server.requestPhp(data, 'GetProjects').then(function (data) {
            $scope.projects = data;
            //setTags($scope.course.projectid);
        });
    };

    getProjects();


    $scope.goBack = function () {
        $location.path('/courses');
    };

    /***************copy course *****************/

    //TODO: to be implemented
    $scope.duplicateCourse = function () {
        // $scope.students = [];
        // unbindSubjectsFromCourse();
        // $scope.course.courseid = null;
        // $scope.course.name = '';
        // $scope.course.code = '';
        // $scope.courseid = null;
        alert("נא למלא את השדות החסרים ולשמור (---שכפול קורס טרם הוטמע)");
    };

    // function unbindSubjectsFromCourse() {
    //     for (var i = 0; i < $scope.course.subjects.length; i++) {
    //         //and reset their subsubject id
    //         recursiveSubjectUnbinding($scope.course.subjects[i]);
    //     }
    // }

    // function recursiveSubjectUnbinding(subject) {
    //     subject.subjectid = null;
    //     if (subject.subsubjects) {
    //         for (var i = 0; i < subject.subsubjects.length; i++) {
    //             //and reset their subsubject id
    //             recursiveSubjectUnbinding(subject.subsubjects[i]);
    //         }
    //     }
    // }

    /***************save course****************/

    $scope.saveCourse = function () {
        var data = {};
        data.course = $scope.course;
        if ($scope.courseid) {
            // if (usersToDelete && usersToDelete.length) deleteUsersFromDBase();
            server.requestPhp(data, 'UpdateCourse').then(function (data) {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert("נשמר בהצלחה");
                    $scope.getCourse();
                }
            });
        } 
    };


    $scope.cities = [];

    var getCities = function () {
        var data = {};
        server.requestPhp(data, 'GetCities').then(function (data) {
            $scope.cities = data;
        });
    };

    getCities();

    $scope.budgetyears = [];


    var getBudgetYears = function () {
        var data = {};
        server.requestPhp(data, 'GetYearsBudget').then(function (data) {
            $scope.budgetyears = data;
        });
    };

    getBudgetYears();

    // tags תגיות
    // TODO: default tags imported. Need to implement addition of other tags.
    $scope.filterCurrProjectTags = function (project) {
        return $scope.course ? project.projectid == $scope.course.projectid : false;
    };


    // add new subject to syllabus 

    // $scope.userInput = "";
    // $scope.newMainSubjects = []; 
    // $scope.newSubSubjects = {
    //     subID: [],
    // }; 

    // $scope.addSubject = function (subject) {
    //
    // }

    // $scope.addSubject = function (context) {
    //     context.push({
    //         "subjectid": null,
    //         "subject": '',
    //         "subjectinarabic": '',
    //         "subsubjects": []
    //     });
    //};

    
    $scope.emptySyllabus = function () {
        if (!confirm("בטוח\\ה? כל הנושאים יימחקו!"))
            return;
        while ($scope.course.subjects.length > 0) {
            $scope.deleteSubject($scope.course.subjects[0], $scope.course.subjects);
        }
        alert("ריקון זמני בלבד - יש להטמיע מחיקה, ריקון ושמירה")
    };

    $scope.deleteSubject = function (subject, roots) {
        // emptying entire syllabus
        if (roots) {
            var index = roots.indexOf(subject);
            if (index > -1) {
                roots.splice(index, 1);
            }
        }

        // if (subject.subjectid) {
        //     $scope.course.subjectsToDelete.push(subject.subjectid);
        // }
        // for (var i = 0; i < subject.subsubjects.length; i++) {
        //     $scope.deleteSubject(subject.subsubjects[i], null);
        // }
    };
    
});
