# Zen To Done
[![Build Status](https://api.travis-ci.org/boennemann/zentodone.svg?branch=master)](https://travis-ci.org/boennemann/zentodone)
[![Bower Dependency Status](https://www.versioneye.com/user/projects/53624813fe0d0724d4000080/badge.png)](https://www.versioneye.com/user/projects/53624813fe0d0724d4000080)
[![Dependency Status](https://david-dm.org/boennemann/zentodone.svg)](https://david-dm.org/boennemann/zentodone)
[![devDependency Status](https://david-dm.org/boennemann/zentodone/dev-status.svg)](https://david-dm.org/boennemann/zentodone#info=devDependencies)
[![Code Climate](http://img.shields.io/codeclimate/github/boennemann/zentodone.svg)](https://codeclimate.com/github/boennemann/zentodone)

A to-do app based on [Leo Babauta's](http://leobabauta.com/) ultimate simple productivity system [Zen To Done](http://zenhabits.net/zen-to-done-ztd-the-ultimate-simple-productivity-system/).
Built with [Bradypodion.js](http://bradypodion.io), [AngularJS](http://angularjs.org) and [Hoodie](http://hood.ie).

## Installation

### Install OS specific dependencies

#### OS X

```shell
brew update
brew install git
brew install node
brew install couchdb
```

#### Linux 

##### General

```shell
sudo apt-get update
sudo apt-get install couchdb git
tar -xvf node-v0.10.10.tar.gz
cd node-v0.10.10
./configure
make && sudo make install
```

##### Ubuntu

```shell
sudo apt-get update
sudo apt-get install couchdb-bin git
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

##### Fedora

```shell
sudo yum install couchdb git nodejs npm
```

#### Windows

On Windows, install [Node.js](http://nodejs.org/download/), [git](http://git-scm.com/downloads) and [CouchDB](https://couchdb.apache.org/#download) using the installers on each website. 

### Install project specific dependencies

```
npm install -g grunt-cli hoodie-cli bower
npm install
bower install
```

Build the App and start Hoodie

```shell
grunt build
hoodie start
```

## Development

Start Hoodie and serve a development version of the App with Livereload.

```
grunt serve
```

## Author
| [![twitter/boennemann](http://gravatar.com/avatar/29e45e7e0bf9561770aae5818f139c80?s=70)](https://twitter.com/boennemann "Follow @boennemann on Twitter") |
|---|
| [Stephan Bönnemann](http://boennemann.me/) |
