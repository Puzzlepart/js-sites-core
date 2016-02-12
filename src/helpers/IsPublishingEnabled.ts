/// <reference path="..\..\typings\tsd.d.ts" />
module Pzl.Sites.Core.Helpers {
    export function IsPublishingEnabled() {
        var def = jQuery.Deferred();

        ExecuteOrDelayUntilScriptLoaded(() => {
            var clientContext = SP.ClientContext.get_current();
            var site = clientContext.get_site();
            var features = site.get_features();
            clientContext.load(features);
            clientContext.executeQueryAsync(() => {
                var find = jQuery.grep(features.get_data(), (f : any) => {
                    return f.get_definitionId() == 'f6924d36-2fa8-4f0b-b16d-06b7250180fa';
                });
                if(find.length > 0) {
                    SP.SOD.registerSod("sp.publishing.js", `${_spPageContextInfo.siteAbsoluteUrl}/_layouts/15/sp.publishing.js`);
                    EnsureScriptFunc("sp.publishing.js", null, () => {
                       def.resolve(true); 
                    });
                } else {
                    def.resolve(false);
                }
            }, 
            () => {
                def.resolve(false)
            });
        }, "SP.js");

        return def.promise();
    }
}