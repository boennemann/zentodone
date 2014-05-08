angular.module('zentodone')
  .controller('TaskCtrl', function (tasks, Task, $scope, $state, hoodie) {
    var lastType
    var params = $state.params
    var current = $state.current

    $scope.task = {}
    tasks.get(params.id)
      .then(function(data) {
        goToCorrectType(data)
        $scope.task = data
        lastType = $scope.task.taskType
      })

    tasks.extend($scope)


    function goToCollection() {
      var navbarCtrl = angular.element('bp-navbar').controller('bpNavbar')
      $state.go(navbarCtrl.getUpFromState(current).state)
    }

    function goToCorrectType(task) {
      if (current.data.taskType !== task.taskType) {
        $state.go(Task.types[task.taskType] + 'Task', {id: task.id})
      }
    }

    $scope.handle = function(promise) {
      promise.then(function(task) {
        if (task.taskType === Task.ARCHIVE) {
          return goToCollection()
        }
        goToCorrectType(task)
      })
    }

    $scope.update = function() {
      return hoodie.store.update('task', $scope.task.id, $scope.task)
    }
  })
