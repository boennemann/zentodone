angular.module('zentodone')
  .controller('TaskCtrl', function (tasks, $scope, $state, hoodie) {
    var params = $state.params
    $scope.task = {}
    tasks.get(params.id)
      .then(function(data) {
        $scope.task = data
      })

    $scope.update = function() {
      return hoodie.store.update('task', $scope.task.id, $scope.task)
    }
  })
