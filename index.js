
let testEmployee = {};

function createEmployeeRecord(array){
  testEmployee['firstName'] = array[0];
  testEmployee['familyName'] = array[1];
  testEmployee['title'] = array[2];
  testEmployee['payPerHour'] = array[3];
  testEmployee['timeInEvents'] = [];
  testEmployee['timeOutEvents'] = [];

  return testEmployee
}
let marcVans = [
  ['marcos', 'rodriguez', 'tech', 45],
  ['vanessa', 'rodriguez', 'M.A.', 50]]
// createEmployeeRecord(marcVans[0])

function createEmployeeRecords(employeesArrays){

  return employeesArrays.map((employee)=>{
   return createEmployeeRecord(employee)
  })

}



console.log(createEmployeeRecords(marcVans))