(function() {
    'use strict';
    angular
        .module('entblogApp')
        .factory('Tag', Tag);

    Tag.$inject = ['$resource'];

    function Tag ($resource) {
        var resourceUrl =  'api/tags/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
