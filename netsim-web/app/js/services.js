'use strict';
/* Services */
var deps, serviceModule;
deps = [];
serviceModule = angular.module('myApp.services', deps);

//===================================================================================================

serviceModule.factory('appAPIService', function ($http, $window) {
  var appAPI = {},
			appAPIData = {};
	
	appAPIData.netsim_url_service_prefix = 'http://157.227.43.63:8012';
	
	appAPI.getServiceURL = function(partialURL){
		return (appAPIData.netsim_url_service_prefix + partialURL);
	};
	
	appAPI.setBroswerPageTitle = function(title){
		$window.document.title = 'Network Simulator | ' + title;
	};
	
  return appAPI;
});

//===================================================================================================

serviceModule.factory('cachedService', function () {
	var cachedServiceData = {}, 
			cachedServiceAPI={};
	
	cachedServiceAPI.storeSelectedTemplateInfo = function (selectedBranch) {
		cachedServiceData.selectedTemplateBranch = selectedBranch;
	};
	
	cachedServiceAPI.getSelectedTemplateName = function () {
		if(typeof cachedServiceData.selectedTemplateBranch === 'undefined') {
			return null;
		} else {
			return (cachedServiceData.selectedTemplateBranch.label);
		}
	};
	
	cachedServiceAPI.clearSelectedTemplateInfo = function (selectedBranch) {
		delete cachedServiceData.selectedTemplateBranch;
	};
	
	return cachedServiceAPI;
});

//===================================================================================================

/*
 * This Service Module to handle all the functionalities related to Templates.
 * To share data between views, we will be using shared service 
 */
serviceModule.factory('templateAPIService', function ($http, appAPIService, cachedService) {
	var templateAPI = {};
  
	templateAPI.getAllTemplates = function () {
    return $http({
      method: 'GET',
      url : appAPIService.getServiceURL('/netsim/services/templates/all')
    });
  };
	
	templateAPI.getMessageForSelecedTemplate = function () {
		return $http({
      method: 'GET',
      url : appAPIService.getServiceURL('/netsim/services/templates/getmsgs/' + cachedService.getSelectedTemplateName())
    });
	};
    
	return templateAPI;
});

//===================================================================================================

/*
 * This Service Module to handle all the functionalities related to Network Settings.
 */
serviceModule.factory('networkConnectionAPIService', function ($http, appAPIService) {
	var networkConnectionAPI = {};
	
	networkConnectionAPI.getAllNetworkConnections = function() {
		return $http ({
			method: 'GET',
			url : appAPIService.getServiceURL('/netsim/services/networkprofiles')
		});
	};
	
	return networkConnectionAPI;
});

//===================================================================================================