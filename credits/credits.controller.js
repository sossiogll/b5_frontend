(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreditsController', CreditsController);

    CreditsController.$inject = ['$rootScope'];
    function CreditsController($rootScope) {
        var vm = this;

        initController();

        function initController() {
        }


    }

})();