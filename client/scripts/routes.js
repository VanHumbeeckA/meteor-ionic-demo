angular
  .module('Whatsapp')
  .config(config);
 
function config($stateProvider, $urlRouterProvider) {
  var $log =  angular.injector(['ng']).get('$log');
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html',
      onEnter: function($timeout, $state) {
        var usr = Meteor.user();

        if (usr == null) {
          $timeout(function() {
            $state.go('login');
          })
        }
      },
      resolve: {
        user() {
          var usr = Meteor.user();
          return usr;
        },
        chats() {
          return Meteor.subscribe('chats');
        }
      }
    })
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'client/templates/chats.html',
          controller: 'ChatsCtrl as chats'
        }
      }
    })
    .state('tab.chat', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'client/templates/chat.html',
          controller: 'ChatCtrl as chat'
        }
      }
    })
    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'client/templates/settings.html',
          controller: 'SettingsCtrl as settings',
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'client/templates/login.html',
      controller: 'LoginCtrl as logger'
    })
    .state('confirmation', {
      url: '/confirmation/:phone',
      templateUrl: 'client/templates/confirmation.html',
      controller: 'ConfirmationCtrl as confirmation'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'client/templates/profile.html',
      controller: 'ProfileCtrl as profile',
      resolve: {
        user() {
          return Meteor.user();
        },
        chats() {
          return Meteor.subscribe('chats');
        }
      }
    });
 
  $urlRouterProvider.otherwise('tab/chats');
}