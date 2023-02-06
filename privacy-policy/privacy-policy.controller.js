(function () {

    'use strict';

    angular
        .module('app')
        .controller('PrivacyPolicyController', PrivacyPolicyController);

    PrivacyPolicyController.$inject = ['$scope', '$translate', 'IubendaService', 'Status', 'FlashService'];

    function PrivacyPolicyController($scope, $translate, IubendaService, Status, FlashService) {

        var vm = this;
        vm.status = Status.INIT;

        //Scope functions
        $scope.isFailed = isFailed;
        $scope.isInitial = isInitial;
        $scope.isLoading = isLoading;
        $scope.isIdle = isIdle; 


        initController();

        function initController() {
            updateMetaInformation();
            getPrivacyPolicy();
        }

        function updateMetaInformation(){
            $translate('PRIVACY_POLICY_TITLE').then(function (pageTitle) {
                $(document).ready(function() {
                    document.title = pageTitle + " | B5 - Idee in cammino";
                });
            });

            $translate('PRIVACY_POLICY_DESCRIPTION').then(function (pageDescrition) {
                $(document).ready(function() {
                    $("meta[property='og\\description']").attr("content", pageDescrition);
                });
            });
        }

        function getPrivacyPolicy(){
            IubendaService.PrivacyPolicy(
                //Good callback
                function(res){

                    try{

                        if(res.data == null) {

                            $translate('ERROR_404').then(function (errorMessage) {
                                FlashService.Error(errorMessage);
                            });    

                            vm.status = Status.FAILED;
                        }

                        else {

                            $scope.privacyPolicy = res.data.content;
                            vm.status = Status.IDLE;

                        }

                    }catch (error) {

                        FlashService.Error(error);
                        vm.status = Status.FAILED;
                        return;

                    }
                },
                
                //bad callback
                function(){

                    $translate('ERROR_400').then(function (errorMessage) {
                        FlashService.Error(errorMessage);
                    });

                    vm.status = Status.FAILED;

                }
            );
        }

        function isFailed(){
            return (($scope.privacyPolicy == null || $scope.privacyPolicy === undefined) && vm.status == Status.FAILED)
        }

        function isInitial(){
            return (vm.status == Status.INIT);
        }

        function isLoading(){
            return (vm.status == Status.LOADING);
        }

        function isIdle(){
            return ($scope.privacyPolicy != null && $scope.privacyPolicy!== undefined && vm.status == Status.IDLE);
        }

    }

})();