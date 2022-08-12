(function () {
    'use strict';

    angular
        .module('app')
        .controller('WorksController', WorksController);

    WorksController.$inject = ['$scope', 'CategoryService', 'FlashService', '$translate', 'Categories', 'Status'];
    function WorksController($scope, CategoryService, FlashService, $translate, Categories, Status) {

        //Init pointer to controller for inner functions
        var vm = this;

        //Declaring local variables
        vm.worksCategoryInfos = [];
        vm.worksInfos = [];
        vm.filters = [];
        vm.status = Status.INIT;

        //Scope functions
        $scope.isFailed = isFailed;
        $scope.isInitial = isInitial;
        $scope.isLoading = isLoading;
        $scope.isIdle = isIdle;        
        

        //Init controller
        initController();

        function initController() {

            getCategoriesInfo();

        };

        /*************Implementig functions*************/


        function getCategoriesInfo(){

            vm.status = Status.LOADING;

            Categories.WORKS.forEach((categorySlug, index) => {
                
                CategoryService.Category(categorySlug,

                    //Good callback
                    function(res){

                        try{

                            if(res.data.data == null) {

                                $translate('ERROR_404').then(function (errorMessage) {
                                    FlashService.Error(errorMessage);
                                });    

                                vm.status = Status.FAILED;
                            }

                            else {

                                res.data.data.posts.forEach((post) => {
                                    post.category_slug = categorySlug;
                                });
                                vm.worksInfos = vm.worksInfos.concat(res.data.data.posts);

                                res.data.data.posts.splice(0,res.data.data.posts.length);
                                vm.worksCategoryInfos.push(res.data.data);

                                if(vm.status != Status.FAILED && index == Categories.WORKS.length-1)
                                    vm.status = Status.IDLE;

                            }

                        }catch (error) {

                            FlashService.Error(error);
                            vm.status = Status.FAILED;
                            return;

                        }
                    },
                    
                    //bad callback
                    function(){

                        $translate('ERROR_400').then(function (errorMessage) {
                            FlashService.Error(errorMessage);
                        });

                        vm.status = Status.FAILED;

                    })

            });

        };

        function isFailed(){
            return (vm.worksInfos == null || vm.worksInfos === undefined || vm.worksInfos.length == 0 || vm.status == Status.FAILED)
        }

        function isInitial(){
            return (vm.status == Status.INIT);
        }

        function isLoading(){
            return (vm.status == Status.LOADING);
        }

        function isIdle(){
            return (vm.worksInfos != null && vm.worksInfos!== undefined && vm.worksInfos.length > 0 && vm.status == Status.IDLE);
        }

    }

})();