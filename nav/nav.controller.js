(function () {
    'use strict';

    angular
        .module('app')
        .controller('NavController', NavController);

    NavController.$inject = ['$http', '$rootScope'];
    function NavController($http, $rootScope){

        initController();

        function initController() {

        }

    }





})();