angular.module('zentodone').controller('BrCtrl', function ($scope, tasks, Task, sortTasks) {
  var ONE_WEEK = 7*24*60*60*1000;
  $scope.br = []
  function fetchTasks() {
    tasks.getAll(Task.BR)
      .then(function(allBrs) {
        $scope.br = sortTasks(allBrs, ONE_WEEK);
      })
  }

  fetchTasks()

  $scope.$on('taskChange', function() {
    fetchTasks()
  })
})
