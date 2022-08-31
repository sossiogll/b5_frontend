
(function () {
    'use strict';

    angular
        .module('app')
        .factory('PostService', PostService);

    PostService.$inject = ['$http',  '$rootScope', 'Settings'];
    function PostService($http, $rootScope, Settings) {
        var service = {};
        var apiURL = Settings.APIURL;


        service.Index = Index;
        service.Post = Post


        return service;


        function Index(goodCallback, badCallback, limit = 20) {
            $http.get(apiURL+"/posts?limit="+limit).then(goodCallback, badCallback);
        }

        function Post(postSlug, goodCallback, badCallback){
            $http.get(apiURL+"/posts/"+postSlug).then(goodCallback, badCallback);
        }

    }

})();
