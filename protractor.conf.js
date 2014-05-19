exports.config = {
  allScriptsTimeout: 11000,

  baseUrl: 'http://127.0.0.1:6001/',

  framework: 'jasmine',

  onPrepare: function() {

    // Disable animations so e2e tests run more quickly
    var disableNgAnimate = function() {
      angular.module('disableNgAnimate', []).run(function($animate) {
        $animate.enabled(false);
      })
    }

    browser.addMockModule('disableNgAnimate', disableNgAnimate)

    // Store the name of the browser that's currently being used.
    browser.getCapabilities().then(function(caps) {
      browser.params.browser = caps.get('browserName')
    })

    browser.get('http://127.0.0.1:6001/')
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  specs: [
    'test/e2e/*.js'
  ],

  capabilities: {
    browserName: 'chrome'
  }
}
