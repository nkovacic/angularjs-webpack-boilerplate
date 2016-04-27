require('./hello-world.style');

module.exports = function HelloWorldDirective() {
	this.restrict = 'E';
	this.scope = {};
	this.bindToController = {
		text: '@'
	};
	this.controller = require('./hello-world.controller');
	this.controllerAs = 'vm';
	this.template = require('./hello-world.directive.html');
}