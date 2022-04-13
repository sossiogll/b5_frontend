(function () {
    'use strict';

    angular
        .module('app')
        .controller('Ctrl', Ctrl);

    Ctrl.$inject = ['$scope', '$rootScope', '$translate'];
    function Ctrl($scope, $rootScope, $translate){

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