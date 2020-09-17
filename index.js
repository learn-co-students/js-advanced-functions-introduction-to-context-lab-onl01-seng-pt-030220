// Your code here
class EmployeeRecord {
    constructor(array) {
        this.firstName = array[0]
        this.familyName = array[1]
        this.title = array[2]
        this.payPerHour = array[3]
        this.timeInEvents = []
        this.timeOutEvents = []
    }

    addTimeInEvent(timeIn) {
        const record = new TimeEvent(timeIn, "TimeIn")
        this.timeInEvents.push(record)
        return this
    }

    addTimeOutEvent(timeOut) {
        const record = new TimeEvent(timeOut, "TimeOut")
        this.timeOutEvents.push(record)
        return this
    }

    timeEventsAt(date) {
        let result = {}
        result["timeIn"] = this.timeInEvents.find((e) => {
            if (e.date === date) {
                return e
            }
        })
        result["timeOut"] = this.timeOutEvents.find((e) => {
            if (e.date === date) {
                return e
            }
        })
        return result
    }
}

class TimeEvent {
    constructor(input, type) {
        this.hour = parseInt(input.split(" ")[1])
        this.date =  input.split(" ")[0]
        this.type = type
    }
}

function createEmployeeRecord(array) {
    return new EmployeeRecord(array)
}

function createEmployeeRecords(array) {
    return array.map(object => {
        return new EmployeeRecord(object)
    })
}

function createTimeInEvent(record, timeIn) {
    return record.addTimeInEvent(timeIn)
}

function createTimeOutEvent(record, timeOut) {
    return record.addTimeOutEvent(timeOut)
}

function hoursWorkedOnDate(record, date) {
    const timeEvents = record.timeEventsAt(date)
    return (timeEvents.timeOut.hour - timeEvents.timeIn.hour) / 100
}

function wagesEarnedOnDate(record, date) {
    const hoursWorked = hoursWorkedOnDate(record, date)
    return record.payPerHour * hoursWorked
}

function allWagesFor(record) {
    const dates = record.timeInEvents.map(object => object.date)
    return dates.reduce((total, curVal) => total + wagesEarnedOnDate(record, curVal), 0)
}

function calculatePayroll(array) {
     return array.reduce((total, curVal) => total + allWagesFor(curVal), 0)
}

function findEmployeeByFirstName(empsArray, name) {
    return empsArray.find((emp) => {
        if (emp.firstName === name) {
            return emp
        }
    })
}