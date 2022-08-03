(function () {
    'use strict';

    angular
        .module('app')
        .controller('MagazineController', MagazineController);

    MagazineController.$inject = ['$rootScope', 'CategoryService', 'FlashService', '$translate'];
    function MagazineController($rootScope, CategoryService, FlashService, $translate) {

        //Init pointer to controller for inner functions
        var vm = this;

        //Declaring local variables
        vm.categoriesSlug = [
            "magazine-1",
            "magazine-2",
        ]
        vm.categoriesInfos = [];

        //Init controller
        initController();


        //Implementig functions
        function initController() {

            getCategoriesInfo();

        };

        function getCategoriesInfo(){

            vm.categoriesSlug.forEach(categorySlug => {
                
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

                                console.log(res.data.data);
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

            });

        };

    }

})();