(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreditsController', CreditsController);

    CreditsController.$inject = ['$rootScope', '$translate'];
    function CreditsController($rootScope, $translate) {

        var vm = this;

        initController();

        function initController() {
            updateMetaInformation();
        }

        function updateMetaInformation(){
            $translate('CREDITS_TITLE').then(function (pageTitle) {
                $rootScope.meta.title=pageTitle;
            });

            $translate('CREDITS_DESCRIPTION').then(function (pageDescrition) {
                $rootScope.meta.description=pageDescrition;
            });
        };


    }

})();