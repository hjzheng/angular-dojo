/**
 * Created by hjzheng on 2014/12/23.
 * This file define directive 
 * use dijit widgets
 */
define(['./module', 'dijit/form/Button', 'dojo/parser', 'dijit/form/NumberSpinner',
    'dijit/form/DropDownButton', 'dijit/DropDownMenu', 'dijit/MenuItem', 'dijit/ProgressBar'], 
    function (directives, Button, parser, NumberSpinner, 
        DropDownButton, DropDownMenu, MenuItem, ProgressBar) {
    
    directives.directive("dojoParser", function(){
        return {
            restrict: 'A',
            scope: {
                afterInit: "&"
            },
            controller: function($scope, $element, $attrs, $transclude, instanceInit){
                var _this = this;
                $element.wrap("<span></span>");
                var parentNode = $element[0].parentNode;
                parser.parse(parentNode).then(function(instances){
                    angular.forEach(instances, function(instance){
                        instanceInit.afterInit($scope.afterInit, instance);
                    });
                    $(parentNode).children().unwrap();
                });
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
                var button = new Button($scope.dojoConfig, $element[0]).startup();
                instanceInit.afterInit($scope.afterInit, button);
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
                var numberSpinner = new NumberSpinner($scope.dojoConfig, $element[0]);
                numberSpinner.startup();

                instanceInit.afterInit($scope.afterInit, numberSpinner);
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
                var progressBar = new ProgressBar($scope.dojoConfig).placeAt($element[0]);
                progressBar.startup();
                //run after init
                instanceInit.afterInit($scope.afterInit, progressBar);
            }
        };
    });

});
