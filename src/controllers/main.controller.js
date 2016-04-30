module.exports = function MainController(AlertService) {
	'ngInject';

	var vm = this;

	vm.exampleAlert = { type: 'info'};

	vm.testAlert = function () {
		AlertService.addAlert(vm.exampleAlert.message, vm.exampleAlert.type);
	};
};