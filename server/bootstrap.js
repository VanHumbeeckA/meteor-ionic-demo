insertCollection = function(Collection, items) {
    var Future = Npm.require('fibers/future');

    var futures = _.map(items, function(item) {
        var future = new Future();
        var onComplete = future.resolver();
        Collection.insert(item, function(error, result) {
            if (error)
                console.error(error);
            else
                console.log("Added item to collection " + item.name);
            onComplete(error, result);
        });

        return future;
    });

    Future.wait(futures);
};

Meteor.startup(function () {

    Messages.remove({});

    if (Meteor.users.find().count() < 1) {
     Accounts.createUser({
         'username': 'Andries',
         'email': '44bef262@opayq.com',
         'password': 'aaabbb',
         'profile': {name: 'Andries'}
     });

     Accounts.createUser({
         'username': 'Bert',
         'email': '5079478f@opayq.com',
         'password': 'aaabbb',
         'profile': {name: 'Bert'}
     });

     Accounts.createUser({
         'username': 'Carl',
         'email': '257bedde@opayq.com',
         'password': 'aaaccc',
         'profile': {name: 'Carl'}
     });
    }

    if (Sliders.find().count() < 1) {
      var sliders = [
          {
              name: 'sunny',
              value: 12,
              range: 'positive'
          }, {
              name: 'lightbulb',
              value: 25,
              range: 'calm'
          }, {
              name: 'bolt',
              value: 38,
              range: 'balanced'
          }, {
              name: 'moon',
              value: 50,
              range: 'energized'
          }, {
              name: 'partlysunny',
              value: 63,
              range: 'assertive'
          }
      ];
      insertCollection(Sliders, sliders);
    }

  // Accounts.createUserWithPhone({
  //   phone: '+32460205406',
  //   profile: {
  //     name: 'My friend 1'
  //   }
  // });

  // Accounts.createUserWithPhone({
  //   phone: '+972501234568',
  //   profile: {
  //     name: 'My friend 2'
  //   }
  // });

  // Accounts.createUserWithPhone({
  //   phone: '+972501234569',
  //   profile: {
  //     name: 'My friend 3'
  //   }
  // });

  // let messages = [
  //   {
  //     text: 'You on your way?',
  //     timestamp: moment().subtract(1, 'hours').toDate()
  //   },
  //   {
  //     text: 'Hey, it\'s me',
  //     timestamp: moment().subtract(2, 'hours').toDate()
  //   },
  //   {
  //     text: 'I should buy a boat',
  //     timestamp: moment().subtract(1, 'days').toDate()
  //   },
  //   {
  //     text: 'Look at my mukluks!',
  //     timestamp: moment().subtract(4, 'days').toDate()
  //   },
  //   {
  //     text: 'This is wicked good ice cream.',
  //     timestamp: moment().subtract(2, 'weeks').toDate()
  //   }
  // ];

  // messages.forEach((m) => {
  //   Messages.insert(m);
  // });

  // let chats = [
  //   {
  //     name: 'Ethan Gonzalez',
  //     picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
  //   },
  //   {
  //     name: 'Bryan Wallace',
  //     picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg'
  //   },
  //   {
  //     name: 'Avery Stewart',
  //     picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg'
  //   },
  //   {
  //     name: 'Katie Peterson',
  //     picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg'
  //   },
  //   {
  //     name: 'Ray Edwards',
  //     picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg'
  //   }
  // ];

  // chats.forEach((chat) => {
  //   let message = Messages.findOne({chatId: {$exists: false}});
  //   chat.lastMessage = message;
  //   let chatId = Chats.insert(chat);
  //   Messages.update(message._id, {$set: {chatId: chatId}})
  // });
});