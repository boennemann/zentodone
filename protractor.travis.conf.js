var config = require('./protractor.conf.js').config

config.sauceUser = process.env.SAUCE_USERNAME

config.sauceKey = process.env.SAUCE_ACCESS_KEY

config.multiCapabilities = [{
  browserName: 'chrome',
  platform: 'OS X 10.9',
  version: '34',
  name: 'Zen To Done E2E',
  'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
  build: process.env.TRAVIS_BUILD_NUMBER
// },{
//   browserName: 'iphone',
//   version: '7.1',
//   name: 'Zen To Done E2E',
//   'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
//   build: process.env.TRAVIS_BUILD_NUMBER
// },{
//   browserName: 'android',
//   version: '4.3',
//   name: 'Zen To Done E2E',
//   'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
//   build: process.env.TRAVIS_BUILD_NUMBER
}]

exports.config = config
