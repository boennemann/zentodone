angular.module('zentodone').factory('tasks', function ($rootScope, hoodie, $q, Task) {
  return {
    get: function(id) {
      return $q.when(hoodie.store.find('task', id))
    },
    getAll: function(type) {
      var promise = $q.when(hoodie.store.findAll('task'))
      if (!Task.isType(type)) {
        return promise
      }

      var deferred = $q.defer()
      promise.then(function(tasksData) {
        var tasksDataOfType = []
        for (var i = 0; i < tasksData.length; i++) {
          if (tasksData[i].taskType === type) {
            tasksDataOfType.push(tasksData[i])
          }
        }
        deferred.resolve(tasksDataOfType)
      })
      return deferred.promise
    },
    add: function(title, description) {
      var newTask = new Task(title, description)
      return $q.when(hoodie.store.add('task', newTask.data))
    }
  }
})
