angular.module('zentodone').factory('Task', function ($q, $filter, hoodie) {
  // Task types
  var INBOX = 1
  var MIT = 2
  var BR = 3
  var ARCHIVE = 4
  var ONE_DAY = 24*60*60*1000
  var ONE_WEEK = 7*24*60*60*1000

  function Task(title, description) {
    if (angular.isObject(title)) {
      this.data = title
      return
    }

    this.data = {
      id: Math.random().toString(36).substr(2, 9),
      date: Date.now(),
      dueDate: null,
      taskType: INBOX,
      done: false,
      deleted: false,
      title: title,
      description: description
    }
  }

  Task.INBOX = INBOX
  Task.MIT = MIT
  Task.BR = BR
  Task.ARCHIVE = ARCHIVE
  Task.ONE_DAY = ONE_DAY
  Task.ONE_WEEK = ONE_WEEK
  Task.types = [,'inbox','mit','br','archive']

  Task.isType = function(type) {
    return type === INBOX || type === MIT || type ===  BR || type === ARCHIVE
  }

  Task.prototype.setDone = function() {
    var data = this.data
    var taskType = data.taskType

    switch (this.data.taskType) {
    case MIT:
      if ($filter('unitsOff')(ONE_DAY, data.dueDate) > 0) {
        taskType = ARCHIVE
      }
      break;
    case BR:
      if ($filter('unitsOff')(ONE_WEEK, data.dueDate) > 0) {
        taskType = ARCHIVE
      }
      break;
    }

    return $q.when(hoodie.store.update('task', this.data.id, {
      done: true,
      taskType: taskType
    }))
  }

  Task.prototype.setDeleted = function() {
    return $q.when(hoodie.store.update('task', this.data.id, {
      deleted: true,
      taskType: ARCHIVE
    }))
  }

  Task.prototype.convertTo = function(type) {
    if (type !== this.data.taskType && Task.isType(type)) {
      var changes = {taskType: type}
      if (type === MIT || type === BR) {
        changes.dueDate = Date.now()
      }
      return $q.when(hoodie.store.update('task', this.data.id, changes))
    }

    var deferred = $q.defer()
    deferred.reject(false)
    return deferred.promise
  }

  return Task
});
