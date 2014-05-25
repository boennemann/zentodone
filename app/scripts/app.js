/*!
* Zen To Done
* https://git.io/zentodone
*
* Copyright 2014 Stephan Bönnemann
*
* MultiMedia Project 1 for MultiMedia Technology
* Fachhochschule Salzburg GmbH
* http://www.fh-salzburg.ac.at/
*
* Released under the MIT license.
*/
angular.module('zentodone', ['bp', 'angular-loading-bar', 'hoodie', 'monospaced.elastic'])
  .config(function($urlRouterProvider, $stateProvider, bpAppProvider, cfpLoadingBarProvider) {

    bpAppProvider.setConfig({
      platform: localStorage.getItem('platform') || 'ios'
    })

    cfpLoadingBarProvider.includeSpinner = false;

    $urlRouterProvider.otherwise('/inbox');

    $stateProvider
      .state('inbox', {
        url: '/inbox',
        templateUrl: 'views/inbox.html',
        controller: 'InboxCtrl'
      })
      .state('account', {
        url: '/inbox/account',
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        data: {
          modal: true
        }
      })
      .state('mit', {
        url: '/mit',
        templateUrl: 'views/mit.html',
        controller: 'MitCtrl',
        data: {
          title: 'Most Important Tasks'
        }
      })
      .state('br', {
        url: '/br',
        templateUrl: 'views/br.html',
        controller: 'BrCtrl',
        data: {
          title: 'Big Rocks'
        }
      })
      .state('inboxTask', {
        url: '/inbox/:id',
        templateUrl: 'views/task.html',
        controller: 'TaskCtrl',
        data: {
          taskType: 1
        }
      })
      .state('mitTask', {
        url: '/mit/:id',
        templateUrl: 'views/task.html',
        controller: 'TaskCtrl',
        data: {
          taskType: 2
        }
      })
      .state('brTask', {
        url: '/br/:id',
        templateUrl: 'views/task.html',
        controller: 'TaskCtrl',
        data: {
          taskType: 3
        }
      })
  })
  .run(function($rootScope, $state, $q, $window, hoodie) {
    $rootScope.$on('$stateChangeStart', function(event, to) {
      if (!hoodie.account.hasAccount() && to.name !== 'account') {
        event.preventDefault()
        $state.go('account')
      }
    })

    var defer = $q.defer()
    var cache = $window.applicationCache
    cache.addEventListener('updateready', defer.resolve)

    if (cache.status === cache.UPDATEREADY) {
      defer.resolve()
    }

    defer.promise.then(function() {
      $window.location.reload()
    })
  })
