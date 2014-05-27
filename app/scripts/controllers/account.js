angular.module('zentodone').controller('AccountCtrl', function ($q, $window, $scope, $state, $http, hoodie, hoodieAccount) {
  var data = $scope.data = {}
  $scope.allowSignUp = false
  $scope.account = hoodieAccount

  $scope.resetProgress = function() {
    hoodie.store.removeAll('progress')
  }

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
    $q.when(hoodieAccount.signOut())
      .catch(function() {
        // Sometimes the SignOut is broken
        // clearing the localStorage and reloading
        // has the same effect as a logout so:
        $window.localStorage.clear()
        $window.location.reload()
      })
  }

  $http.get('package.json')
    .then(function(res) {
      $scope.package = res.data
    })
})
