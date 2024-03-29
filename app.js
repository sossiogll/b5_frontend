﻿(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'vcRecaptcha', 'pascalprecht.translate', 'gllCursor', 'ngSanitize', 'wu.masonry', 'ngAnimate'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$translateProvider', '$cursorProvider', 'Settings'];
    function config($routeProvider, $locationProvider, $translateProvider, $cursorProvider, Settings) {

        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })
            .when('/privacy-policy', {
                controller: 'PrivacyPolicyController',
                templateUrl: 'privacy-policy/privacy-policy.view.html',
                controllerAs: 'vm'
            })
            .when('/cookie-policy', {
                controller: 'CookiePolicyController',
                templateUrl: 'cookie-policy/cookie-policy.view.html',
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
            .when('/works/:postSlug', {
                controller: 'WorkArticleController',
                templateUrl: 'work-article/work-article.view.html',
                controllerAs: 'vm'
            })
            .when('/magazine/:postSlug', {
                controller: 'MagazineArticleController',
                templateUrl: 'magazine-article/magazine-article.view.html',
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
            .otherwise({ redirectTo: Settings.DEFAULT_REDIRECT });

        $locationProvider.html5Mode(true);

        $translateProvider
            .useStaticFilesLoader({
                prefix: Settings.LOCALE_FILE_PREFIX,
                suffix: Settings.LOCALE_FILE_SUFFIX
            })
            // remove the warning from console log by putting the sanitize strategy
            .useSanitizeValueStrategy('sanitizeParameters')
            .preferredLanguage(Settings.DEFAULT_LANG);
        $translateProvider.useCookieStorage();

        $cursorProvider.cursorTheme(Settings.CURSOR_THEME);
        $cursorProvider.cursorLazyness(Settings.CURSOR_LAZYNESS);

    }

    run.$inject = ['$rootScope', 'Settings'];
    function run($rootScope, Settings) {

        // keep user logged in after page refresh
        $rootScope.lang = Settings.DEFAULT_LANG;
        $rootScope.meta = [];
    }


})();