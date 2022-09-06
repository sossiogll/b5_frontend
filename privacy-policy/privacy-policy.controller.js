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
                $(document).ready(function() {
                    document.title = pageTitle + " | B5 - Idee in cammino";
                });
            });

            $translate('PRIVACY_POLICY_DESCRIPTION').then(function (pageDescrition) {
                $(document).ready(function() {
                    $("meta[property='og\\description']").attr("content", pageDescrition);
                });
            });
        }

    }

})();