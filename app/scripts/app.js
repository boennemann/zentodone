'use strict'
angular.module('ztd', ['bp', 'angular-loading-bar'])
  .config(function($urlRouterProvider, $stateProvider, bpAppProvider, cfpLoadingBarProvider) {

    bpAppProvider.setConfig({
      platform: localStorage.getItem('platform') || 'ios'
    })

    cfpLoadingBarProvider.includeSpinner = false;

    $urlRouterProvider.otherwise('/inbox');

    $stateProvider
      .state('inbox', {
        url: '/inbox',
        templateUrl: 'views/inbox.html'
      })
  })
