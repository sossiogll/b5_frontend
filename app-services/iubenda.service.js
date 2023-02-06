
(function () {
    'use strict';

    angular
        .module('app')
        .factory('IubendaService', IubendaService);

    IubendaService.$inject = ['$http','$translate', 'Settings'];
    function IubendaService($http, $translate, Settings) {

        var service = {};
        var privacyPolicyApiURL = Settings.IUBENDA_PRIVACY_POLICY_APIURL;


        service.PrivacyPolicy = PrivacyPolicy;
        service.CookiePolicy = CookiePolicy;


        return service;

        function getIubendaCode(){
            var language = $translate.proposedLanguage() || $translate.use();
            var iubenda_code;
            switch (language) {
                case 'it':
                    iubenda_code = Settings.IUBENDA_IT_CODE;
                    break;
                case 'fr':
                    iubenda_code = Settings.IUBENDA_FR_CODE;
                    break;
                default:
                    iubenda_code = Settings.IUBENDA_EN_CODE;
            }

            return iubenda_code;
        }


        function PrivacyPolicy(goodCallback, badCallback) {
            var language = $translate.proposedLanguage() || $translate.use();
            $http.get(privacyPolicyApiURL+"/"+getIubendaCode()+"/no-markup").then(goodCallback, badCallback);
        }

        function CookiePolicy(goodCallback, badCallback){
            var language = $translate.proposedLanguage() || $translate.use();
            $http.get(privacyPolicyApiURL+"/"+getIubendaCode()+"/cookie-policy/no-markup").then(goodCallback, badCallback);
        }

    }

})();

