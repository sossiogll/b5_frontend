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
                $(document).ready(function() {
                    document.title = pageTitle + " | B5 - Idee in cammino";
                });
            });

            $translate('COOKIE_POLICY_DESCRIPTION').then(function (pageDescrition) {
                $(document).ready(function() {
                    $("meta[property='og\\description']").attr("content", pageDescrition);
                });
            });
        };

    }

})();