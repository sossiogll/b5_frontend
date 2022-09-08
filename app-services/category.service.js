
(function () {
    'use strict';

    angular
        .module('app')
        .factory('CategoryService', CategoryService);

    CategoryService.$inject = ['$http','$translate', 'Settings'];
    function CategoryService($http, $translate, Settings) {

        var service = {};
        var apiURL = Settings.APIURL;


        service.Index = Index;
        service.Category = Category


        return service;


        function Index(goodCallback, badCallback, limit=20) {
            var language = $translate.proposedLanguage() || $translate.use();
            $http.get(apiURL+"/categories?language="+language+"&limit="+limit).then(goodCallback, badCallback);
        }

        function Category(categorySlug, goodCallback, badCallback, limit=20){
            var language = $translate.proposedLanguage() || $translate.use();
            $http.get(apiURL+"/categories/"+categorySlug+"?language="+language+"&limit="+limit).then(goodCallback, badCallback);
        }

    }

})();
