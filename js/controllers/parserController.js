/**
 * Created by hjzheng on 2014/12/23.
 * The file define parserController
 */
define(['./module'], function (controllers) {
    controllers.controller('parserController', ["$scope", function ($scope) {
        $scope.buttonAfterInit = function(){
            console.log("run button after init function");
            this.set('label', 'set on afterinit');
        }
    }]);
});
