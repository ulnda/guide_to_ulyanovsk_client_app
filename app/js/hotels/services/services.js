const module = angular.module('app.hotels.services', []);

module.factory('Hotel', ['$resource', 'API_HOTELS_ENDPOINT', ($resource, API_HOTELS_ENDPOINT) => {
  return $resource(API_HOTELS_ENDPOINT, { id: '@id' }, {
    headers: { 'Content-Type': 'application/json' },
    update: { method: 'PUT' }
  });
}]);

module.value('API_HOTELS_ENDPOINT', 'http://localhost:8000/hotels/:id')

