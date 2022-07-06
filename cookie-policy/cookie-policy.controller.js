(function () {

    'use strict';

    angular
        .module('app')
        .controller('CookiePolicyController', CookiePolicyController);

    PrivacyPolicyController.$inject = [];

    function PrivacyPolicyController() {

        console.log("cookie");

    }

})();