// Your code here
function createEmployeeRecord(array){
    let obj = {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    }
    return obj
  }
  
  function createEmployeeRecords(nestedArray){
    return nestedArray.map(arr => {
      return createEmployeeRecord(arr)
    });
  }
  
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
  
  function hoursWorkedOnDate(employeeObj, date){
    let timeIn = employeeObj.timeInEvents.find((event)=>{return event.date === date})
    let hourIn = timeIn.hour
    let timeOut = employeeObj.timeOutEvents.find((event)=>{return event.date === date})
    let hourOut = timeOut.hour
    let hoursWorked = (hourOut - hourIn)/100
    return hoursWorked
  }
  
  function wagesEarnedOnDate(employeeObj, date){
    let hoursWorked = hoursWorkedOnDate(employeeObj, date)
    let payRate = employeeObj.payPerHour
    let payOwed = hoursWorked * payRate
    return payOwed
  }
  
  function allWagesFor(employeeObj){
    let dateArray = employeeObj.timeInEvents.map(event => {
      return event.date
    })
    let arrayOfWages = dateArray.map(date => {
      return wagesEarnedOnDate(employeeObj, date)
    })
    let totalWages = arrayOfWages.reduce((total, currentVal) => total + currentVal, 0)
    return totalWages
  }
  
  // function allWagesFor(eRecord) {
  //   let allDates = eRecord.timeInEvents.map(timeEvent => timeEvent.date)
  //   let totalPay = allDates.reduce((total, date) => total + wagesEarnedOnDate(eRecord, date), 0)
  //   return totalPay
  // }
  
  
  function calculatePayroll(employeeArray){
    let payOwedToAll = employeeArray.reduce((total, employee) => total + allWagesFor(employee), 0)
    return payOwedToAll
    // let wagesArray = employeeArray.map(employee => {
    //   return allWagesFor(employee)
    // })
    // let payOwedToAll = wagesArray.reduce((total, currentVal) => total + currentVal, 0)
  }
  
  function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find((employeeObj) => {
      return employeeObj.firstName === firstName
    })
  }