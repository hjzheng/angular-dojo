/**
 * Created by hjzheng on 2014/12/23.
 * The file define dijitController
 */
define(['./module'], function (controllers) {
    controllers.controller('dijitController', ['$scope', 'dojoDialog', function ($scope, dojoDialog) {
       $scope.buttonConfig = {
            label: "Click me!",
            onClick: function(){
                console.log("Click me!");
            }
        };

        $scope.numberSpinnerConfig = {
            value: 1000,
            smallDelta: 10,
            constraints: { min:9, max:1550, places:0 },
            style: "width:100px"
        };

        $scope.menuButtonConfig = {
            dropDownButton: {
                label: "hello!",
                name: "programmatic"
            },
            dropDownMenu: {
                style: "display:none;"
            },
            menuItems: [
                {
                    label: "Cut",
                    iconClass:"dijitEditorIcon dijitEditorIconCut",
                    onClick: function(){ alert('cut'); }
                },
                {
                    label: "Save",
                    iconClass:"dijitEditorIcon dijitEditorIconSave",
                    onClick: function(){ alert('save'); }
                }
            ]
        };

        $scope.progressBarConfig = {
            style: "width: 300px"
        };

        $scope.progressBarAfterInit = function(){
            var i = 0;
            var _this = this
            setInterval(function(){
                if(i>100) i=0;
                _this.set("value", i++ % 100);
            }, 100);
        };

        $scope.dialogConfig = {
            title: "My Dialog",
            content: "Test content.",
            style: "width: 300px"
        };

        var dialog = dojoDialog.create($scope.dialogConfig);

        $scope.openDialogButtonConfig = {
            label: "Open Dialog!",
            onClick: function(){
                dialog.show();
            }
        }
    }]);
});
