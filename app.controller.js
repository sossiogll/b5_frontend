(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$rootScope', '$translate', 'gllCursorService', '$route'];
    function AppController($scope, $rootScope, $translate, gllCursorService, $route){

        $scope.changeLanguage = function (key) {
            $rootScope.lang = key;
            $translate.use(key);
            $route.reload();
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