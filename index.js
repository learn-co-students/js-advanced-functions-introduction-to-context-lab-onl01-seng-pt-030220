

function createEmployeeRecord(personArray){
  let testEmployee = {
    firstName: personArray[0],
    familyName: personArray[1],
    title: personArray[2],
    payPerHour: personArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return testEmployee;
};

function createEmployeeRecords(employeesArrays){
  return employeesArrays.map((employee)=>{
   return createEmployeeRecord(employee)
  })
};


function createTimeInEvent(employeeObj, dateTime){
  let timeIn = {
    type: 'TimeIn',
    date: dateTime.split(" ")[0],
    hour: parseInt(dateTime.split(" ")[1])
  }
  employeeObj.timeInEvents.push(timeIn)

  return employeeObj;
};


function createTimeOutEvent(employeeObj, dateTime){
  let timeOut = {
    type: 'TimeOut',
    date: dateTime.split(" ")[0],
    hour: parseInt(dateTime.split(" ")[1])
  }
  employeeObj.timeOutEvents.push(timeOut)

  return employeeObj;
};


function hoursWorkedOnDate(employeeObj, dateWorked){
  const dateIn = employeeObj.timeInEvents.find(event=>{ return event.date === dateWorked});
  const hourClockedIn = dateIn.hour;
  const dateOut = employeeObj.timeOutEvents.find(event=>{ return event.date === dateWorked});
  const hourClockedOut = dateOut.hour;
  let hoursWorked = (hourClockedOut - hourClockedIn) / 100;

  return hoursWorked;
};


function wagesEarnedOnDate(employeeObj, dateWorked){
  const hourlyPay= employeeObj.payPerHour;
  const hoursWorked = hoursWorkedOnDate(employeeObj, dateWorked);
  const datesPay = hoursWorked * hourlyPay;

  return parseInt(datesPay);
};


function allWagesFor(employeeObj){
  const employeeEvents = employeeObj.timeInEvents
  const datesWorked = employeeEvents.map(day => day.date )
  const wagesEarned = datesWorked.map(day => wagesEarnedOnDate(employeeObj, day))
  
  return wagesEarned.reduce((total, wage)=> total + wage, 0)
};


function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(employee => {
    return employee.firstName === firstName
  })
};


function calculatePayroll(srcArray){
  const allWages = srcArray.map(employee => {
    return allWagesFor(employee)
  })
  return allWages.reduce((total, wage)=> total + wage, 0)
};


// let marc = ['marcos', 'rodriguez', 'tech', 45]
// console.log(hoursWorkedOnDate(marc, "0044-03-15"))
// let marcVans = [['marcos', 'rodriguez', 'tech', 45], ['vanessa', 'rodriguez', 'M.A.', 50]]
// console.log(createEmployeeRecords(marcVans))