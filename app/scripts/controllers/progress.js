angular.module('zentodone').controller('ProgressCtrl', function ($scope, $q, hoodie) {

  $scope.instructions = true

  $scope.sawInstructions = function(state) {
    var progress
    $q.when(hoodie.store.find('progress', state))
      .then(function(data) {
        $scope.instructions = data.count > 0 ? false : true
        progress = data
      }, function() {
        $scope.instructions = true
        progress = {
          id: state,
          count: 0
        }
      })
      .then(function() {
        progress.count++
        hoodie.store.add('progress', progress)
      })
  }
})
