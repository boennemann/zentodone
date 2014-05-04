angular.module('zentodone').controller('InboxCtrl', function ($scope, tasks, Task) {
  $scope.inbox = []
  tasks.getAll(Task.INBOX)
    .then(function(tasks) {
      $scope.inbox = tasks
    })

  $scope.newTask = function() {
    var title = $scope.taskTitle.trim()

    if (!title) return

    tasks.add(title).then(function(data) {
      $scope.inbox.push(data)
    })

    $scope.taskTitle = ''
    $scope.taskInput.$setPristine()

    angular.element('input').blur()
  }

  function removeFromInbox(data) {
    var index = $scope.inbox.indexOf(data);
    if (index > -1) {
      $scope.inbox.splice(index, 1);
    }
  }

  $scope.setDeleted = function(data) {
    var task = new Task(data)
    task.convertTo(Task.ARCHIVE)
      .then(function() {
        return task.setDeleted()
      })
      .then(function() {
        removeFromInbox(data)
      })
  }

  $scope.setDone = function(data) {
    var task = new Task(data)
    task.convertTo(Task.ARCHIVE)
      .then(function() {
        return task.setDone()
      })
      .then(function() {
        removeFromInbox(data)
      })
  }

  $scope.convertToMit = function(data) {
    var task = new Task(data)
    task.convertTo(Task.MIT).then(function() {
      removeFromInbox(data)
    })
  }

  $scope.convertToBr = function(data) {
    var task = new Task(data)
    task.convertTo(Task.BR).then(function() {
      removeFromInbox(data)
    })
  }
})
