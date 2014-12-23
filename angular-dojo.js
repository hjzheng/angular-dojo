/**
 * angular-dojo Module
 */

angular.module('angular-dojo', []).service('instanceInit', function(){
    return {
        afterInit: function(afterInit, instance){
            if(afterInit()){
                angular.bind(instance, afterInit())();
            }
        },
        beforeInit: function(){
            //TODO
        }
    };
}).service('dojoDialog', function(){

    var createDialog = function(dojoConfig){
        var dialog = null;
        //http://dojotoolkit.org/documentation/tutorials/1.10/modules_advanced/
        //http://dojotoolkit.org/reference-guide/1.10/loader/amd.html#loader-amd
        //Use sync way, we need the dialog instance
        require({async:false}, ["dijit/Dialog"], function(Dialog){
            dialog = new Dialog(dojoConfig);
        });
        return dialog;
    };

    return {
        create: createDialog
    };
}).directive("dojoParser", function(){
    return {
        restrict: 'A',
        scope: false,
        controller: function($scope, $element, $attrs, $transclude){
            var _this = this;
            _this.dojoInstances = _this.dojoInstances || [];
            $element.wrap("<span></span>");
            var parentNode = $element[0].parentNode;
            require(["dojo/parser","dojo/domReady!"], function(parser){
                parser.parse(parentNode).then(function(instances){
                    $(parentNode).children().unwrap();
                    angular.forEach(instances, function(instance){
                        _this.dojoInstances.push(instance);
                    });
                });
            });
            $scope.dojoInstances = _this.dojoInstances;
        }
    };
}).directive('dojoButton', function(){
    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        scope: {
            dojoConfig: "=",
            afterInit: "&"
        },
        controller: function($scope, $element, $attrs, $transclude, instanceInit){
            require(["dijit/form/Button"], function(Button){
                var button = new Button($scope.dojoConfig, $element[0]).startup();
                instanceInit.afterInit($scope.afterInit, button);
            });
        }
    };
}).directive('dojoNumberSpinner', function(){
    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        scope: {
            dojoConfig: "=",
            afterInit: "&"
        },
        controller: function($scope, $element, $attrs, $transclude, instanceInit){
            require(["dijit/form/NumberSpinner"], function(NumberSpinner){
                var numberSpinner = new NumberSpinner($scope.dojoConfig, $element[0]);
                numberSpinner.startup();

                instanceInit.afterInit($scope.afterInit, numberSpinner);
            });
        }
    };
}).directive('dojoMenuButton', function(){
    // Runs during compile
    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        scope: {
            dojoConfig: "=",
            afterInit: "&"
        },
        controller: function($scope, $element, $attrs, $transclude, instanceInit){
            require(["dijit/form/DropDownButton", "dijit/DropDownMenu", "dijit/MenuItem"],
                function(DropDownButton, DropDownMenu, MenuItem){
                    var menu = new DropDownMenu($scope.dojoConfig.dropDownMenu);
                    angular.forEach($scope.dojoConfig.menuItems,function(menuItem){
                        var menuItem = new MenuItem(menuItem);
                        menu.addChild(menuItem);
                    });
                    menu.startup();
                    $scope.dojoConfig.dropDownButton.dropDown = menu;
                    var button = new DropDownButton($scope.dojoConfig.dropDownButton, $element[0]);
                    button.startup();

                    instanceInit.afterInit($scope.afterInit, button);
                });
        }
    };
}).directive('dojoProgressBar', function(){
    // Runs during compile
    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        scope: {
            dojoConfig: "=",
            afterInit: "&"
        },
        controller: function($scope, $element, $attrs, $transclude, instanceInit){
            require(["dijit/ProgressBar"], function(ProgressBar){
                var progressBar = new ProgressBar($scope.dojoConfig).placeAt($element[0]);
                progressBar.startup();
                //run after init
                instanceInit.afterInit($scope.afterInit, progressBar);
            });
        }
    };
});