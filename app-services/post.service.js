
(function () {
    'use strict';

    angular
        .module('app')
        .factory('PostService', PostService);

    PostService.$inject = ['$http',  '$rootScope'];
    function PostService($http, $rootScope) {
        var service = {};
        var apiURL = $rootScope.APIUrl;


        service.Index = Index;
        service.Post = Post


        return service;


        function Index(goodCallback, badCallback) {
            $http.get(apiURL+"/posts").then(goodCallback, badCallback);
        }

        function Post(postId, goodCallback, badCallback){
            $http.get(apiURL+"/posts/"+postId).then(goodCallback, badCallback);
        }

    }

})();
