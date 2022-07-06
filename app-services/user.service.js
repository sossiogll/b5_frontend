
(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http',  '$rootScope'];
    function UserService($http, $rootScope) {
        var service = {};
        var apiURL = $rootScope.APIUrl;


        service.Index = Index;


        return service;


        function Index(goodCallback, badCallback) {
            $http.get(apiURL+"/users").then(goodCallback, badCallback);
        }

    }

})();
