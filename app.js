(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'vcRecaptcha', 'pascalprecht.translate', 'gllCursor'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$translateProvider', '$cursorProvider'];
    function config($routeProvider, $locationProvider, $translateProvider, $cursorProvider) {

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
            .when('/meet-us', {
                controller: 'MeetUsController',
                templateUrl: 'meet-us/meet-us.view.html',
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

        $cursorProvider.cursorTheme("RED");
        $cursorProvider.cursorLazyness(200);

    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {

        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};

        $rootScope.lang = 'it';


    }


})();