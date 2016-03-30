const module = angular.module('app.hotels.services', []);

module.factory('Hotel', ['$resource', 'API_BASE_ENDPOINT', 'API_HOTELS_ENDPOINT', ($resource, API_BASE_ENDPOINT, API_HOTELS_ENDPOINT) => {
  let Hotel = $resource(API_BASE_ENDPOINT + API_HOTELS_ENDPOINT, { id: '@id' }, {
    headers: { 'Content-Type': 'application/json' },
    update: { method: 'PUT' }
  });

  return Hotel;
}]);

module.value('API_HOTELS_ENDPOINT', `/hotels/:id`);

