// Your code here
function createEmployeeRecord(index) {
    let array = {
        firstName: index[0],
        familyName: index[1],
        title: index[2],
        payPerHour: index[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return array
}

function createEmployeeRecords(nestedArray) {
    return nestedArray.map(array => {
        return createEmployeeRecord(array)
    });
}

//from Megs
function createTimeInEvent(employeeObj, dateStamp){
    let obj = {
      type: "TimeIn",
      hour: parseInt(dateStamp.split(" ")[1]),
      date: dateStamp.split(" ")[0]
    }
    employeeObj.timeInEvents.push(obj)
    return employeeObj
  }

function createTimeOutEvent(employeeObj, dateStamp){
    let obj = {
      type: "TimeOut",
      hour: parseInt(dateStamp.split(" ")[1]),
      date: dateStamp.split(" ")[0]
    }
    employeeObj.timeOutEvents.push(obj)
    return employeeObj
  }

//Learn
let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employeeObj, date) {
    let hoursWorked = hoursWorkedOnDate(employeeObj, date)
    let payRate = employeeObj.payPerHour
    let payOwed = hoursWorked * payRate 
    return payOwed
}

//Learn
let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

//Megs

// function AllWagesFor(employeeObj) {
//     let dateArray = employeeObj.timeInEvents.map(event => {
//         return event.date 
//     })
//     let arrayOfWages = dateArray.map(date => {
//         return wagesEarnedOnDate(employeeObj, date)
//     })
//     let totalWages = arrayOfWages.reduce((total, currentVal) => total + currentValue, 0)
//     return totalWages
// }

function calculatePayroll(employeeArray) {
    let payOwedToAll = employeeArray.reduce((total, employee) => total + allWagesFor(employee), 0)
    return payOwedToAll
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((employeeObj) => {
        return employeeObj.firstName === firstName
    })
}