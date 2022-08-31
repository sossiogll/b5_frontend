
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


        function Index(goodCallback, badCallback, limit=20) {
            $http.get(apiURL+"/categories?limit="+limit).then(goodCallback, badCallback);
        }

        function Category(categorySlug, goodCallback, badCallback, limit=20){
            $http.get(apiURL+"/categories/"+categorySlug+"?limit="+limit).then(goodCallback, badCallback);
        }

    }

})();
