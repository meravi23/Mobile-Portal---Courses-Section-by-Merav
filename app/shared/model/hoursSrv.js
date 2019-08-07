app.factory("hoursSrv", function($log) {
    
    function calculateHours(report) {
        if(report.finishhour && report.starthour){
            var t1 = moment(report.finishhour, "hh:mm");
            var t2 = moment(report.starthour, "hh:mm");
            var t3 = moment.utc(moment(t1,"HH:mm").diff(moment(t2,"HH:mm"))).format("HH:mm");
            report.hours = t3;
        }
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

    function timeStringToAmount(timeString) {
        var hoursMinutes = timeString.split(":");
        var hours = parseInt(hoursMinutes[0]);
        var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1]) : 0;
        return hours + minutes / 60;
    }
        
    return {
        calculateHours: calculateHours, 
        getObjectArrayFieldById: getObjectArrayFieldById,
        getArrayFieldById: getArrayFieldById,
        timeStringToAmount: timeStringToAmount
    }
});