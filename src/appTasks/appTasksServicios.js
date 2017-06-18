(function () {
    'use strict';

    angular
        .module('app')
        .factory('appTasksServices', appTasksServices);

    /** @ngInject */
    appTasksServices.$inject = ['$http', '$q'];
    function appTasksServices($http, $q, DataAppTasks) {
        var appTasksService = {};
        return appTasksService;
    }
})();