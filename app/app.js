'use strict';

// Declare app level module which depends on views, and core components
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngStorage',
  'myApp.createWidget',
  'myApp.editWidget',
  'myApp.home'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: ''});
  // $routeProvider.otherwise({redirectTo: '/view1'});
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

myApp.service('dataStoreService',['$localStorage', function ($localStorage) {
 
 this.setValueToStorage = function (data) {
    $localStorage.widgetList.push(data)
      return $localStorage.widgetList;
  };

 this.getValueByID = function (id) {
    this.widget = $localStorage.widgetList.find(function(item){
      return item.id == id;
  });
    return this.widget;
};

this.getListOfData = function (id) {
  this.widget = $localStorage.widgetList;
  return this.widget;
};
}]);