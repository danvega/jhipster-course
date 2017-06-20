(function() {
    'use strict';

    angular
        .module('httpDemoApp')
        .directive('jhSocial', jhSocial);

    jhSocial.$inject = ['$filter', 'SocialService'];

    function jhSocial($filter, SocialService) {
        var directive = {
            restrict: 'E',
            scope: {
                provider: '@ngProvider'
            },
            templateUrl: 'app/account/social/directive/social.html',
            link: linkFunc
        };

        return directive;

        /* private helper methods */

        function linkFunc(scope) {
            
            scope.label = $filter('capitalize')(scope.provider);
            scope.providerSetting = SocialService.getProviderSetting(scope.provider);
            scope.providerURL = SocialService.getProviderURL(scope.provider);
            scope.csrf = SocialService.getCSRF();
        }

    }
})();
