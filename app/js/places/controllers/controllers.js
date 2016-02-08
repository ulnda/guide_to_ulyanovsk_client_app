class PlacesController {
  constructor(Place) {
    this.places = Place.query();

    this.deps = { Place: Place };
  }
}
PlacesController.$inject = ['Place'];

class NewPlaceController {
  constructor(Place, $scope, $state) {
    this.place = new Place({latitude: 54.312267, longitude: 48.395505});
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

    this.deps = { Place: Place, $state: $state };
  }

  savePlace() {
    this.place.$save(() => {
      this.deps.$state.go('places.all');
    });
  }
}
NewPlaceController.$inject = ['Place', '$scope', '$state'];

const controllers = angular.module('app.places.controllers', []);

controllers.controller('PlacesController', PlacesController);
controllers.controller('NewPlaceController', NewPlaceController);