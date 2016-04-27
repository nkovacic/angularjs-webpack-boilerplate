var $ = require('jquery'), 
	angular = require('angular'),
	appModule = require('./app.module');

angular.element(document).ready(function () {
    angular.bootstrap(document, [appModule.name]);
});