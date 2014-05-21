angular.module('mockup.service', deps)
.factory('appAPIService' , function ($http) {
    var appAPI = {};
    appAPI.getAllTemplates = function(){
        return $http({
            method: 'GET',
            url : 'mockdata/template-all.json'
        });
    };
    return appAPI;
});