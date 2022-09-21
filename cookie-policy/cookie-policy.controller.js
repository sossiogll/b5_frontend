(function () {

    'use strict';

    angular
        .module('app')
        .controller('CookiePolicyController', CookiePolicyController);

    CookiePolicyController.$inject = ['$scope', '$translate', 'IubendaService', 'Status', 'FlashService'];

    function CookiePolicyController($scope, $translate, IubendaService, Status, FlashService){

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
            getCookiePolicy();

        }


        function updateMetaInformation(){
            $translate('COOKIE_POLICY_TITLE').then(function (pageTitle) {
                $(document).ready(function() {
                    document.title = pageTitle + " | B5 - Idee in cammino";
                });
            });

            $translate('COOKIE_POLICY_DESCRIPTION').then(function (pageDescrition) {
                $(document).ready(function() {
                    $("meta[property='og\\description']").attr("content", pageDescrition);
                });
            });
        };

        function getCookiePolicy(){
            IubendaService.CookiePolicy(
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

                            $scope.cookiePolicy = res.data.content;
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
            return (($scope.cookiePolicy == null || $scope.cookiePolicy === undefined) && vm.status == Status.FAILED)
        }

        function isInitial(){
            return (vm.status == Status.INIT);
        }

        function isLoading(){
            return (vm.status == Status.LOADING);
        }

        function isIdle(){
            return ($scope.cookiePolicy != null && $scope.cookiePolicy!== undefined && vm.status == Status.IDLE);
        }

    }

})();