angular.module('zentodone').controller('InboxCtrl', function ($scope, tasks, Task) {
  $scope.inbox = []
  tasks.extend($scope)

  // http://cubiq.org/add-to-home-screen
  addToHomescreen({
    maxDisplayCount: 3
  })

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
    var title = ($scope.taskTitle || '').trim()

    if (!title) return

    tasks.add(title)

    $scope.taskTitle = ''
    $scope.taskInput.$setPristine()
  }
})
