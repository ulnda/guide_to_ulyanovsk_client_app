const module = angular.module('app.hotels', ['ui.router', 'app.hotels.controllers', 'app.hotels.services']);

module.config(['$stateProvider', '$locationProvider', ($stateProvider, $locationProvider) => {
  $stateProvider.state('hotels', {
    abstract: true,
    url: '/hotels',
    templateUrl: 'templates/hotels/main.html',
  }).state('hotels.all', {
    url: '',
    controller: 'HotelsController as c',
    templateUrl: 'templates/hotels/index.html'
  }).state('hotels.new', {
    url: '/new',
    controller: 'NewHotelController as c',
    templateUrl: 'templates/hotels/new.html'
  }).state('hotels.edit', {
    url: '/:id/edit',
    controller: 'EditHotelController as c',
    templateUrl: 'templates/hotels/edit.html'
  });
}])