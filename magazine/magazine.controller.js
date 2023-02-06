(function () {
    'use strict';

    angular
        .module('app')
        .controller('MagazineController', MagazineController);

    MagazineController.$inject = ['$scope', '$rootScope', 'CategoryService', 'FlashService', '$translate', 'Categories', 'Status'];
    function MagazineController($scope, $rootScope, CategoryService, FlashService, $translate, Categories, Status) {

        //Init pointer to controller for inner functions
        var vm = this;

        //Declaring local variables
        vm.categoriesInfos = [];
        vm.status = Status.INIT;

        //Scope functions
        $scope.isFailed = isFailed;
        $scope.isInitial = isInitial;
        $scope.isLoading = isLoading;
        $scope.isIdle = isIdle;  


        //Init controller
        initController();


        //Implementing functions
        function initController() {
            updateMetaInformation();
            getCategoriesInfo();

        };

        function getCategoriesInfo(){

            vm.status = Status.LOADING;

            Categories.MAGAZINE.forEach((categorySlug, index) => {
                
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
    
                                vm.categoriesInfos.push(res.data.data);

                                if(index == (Categories.MAGAZINE.length-1) && !isFailed())
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

                    },

                    //limit
                    1000)

            });

        }

        function updateMetaInformation(){
            $translate('MAGAZINE_TITLE').then(function (pageTitle) {
                $(document).ready(function() {
                    document.title = pageTitle + " | B5 - Idee in cammino";
                });
            });
    
            $translate('MAGAZINE_DESCRIPTION').then(function (pageDescrition) {            
                $(document).ready(function() {
                    $("meta[property='og\\description']").attr("content", pageDescrition);
                });
            });
        }

        function isFailed(){
            return (vm.categoriesInfos == null || vm.categoriesInfos === undefined || vm.categoriesInfos.length == 0 && vm.status == Status.FAILED)
        }

        function isInitial(){
            return (vm.status == Status.INIT);
        }

        function isLoading(){
            return (vm.status == Status.LOADING);
        }

        function isIdle(){
            return (vm.categoriesInfos != null && vm.categoriesInfos!== undefined && vm.categoriesInfos.length > 0 && vm.status == Status.IDLE);
        }

    }

})();