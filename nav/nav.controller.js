(function () {
    'use strict';

    angular
        .module('app')
        .controller('NavController', NavController);

    NavController.$inject = ['$http', '$rootScope'];
    function NavController($http, $rootScope){
        var apiURL = $rootScope.APIUrl;

        initController();

        function initController() {

        }

    }





})();