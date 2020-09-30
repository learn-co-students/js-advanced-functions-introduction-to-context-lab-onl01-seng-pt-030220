// Your code here
function createEmployeeRecord(arr){
  return {firstName:arr[0], familyName: arr[1], title:arr[2], payPerHour:arr[3], timeInEvents:[], timeOutEvents: []};
}

function createEmployeeRecords(arr){
  let result = [];
  for(let i =0; i < arr.length; i++){
    result.push(createEmployeeRecord(arr[i]))
  }
  return result;
}

function createTimeInEvent(employee, time){
  employee.timeInEvents.push({type:"TimeIn", date: time.split(" ")[0], hour: parseInt(time.split(" ")[1])});
  return employee;
}

function createTimeOutEvent(employee,time){
  employee.timeOutEvents.push({type:"TimeOut", date: time.split(" ")[0], hour: parseInt(time.split(" ")[1])});
  return employee;
}

function hoursWorkedOnDate(employee,date){
  let hourstimein = parseInt(employee.timeInEvents.find(element => element.date == date).hour)/100;
  let hourstimeout = parseInt(employee.timeOutEvents.find(element => element.date == date).hour)/100;
  let hours = hourstimeout - hourstimein;
  return hours;
}

function wagesEarnedOnDate(employee, date){
  return employee.payPerHour * hoursWorkedOnDate(employee,date);
}

function allWagesFor(employee){
  let total = 0;

  for(let i = 0; i < employee.timeOutEvents.length; i++){
    total += wagesEarnedOnDate(employee, employee.timeOutEvents[i].date);
  }
  return total;
}

function calculatePayroll(arr){
  let total = 0;
  for(let i =0; i < arr.length; i++){
    total += allWagesFor(arr[i])
  }
  return total;
}


function findEmployeeByFirstName(arr,name){
  return arr.find(element=> element.firstName == name);
}
