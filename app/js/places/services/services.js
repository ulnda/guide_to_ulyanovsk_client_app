const module = angular.module('app.places.services', []);

module.factory('Place', ['$resource', 'API_PLACES_ENDPOINT', ($resource, API_PLACES_ENDPOINT) => {
  return $resource(API_PLACES_ENDPOINT, { id: '@id' }, {
    headers: { 'Content-Type': 'application/json' },
    update: { method: 'PUT' }
  });
}]);

module.value('API_PLACES_ENDPOINT', 'http://localhost:8000/places/:id')

