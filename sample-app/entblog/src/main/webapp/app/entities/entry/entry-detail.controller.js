(function() {
    'use strict';

    angular
        .module('entblogApp')
        .controller('EntryDetailController', EntryDetailController);

    EntryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'DataUtils', 'entity', 'Entry', 'Blog', 'Tag'];

    function EntryDetailController($scope, $rootScope, $stateParams, DataUtils, entity, Entry, Blog, Tag) {
        var vm = this;

        vm.entry = entity;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('entblogApp:entryUpdate', function(event, result) {
            vm.entry = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
