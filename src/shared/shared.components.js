var angular = require('angular'),
    alertsModule = require('./components/alerts/alerts.module');

module.exports = angular
	.module('nk.app.shared.components', [
		alertsModule.name
	]);