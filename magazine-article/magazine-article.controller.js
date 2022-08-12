(function () {
    'use strict';

    angular
        .module('app')
        .controller('MagazineArticleController', MagazineArticleController);

    MagazineArticleController.$inject = ['$rootScope', '$scope', '$routeParams', 'PostService', 'FlashService', 'Status', '$translate',];
    function MagazineArticleController($rootScope, $scope, $routeParams, PostService, FlashService, Status, $translate) {
             
        //Init pointer to controller for inner functions
        var vm = this;

        //Declaring local variables
        vm.status = Status.INIT;
        vm.postInfo = [];

        //Scope functions
        $scope.isFailed = isFailed;
        $scope.isInitial = isInitial;
        $scope.isLoading = isLoading;
        $scope.isIdle = isIdle;  

        //Init controller
        initController();

        function initController() {
            getPostInfo();
        }

        function getPostInfo(){

            vm.status =  Status.LOADING;

            try{

                PostService.Post($routeParams.postSlug,
                    //Good callback
                    function(res){               

                        if(res.data.data == null) {

                            $translate('ERROR_404').then(function (errorMessage) {
                                FlashService.Error(errorMessage);
                            });
                            vm.status = Status.FAILED;

                        }

                        else {

                            vm.postInfo = res.data.data;
                            $scope.postContent = vm.postInfo.content;
                            vm.status = Status.IDLE;
                        }


                    },
                
                    //bad callback
                    function(){

                        $translate('ERROR_400').then(function (errorMessage) {
                            FlashService.Error(errorMessage);
                        });

                        vm.status = Status.FAILED;


                    })

                }

            catch (error) {

                FlashService.Error(error);
                vm.status = Status.FAILED;
                return;

            }
        }

        function isFailed(){
            return (vm.postInfo == null || vm.postInfo === undefined || vm.status == Status.FAILED)
        }

        function isInitial(){
            return (vm.status == Status.INIT);
        }

        function isLoading(){
            return (vm.status == Status.LOADING);
        }

        function isIdle(){
            return (vm.postInfo != null && vm.postInfo!== undefined && vm.status == Status.IDLE);
        }

    }

})();