/**
 * Created by hjzheng on 2014/12/23.
 * This file define directive 
 * use dijit widgets
 */
define(['./module', 'dojo/parser', 'jquery'], function (directives, parser, jQuery) {
    
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
                    jQuery(parentNode).children().unwrap();
                });
            }
        };
    }).directive('dojoWidget', function ($timeout, $filter) {
        //refer to https://github.com/adrobisch/angular-dojo
        var parseProps = function (props) {
            if (typeof props === 'undefined') {
               return {};
            } else {
               props = '[{' + props + '}]';
               return eval(props)[0];
            }
        }

        return {
            restrict: "A",
            replace: false,
            transclude: false,
            require: '?ngModel',
            scope: {
                'ngModel': '=?',
                'ngClick': '&',
                'ngChange': '&',
                'dojoStore': '&',
                'dojoProps': '@'
            },
            link: function(scope, element, attrs) {
                require([attrs.dojoWidget, "dojo/on"], function(DojoWidget, on){
                    scope.widget = new DojoWidget({}, element[0]);

                    attrs.$observe('dojoProps', function(){
                        scope.widget.set(parseProps(scope.dojoProps));
                    });

                    attrs.$observe('dojoStore', function() {
                        if (typeof scope.dojoStore != 'undefined') {
                            scope.widget.store = scope.dojoStore();
                        }
                    });

                    scope.$watch('ngModel', function() {
                        if (scope.ngModel != undefined) {
                            if (attrs.dojoWidget == 'dijit/form/FilteringSelect' || attrs.dojoWidget == 'dijit/form/Select') {
                                scope.widget.set('item', scope.ngModel);
                            } else if(attrs.dojoWidget == 'dijit/form/DateTextBox'){
                                //the value for DataTextBox is JS Date Object
                                scope.widget.set('value', new Date($filter('date')(scope.ngModel, 'fullDate')));
                            } else {
                                scope.widget.set('value', scope.ngModel);
                            }
                        }
                    });

                    on(scope.widget, "change", function(newValue) {
                        if (attrs.dojoWidget == 'dijit/form/FilteringSelect' || attrs.dojoWidget == 'dijit/form/Select') {
                            scope.ngModel = this.item;
                        } else if(attrs.dojoWidget == 'dijit/Calendar' || attrs.dojoWidget == 'dijit/form/DateTextBox'){
                            //date format problems
                            scope.ngModel = $filter('date')(newValue, 'yyyy/MM/dd');
                        } else {
                            scope.ngModel = newValue;
                        }

                        $timeout(function() {
                            scope.$apply();
                            if (scope.ngChange != undefined) {
                                scope.ngChange();
                            }
                        });
                    });

                    on(scope.widget, 'click', function() {
                        $timeout(function() {
                            scope.$apply();
                            if (scope.ngClick != undefined) {
                                scope.ngClick();
                            }
                        });
                    });

                });
            }
        }
    });

});
