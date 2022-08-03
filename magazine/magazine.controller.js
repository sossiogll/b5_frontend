(function () {
    'use strict';

    angular
        .module('app')
        .controller('MagazineController', MagazineController);

    MagazineController.$inject = ['CategoryService', 'FlashService', '$translate', 'Categories'];
    function MagazineController(CategoryService, FlashService, $translate, Categories) {

        //Init pointer to controller for inner functions
        var vm = this;

        //Declaring local variables
        vm.categoriesInfos = [];

        //Init controller
        initController();


        //Implementig functions
        function initController() {

            getCategoriesInfo();

        };

        function getCategoriesInfo(){

            Categories.MAGAZINE.forEach(categorySlug => {
                
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