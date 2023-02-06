
(function () {
    'use strict';

    angular
        .module('app')
        .factory('PostService', PostService);

    PostService.$inject = ['$http',  '$translate', 'Settings'];
    function PostService($http, $translate, Settings) {
        var service = {};
        var apiURL = Settings.APIURL;


        service.Index = Index;
        service.Post = Post


        return service;


        function Index(goodCallback, badCallback, limit = 20) {
            var language = $translate.proposedLanguage() || $translate.use();
            $http.get(apiURL+"/posts?language="+language+"&limit="+limit).then(goodCallback, badCallback);
        }

        function Post(postSlug, goodCallback, badCallback){
            $http.get(apiURL+"/posts/"+postSlug).then(goodCallback, badCallback);
        }

    }

})();
