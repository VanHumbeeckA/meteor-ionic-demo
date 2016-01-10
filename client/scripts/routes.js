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
        chats2() {
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
    .state('profile', {
      url: '/profile',
      templateUrl: 'client/templates/profile.html',
      controller: 'ProfileCtrl as profile',
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
          return Meteor.user();
        },
        chats() {
          return Meteor.subscribe('chats');
        }
      }
    })
    .state('tab.favorites', {
      url: '/buttons',
      views: {
        'tab-buttons': {
          templateUrl: 'client/templates/buttons.html',
          controller: 'ButtonController as buttonCtrl'
        }
      },
      resolve: {
        sliders() {
          return Meteor.subscribe('allSliders');
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'client/templates/login.html',
      controller: 'LoginCtrl as logger',
      onEnter: function($timeout, $state) {
        var usr = Meteor.user();

        if (usr != null) {
          $timeout(function() {
            $state.go('tab.chats');
          })
        }
      }
    })

    ;

  $urlRouterProvider.otherwise('tab/chats');
}
