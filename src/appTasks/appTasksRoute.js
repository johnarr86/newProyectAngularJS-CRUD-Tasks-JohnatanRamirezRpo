(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'appTasksController',
                templateUrl: 'src/appTasks/appTasks.html',
                controllerAs: 'appTasks'
            })

    }

})();
