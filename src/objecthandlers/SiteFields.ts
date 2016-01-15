/// <reference path="IObjectHandler.ts" />

module Pzl.Sites.Core.ObjectHandlers {
    export class SiteFields implements IObjectHandler {
        ProvisionObjects(json) {
            var def = jQuery.Deferred();
            
            Core.Log.Information("SiteFields", `Starting provisioning of objects`);            
            Core.Log.Information("SiteFields", `Provisioning of objects ended`);
            def.resolve();
            
            return def.promise();
        }
    } 
}