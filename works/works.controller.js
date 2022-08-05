(function () {
    'use strict';

    angular
        .module('app')
        .controller('WorksController', WorksController);

    WorksController.$inject = ['$scope', 'CategoryService', 'FlashService', '$translate', 'Categories'];
    function WorksController($scope, CategoryService, FlashService, $translate, Categories) {

        //Init pointer to controller for inner functions
        var vm = this;

        //Declaring local variables
        vm.worksCategoryInfos = [];
        vm.worksInfos = [];
        vm.filters = [];
        $scope.selectCategory = selectCategory
        

        //Init controller
        initController();


        //Implementig functions
        function initController() {

            getCategoriesInfo();

        };

        function getCategoriesInfo(){

            Categories.WORKS.forEach(categorySlug => {
                
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

                                res.data.data.posts.forEach((post) => {
                                    post.category_slug = categorySlug;
                                });
                                vm.worksInfos = vm.worksInfos.concat(res.data.data.posts);

                                res.data.data.posts.splice(0,res.data.data.posts.length);
                                vm.worksCategoryInfos.push(res.data.data);

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

        function selectCategory(element) {
            console.log(element);
        }

    }

})();