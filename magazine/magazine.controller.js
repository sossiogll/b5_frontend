(function () {
    'use strict';

    angular
        .module('app')
        .controller('MagazineController', MagazineController);

    MagazineController.$inject = ['$rootScope'];
    function MagazineController($rootScope) {
        var vm = this;

        initController();

        function initController() {
        }


    }

})();