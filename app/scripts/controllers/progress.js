angular.module('zentodone').controller('ProgressCtrl', function ($scope, $q, hoodie) {

  $scope.instructions = true

  $scope.sawInstructions = function(state) {
    var progress
    $q.when(hoodie.store.find('progress', state))
      .then(function(data) {
        $scope.instructions = data.count > 1 ? false : true
        progress = data
      }, function() {
        $scope.instructions = true
        progress = {
          id: state,
          count: 0
        }
      })
      .then(function() {
        if (++progress.count <= 2) {
          hoodie.store.add('progress', progress)
        }
      })
  }
})
