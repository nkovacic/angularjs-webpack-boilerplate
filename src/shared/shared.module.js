var sharedComponents = require('./shared.components');

require('./styles/main.scss');

module.exports = angular
	.module('nk.shared', [
		sharedComponents.name
	]);