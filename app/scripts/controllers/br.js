angular.module('zentodone').controller('BrCtrl', function ($scope, $filter, tasks, Task) {
  var ONE_WEEK = 7*24*60*60*1000;

  var allBrs = tasks.getAll(Task.BR)
  var rescheduledBrs = []
  var br = $scope.br = []
  var today = new Date()


  function weeksOff(date) {
    date = new Date(date)
    return Math.round((date.getTime() - today.getTime())/(ONE_WEEK))
  }

  function reschedule(task) {
    delete task.dueDate
    rescheduledBrs.push(task)
  }

  allBrs = $filter('orderBy')(allBrs, function(br) {
    return br.dueDate
  })

  // Fill up days w/tasks
  for (var i = 0; i < allBrs.length; i++) {
    var currentTask = allBrs[i]

    // Tasks w/o dueDate have lowest priority and are therefore rescheduled
    if (!currentTask.dueDate) {
      reschedule(currentTask)
      continue
    }

    var weekOffset = weeksOff(currentTask.dueDate)

    // Overdue tasks are inherited for today with highest priority
    if (weekOffset < 0) {
      var overdue = Math.abs(weekOffset)
      currentTask.dueDate += (overdue * ONE_WEEK)

      if (!angular.isNumber(currentTask.overdue)) {
        currentTask.overdue = 0
      }

      currentTask.overdue += overdue
      weekOffset = 0
    }

    var currentDay = br[weekOffset]

    if (!angular.isArray(currentDay)) {
      currentDay = br[weekOffset] = []
    }

    // Its not allowed to have more than 3 MITs per day
    if (currentDay.length > 2) {
      reschedule(currentTask)
      continue
    }

    currentDay.push(currentTask)
  }

  // Rescheduled MITs are reordered, so that the oldest Tasks have to be done first
  rescheduledBrs = $filter('orderBy')(rescheduledBrs, function(br) {
    return br.date
  })

  // Fill up days w/rescheduled MITs
  for (var j = 0; j < rescheduledBrs.length; j++) {
    var dayIndex = br.length-1
    var dayToFill = br[dayIndex]

    // Either there's space remaining in an existing day or a new day is initialized
    if (angular.isUndefined(dayToFill) || dayToFill.length > 2) {
      dayToFill = []
      dayIndex = br.push(dayToFill) - 1
    }

    var taskToAssign = rescheduledBrs[j]
    taskToAssign.dueDate = today.getTime() + (dayIndex * ONE_WEEK)
    dayToFill.push(taskToAssign)
  }
})
