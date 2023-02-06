(function () {
    'use strict';

    angular
        .module('app')
        .controller('FooterController', FooterController);

    FooterController.$inject = ['$http', '$rootScope'];
    function FooterController($http, $rootScope){

        initController();

        function initController() {

        }

    }





})();