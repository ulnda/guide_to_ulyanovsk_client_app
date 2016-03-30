const module = angular.module('app.places.services', []);

module.factory('Place', ['$resource', 'API_BASE_ENDPOINT', 'API_PLACES_ENDPOINT', ($resource, API_BASE_ENDPOINT, API_PLACES_ENDPOINT) => {
  let Place = $resource(API_BASE_ENDPOINT + API_PLACES_ENDPOINT, { id: '@id' }, {
    headers: { 'Content-Type': 'application/json' },
    update: { method: 'PUT' }
  });

  return Place;
}]);

module.value('API_PLACES_ENDPOINT', `/places/:id`)

