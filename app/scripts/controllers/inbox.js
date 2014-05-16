angular.module('zentodone').controller('InboxCtrl', function ($scope, tasks, Task) {
  $scope.inbox = []
  tasks.extend($scope)

  function fetchTasks() {
    tasks.getAll(Task.INBOX)
      .then(function(tasks) {
        $scope.inbox = tasks
      })
  }

  fetchTasks()

  $scope.$on('taskChange', function() {
    fetchTasks()
  })

  $scope.newTask = function() {
    var title = $scope.taskTitle.trim()

    if (!title) return

    tasks.add(title).then(function(data) {
      $scope.inbox.push(data)
    })

    $scope.taskTitle = ''
    $scope.taskInput.$setPristine()
  }
})
