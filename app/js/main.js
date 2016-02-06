let module = angular.module('app', ['ui.bootstrap', 'ui.router', 'ngResource', 'app.places']);

module.config(['$locationProvider', '$urlRouterProvider', ($locationProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/places');

  $locationProvider.html5Mode(true);
}]);