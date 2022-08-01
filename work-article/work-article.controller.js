(function () {
    'use strict';

    angular
        .module('app')
        .controller('WorkArticleController', WorkArticleController);

    WorkArticleController.$inject = ['$rootScope'];
    function WorkArticleController($rootScope) {
        var vm = this;
        vm.articleinfo= JSON.parse('{"data":{"id":3,"title":"Restauro dell\u2019Anfiteatro Flavio (Colosseo)","slug":"restauro-dellanfiteatro-flavio-colosseo","content":"<p>Complessit\u00e0 e spazialit\u00e0 tridimensionale sono state dunque le direttrici che hanno indirizzato la fase della progettazione esecutiva.<\/p>","posted_at":"2022-07-30T17:06:25+02:00","comments_count":0,"category_id":2,"custom_fields_values":{"localita":"Roma","importo":"8,0000","impresa":"Altera S.p.A."}}}');
        console.log(vm.articleinfo.data);
        initController();

        function initController() {
        }


    }

})();