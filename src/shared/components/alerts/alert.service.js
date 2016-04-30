var Utilities = require('shared/utilities/Utilities');

module.exports = function AlertService($rootScope, $timeout, alertConstants) {
	'ngInject';

    var alerts = [],
    	that = this;

    that.addAlert = function (message, alertType) {
    	alertType = alertType || alertConstants.types.info;

    	var alert = {
            id: Utilities.createGuid(),
            type: alertType,
            message: message
        };
        alerts.push(alert);

        $rootScope.$broadcast(alertConstants.events.added, alert);

        $timeout(function () {
        	that.removeAlert(alert.id);
        }, 8000);

        return alert.id;
    };

    that.addErrorAlert = function (message) {
    	that.addAlert(message, alertConstants.types.error);
    };

    that.addInfoAlert = function (message) {
    	that.addAlert(message);
    };

    that.addSuccessAlert = function (message) {
    	that.addAlert(message, alertConstants.types.success);
    };

    that.addWarningAlert = function (message) {
    	that.addAlert(message, alertConstants.types.warning);
    };

    that.removeAlert = function (alertId) {
        var index = Utilities.findIndex(alerts, { id: alertId });

        if (index != -1) {
            alerts.splice(index, 1);

            $rootScope.$broadcast(alertConstants.events.removed, alertId);
        }
    };
};