(function () {
    'use strict';

    angular
        .module('app')
        .controller('MeetUsController', MeetUsController);

    MeetUsController.$inject = ['$rootScope'];
    function MeetUsController($rootScope) {
        var vm = this;

        initController();

        function initController() {
        }


    }

})();