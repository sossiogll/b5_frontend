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
            drawSVG();
        }

        function drawSVG(){

            console.log("draw");
            var draw = document.getElementById("draw_1");
            var length = 0;
            var drawContainer = document.getElementById("draw-container-1");
            var offset = 0;
            var navBar = document.getElementById("nav-bar");

            var paths = drawContainer.getElementsByTagName("path");

            for(var i = 0; i < paths.length; i++){
                length = length + paths[i].getTotalLength();
            };

            console.log(length);
            // The start position of the drawing
            draw.style.strokeDasharray = length;

            // Hide the triangle by offsetting dash. Remove this line to show the triangle before scroll draw
            draw.style.strokeDashoffset = length;

            // Find scroll percentage on scroll (using cross-browser properties), and offset dash same amount as percentage scrolled
            window.addEventListener("scroll", myFunction);

            function myFunction() {
                //var scrollpercent = (document.documentElement.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
                var scrollpercent;

                    var scrollFromTop = Math.abs(drawContainer.getBoundingClientRect().top - navBar.clientHeight);

                    if(drawContainer.clientHeight - scrollFromTop >= 0)
                        scrollpercent = offset + (scrollFromTop*(1-offset))/drawContainer.clientHeight
                    else
                        scrollpercent = 1

               // scrollpercent = offset + (scrollFromTop*offset)/drawContainer.clientHeight

                var progress = length * scrollpercent;
                console.log("scroll percent: "+(scrollpercent));
                //console.log("Height container: "+drawContainer.clientHeight);
                console.log("progress: "+progress);

                // Reverse the drawing (when scrolling upwards)
                draw.style.strokeDashoffset = length - progress;
            }

        }




    }

})();