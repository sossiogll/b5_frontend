
(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http',  '$rootScope', 'Settings'];
    function UserService($http, $rootScope, Settings) {
        var service = {};
        var apiURL = Settings.APIURL;


        service.Index = Index;


        return service;


        function Index(goodCallback, badCallback) {
            $http.get(apiURL+"/users").then(goodCallback, badCallback);
        }

    }

})();
