require('./alerts.style');

module.exports = function AlertsDirective() {
	this.restrict = 'E';
	this.scope = {};
	this.bindToController = {};
	this.controller = require('./alerts.controller');
	this.controllerAs = 'vm';
	this.template = require('./alerts.directive.html');
};