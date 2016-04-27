module.exports = function HelloWorldController($timeout) {
	'ngInject';

	var vm = this;

	vm.appendedText = 'HelloWorldController. Text from argument is: ' + this.text + '.';

	$timeout(function() {
		vm.appendedText += "Timeout test"
	});
}