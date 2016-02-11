/// <reference path="..\model\ObjectHandlerBase.ts" />
"use strict";


module Pzl.Sites.Core.ObjectHandlers {
    export class PropertyBagEntries extends Model.ObjectHandlerBase {
        constructor() {
            super("PropertyBagEntries")
        }
        ProvisionObjects(objects: Array<Schema.IPropertyBagEntry>) {
            Core.Log.Information(this.name, Resources.Code_execution_started);

            var def = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var allProperties = web.get_allProperties();
            var indexedProperties = [];

            objects.forEach(o => {
                Core.Log.Information(this.name, String.format(Resources.PropertyBagEntries_setting_property, o.Key, o.Value));
                allProperties.set_item(o.Key, o.Value);
                if (o.Indexed) {
                    Core.Log.Information(this.name, String.format(Resources.PropertyBagEntries_setting_indexed_property, o.Key));
                    indexedProperties.push(this.EncodePropertyKey(o.Key));
                }
            });

            web.update();
            clientContext.load(allProperties);
            clientContext.executeQueryAsync(
                () => {
                    if (indexedProperties.length > 0) {
                        allProperties.set_item("vti_indexedpropertykeys", indexedProperties.join("|"));
                        web.update();
                        clientContext.executeQueryAsync(def.resolve, def.resolve);
                    } else {
                        Core.Log.Information(this.name, Resources.Code_execution_ended);
                        def.resolve();
                    }
                },
                (sender, args) => {
                    Core.Log.Information(this.name, Resources.Code_execution_ended);
                    def.resolve(sender, args);
                }
            )

            return def.promise();
        }
        private EncodePropertyKey(propKey) {
            var bytes = [];
            for (var i = 0; i < propKey.length; ++i) {
                bytes.push(propKey.charCodeAt(i));
                bytes.push(0);
            }
            var b64encoded = window.btoa(String.fromCharCode.apply(null, bytes));
            return b64encoded;
        }
    }
}