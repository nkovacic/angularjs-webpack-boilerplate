var angular = require('angular');

require('font-awesome-webpack'); 

var appComponents = require('./components/app.components'),
	sharedModule = require('./shared/shared.module'),
	MainController = require('./controllers/main.controller');

module.exports = angular
	.module('nk.app', [
		appComponents.name,
		sharedModule.name
	])
	.controller('MainController', MainController);