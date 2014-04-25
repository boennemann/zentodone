angular.module('zentodone').controller('InboxCtrl', function ($scope, tasks, Task) {
  var inbox = $scope.inbox = tasks.getAll(Task.INBOX)

  $scope.newTask = function() {
    var title = $scope.taskTitle.trim()

    if (!title) return

    $scope.inbox.push(tasks.add(title))

    $scope.taskTitle = ''
    $scope.taskInput.$setPristine()

    angular.element('input').blur()
  }

  function removeFromInbox(data) {
    var index = inbox.indexOf(data);
    if (index > -1) {
      inbox.splice(index, 1);
    }
  }

  $scope.setDeleted = function(data) {
    var task = new Task(data)
    task.setDeleted()
    if (task.convertTo(Task.ARCHIVE)) {
      removeFromInbox(data)
    }
  }

  $scope.setDone = function(data) {
    var task = new Task(data)
    task.setDone()
    if (task.convertTo(Task.ARCHIVE)) {
      removeFromInbox(data)
    }
  }

  $scope.convertToMit = function(data) {
    var task = new Task(data)
    if (task.convertTo(Task.MIT)) {
      data.dueDate = Date.now()
      removeFromInbox(data)
    }
  }

  $scope.convertToBr = function(data) {
    var task = new Task(data)
    if (task.convertTo(Task.BR)) {
      data.dueDate = Date.now()
      removeFromInbox(data)
    }
  }
})
