(function () {
    'use strict';

    angular
        .module('app')
        .controller('MeetUsController', MeetUsController);

    MeetUsController.$inject = ['$scope','UserService', 'FlashService', 'Status'];
    function MeetUsController($scope, UserService, FlashService, Status) {
        
        var vm = this;
        vm.profiles = [];
        vm.status = Status.INIT;

        initController();

        function initController() {
            loadAllProfile();
        }

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

        
        $scope.isFailed = function(){
            return (vm.profiles == null || vm.profiles === undefined || vm.profiles.length == 0 || vm.status == Status.FAILED)
        }

        $scope.isInitial = function(){
            return (vm.status == Status.INIT);
        }

        $scope.isLoading = function(){
            return (vm.status == Status.LOADING);
        }

        $scope.isIdle = function(){
            return (vm.profiles != null && vm.profiles!== undefined && vm.profiles.length > 0 && vm.status == Status.IDLE);
        }


    }

})();
