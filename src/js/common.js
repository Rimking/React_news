


//转换时间格式 YYYY-MM-DD
export function dateToFormatFull(time) {
    if (time != null) {
        let dateee = new Date(time);
        let month = dateee.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let day = dateee.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let date = dateee.getFullYear() + "-" + month + "-" + day;
        return date;
    }
    return undefined
}

//转换时间格式 YYYY-MM
export function dateToFormatMonth(time) {
    if (time != null) {
        let dateee = new Date(time);
        let month = dateee.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let day = dateee.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let date = dateee.getFullYear() + "-" + month;
        return date;
    }
    return undefined
}

//数组去重
export function unique(ary) {
    let newAry = [];
    for (let i = 0; i < ary.length; i++) {
        if (newAry.indexOf(ary[i]) === -1) {
            newAry.push(ary[i]);
        }
    }
    return newAry;
}

//转换时间格式 YYYY-MM-DD HH:MM:SS
export function dateToFormat(time) {
    if (time != null) {
        let dateee = new Date(time).toJSON();
        let date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        return date;
    }
    return undefined
}

//转换时间格式 YYYY-MM
export function dateToFormatYearMonth(time) {
    let currDate = new Date(time);
    let year = currDate.getFullYear();
    let month = currDate.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let arr = [];
    arr.push(year);
    arr.push(month);
    return arr;
}

//转换时间格式 YYYY
export function dateToFormatYear(time) {
    let currDate = new Date(time);
    let year = currDate.getFullYear();
    return year;
}



//开始时间不能大于等于结束时间
export function checkDate(startDate, endDate) {
    var startDateTemp = new Date(startDate).getTime();
    var endDateTemp = new Date(endDate).getTime();
    if (startDateTemp > endDateTemp || startDateTemp == endDateTemp) {
        return true;
    } else {
        return false;
    }
}

export function getMuLinUser() {
    let user = localStorage.getItem("muLinUser");
    if (user) {
        user = JSON.parse(user);
    }
    return user;
}

//获取当前日期
export function initCurrDate() {
    let currDate = new Date();
    let year = currDate.getFullYear();
    let month = currDate.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let day = currDate.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    let startTime = dateToFormatFull(new Date());
    return startTime;
}

//获取当前日期对应的下月日期
export function initLastDate(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}