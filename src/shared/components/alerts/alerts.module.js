var alert = require('angular-ui-bootstrap/src/alert'),
	AngularES6 = require('shared/utilities/angular-es6'),
	AlertsDirective = require('./alerts.directive'),
	AlertService = require('./alert.service');

module.exports = AngularES6
	.module('nk.app.components.alerts', [alert])
	.constant('alertConstants', {
		events: {
            added: "alert:add",
            removed: "alert:removed"
        },
        types: {
            error: "danger",
            info: "info",
            success: "success",
            warning: "warning"
        }
	})
	.directive('alerts', AlertsDirective)
	.service('AlertService', AlertService);