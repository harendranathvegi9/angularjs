var deps, appModule;

deps = [];
deps.push('mockup.service');
deps.push('mockup.controllers');
deps.push('ngRoute');

appModule = angular.module('mockup', deps);

appModule.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
        .when("/templates", {templateUrl: "partials/templates.html", controller: "templateController"})
        .otherwise({redirectTo: "theme-devops-static-angularjs-template.html"});
}
                  ]
                );