angular.module('zentodone', ['bp', 'angular-loading-bar', 'hoodie'])
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
      .state('task', {
        url: '/tasks/:id',
        templateUrl: 'views/task.html',
        controller: 'TaskCtrl',
        data: {
          up: 'inbox',
          transition: 'scale'
        }
      })
  })
  .run(function($rootScope, $state, hoodie) {
    $rootScope.$on('$stateChangeStart', function(event, to) {
      if (!hoodie.account.hasAccount() && to.name !== 'account') {
        event.preventDefault()
        $state.go('account')
      }
    })
  })
