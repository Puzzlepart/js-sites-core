/// <reference path="IObjectHandler.ts" />

module Pzl.Sites.Core.ObjectHandlers {
    export class Features implements IObjectHandler {
        ProvisionObjects(json) {
            var def = jQuery.Deferred();    
                    
            Core.Log.Information("Features", `Starting provisioning of objects`);            
            Core.Log.Information("Features", `Provisioning of objects ended`);
            def.resolve();
            
            return def.promise();
        }
    } 
}