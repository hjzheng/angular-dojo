/**
 * Created by hjzheng on 2014/12/5.
 * This file define route
 */
define(['./app'], function (app) {
    return app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/parser', {
            templateUrl: 'partials/angular-dojo-parser.html',
            controller: 'parserController'
        });

        $routeProvider.when('/widget', {
            templateUrl: 'partials/angular-dojo-widget.html',
            controller: 'dojoWidgetController'
        });

        $routeProvider.otherwise({
            redirectTo: '/widget'
        });
    }]);
});
