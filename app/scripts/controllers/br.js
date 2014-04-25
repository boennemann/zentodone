angular.module('zentodone').controller('BrCtrl', function ($scope, tasks, Task, sortTasks) {
  var ONE_WEEK = 7*24*60*60*1000;
  var allBrs = tasks.getAll(Task.BR)
  $scope.br = sortTasks(allBrs, ONE_WEEK);
})
