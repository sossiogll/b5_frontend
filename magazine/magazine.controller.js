(function () {
    'use strict';

    angular
        .module('app')
        .controller('MagazineController', MagazineController);

    MagazineController.$inject = ['$scope', 'CategoryService', 'FlashService', '$translate', 'Categories', 'Status'];
    function MagazineController($scope, CategoryService, FlashService, $translate, Categories, Status) {

        //Init pointer to controller for inner functions
        var vm = this;

        //Declaring local variables
        vm.categoriesInfos = [];
        vm.status = Status.INIT;


        //Init controller
        initController();


        //Implementig functions
        function initController() {

            getCategoriesInfo();

        };

        function getCategoriesInfo(){

            vm.status = Status.LOADING;


            Categories.MAGAZINE.forEach((categorySlug, index) => {
                
                CategoryService.Category(categorySlug,

                    //Good callback
                    function(res){

                        try{

                            if(res.data == null) {
    
                                $translate('ERROR_404').then(function (errorMessage) {
                                    FlashService.Error(errorMessage);
                                });    
                            }

                            else {
    
                                vm.categoriesInfos.push(res.data.data);

                                if(index == Categories.MAGAZINE.length-1 && vm.status!= Status.ERROR)
                                    vm.status = Status.IDLE;
                            }

                        }catch (error) {

                            FlashService.Error(error);
                            vm.status = Status.ERROR;

                        }
                    },
                    
                    //bad callback
                    function(){

                        $translate('ERROR_400').then(function (errorMessage) {
                            FlashService.Error(errorMessage);
                          });

                          vm.status = Status.ERROR;

                    })


            });

            console.log(vm.status);

        };

        $scope.isFailed = function(){
            return (vm.categoriesInfos == null || vm.categoriesInfos === undefined || vm.categoriesInfos.length == 0 && vm.status == Status.FAILED)
        }

        $scope.isInitial = function(){
            return (vm.status == Status.INIT);
        }

        $scope.isLoading = function(){
            return (vm.status == Status.LOADING);
        }

        $scope.isIdle = function(){
            return (vm.categoriesInfos != null && vm.categoriesInfos!== undefined && vm.categoriesInfos.length > 0 && vm.status == Status.IDLE);
        }

    }

})();