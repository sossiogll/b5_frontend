﻿(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'vcRecaptcha', 'pascalprecht.translate'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$translateProvider'];
    function config($routeProvider, $locationProvider, $translateProvider) {

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
            .when('/works', {
                controller: 'WorksController',
                templateUrl: 'works/works.view.html',
                controllerAs: 'vm'
            })
            .when('/magazine', {
                controller: 'MagazineController',
                templateUrl: 'magazine/magazine.view.html',
                controllerAs: 'vm'
            })
            .when('/find-us', {
                controller: 'FindUsController',
                templateUrl: 'find-us/find-us.view.html',
                controllerAs: 'vm'
            })
            .when('/credits', {
                controller: 'CreditsController',
                templateUrl: 'credits/credits.view.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/' });

        $translateProvider
            .useStaticFilesLoader({
                prefix: 'app-content/locales/locale-',
                suffix: '.json'
            })
            // remove the warning from console log by putting the sanitize strategy
            .useSanitizeValueStrategy('sanitizeParameters')
            .preferredLanguage('it');
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {

        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};

        $rootScope.lang = 'it';

        $rootScope.$on('$locationChangeStart', function (event, next, current) {

            //$location.path('/');

        });

    }



})();