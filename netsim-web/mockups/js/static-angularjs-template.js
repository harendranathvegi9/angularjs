(function () {
    'use strict';
    var app, deps, model;
    deps = ['angularBootstrapNavTree'];
    if (angular.version.full.indexOf("1.2") >= 0) {
        deps.push('ngAnimate');
    }
        /*
		     * AngularJS apps are formed from one or more modules. It's created by calling module() method.
		     * The module method requires two arguments : the name of the module, and an array of dependency modules.
		     * If the module does not depend on any module, then have an empty array. Do not omit the second argument
		     */
            //the module name as in ng-app is mock-up
    app = angular.module('mockup', deps)
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
            
            /*
		     * Controllers are created by calling the controller method on the Module
		     * The arguments to the controller method are the name for the new controller and a function that 
		     * will be invoked to define the controller functionality.
		      */
		  //$scope is a build-in function in AgularJS. Variable names that start with $ refers to built-in feature
            app.controller('mockupController', function ($scope, appAPIService) {
                $scope.tree = {};
                $scope.tree_data = [{"label":"Network Simulator - Templates"}];
                
                appAPIService.getAllTemplates().success(function (response) {
                    $scope.tree_data = response;
                    console.log('getAllTemplates: ' + JSON.stringify($scope.tree_data));
                });
                $scope.my_tree_handler = function(branch){
                    console.log('my_tree_handler# branch: ' + JSON.stringify(branch));
                    if(!branch.type){
                        $scope.output = "Selected Template: " + branch.label;
                    } else {
                        $scope.output = "Selected Type : " + branch.type + " having label: " +  branch.label;
                    }
                    return ($scope.output);
                };
                
                
            });
}).call(this);