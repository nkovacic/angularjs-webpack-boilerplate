var angular = require('angular'),
	AngularES6 = require('shared/utilities/angular-es6'),
	HelloWorldDirective = require('./hello-world/hello-world.directive.js');

module.exports = AngularES6
	.module('nk.app.components')
	.directive('helloWorld', HelloWorldDirective);