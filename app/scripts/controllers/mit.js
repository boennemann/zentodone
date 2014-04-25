angular.module('zentodone').controller('MitCtrl', function ($scope, $filter, tasks, Task) {
  var ONE_DAY = 24*60*60*1000;

  var allMits = tasks.getAll(Task.MIT)
  var rescheduledMits = []
  var mit = $scope.mit = []
  var today = new Date()


  function daysOff(date) {
    date = new Date(date)
    return Math.round((date.getTime() - today.getTime())/(ONE_DAY))
  }

  function reschedule(task) {
    delete task.dueDate
    rescheduledMits.push(task)
  }

  allMits = $filter('orderBy')(allMits, function(mit) {
    return mit.dueDate
  })

  // Fill up days w/tasks
  for (var i = 0; i < allMits.length; i++) {
    var currentTask = allMits[i]

    // Tasks w/o dueDate have lowest priority and are therefore rescheduled
    if (!currentTask.dueDate) {
      reschedule(currentTask)
      continue
    }

    var dayOffset = daysOff(currentTask.dueDate)

    // Overdue tasks are inherited for today with highest priority
    if (dayOffset < 0) {
      var overdue = Math.abs(dayOffset)
      currentTask.dueDate += (overdue * ONE_DAY)

      if (!angular.isNumber(currentTask.overdue)) {
        currentTask.overdue = 0
      }

      currentTask.overdue += overdue
      dayOffset = 0
    }

    var currentDay = mit[dayOffset]

    if (!angular.isArray(currentDay)) {
      currentDay = mit[dayOffset] = []
    }

    // Its not allowed to have more than 3 MITs per day
    if (currentDay.length > 2) {
      reschedule(currentTask)
      continue
    }

    currentDay.push(currentTask)
  }

  // Rescheduled MITs are reordered, so that the oldest Tasks have to be done first
  rescheduledMits = $filter('orderBy')(rescheduledMits, function(mit) {
    return mit.date
  })

  // Fill up days w/rescheduled MITs
  for (var j = 0; j < rescheduledMits.length; j++) {
    var dayIndex = mit.length-1
    var dayToFill = mit[dayIndex]

    // Either there's space remaining in an existing day or a new day is initialized
    if (angular.isUndefined(dayToFill) || dayToFill.length > 2) {
      dayToFill = []
      dayIndex = mit.push(dayToFill) - 1
    }

    var taskToAssign = rescheduledMits[j]
    taskToAssign.dueDate = today.getTime() + (dayIndex * ONE_DAY)
    dayToFill.push(taskToAssign)
  }
})
