(function () {
    'use strict';

    angular
        .module('app')
        .controller('Find-UsController', FindUs);

    FindUs.$inject = ['$rootScope'];
    function FindUs($rootScope) {
        var vm = this;

        initController();

        function initController() {
        }


    }

})();