/**
 * Created by hjzheng on 2014/12/23.
 * The file define angular dojo service
 */
define(['./module','dijit/Dialog'], function (services, Dialog) {
    services.service('dojoDialog', function(){
        var createDialog = function(dojoConfig){
            var dialog = new Dialog(dojoConfig);
            return dialog;
        };

        return {
            create: createDialog
        };
    });

    services.service('instanceInit', function(){
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
	});
});