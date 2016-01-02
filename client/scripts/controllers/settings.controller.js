angular
  .module('Whatsapp')
  .controller('SettingsCtrl', SettingsCtrl);
 
function SettingsCtrl($scope, $reactive, $state) {
  $reactive(this).attach($scope);
 
  this.logout = logout;
 
  ////////////
 
  function logout() {
    Meteor.logout((err) => {
      if (err) {
        handleError(err);
      }
      $state.go('login');
    });
  }

  function handleError (err) {
    $log.error('profile save error ', err);
 
    $ionicPopup.alert({
      title: err.reason || 'Logout failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}