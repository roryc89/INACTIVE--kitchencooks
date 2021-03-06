'use strict';
window.userName = 'Loading';

var fbHangouts = new Firebase('https://hrr-kitchen.firebaseio.com/hangouts')
// if so then provide the user with the hangout url

var appControllers = angular.module('appControllers', ['ngCookies']);


//this controller handles the kitchen view and designates which seats are available
appControllers.controller('kitchenCtrl', ['$scope', '$cookies',
  function ($scope, $cookies) {

    var user  = {}
    if ($cookies.user) {

      window.userName = $cookies.user
    } else {
      window.userName = "Anonymous"
    }

    $scope.satDown = false;
    $scope.currentSeat = "standing";
    $scope.currentURL = "No current hangout url";

    $scope.seats = {};
    $scope.hangouts = {};

    fbSeating.on("value", function(snapshot) {

      $scope.$apply(function(){
        $scope.seats = snapshot.val();

      });

    });

    fbHangouts.on("value", function(snapshot) {

      $scope.$apply(function(){
        $scope.hangouts = snapshot.val();
      });

    });

    $scope.viewThumbs = viewThumbVideos;

    $scope.doClick = function(seat, $event) {
      handleClick(seat, $event, $scope);
    };

    $scope.clearRoom = clearRoom;

  }]

);

