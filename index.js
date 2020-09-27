// Your code here

function createEmployeeRecord(arr){
    let obj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return obj

}

function createEmployeeRecords(array){
    return array.map(ele => {
        return createEmployeeRecord(ele)
    })
}

function createTimeInEvent(employee, timeStamp){
    let obj = {
        type: 'TimeIn',
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.split(" ")[1])
    }
    employee.timeInEvents.push(obj)
    return employee;
}

function createTimeOutEvent(employee, timeStamp){
    let obj = {
        type: 'TimeOut',
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.split(" ")[1])

    }
    employee.timeOutEvents.push(obj)
    return employee;
}

function hoursWorkedOnDate(employee, date){
    let timeIn = employee.timeInEvents.find(timeIn => timeIn.date === date)
    let hourIn = timeIn.hour
    let timeOut = employee.timeOutEvents.find(timeIn => timeIn.date === date)
    let hourOut = timeOut.hour
    let hoursWorked = (hourOut - hourIn)/100
    return hoursWorked
}

function wagesEarnedOnDate(employee, date){
    let hoursWorked = hoursWorkedOnDate(employee, date)
    let wages = hoursWorked * employee.payPerHour
    return wages
}

function allWagesFor(employee){
    let datesWorked = employee.timeInEvents.map(work => {
        return work.date
    })
    let wagesOwed = datesWorked.map(date => {
        return wagesEarnedOnDate(employee, date)
    })
    let totalWages = wagesOwed.reduce((total, currentVal) =>  total + currentVal, 0)

    return totalWages
}

function calculatePayroll(employees){
    let payroll = employees.reduce((total, employee) => total + allWagesFor(employee),0)
    return payroll;

}

function findEmployeeByFirstName(array, firstName){
    return array.find(employee => {
        return employee.firstName === firstName
    })

}