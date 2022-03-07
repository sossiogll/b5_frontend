(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'vcRecaptcha'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })
            
            .when('/privacyPolicy', {
                controller: 'PrivacyPolicyController',
                templateUrl: 'privacy-policy/privacy-policy.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {

        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};


        $rootScope.$on('$locationChangeStart', function (event, next, current) {

            //$location.path('/');

        });

    }



})();