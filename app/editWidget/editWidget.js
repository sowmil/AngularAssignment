'use strict';

angular.module('myApp.editWidget', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/editWidget/:id', {
    templateUrl: 'editWidget/editWidget.html',
    controller: 'EditWidgetCtrl'
  });
}])

.controller('EditWidgetCtrl', ['$scope','$localStorage','$routeParams','$location',function($scope,$localStorage,$routeParams,$location) {
  $scope.paramId = $routeParams.id;
  $scope.widgetKeyValue = [];
  $scope.widget ={};
  $scope.listData = {};
  $scope.widget.widgetKeyValueData = [];

  $scope.widget = $localStorage.widgetList.find(function(item){
    return item.id == $scope.paramId;
});
  
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
        $localStorage.widgetList.push($scope.widget);
      } else {
        $localStorage.widgetList = $scope.widget;
      }
    }
  } else {
    if ($localStorage.widgetList.length > 0){
      $localStorage.widgetList.push($scope.widget);
    } else {
      $localStorage.widgetList = $scope.widget;
    }
  }
}

$scope.remove = function(item) { 
  var index = $scope.widget.widgetKeyValueData.indexOf(item);
  $scope.widget.widgetKeyValueData.splice(index, 1);     
}

$scope.widgetCancel = function (id) {
  $location.path('/home')
}

}]);