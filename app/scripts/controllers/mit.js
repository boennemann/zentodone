angular.module('zentodone').controller('MitCtrl', function ($scope, tasks, Task, sortTasks) {
  var ONE_DAY = 24*60*60*1000;
  var allMits = tasks.getAll(Task.MIT)
  $scope.mit = sortTasks(allMits, ONE_DAY)
})
