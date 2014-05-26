angular.module('zentodone').service('sortTasks', function ($filter, Task, hoodie) {
  return function(collection, unit) {
    var sortedTasks = []
    var rescheduledTasks = []
    var today = new Date()

    function reschedule(task) {
      delete task.dueDate
      rescheduledTasks.push(task)
    }

    collection = $filter('orderBy')(collection, function(task) {
      return task.dueDate
    })

    // Fill up units w/tasks
    for (var i = 0; i < collection.length; i++) {
      var currentTask = collection[i]

      // Tasks w/o dueDate have lowest priority and are therefore rescheduled
      if (!currentTask.dueDate) {
        reschedule(currentTask)
        continue
      }

      var unitOffset = $filter('unitsOff')(unit, currentTask.dueDate)

      // Overdue tasks are inherited for this unit with highest priority
      if (unitOffset < 0) {

        // Archive done tasks
        if (currentTask.done) {
          (new Task(currentTask)).convertTo(Task.ARCHIVE)
          continue
        }

        var overdue = Math.abs(unitOffset)
        currentTask.dueDate += (overdue * unit)

        if (!angular.isNumber(currentTask.overdue)) {
          currentTask.overdue = 0
        }

        currentTask.overdue += overdue
        unitOffset = 0

        hoodie.store.update('task', currentTask.id, currentTask)
      }

      var currentUnit = sortedTasks[unitOffset]

      if (!angular.isArray(currentUnit)) {
        currentUnit = sortedTasks[unitOffset] = []
      }

      currentUnit.offset = unitOffset

      // Its not allowed to have more than 3 Tasks per unit
      if (currentUnit.length > 2) {
        reschedule(currentTask)
        continue
      }

      currentUnit.push(currentTask)
    }

    // Rescheduled Tasks are reordered, so that the oldest Tasks have to be done first
    rescheduledTasks = $filter('orderBy')(rescheduledTasks, function(task) {
      return task.date
    })

    // Fill up units w/rescheduled taskss
    for (var j = 0; j < rescheduledTasks.length; j++) {
      var unitIndex = sortedTasks.length-1
      var unitToFill = sortedTasks[unitIndex]

      // Either there's space remaining in an existing unit or a new unit is initialized
      if (angular.isUndefined(unitToFill) || unitToFill.length > 2) {
        unitToFill = []
        unitIndex = sortedTasks.push(unitToFill) - 1
      }

      var taskToAssign = rescheduledTasks[j]
      taskToAssign.dueDate = today.getTime() + (unitIndex * unit)
      unitToFill.offset = unitIndex
      unitToFill.push(taskToAssign)

      hoodie.store.update('task', taskToAssign.id, taskToAssign)
    }

    return sortedTasks
  }
});
