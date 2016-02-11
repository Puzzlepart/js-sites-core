/// <reference path="..\model\ObjectHandlerBase.ts" />
"use strict";

module Pzl.Sites.Core.ObjectHandlers {
    export class Features extends Model.ObjectHandlerBase {
        constructor() {
            super("Features")
        }
        ProvisionObjects(objects: Array<Schema.IFeature>) {
            Core.Log.Information(this.name, Resources.Code_execution_started);

            var def = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();            
            var web = clientContext.get_web();
            var webFeatures = web.get_features();
            
            objects.forEach(o => {
                if(o.Deactivate == true) {
                    Core.Log.Information(this.name, String.format(Resources.Features_deactivating_feature, o.ID));                    
                    webFeatures.remove(new SP.Guid(o.ID), true);
                } else {
                    Core.Log.Information(this.name, String.format(Resources.Features_activating_feature, o.ID)); 
                    webFeatures.add(new SP.Guid(o.ID), true, SP.FeatureDefinitionScope.none); 
                }
            });
            web.update();
            clientContext.load(webFeatures);
            clientContext.executeQueryAsync(
                () => {
                   Core.Log.Information(this.name, Resources.Code_execution_ended);
                   def.resolve();
                },
                (sender, args) => {
                    Core.Log.Information(this.name, Resources.Code_execution_ended);                    
                    Core.Log.Error(this.name, args.get_message());
                    def.resolve(sender, args);
                }
            )

            return def.promise();
        }
    }
}