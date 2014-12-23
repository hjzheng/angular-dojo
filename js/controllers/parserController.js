/**
 * Created by hjzheng on 2014/12/23.
 * The file define parserController
 */
define(['./module'], function (controllers) {
    controllers.controller('parserController', ["$scope", function ($scope) {
        $scope.click = function(){
            console.log($scope.dojoInstances);
        }
    }]);
});
