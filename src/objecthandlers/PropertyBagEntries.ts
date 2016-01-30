/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="..\model\ObjectHandlerBase.ts" />
/// <reference path="..\pzl.sites.core.d.ts" />
/// <reference path="..\resources\pzl.sites.core.resources.ts" />

module Pzl.Sites.Core.ObjectHandlers {    
    export class PropertyBagEntries extends Model.ObjectHandlerBase {
        constructor() {
            super("PropertyBagEntries")
        }
        ProvisionObjects(object : Object) {
            Core.Log.Information(this.name, Resources.Code_execution_started);
            
            var def = jQuery.Deferred();     
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();     
            var allProperties = web.get_allProperties();
            
            for(var key in object) {                
                Core.Log.Information(this.name, String.format(Resources.PropertyBagEntries_setting_propety, key, object[key]));
                allProperties.set_item(key, object[key]);
            }
         
            web.update();
            clientContext.executeQueryAsync(
                () => {
                    Core.Log.Information(this.name, Resources.Code_execution_ended);
                    def.resolve();
                },
                (sender, args) => {
                    Core.Log.Information(this.name, Resources.Code_execution_ended);
                    def.resolve(sender, args);
                }
            )
              
            return def.promise();
        }
    } 
}