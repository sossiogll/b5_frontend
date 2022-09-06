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
                $(document).ready(function() {
                    document.title = pageTitle + " | B5 - Idee in cammino";
                });
            });

            $translate('CREDITS_DESCRIPTION').then(function (pageDescrition) {
                $(document).ready(function() {
                    $("meta[property='og\\description']").attr("content", pageDescrition);
                });
            });
        };


    }

})();