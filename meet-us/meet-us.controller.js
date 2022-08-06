(function () {
    'use strict';

    angular
        .module('app')
        .controller('MeetUsController', MeetUsController);

    MeetUsController.$inject = ['$scope','UserService', 'FlashService', 'Status'];
    function MeetUsController($scope, UserService, FlashService, Status) {
        
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
            loadAllProfile();
        }

        
        /*************Implementig functions*************/


        function loadAllProfile(){

            vm.status = Status.LOADING;

            UserService.Index(

                function(res){

                    try{

                        if(res.data == null) {

                            $translate('ERROR_404').then(function (errorMessage) {
                                FlashService.Error(errorMessage);
                            });  
                        }
                        else {

                            vm.profiles = res.data.data;

                            vm.status = Status.IDLE;


                        }

                    }catch (error) {

                        
                        FlashService.Error(error);
                        vm.status = Status.FAILED;

                    }


                },

                function(){

                    $translate('ERROR_400').then(function (errorMessage) {
                        FlashService.Error(errorMessage);
                    });

                    vm.status = Status.FAILED;

                });
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
