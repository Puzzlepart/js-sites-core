/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="..\model\ObjectHandlerBase.ts" />

module Pzl.Sites.Core.ObjectHandlers {    
    export class PropertyBagEntries extends Model.ObjectHandlerBase {
        constructor() {
            super("PropertyBagEntries")
        }
        ProvisionObjects(object : Object) {
            Core.Log.Information(this.name, `Starting provisioning of objects`);
            
            var def = jQuery.Deferred();     
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();     
            var allProperties = web.get_allProperties();
            
            for(var key in object) {                
                Core.Log.Information(this.name, `Setting property '${key}' = '${object[key]}' on web`);
                allProperties.set_item(key, object[key]);
            }
         
            web.update();
            clientContext.executeQueryAsync(
                () => {
                    Core.Log.Information(this.name, `Provisioning of objects ended`);
                    def.resolve();
                },
                (sender, args) => {
                    def.resolve(sender, args);
                }
            )
              
            return def.promise();
        }
    } 
}