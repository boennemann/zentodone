angular.module('zentodone').factory('tasks', function ($rootScope, storage, Task) {
  storage.bind($rootScope, 'tasksData')
  if (!$rootScope.tasksData.length) {
    $rootScope.tasksData = []
  }
  var tasksData = $rootScope.tasksData

  return {
    get: function(id) {
      for (var i = 0; i < tasksData.length; i++) {
        if (tasksData[i].id = id) {
          return tasksData[i]
        }
      }
    },
    getAll: function(type) {
      if (!Task.isType(type)) {
        return tasksData
      }

      var tasksDataOfType = []
      for (var i = 0; i < tasksData.length; i++) {
        if (tasksData[i].type === type) {
          tasksDataOfType.push(tasksData[i])
        }
      }
      return tasksDataOfType
    },
    add: function(title, description) {
      var newTask = new Task(title, description)
      tasksData.push(newTask.data)
      return newTask.data
    }
  }
})
