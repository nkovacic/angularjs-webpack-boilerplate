var AngularES6 = require('shared/utilities/angular-es6'),
	angularAnimate = require('angular-animate'),
	sharedComponents = require('./shared.components');

require('./styles/main.scss');

module.exports = AngularES6
	.module('nk.shared', [
		angularAnimate,
		sharedComponents.name
	]);