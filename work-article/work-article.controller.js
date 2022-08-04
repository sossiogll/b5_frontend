(function () {
    'use strict';

    angular
        .module('app')
        .controller('WorkArticleController', WorkArticleController);

    WorkArticleController.$inject = ['$routeParams', 'PostService', 'FlashService', '$window'];
    function WorkArticleController($routeParams, PostService, FlashService, $window) {
        //Init pointer to controller for inner functions
        var vm = this;

        initController();

        //Init controller
        function initController() {
            getPostInfo();
        }

        function getPostInfo(){
            PostService.Post($routeParams.postSlug,
                //Good callback
                function(res){

                    try{

                        if(res.data == null) {

                            $translate('ERROR_404').then(function (errorMessage) {
                                FlashService.Error(errorMessage);
                            });    
                        }

                        else {

                            vm.postInfo = res.data.data;

                            console.log(vm.postInfo);

                        }

                    }catch (error) {

                        FlashService.Error(error);

                    }
                },
                
                //bad callback
                function(){

                    $translate('ERROR_400').then(function (errorMessage) {
                        FlashService.Error(errorMessage);
                      });

                })

        }


    }

})();