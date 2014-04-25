angular.module('zentodone')
  .controller('TaskCtrl', function (tasks, $scope, $state) {
    var params = $state.params
    $scope.task = tasks.get(params.id)
  })
