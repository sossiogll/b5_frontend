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
        .constant('HomeSettings', {
            WORK_ARTICLES : [
                'hello-world',
                'test-magazine-1',
                'test-2-magazine-1',
                'test-3-magazine-1',
                'test-magazine-2',
                'lavoro-1'
            ],

            COLOSSEO_ARTICLE_SLUG : 'restauro-dellanfiteatro-flavio-colosseo'
        })
        .constant('Status', {
            INIT : 1,
            LOADING : 2,
            FAILED : 3,
            IDLE : 4
        })       



})();