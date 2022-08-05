﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'HomeSettings', 'PostService', 'FlashService', 'Categories', 'CategoryService'];
    function HomeController($scope, HomeSettings, PostService, FlashService, Categories, CategoryService) {
        var vm = this;
        vm.worksInfos = [];
        vm.articlesInfos = [];
        vm.magazinePostsInfos = [];
        $scope.selectedArticle = 0;
        $scope.colosseoArticleSlug = HomeSettings.COLOSSEO_ARTICLE_SLUG;

        initController();

        function initController() {
            drawSVGOnViewEnter("draw-container-2", "draw_2", "draw_2");
            drawSVGOnScroll("draw-container-3", "draw_3");
            drawSVGOnViewEnter("draw-container-4", "draw_4", "draw_4");
            drawSVGOnViewEnter("draw-container-5", "draw_5", "draw_5");
            getHomeWorksArticle();
            getCategoriesInfo();
        }

        /***********
         * Static drawing on scroll triggering
         */


        function drawSVGOnViewEnter(mainDrawContainerID, drawID, drawAnimationClass)
        {
            $(window).scroll(function() {

                try {

                    if(document.getElementById(mainDrawContainerID) != null ){
                        var wScroll = $(this).scrollTop();

                        if (wScroll > $('#' + mainDrawContainerID).offset().top - ($(window).height() / 1.5)) {
                            $('#' + drawID).attr("class", drawAnimationClass);
                        } else if (wScroll < $('#' + mainDrawContainerID).offset().top - ($(window).height())) {
                            $('#' + drawID).attr("class", "");
                        }
                    }
                }
                catch (e) {
                    console.log(e);
                }

            });
        }


        function isInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)

            );
        }

        /***********
         * Start drawing on crolling
         */

        function drawSVGOnScroll(mainDrawContainerID, drawID){
            let drawContainer = document.getElementById(mainDrawContainerID);
            let draw = document.getElementById(drawID);

            if(drawContainer != null && draw != null) {
                var length = 0;
                var offset = 0;

                var paths = drawContainer.getElementsByTagName("path");
                for (var i = 0; i < paths.length; i++) {
                    length = length + paths[i].getTotalLength();
                };

                // The start position of the drawing
                draw.style.strokeDasharray = length;

                // Hide the triangle by offsetting dash. Remove this line to show the triangle before scroll draw
                draw.style.strokeDashoffset = length;
                $(window).scroll(function () {

                    try {

                        if(document.getElementById(mainDrawContainerID) != null ) {

                            var scrollpercent;

                            var scrollFromBottom = drawContainer.getBoundingClientRect().top - (window.innerHeight || document.documentElement.clientHeight) + drawContainer.clientHeight;

                            if (scrollFromBottom >= 0)
                                scrollpercent = 0;
                            else if (scrollFromBottom + drawContainer.clientHeight >= 0)
                                scrollpercent = offset + (scrollFromBottom * (1 - offset)) / drawContainer.clientHeight
                            else
                                scrollpercent = -1;

                            var progress = length * scrollpercent;

                            draw.style.strokeDashoffset = (Math.round(length - progress)).toString();
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }

                });
            }

        }

        function getHomeWorksArticle(){

            HomeSettings.WORK_ARTICLES.forEach(postSlug => {
                
                PostService.Post(postSlug,
                    //Good callback
                    function(res){
    
                        try{
    
                            if(res.data == null) {
    
                                $translate('ERROR_404').then(function (errorMessage) {
                                    FlashService.Error(errorMessage);
                                });    
                            }
    
                            else {
    
                                vm.worksInfos.push(res.data.data);
        
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

        }

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
    
                                vm.magazinePostsInfos = vm.magazinePostsInfos.concat(res.data.data.posts);
                                console.log(vm.magazinePostsInfos);

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

        $scope.selectCategory = function(article){
            $scope.selectedArticle = article;
        };




    }

})();