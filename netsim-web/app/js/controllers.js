/*
* Controllers are created by calling the controller method on the Module
* The arguments to the controller method are the name for the new controller and a function that 
* will be invoked to define the controller functionality.
*/
//$scope is a build-in function in AgularJS. Variable names that start with $ refers to built-in feature
'use strict';
var deps, controllerModule;
deps = [];
deps.push('angularBootstrapNavTree');
deps.push('ngTable');

controllerModule = angular.module('myApp.controllers', deps);

//===================================================================================================

/*
 * This controller to handle all the common functionalities. Like getting User Information
 * and other common and mostly common features.
 */
controllerModule.controller('appCtrl', function ($scope, appAPIService) {
  $scope.userDetails = {
    displayName: 'Rohit Mohta',
    role: 'Super Admin',
		team: 'GAN Development',
		last_login: '26 May 2014, 10:00 IST',
		curr_workspace: 'Mockdata'
  };
	appAPIService.setBroswerPageTitle('Home');
});

//===================================================================================================

/*
 * This controller to handle all the functionalities related to Templates.
 */
controllerModule.controller('allTemplateCtrl', function ($scope, $location, appAPIService, templateAPIService, cachedService) {
  appAPIService.setBroswerPageTitle('Templates');
	$scope.all_templates_tree = {};
  $scope.all_templates_tree_data = [
		{"label": "Network Simulator - Templates", 
		 "type": "rootElement", 
																		 "children": [
																		 ]
																		}
																	];
	templateAPIService.getAllTemplates().success(function (response) {
    $scope.all_templates_tree_data = response;
  });
	
	$scope.all_templates_tree_handler = function (branch) {
    //console.log('all_templates_tree_handler# branch: ' + JSON.stringify(branch));
    if (!branch.type) {
			cachedService.storeSelectedTemplateInfo(branch);
			//redirect to #/template/message
			$location.path('/template/message');
    } else {
			//Don't do anything
    }
		return;
  };
});


//===================================================================================================

/*
 *
 */
controllerModule.controller('templateCtrl', function ($scope, $location, appAPIService, templateAPIService, cachedService) {
	if(cachedService.getSelectedTemplateName() == null){
		//redirect to #/templates/all
		$location.path('/templates/all');
		return;
	}
	appAPIService.setBroswerPageTitle(cachedService.getSelectedTemplateName());
	$scope.selected_template_tree = {};
  $scope.selected_template_tree_data = [
																				{"label": cachedService.getSelectedTemplateName(), 
																				 "type": "rootElement", 
																				 "children": [
																				 ]
																				}
																			 ];
	
	templateAPIService.getMessageForSelecedTemplate().success(function (response) {
		$scope.selected_template_tree_data[0].children = response;
  });
	
	$scope.all_templates_tree_handler = function (branch) {
    if (!branch.type) {
			//redirect to #/template/message
			//$location.path('/template/message');
    } else {
			//Don't do anything
      $scope.output = "Selected Type : " + branch.type + " having label: " +  branch.label;
    }
    return ($scope.output);
  };
});

//===================================================================================================

/*
 * This controller to handle all the functionalities related to Network Settings.
 */
controllerModule.controller('networkSettingCtrl', function ($scope, $timeout, 
																														appAPIService, networkConnectionAPIService, 
																														 ngTableParams) {
	appAPIService.setBroswerPageTitle('Network Settings');
	
	networkConnectionAPIService.getAllNetworkConnections().success(function (response) {
		/* TODO:: Handle error scenario*/
		$scope.all_network_settings = response;
		$scope.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10           // count per page
    }, {
      total: $scope.all_network_settings.length, // length of data
      getData: function ($defer, params) {
				$scope.network_settings = $scope.all_network_settings
				  .slice((params.page() - 1) * params.count(), params.page() * params.count());
        $defer.resolve($scope.network_settings);
      }
    });
	});
	
});

//===================================================================================================