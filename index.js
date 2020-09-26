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
        var i = 0 
        for (i == 0; i < record.timeInEvents.length; i++ ){
        const timeIn = record.timeInEvents[i].hour
        const timeOut = record.timeOutEvents[i].hour
        const total = (timeOut - timeIn) / 100 
        // console.log(total)
        return total
        } 
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
    const total = [] 
    console.log(record.timeInEvents[1])
    dates.forEach(date => {
    const money = wagesEarnedOnDate(record,date)
    console.log(money)
    })
}


