class PlacesController {
  constructor(Place) {
    this.places = Place.query();
  }
}

PlacesController.$inject = ['Place'];

const controllers = angular.module('app.places.controllers', []);

controllers.controller('PlacesController', PlacesController);