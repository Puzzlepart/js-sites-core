/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="..\model\ObjectHandlerBase.ts" />
/// <reference path="..\schema\IWebSettings.ts" />

module Pzl.Sites.Core.ObjectHandlers {
    export class WebSettings extends Model.ObjectHandlerBase {
       constructor() {
            super("WebSettings")
      }
      ProvisionObjects(object : Schema.IWebSettings) {
            var def = jQuery.Deferred();       
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            if(object.WelcomePage) {
                Core.Log.Information(this.name, `Setting WelcomePage to '${object.WelcomePage}'`);
                web.get_rootFolder().set_welcomePage(object.WelcomePage);   
                web.get_rootFolder().update();
            }            
            web.update();
            clientContext.load(web);
            clientContext.executeQueryAsync(
                () => {
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