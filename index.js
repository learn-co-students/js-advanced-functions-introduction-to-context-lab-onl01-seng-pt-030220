// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    // console.log `Array these ${arrays}`
    return arrays.map(e => createEmployeeRecord(e));
}

function createTimeInEvent(employeeRecord, dateTime) {
    let dateTimeSplit = dateTime.split(' ');
    // console.log(`Split the date and time ${datimeSplit}`);
    let recordDate = dateTimeSplit[0];
    let recordTime = dateTimeSplit[1];
    employeeRecord.timeInEvents.push(
        {type: "TimeIn", hour: parseInt(recordTime), date: recordDate}
    )
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
    let dateTimeSplit = dateTime.split(' ');
    let recordDate = dateTimeSplit[0];
    let recordTime = dateTimeSplit[1];
    employeeRecord.timeOutEvents.push(
        {type: "TimeOut", hour: parseInt(recordTime), date: recordDate}
    )
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, recordDate) {
    let recordIn = employeeRecord.timeInEvents.find(e => e.date == recordDate);
    let recordOut = employeeRecord.timeOutEvents.find(e => e.date == recordDate);
    // console.log(`Clock In ${recordIn} Clock Out ${recordOut}`)
    let formatTimeIn = recordIn.hour;
    let formatTimeOut = recordOut.hour;
    let hoursWorked = (formatTimeOut - formatTimeIn) / 100;
    // console.log(hours);
    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, recordDate) {
    let hours = hoursWorkedOnDate(employeeRecord, recordDate);
    let pay = parseInt(employeeRecord.payPerHour); //createEmployeeRecord(array) payPerHour: array[3],
    return (hours * pay);
}

function allWagesFor(employeeObj){
    let allDates = employeeObj.timeInEvents.map(e => e.date);
    let wages = allDates.reduce(function(total, element) {
        return wagesEarnedOnDate(employeeObj, element) + total
    }, 0)
    return wages;
}

function calculatePayroll(array) {
    let totals = array.reduce(function(total, element) {
        return allWagesFor(element) + total
    }, 0)
    return(totals);
}

function findEmployeeByFirstName(array, employeeFirstName) {
    return array.find(e => e.firstName == employeeFirstName) //createEmployeeRecord(array) firstName: array[0],
}