(function () {
    'use strict';

    angular
        .module('app')
        .controller('WorkArticleController', WorkArticleController);

    WorkArticleController.$inject = ['$rootScope'];
    function WorkArticleController($rootScope) {
        var vm = this;

        initController();

        function initController() {
        }


    }

})();