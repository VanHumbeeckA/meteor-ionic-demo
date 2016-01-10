angular
    .module('Whatsapp')
    .controller('ButtonController', ButtonCtrl);

function ButtonCtrl ($scope, $reactive, $stateParams, $ionicScrollDelegate, $timeout, $log) {
    var controller = this;
    $reactive(controller).attach($scope);

    controller.getSliders = getSliders;
    controller.updateSlider = updateSlider;

    controller.helpers({
        data() {
            return Sliders.find();
        },
        lastAction() {
            return Sliders.findOne({},{sort: {timestamp: -1}, limit: 1}); // .sort({timestamp:1}).limit(1)
        }
    })

    //$scope.$meteorSubscribe('allSliders').then(function() {
    //    controller.sliders = $scope.$meteorCollection(function() {
    //        return Sliders.find({});
    //    })
    //});




    function updateSlider(slider) {
        Meteor.call('updateSlider', [slider._id, _.parseInt(slider.value)], function(err, data) {
            if (err) {
                console.error(err);
            }
        })
    }

    function getSliders() {
        console.log(controller.lastAction);
    }

}