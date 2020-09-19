function createEmployeeRecord(arrayOfEmployeeInfo) {
    const timeOutEvents = [];
    const timeInEvents = [];
    const employRecordObject = {
        firstName: arrayOfEmployeeInfo[0],
        familyName: arrayOfEmployeeInfo[1],
        title: arrayOfEmployeeInfo[2],
        payPerHour: arrayOfEmployeeInfo[3],
        timeOutEvents: timeOutEvents,
        timeInEvents: timeInEvents,
    };

    return employRecordObject

}


function createEmployeeRecords(employeeOfArray) {

    return employeeOfArray.map(el =>
        Object.assign({}, createEmployeeRecord(el))
    )


}

function createTimeInEvent(createEmployeeRecord, dataStamp) {
    const date = dataStamp.split(" ")[0]
    const hour = parseInt(dataStamp.split(" ")[1])

    createEmployeeRecord.timeInEvents.push({ type: "TimeIn", date: date, hour: hour })
    return createEmployeeRecord

}

function createTimeOutEvent(createEmployeeRecord, dataStamp) {
    const date = dataStamp.split(" ")[0]
    const hour = parseInt(dataStamp.split(" ")[1])

    createEmployeeRecord.timeOutEvents.push({ type: "TimeOut", date: date, hour: hour })
    return createEmployeeRecord
}


function hoursWorkedOnDate(createEmployeeRecord, date) {
    // Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent


    let a = createEmployeeRecord.timeInEvents.find(el => el.date === date)
    let b = createEmployeeRecord.timeOutEvents.find(el => el.date === date)

    a = parseInt((a.hour).toString().slice(0, -2))
    b = parseInt((b.hour).toString().slice(0, -2))
    let workedHour = b - a
    return workedHour

}



function wagesEarnedOnDate(createEmployeeRecord, date) {

    const workedHour = hoursWorkedOnDate(createEmployeeRecord, date)
    const PayOwed = workedHour * createEmployeeRecord.payPerHour
    return PayOwed


}

function allWagesFor(employee) {
    //find avaiable dates 
    let total = 0
    for (let element of employee.timeOutEvents) {
        let date = element.date
        total += wagesEarnedOnDate(employee, date)

    }
    return total

}

function calculatePayroll(employees) {

    return employees.reduce((total, element) =>
        total + allWagesFor(element), 0)

}


function findEmployeeByFirstName(srcArray, firstName) {

    let result = srcArray.find(element => element.firstName == firstName)
    return result
}