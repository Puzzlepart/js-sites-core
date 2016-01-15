/// <reference path="IObjectHandler.ts" />

module Pzl.Sites.Core.ObjectHandlers {
    export class ContentTypes implements IObjectHandler {
        ProvisionObjects(json) {
            var def = jQuery.Deferred();
            
            Core.Log.Information("ContentTypes", `Starting provisioning of objects`);            
            Core.Log.Information("ContentTypes", `Provisioning of objects ended`);
            def.resolve();
            
            return def.promise();
        }
    } 
}