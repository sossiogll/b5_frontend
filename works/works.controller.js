(function () {
    'use strict';

    angular
        .module('app')
        .controller('WorksController', WorksController);

    WorksController.$inject = ['$rootScope'];
    function WorksController($rootScope) {
        var vm = this;

        initController();

        function initController() {
        }


    }

})();