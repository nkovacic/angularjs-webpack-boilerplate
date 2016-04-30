var Utilities = require('shared/utilities/Utilities');

module.exports = function AlertsController($scope, alertConstants, AlertService) {
	'ngInject';

	var vm = this;

	vm.alerts = [];

	vm.closeAlert = function (alert) {
		AlertService.removeAlert(alert.id);
	};

	$scope.$on(alertConstants.events.added, function(e, alert) {
		vm.alerts.push(alert);
	});

	$scope.$on(alertConstants.events.removed, function(e, alertId) {
		var index = Utilities.findIndex(vm.alerts, { id: alertId });

		if (index != -1) {
			vm.alerts.splice(index, 1);
		}
	});
};