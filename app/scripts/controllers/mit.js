angular.module('zentodone').controller('MitCtrl', function ($scope, tasks, Task, sortTasks) {
  var ONE_DAY = 24*60*60*1000;
  $scope.mit = []
  tasks.extend($scope)

  function fetchTasks() {
    tasks.getAll(Task.MIT)
      .then(function(allMits) {
        $scope.mit = sortTasks(allMits, ONE_DAY);
      })
  }

  fetchTasks()

  $scope.$on('taskChange', function() {
    fetchTasks()
  })
})
