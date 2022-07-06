
(function () {
    'use strict';

    angular
        .module('app')
        .factory('CategoryService', CategoryService);

    CategoryService.$inject = ['$http',  '$rootScope'];
    function CategoryService($http, $rootScope) {

        var service = {};
        var apiURL = $rootScope.APIUrl;


        service.Index = Index;
        service.Category = Post


        return service;


        function Index(goodCallback, badCallback) {
            $http.get(apiURL+"/categories").then(goodCallback, badCallback);
        }

        function Category(categoryId, goodCallback, badCallback){
            $http.get(apiURL+"/categories/"+categoryId).then(goodCallback, badCallback);
        }

    }

})();
