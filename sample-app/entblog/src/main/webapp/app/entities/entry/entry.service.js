(function() {
    'use strict';
    angular
        .module('entblogApp')
        .factory('Entry', Entry);

    Entry.$inject = ['$resource', 'DateUtils'];

    function Entry ($resource, DateUtils) {
        var resourceUrl =  'api/entries/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.postedOn = DateUtils.convertDateTimeFromServer(data.postedOn);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
