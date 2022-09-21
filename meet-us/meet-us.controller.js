(function () {
    'use strict';

    angular
        .module('app')
        .controller('MeetUsController', MeetUsController);

    MeetUsController.$inject = ['$scope', '$rootScope', 'UserService', 'FlashService', 'Status', '$translate'];
    function MeetUsController($scope, $rootScope, UserService, FlashService, Status, $translate) {
        
        //Init pointer to controller for inner functions
        var vm = this;

        //Declaring local variables
        vm.profiles = [];
        vm.status = Status.INIT;

        //Scope functions
        $scope.isFailed = isFailed;
        $scope.isInitial = isInitial;
        $scope.isLoading = isLoading;
        $scope.isIdle = isIdle;

        //Init controller
        initController();

        function initController() {
            updateMetaInformation();
            loadAllProfile();
        }

        
        /*************Implementig functions*************/


        function loadAllProfile(){

            vm.status = Status.LOADING;

            UserService.Index(

                function(res){

                    try{

                        if(res.data.data == null) {

                            $translate('ERROR_404').then(function (errorMessage) {
                                FlashService.Error(errorMessage);
                            });
                            vm.status = Status.FAILED;

                        }
                        else {

                            vm.profiles = res.data.data;
                            vm.status = Status.IDLE;


                            $("document").ready(function(){

                                console.log(isTouchDevice());

                                if(!isTouchDevice()){

                                    $("#scrollTop div").width($("#meetUsContainer")[0].scrollWidth);

                                    $("#scrollTop").on("scroll", function(){
                                        $("#container-card-conoscici").scrollLeft($(this).scrollLeft());
                                    });
                                    $("#container-card-conoscici").on("scroll", function(){
                                        $("#scrollTop").scrollLeft($(this).scrollLeft());
                                    });

                                }
                            });

                        }

                    }catch (error) {

                        
                        FlashService.Error(error);
                        vm.status = Status.FAILED;
                        return;

                    }


                },

                function(){

                    $translate('ERROR_400').then(function (errorMessage) {
                        FlashService.Error(errorMessage);
                    });
                    vm.status = Status.FAILED;

                });
        }

        function updateMetaInformation(){
            $translate('MEET_US_TITLE').then(function (pageTitle) {
                $(document).ready(function() {
                    document.title = pageTitle + " | B5 - Idee in cammino";
                });
            });

            $translate('MEET_US_DESCRIPTION').then(function (pageDescrition) {
                $(document).ready(function() {
                    $("meta[property='og\\description']").attr("content", pageDescrition);
                });
            });
        }

        function isTouchDevice() {
            return (('ontouchstart' in window) ||
               (navigator.maxTouchPoints > 0) ||
               (navigator.msMaxTouchPoints > 0));
          }

        
        function isFailed(){
            return (vm.profiles == null || vm.profiles === undefined || vm.profiles.length == 0 || vm.status == Status.FAILED)
        }

        function isInitial(){
            return (vm.status == Status.INIT);
        }

        function isLoading(){
            return (vm.status == Status.LOADING);
        }

        function isIdle(){
            return (vm.profiles != null && vm.profiles!== undefined && vm.profiles.length > 0 && vm.status == Status.IDLE);
        }


    }

})();
