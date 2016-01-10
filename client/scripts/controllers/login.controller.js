angular
  .module('Whatsapp')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $meteor) {
  var controller = this;
  $reactive(controller).attach($scope);

  controller.login = login;
  controller.register = register;

  ////////////

  function login() {


      $meteor.loginWithPassword(this.username, this.password, (err) => {
        $ionicLoading.hide();

        if (err) {
          return handleError(err);
        }

        $state.go('tab.chats', {phone: this.phone});
      });
  }

  function register() {
    $ionicLoading.show({
      template: 'Creating account...'
    });

    Accounts.createUser({
      username: this.newusername,
      password: this.newpassword,
      profile: {
        name: this.newusername
      }
    }, function(err) {
      $ionicLoading.hide();
      if (err) {
        return handleError(err);
      }
        $ionicLoading.show({
            template: 'Authenticating...'
        });
        $meteor.loginWithPassword(controller.newusername, controller.newpassword, (err) => {
            $ionicLoading.hide();

            if (err) {
                return handleError(err);
            }

            $state.go('tab.chats', {phone: this.phone});
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
