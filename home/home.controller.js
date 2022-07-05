(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope'];
    function HomeController($rootScope) {
        var vm = this;

        initController();

        function initController() {
            drawSVGOnViewEnter("draw-container-2", "draw_2", "draw_2");
            drawSVGOnScroll("draw-container-3", "draw_3");
            drawSVGOnViewEnter("draw-container-4", "draw_4", "draw_4");
            drawSVGOnViewEnter("draw-container-5", "draw_5", "draw_5");

        }

        /***********
         * Static drawing on scroll triggering
         */


        function drawSVGOnViewEnter(mainDrawContainerID, drawID, drawAnimationClass)
        {
            $(window).scroll(function() {
                var wScroll = $(this).scrollTop();

                if (wScroll > $('#'+mainDrawContainerID).offset().top - ($(window).height() / 1.5)) {
                    $('#'+drawID).attr("class", drawAnimationClass);
                } else if (wScroll < $('#'+mainDrawContainerID).offset().top - ($(window).height())) {
                    $('#'+drawID).attr("class", "");
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

                });
            }

        }




    }

})();