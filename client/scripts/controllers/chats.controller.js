angular
  .module('Whatsapp')
  .controller('ChatsCtrl', ChatsCtrl);
 
function ChatsCtrl ($scope, $reactive, NewChat) {
	var controller = this;
	$reactive(controller).attach($scope);
	controller.showNewChatModal = showNewChatModal;
	controller.remove = remove;

	this.helpers({
		data: function() {
			return Chats.find();
		}
	})

  	
  	function showNewChatModal() {
	    NewChat.showModal();
  	}

  	function remove (chat) {
  		Meteor.call('removeChat', chat._id);
	}

  	
}