angular.module('zentodone').factory('Task', function () {
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
      type: INBOX,
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

  Task.isType = function(type) {
    return type === INBOX || type === MIT || type ===  BR || type === ARCHIVE
  }

  Task.prototype.setDone = function() {
    this.data.done = true
  }

  Task.prototype.setDeleted = function() {
    this.data.deleted = true
  }

  Task.prototype.convertTo = function(type) {
    if (type !== this.data.type && Task.isType(type)) {
      this.data.type = type
      this.data.dueDate = null
      return true
    }
    return false
  }

  return Task
});
