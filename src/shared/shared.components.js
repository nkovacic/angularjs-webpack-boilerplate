var AngularES6 = require('shared/utilities/angular-es6'),
    alertsModule = require('./components/alerts/alerts.module');

module.exports = AngularES6
	.module('nk.app.shared.components', [
		alertsModule.name
	]);