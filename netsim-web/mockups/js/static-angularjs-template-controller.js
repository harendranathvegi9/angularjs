var deps, controllerModule;
deps = [];

controllerModule = angular.module('mockup.controllers', deps);

controllerModule.controller('mockupController', function ($scope, appAPIService) {
    'use strict';
    $scope.userDetails = {
        displayName : 'Rohit',
        userId : '307814'
    };
});

controllerModule.constant('templateController', function ($scope, templateAPIService) {
    'use strict';
});