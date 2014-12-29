/**
 * Created by hjzheng on 2014/12/23.
 * The file define parserController
 */
define(['./module', 'dojo/store/Memory'],
    function (controllers, Memory) {
    controllers.controller('dojoWidgetController', ["$scope", "$filter", function ($scope, $filter) {
        $scope.selection = {name:"Arkansas", id:"AR"};
        $scope.date = $filter('date')(new Date(), 'yyyy/MM/dd');

        $scope.store = new Memory({
            data: [
                {name:"Alabama", id:"AL"},
                {name:"Alaska", id:"AK"},
                {name:"American Samoa", id:"AS"},
                {name:"Arizona", id:"AZ"},
                {name:"Arkansas", id:"AR"},
                {name:"Armed Forces Europe", id:"AE"},
                {name:"Armed Forces Pacific", id:"AP"},
                {name:"Armed Forces the Americas", id:"AA"},
                {name:"California", id:"CA"},
                {name:"Colorado", id:"CO"},
                {name:"Connecticut", id:"CT"},
                {name:"Delaware", id:"DE"}
            ]
        });

        $scope.log = function(msg) {
            console.log(msg);
        };

        $scope.buttonClick = function(){
            console.log("button click");
        }
    }]);
});
