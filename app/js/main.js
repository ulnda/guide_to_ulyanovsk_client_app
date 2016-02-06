let module = angular.module('app', ['ui.bootstrap', 'ui.router', 'ngResource']);

module.config(['$locationProvider', '$urlRouterProvider', ($locationProvider, $urlRouterProvider) => {
  $locationProvider.html5Mode(true);
}]);