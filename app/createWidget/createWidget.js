'use strict';

angular.module('myApp.createWidget', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/createWidget', {
    templateUrl: 'createWidget/createWidget.html',
    controller: 'createWidgetCtrl'
  });
}])

.controller('createWidgetCtrl', ['$scope','$localStorage','$routeParams','$location','dataStoreService',function($scope,$localStorage,$routeParams,$location,dataStoreService) {
  $scope.widgetKeyValue = [];
  $scope.widget ={};
  $scope.listData = {};
  $scope.widget.widgetKeyValueData = [];

  
  $scope.addWidgetKV = function(data) {
    $scope.widget.widgetKeyValueData.push(data);
    $scope.listData={};
};

$scope.submitWidgetForm = function () {
  if ($scope.listData != {}){
    if ($scope.listData.key == null || $scope.listData.value == null || $scope.listData.key == undefined || $scope.listData.value == undefined){
      alert ("Key or value cannot be Empty")
    } else {
      $scope.widget.widgetKeyValueData.push($scope.listData);
      $scope.listData={};
      if ($localStorage.widgetList.length > 0){
        $scope.widget.id = $localStorage.widgetList.length+1
        dataStoreService.setValueToStorage($scope.widget); 
      } else {
        $scope.widget.id = 1
        $localStorage.widgetList = $scope.widget;
      }
    }
  } else {
    if ($localStorage.widgetList.length > 0){
      $scope.widget.id = $localStorage.widgetList.length+1
      dataStoreService.setValueToStorage($scope.widget); 
    } else {
      $scope.widget.id = 1 ;
      $localStorage.widgetList = $scope.widget;
    }
  }
  $location.path('/home');
}

$scope.remove = function(item) { 
  var index = $scope.widget.widgetKeyValueData.indexOf(item);
  $scope.widget.widgetKeyValueData.splice(index, 1);     
}

$scope.widgetCancel = function (id) {
  $location.path('/home')
}

}]);