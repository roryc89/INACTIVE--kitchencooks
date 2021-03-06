
var fbChats = new Firebase('https://hrr-kitchen.firebaseio.com/chats')


var appControllers = angular.module('appControllers');

//this controller handles the chat view
appControllers.controller('chatCtrl', ['$scope', '$cookies',
  function ($scope, $cookies) {

  var user  = {};
  if ($cookies.user) {

    user.name = $cookies.user;
  } else {
    user.name = "Anonymous";
  }

  //collects input from user, sends it to firebase server
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var text = $('#messageInput').val();
      console.log(user.name)
      fbChats.push({name: user.name, text: text});
      $('#messageInput').val('');
    }
  });

  //collects any firebase data that is added
  fbChats.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
  });

  //jquery function to append dom elements to page
  function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<strong/>').text(name+': ')).appendTo($('.chat'));
    $('.chat')[0].scrollTop = $('.chat')[0].scrollHeight;
  };


  }]

);

