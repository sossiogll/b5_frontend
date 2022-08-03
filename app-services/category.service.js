
(function () {
    'use strict';

    angular
        .module('app')
        .factory('CategoryService', CategoryService);

    CategoryService.$inject = ['$http',  '$rootScope', 'Settings'];
    function CategoryService($http, $rootScope, Settings) {

        var service = {};
        var apiURL = Settings.APIURL;


        service.Index = Index;
        service.Category = Category


        return service;


        function Index(goodCallback, badCallback) {
            $http.get(apiURL+"/categories").then(goodCallback, badCallback);
        }

        function Category(categorySlug, goodCallback, badCallback){
            $http.get(apiURL+"/categories/"+categorySlug).then(goodCallback, badCallback);
        }

    }

})();
