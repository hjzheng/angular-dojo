/**
* angular-dojo Module
*/ 
angular.module('angular-dojo', [])
.directive("dojoParser", function(){
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
			dojoConfig: "="
		}, 
		controller: function($scope, $element, $attrs, $transclude){
			require(["dijit/form/Button"], function(Button){
				new Button($scope.dojoConfig, $element[0]).startup();
			}); 
		}
	};
}).directive('dojoNumberSpinner', function(){
	return {
		restrict: 'E',
		template: '<div></div>',
		replace: true,
		scope: {
			dojoConfig: "="
		}, 
		controller: function($scope, $element, $attrs, $transclude){
			require(["dijit/form/NumberSpinner"], function(NumberSpinner){
				new NumberSpinner($scope.dojoConfig, $element[0]).startup();
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
			dojoConfig: "="
		}, 
		controller: function($scope, $element, $attrs, $transclude){
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
			}); 
		}
	};
});