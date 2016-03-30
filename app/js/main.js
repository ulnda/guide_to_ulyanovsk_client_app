let module = angular.module('app', ['ui.bootstrap', 'ui.router', 'ngResource', 'angular-img-cropper', 'uiGmapgoogle-maps', 'app.places', 'app.hotels', 'app.services']);

module.config(['$locationProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', ($locationProvider, 
  $urlRouterProvider, uiGmapGoogleMapApiProvider) => {

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDH15pOJfy_ghTLOPjeBFfjXXxl2gBqzlk',
      libraries: 'places, geocoder',
      v: '3.17'
    });

    $urlRouterProvider.otherwise('/places');

    $locationProvider.html5Mode(false);
}]);