/**
 * Created by hjzheng on 2014/12/5.
 * This file define route
 */
define(['./app'], function (app) {
    return app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dijit', {
            templateUrl: 'partials/angular-dojo-dijit.html',
            controller: 'dijitController'
        });

        $routeProvider.when('/parser', {
            templateUrl: 'partials/angular-dojo-parser.html',
            controller: 'parserController'
        });

        $routeProvider.otherwise({
            redirectTo: '/dijit'
        });
    }]);
});
