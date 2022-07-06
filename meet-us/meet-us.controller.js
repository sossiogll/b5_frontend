(function () {
    'use strict';

    angular
        .module('app')
        .controller('MeetUsController', MeetUsController);

    MeetUsController.$inject = ['$rootScope', 'UserService', 'FlashService'];
    function MeetUsController($rootScope, UserService, FlashService) {
        var vm = this;
        var apiURL = $rootScope.APIUrl;
        var profiles = [];

        initController();

        function initController() {
            loadAllProfile();
        }

        function loadAllProfile(){
            UserService.Index(

                function(res){

                    try{
                        //console.log("ok authentication service ");
                        if(res.data == null) {

                            FlashService.Error("Nessuna informazione ricevuta dal server.");

                        }
                        else {

                            vm.profiles = res.data.data;

                        }
                        console.log(res.data);
                    }catch (error) {
                        console.error(error);
                    }
                },

                function(){

                    FlashService.Error("Errore di comunicazione col server.");
                    console.log(vm.profiles.length);

                });
        }


    }

})();