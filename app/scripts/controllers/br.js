angular.module('zentodone').controller('BrCtrl', function ($scope, tasks, Task, sortTasks) {
  $scope.br = []
  tasks.extend($scope)

  function fetchTasks() {
    tasks.getAll(Task.BR)
      .then(function(allBrs) {
        $scope.br = sortTasks(allBrs, Task.ONE_WEEK);
      })
  }

  fetchTasks()

  $scope.$on('taskChange', function() {
    fetchTasks()
  })
})
