var deps, serviceModule;
deps = [];
serviceModule = angular.module('mockup.service', deps);

serviceModule.factory('appAPIService', function ($http) {
    'use strict';
    var appAPI = {};
    return appAPI;
});

serviceModule.factory('templateAPIService', function ($http) {
    'use strict';
    var templateAPI = {};
    templateAPI.getAllTemplates = function () {
        return $http({
            method: 'GET',
            url : 'mockdata/template-all.json'
        });
    };
    return templateAPI;
});

