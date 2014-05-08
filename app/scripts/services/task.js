angular.module('zentodone').factory('Task', function ($q, hoodie) {
  // Task types
  var INBOX = 1
  var MIT = 2
  var BR = 3
  var ARCHIVE = 4

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
  Task.types = [,'inbox','mit','br','archive']

  Task.isType = function(type) {
    return type === INBOX || type === MIT || type ===  BR || type === ARCHIVE
  }

  Task.prototype.setDone = function() {
    this.data.done = true
    return $q.when(hoodie.store.update('task', this.data.id, {
      done: true,
      taskType: ARCHIVE
    }))
  }

  Task.prototype.setDeleted = function() {
    this.data.deleted = true
    return $q.when(hoodie.store.update('task', this.data.id, {
      deleted: true,
      taskType: ARCHIVE
    }))
  }

  Task.prototype.convertTo = function(type) {
    if (type !== this.data.taskType && Task.isType(type)) {
      this.data.taskType = type
      this.data.dueDate = Date.now()
      return $q.when(hoodie.store.update('task', this.data.id, {
        taskType: type,
        dueDate: this.data.dueDate
      }))
    }

    var deferred = $q.defer()
    deferred.reject(false)
    return deferred.promise
  }

  return Task
});
