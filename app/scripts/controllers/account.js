angular.module('zentodone').controller('AccountCtrl', function ($scope, $state, $http, hoodieAccount) {
  var data = $scope.data = {}
  $scope.allowSignUp = false
  $scope.account = hoodieAccount

  $scope.handleForm = function() {
    if (data.password2) {
      if (!$scope.hasSamePassword()) { return }

      hoodieAccount.signUp(data.email, data.password)
        .then(function() {
          $state.go('inbox')
        })

      return
    }
    var signIn = hoodieAccount.signIn(data.email, data.password)
    signIn.then(function() {
      $state.go('inbox')
    })

    signIn.catch(function() {
      $scope.allowSignUp = true
    })
  }

  $scope.hasRepeated = function() {
    return angular.isDefined(data.password2)
  }

  $scope.hasSamePassword = function() {
    return data.password2 && data.password === data.password2
  }

  $scope.getCurrentUser = function() {
    return hoodieAccount.username
  }

  $scope.isSignedIn = function() {
    return !!$scope.getCurrentUser()
  }

  $scope.signOut = function() {
    return hoodieAccount.signOut()
  }

  $http.get('package.json')
    .then(function(res) {
      $scope.package = res.data
    })
})
