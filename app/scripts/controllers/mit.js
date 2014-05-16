angular.module('zentodone').controller('MitCtrl', function ($scope, tasks, Task, sortTasks) {
  $scope.mit = []
  tasks.extend($scope)

  function fetchTasks() {
    tasks.getAll(Task.MIT)
      .then(function(allMits) {
        $scope.mit = sortTasks(allMits, Task.ONE_DAY);
      })
  }

  fetchTasks()

  $scope.$on('taskChange', function() {
    fetchTasks()
  })
})
