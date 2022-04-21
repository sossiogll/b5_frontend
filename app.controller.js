(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$rootScope', '$translate', 'gllCursorService'];
    function AppController($scope, $rootScope, $translate, gllCursorService){

        var apiURL = $rootScope.APIUrl;

        $scope.changeLanguage = function (key) {
            $rootScope.lang = key;
            $translate.use(key);
        };


        $scope.$on('$viewContentLoaded', function () {

            gllCursorService.findTriggeringElements();

        });

        initController();

        function initController() {

        }

    }





})();