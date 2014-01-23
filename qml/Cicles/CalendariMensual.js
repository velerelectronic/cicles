
Date.prototype.addMonths = function(months) {
    this.setMonth(this.getMonth()+months);
}

Date.prototype.addYears = function(years) {
    this.setFullYear(this.getFullYear()+years);
}

function getWeekDayFromMonday(data) {
    return (data.getDay() + 6) % 7;
}

function generaCalendariMensual(modelid,calendariVisual,reset,monthOffset,yearOffset) {
    function addDays(data,days) {
        data.setDate(data.getDate()+days);
        return data;
    }

    function firstDayDate(data) {
        var novadata = new Date(data.getFullYear(),data.getMonth(),1);
        return novadata;
    }

    var sameDates = function(date1,date2) {
        return ((date1.getFullYear()==date2.getFullYear())&&(date1.getMonth()==date2.getMonth())&&(date1.getDate()==date2.getDate()));
    }

    var today = new Date();
    var targetDate;
    if (reset==true) {
        targetDate = new Date(today.getFullYear()+yearOffset,today.getMonth()+monthOffset,today.getDate());
    } else {
        targetDate = new Date(calendariVisual.shownYear+yearOffset,calendariVisual.shownMonth+monthOffset,today.getDate());
    }

    var targetMonth = targetDate.getMonth();
    var targetYear = targetDate.getFullYear();

    calendariVisual.shownMonth = targetMonth;
    calendariVisual.shownYear = targetYear;

    var firstDay = firstDayDate(targetDate);
    var diasetmana = getWeekDayFromMonday(firstDay);
    firstDay = addDays(firstDay,- ((diasetmana>0)?diasetmana:7) );

    var lastDay = new Date(firstDay.getFullYear(),firstDay.getMonth()+1,0);
    var tmp = getWeekDayFromMonday(lastDay);


    // 42 dies: 6 setmanes
    var week = new Array();
    modelid.clear();
    for (var setmana=0; setmana<6; setmana++) {
        week = new Array();
        for (var weekday=0; weekday<7; weekday++) {
            var month = firstDay.getMonth();
            var monthType = "",dayType = "";
            if (month == targetMonth) {
                monthType = 1;
            } else {
                monthType = 0;
            }
            // Is it today?
            if (sameDates(firstDay,today)) {
                dayType = 'today';
            }

            var day = firstDay.getDate().toString();
            week.push({'monthType':monthType,'dayType':dayType,'day':day});
            firstDay = addDays(firstDay,1);
        }
        modelid.append({'days':week});
    }
}
