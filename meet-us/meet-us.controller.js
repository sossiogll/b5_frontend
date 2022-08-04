(function () {
    'use strict';

    angular
        .module('app')
        .controller('MeetUsController', MeetUsController);

    MeetUsController.$inject = ['UserService', 'FlashService'];
    function MeetUsController(UserService, FlashService) {
        
        var vm = this;
        vm.profiles = [];
        vm.isLoaded = false;

        initController();

        function initController() {
            loadAllProfile();
        }

        function loadAllProfile(){

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

                            console.log(vm.profiles);

                        }

                    }catch (error) {

                        console.error(error);

                    }

                    vm.isLoaded = true;

                },

                function(){

                    $translate('ERROR_400').then(function (errorMessage) {
                        FlashService.Error(errorMessage);
                    });

                    vm.isLoaded = true;

                });
        }



    }

})();
