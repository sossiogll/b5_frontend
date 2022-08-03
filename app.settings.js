(function () {
    'use strict';

    angular
        .module('app')
        .constant('AppInfo', {
            VERSION : {
                MAJOR : 0,
                MINOR : 7,
                BUILD : 47
            },
            NAME : "B5 Frontend"
        })
        .constant('Settings',{
            APIURL : 'http://localhost/laravel/laravel-blog/public/api/v1',
            LOCALE_FILE_PREFIX : 'app-content/locales/locale-',
            LOCALE_FILE_SUFFIX : '.json',
            DEFAULT_LANG : 'it',
            CURSOR_THEME : 'RED',
            CURSOR_LAZYNESS : 200,
            DEFAULT_REDIRECT : '/'
        })
        .constant('State', {
            IDLE : '3',
            LOADING : '2',
            INIT : '1'
        })
        .constant('Categories', {
            MAGAZINE : [
                'magazine-1',
                'magazine-2'
            ],
            WORKS : [
                'work-1',
                'work-2',
            ]
        })



})();