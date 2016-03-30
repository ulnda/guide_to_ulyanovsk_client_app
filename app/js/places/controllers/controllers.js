class PlacesController {
  constructor(Place, $modal) {
    this.places = Place.query();

    this.deps = { Place: Place, $modal: $modal };
  }

  removePlace(place) {
    this.deps.$modal.open({
      templateUrl: 'templates/places/removing_modal.html',
      controller: 'PlaceRemovingModalController as c',
      size: 'sm',
      resolve: {
        place: () => {
          return place;
        }
      }
    });
  }
}
PlacesController.$inject = ['Place', '$modal'];

class PlaceRemovingModalController {
  constructor($modalInstance, $state, place) {
    this.place = place;
    this.deps = { $modalInstance: $modalInstance, $state: $state };
  }

  removePlace() {
    this.place.$delete(() => {
      this.deps.$modalInstance.dismiss('ok');
      this.deps.$state.go(this.deps.$state.current, {}, { reload: true });
    });
  }

  cancel() {
    this.deps.$modalInstance.dismiss('cancel');
  }
}
PlaceRemovingModalController.$inject = ['$modalInstance', '$state', 'place'];

class NewPlaceController {
  constructor(Place, $scope, $state) {
    this.place = new Place({latitude: 54.312267, longitude: 48.395505, cropped_image: null});
    
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
    
    this.sourceImage = null;

    this.deps = { Place: Place, $state: $state };
  }

  savePlace() {
    this.place.$save(() => {
      this.deps.$state.go('places.all');
    });
  }
}
NewPlaceController.$inject = ['Place', '$scope', '$state'];

class EditPlaceController {
  constructor(Place, $scope, $state, $stateParams) {
    this.place = Place.get({id: $stateParams.id}, () => {
      this.options = { 
        map: {
          center: { 
            latitude: this.place.latitude, 
            longitude: this.place.longitude 
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

    this.deps = { Place: Place, $state: $state };
  }

  savePlace() {
    this.place.$update(() => {
      this.deps.$state.go('places.all');
    });
  }
}
EditPlaceController.$inject = ['Place', '$scope', '$state', '$stateParams'];

const controllers = angular.module('app.places.controllers', []);

controllers.controller('PlacesController', PlacesController);
controllers.controller('NewPlaceController', NewPlaceController);
controllers.controller('EditPlaceController', EditPlaceController);
controllers.controller('PlaceRemovingModalController', PlaceRemovingModalController);