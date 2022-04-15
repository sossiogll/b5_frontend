(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$rootScope', '$translate', '$cursor'];
    function AppController($scope, $rootScope, $translate, $gllCursorService){

        var apiURL = $rootScope.APIUrl;

        $scope.changeLanguage = function (key) {
            $rootScope.lang = key;
            $translate.use(key);
        };

        initController();

        function initController() {

        }

    }





})();