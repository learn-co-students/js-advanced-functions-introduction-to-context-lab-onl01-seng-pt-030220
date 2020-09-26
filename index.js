// Your code here

function createEmployeeRecord(records){
const returnedObject = {
    firstName: records[0], 
    familyName: records[1],
    title: records[2],
    payPerHour: records[3],
    timeInEvents: [],
    timeOutEvents: []
}
return returnedObject
}


function createEmployeeRecords(employeeRecord){
// we have an AoR 
// iterate through both arrays, and create new objects. 
const newEmployee = employeeRecord.map(record => createEmployeeRecord(record))
return newEmployee
}

function createTimeInEvent(employeeRecord, dateStamp){
const newDate = dateStamp.split(" ") 
// console.log(newDate)
var hour = newDate[1]
var hourString = parseInt(hour); 

const newObject = {
    type: "TimeIn", 
    hour: hourString,
    date: newDate[0] 
}
employeeRecord.timeInEvents.push(newObject)
return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    const newDate = dateStamp.split(" ") 
    // console.log(newDate)
    var hour = newDate[1]
    var hourString = parseInt(hour); 
    
    const newObject = {
        type: "TimeOut", 
        hour: hourString,
        date: newDate[0] 
    }
    employeeRecord.timeOutEvents.push(newObject)
    return employeeRecord
    }


    function hoursWorkedOnDate(record,date){
        const inFoundDate = record.timeInEvents.find(obj => obj.date === date)
        const outFoundDate = record.timeOutEvents.find(obj => obj.date === date)
        const timeIn = inFoundDate.hour
        const timeOut = outFoundDate.hour
        const total = (timeOut - timeIn) / 100 
        return total
}; 

function wagesEarnedOnDate(record, date){
const hourPay = record.payPerHour 
const hours = hoursWorkedOnDate(record, date) 
const hardDaysPay = hours * hourPay 
return hardDaysPay
}



function allWagesFor(record){
const dates = record.timeInEvents.map(date => {
    return date.date
    })
    // we have an array of dates now. 
   const total = [0] 
    dates.forEach(date => {
    const money = wagesEarnedOnDate(record,date)
    total.push(money)
    })
    const newTotal = total.reduce((total, amount) => total + amount)
    return newTotal
}


function findEmployeeByFirstName(srcArray, firstName){
// console.log(srcArray)
const findName = srcArray.find(obj => obj.firstName === firstName)
return findName
}

function calculatePayroll(array){
// console.log(array)
const allWages = [] 
array.forEach(obj => {
    const wages = allWagesFor(obj)
    allWages.push(wages)
})
const newTotal = allWages.reduce((total, amount) =>total + amount)
return newTotal
}