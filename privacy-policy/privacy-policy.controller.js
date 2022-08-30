(function () {

    'use strict';

    angular
        .module('app')
        .controller('PrivacyPolicyController', PrivacyPolicyController);

    PrivacyPolicyController.$inject = ['$rootScope', '$translate'];

    function PrivacyPolicyController($rootScope, $translate) {

        var vm = this;

        initController();

        function initController() {
            updateMetaInformation();
        }

        function updateMetaInformation(){
            $translate('PRIVACY_POLICY_TITLE').then(function (pageTitle) {
                $rootScope.meta.title=pageTitle;
            });

            $translate('PRIVACY_POLICY_DESCRIPTION').then(function (pageDescrition) {
                $rootScope.meta.description=pageDescrition;
            });
        }

    }

})();