class HotelsController {
  constructor(Hotel, $modal) {
    this.hotels = Hotel.query();

    this.deps = { Hotel: Hotel, $modal: $modal };
  }

  removeHotel(hotel) {
    this.deps.$modal.open({
      templateUrl: 'templates/hotels/removing_modal.html',
      controller: 'HotelRemovingModalController as c',
      size: 'sm',
      resolve: {
        hotel: () => {
          return hotel;
        }
      }
    });
  }
}
HotelsController.$inject = ['Hotel', '$modal'];

class HotelRemovingModalController {
  constructor($modalInstance, $state, hotel) {
    this.hotel = hotel;
    this.deps = { $modalInstance: $modalInstance, $state: $state };
  }

  removeHotel() {
    this.hotel.$delete(() => {
      this.deps.$modalInstance.dismiss('ok');
      this.deps.$state.go(this.deps.$state.current, {}, { reload: true });
    });
  }

  cancel() {
    this.deps.$modalInstance.dismiss('cancel');
  }
}
HotelRemovingModalController.$inject = ['$modalInstance', '$state', 'hotel'];

class NewHotelController {
  constructor(Hotel, $scope, $state) {
    this.hotel = new Hotel({latitude: 54.312267, longitude: 48.395505});
    this.options = { 
      map: {
        center: { 
          latitude: 54.312267, 
          longitude: 48.395505 
        }, 
        zoom: 8
      },
      point: {
        id: 0,
        icon: 'images/marker.png',
        draggable: true
      },
      events: {
        click: (marker, eventName, args) => {
          var e = args[0];
          this.place.latitude = e.latLng.lat();
          this.place.longitude = e.latLng.lng();
          $scope.$apply();
        }
      }
    };

    this.deps = { Hotel: Hotel, $state: $state };
  }

  saveHotel() {
    this.hotel.$save(() => {
      this.deps.$state.go('hotels.all');
    });
  }
}
NewHotelController.$inject = ['Hotel', '$scope', '$state'];

class EditHotelController {
  constructor(Hotel, $scope, $state, $stateParams) {
    this.hotel = Hotel.get({id: $stateParams.id}, () => {
      this.options = { 
        map: {
          center: { 
            latitude: this.hotel.latitude, 
            longitude: this.hotel.longitude 
          }, 
          zoom: 8
        },
        point: {
          id: 0,
          icon: 'images/marker.png',
          draggable: true
        },
        events: {
          click: (marker, eventName, args) => {
            var e = args[0];
            this.place.latitude = e.latLng.lat();
            this.place.longitude = e.latLng.lng();
            $scope.$apply();
          }
        }
      };
    });

    this.deps = { Hotel: Hotel, $state: $state };
  }

  saveHotel() {
    this.hotel.$update(() => {
      this.deps.$state.go('hotels.all');
    });
  }
}
EditHotelController.$inject = ['Hotel', '$scope', '$state', '$stateParams'];

const controllers = angular.module('app.hotels.controllers', []);

controllers.controller('HotelsController', HotelsController);
controllers.controller('NewHotelController', NewHotelController);
controllers.controller('EditHotelController', EditHotelController);
controllers.controller('HotelRemovingModalController', HotelRemovingModalController);