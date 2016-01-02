angular
  .module('Whatsapp')
  .controller('LoginCtrl', LoginCtrl);
 
function LoginCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $meteor) {
  $reactive(this).attach($scope);
 
  this.login = login;
 
  ////////////
 
  function login() {
    // if (_.isEmpty(this.username) || _.isEmpty(this.password)) return;
 
    let confirmPopup = $ionicPopup.confirm({
      title: 'Number confirmation',
      template: '<div>' + this.username + '</div><div>Is your username above correct?</div>',
      cssClass: 'text-center',
      okText: 'Yes',
      okType: 'button-positive button-clear',
      cancelText: 'edit',
      cancelType: 'button-dark button-clear'
    });
 
    confirmPopup.then((res) => {
      if (!res) return;
 
      $ionicLoading.show({
        template: 'Sending verification code...'
      });
 

      $meteor.loginWithPassword(this.username, this.password, (err) => {
        $ionicLoading.hide();
 
        if (err) {
          return handleError(err);
        }
 
        $state.go('profile', {phone: this.phone});
      });
    });
  }
 
  function handleError(err) {
    $log.error('Login error ', err);
 
    $ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}