(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$rootScope', '$translate', 'gllCursorService'];
    function AppController($scope, $rootScope, $translate, gllCursorService){

        $scope.changeLanguage = function (key) {
            $rootScope.lang = key;
            $translate.use(key);
        };


        $scope.$on('$viewContentLoaded', function () {

            gllCursorService.findTriggeringElements();

        });

        initController();

        function initController() {

            if(window.matchMedia("(pointer: coarse)").matches) {
                $('#gllCursor').css("display: none");
            }

        }

    }





})();