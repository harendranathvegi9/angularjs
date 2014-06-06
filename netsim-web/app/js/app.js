/*
* AngularJS apps are formed from one or more modules. It's created by calling module() method.
* The module method requires two arguments : the name of the module, and an array of dependency modules.
* If the module does not depend on any module, then have an empty array. Do not omit the second argument
*/
'use strict';
var deps, appModule;
deps = [];
// Declare app level module which depends on filters, and services
deps.push('ngRoute');
deps.push('myApp.controllers');
//deps.push('myApp.filters');
deps.push('myApp.services');
//deps.push('myApp.directives');



appModule = angular.module('myApp', deps);

appModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/templates/all', {templateUrl: 'partials/template/allTemplates.html', controller: 'allTemplateCtrl'})
								.when('/template/message', {templateUrl: 'partials/template/templateMessage.html', controller: 'templateCtrl'})
							  .when('/network/display', {templateUrl: 'partials/showNetworkConnection.html', controller: 'networkSettingCtrl'});

  //$routeProvider.otherwise({redirectTo: '/templates/all'});
}]);
