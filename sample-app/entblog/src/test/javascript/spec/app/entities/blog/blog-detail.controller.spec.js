'use strict';

describe('Controller Tests', function() {

    describe('Blog Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockBlog, MockUser, MockEntry;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockBlog = jasmine.createSpy('MockBlog');
            MockUser = jasmine.createSpy('MockUser');
            MockEntry = jasmine.createSpy('MockEntry');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Blog': MockBlog,
                'User': MockUser,
                'Entry': MockEntry
            };
            createController = function() {
                $injector.get('$controller')("BlogDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'entblogApp:blogUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
