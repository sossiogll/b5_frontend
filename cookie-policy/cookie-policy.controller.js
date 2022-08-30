(function () {

    'use strict';

    angular
        .module('app')
        .controller('CookiePolicyController', CookiePolicyController);

    CookiePolicyController.$inject = ['$rootScope', '$translate'];

    function CookiePolicyController($rootScope, $translate) {

        var vm = this;

        initController();

        function initController() {
            updateMetaInformation();
        }


        function updateMetaInformation(){
            $translate('COOKIE_POLICY_TITLE').then(function (pageTitle) {
                $rootScope.meta.title=pageTitle;
            });

            $translate('COOKIE_POLICY_DESCRIPTION').then(function (pageDescrition) {
                $rootScope.meta.description=pageDescrition;
            });
        };

    }

})();