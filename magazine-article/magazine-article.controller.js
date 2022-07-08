(function () {
    'use strict';

    angular
        .module('app')
        .controller('MagazineArticleController', MagazineArticleController);

    MagazineArticleController.$inject = ['$rootScope'];
    function MagazineArticleController($rootScope) {
        var vm = this;

        initController();

        function initController() {
        }


    }

})();