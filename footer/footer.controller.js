(function () {
    'use strict';

    angular
        .module('app')
        .controller('FooterController', FooterController);

    FooterController.$inject = ['$http', '$rootScope'];
    function FooterController($http, $rootScope){

        var apiURL = $rootScope.APIUrl;

        initController();

        function initController() {

        }

        function loadFrontendVersion(){
            if($rootScope.frontendVersion === undefined)
                $rootScope.frontendVersion = "0.1";
        }

    }





})();