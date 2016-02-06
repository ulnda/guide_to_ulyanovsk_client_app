const module = angular.module('app.places', ['ui.router', 'app.places.controllers', 'app.places.services']);

module.config(['$stateProvider', '$locationProvider', ($stateProvider, $locationProvider) => {
  $stateProvider.state('places', {
    abstract: true,
    url: '/places',
    templateUrl: 'templates/places/main.html',
  }).state('places.all', {
    url: '',
    controller: 'PlacesController as c',
    templateUrl: 'templates/places/index.html'
  }).state('places.new', {
    url: '/new',
    controller: 'NewPlaceController as c',
    templateUrl: 'templates/places/new.html'
  }).state('places.edit', {
    url: '/:id/edit',
    controller: 'EditPlaceController as c',
    templateUrl: 'templates/places/edit.html'
  });
}])