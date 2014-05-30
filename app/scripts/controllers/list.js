angular.module('zentodone').controller('ListCtrl', function ($state, $scope, tasks, Task, sortTasks) {
  var state = $state.current
  var name = state.name
  var type = state.data.taskType
  var unit = type === Task.MIT ? Task.ONE_DAY : Task.ONE_WEEK

  $scope[name] = []
  tasks.extend($scope)

  function fetchTasks() {
    tasks.getAll(type)
      .then(function(all) {
        $scope[name] = sortTasks(all, unit);
      })
  }

  fetchTasks()

  $scope.$on('taskChange', function() {
    fetchTasks()
  })
})
