(function() {
    'use strict';

    angular
        .module('entblogApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('tag', {
            parent: 'entity',
            url: '/tag',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Tags'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tag/tags.html',
                    controller: 'TagController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('tag-detail', {
            parent: 'entity',
            url: '/tag/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Tag'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tag/tag-detail.html',
                    controller: 'TagDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Tag', function($stateParams, Tag) {
                    return Tag.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('tag.new', {
            parent: 'tag',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tag/tag-dialog.html',
                    controller: 'TagDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('tag', null, { reload: true });
                }, function() {
                    $state.go('tag');
                });
            }]
        })
        .state('tag.edit', {
            parent: 'tag',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tag/tag-dialog.html',
                    controller: 'TagDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Tag', function(Tag) {
                            return Tag.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('tag', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('tag.delete', {
            parent: 'tag',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tag/tag-delete-dialog.html',
                    controller: 'TagDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Tag', function(Tag) {
                            return Tag.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('tag', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
