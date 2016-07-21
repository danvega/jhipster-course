(function() {
    'use strict';

    angular
        .module('entblogApp')
        .controller('TagDetailController', TagDetailController);

    TagDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Tag', 'Entry'];

    function TagDetailController($scope, $rootScope, $stateParams, entity, Tag, Entry) {
        var vm = this;

        vm.tag = entity;

        var unsubscribe = $rootScope.$on('entblogApp:tagUpdate', function(event, result) {
            vm.tag = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
