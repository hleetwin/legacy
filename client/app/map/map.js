angular.module('app.map', ['ngOpenFB', 'ngMap'])

.controller('MapController', ['$scope', '$openFB', '$interval', 'ClientHelper', 'NgMap', function ($scope, $openFB, $interval, ClientHelper, NgMap) {
  // methods to be used inside map.html
  var map;
  $scope.user = {};
  $scope.user.id = ClientHelper.storage[0].id;
  $scope.user.userName = ClientHelper.storage[0].name.split(' ').join('');
  $scope.user.userPic = ClientHelper.storage[0].picture;
  $scope.user.latitude = '';
  $scope.user.longitude = '';
  $scope.user.message = '';

  $scope.mapName = "";

  $scope.tempDataStore;
  $scope.intervalFunc;

  $scope.submitMessage = function(map, windowName) {
    $scope.showBubble(map, windowName);
    $scope.postMessage();
  }

  socket.on('serverData', function (data) {
    $scope.tempDataStore = data;
  });

  socket.on('message', function (message) {
    var groupChat = angular.element( document.querySelector('.groupChat'));
    groupChat.append('<li>' + message + '</li>');
  })

  $scope.postMessage = function () {
    console.log('posting');
    socket.emit('msg', $scope.user.message);
  }


  $scope.locationCheck = function () {
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
    } else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }

    var startPos;
    var geoSuccess = function (position) {
      startPos = position;

      $scope.user.latitude = startPos.coords.latitude;
      $scope.user.longitude = startPos.coords.longitude;

      socket.emit('userData', $scope.user);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }
  $scope.locationCheck();

  $scope.logOut = function (fb) {
    $interval.cancel($scope.intervalFunc);
    socket.emit('logout', $scope.user.id);
    if (fb) {
      $openFB.logout();
    }
  }

  $scope.init = function (){
    $scope.mapName = ClientHelper.storage2[0];
    socket.emit('init', ClientHelper.storage2[0]);
    $scope.intervalFunc = $interval($scope.locationCheck, 1000);
  }

  $scope.showBubble = function(map, elementName){
    map.showInfoWindow(elementName);
  }
}]);
