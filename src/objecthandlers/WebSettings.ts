/// <reference path="..\model\ObjectHandlerBase.ts" />
"use strict";

module Pzl.Sites.Core.ObjectHandlers {
    export class WebSettings extends Model.ObjectHandlerBase {
       constructor() {
            super("WebSettings")
      }
      ProvisionObjects(object : Schema.IWebSettings) {
            Core.Log.Information(this.name, Resources.Code_execution_started);
            var def = jQuery.Deferred();       
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            
            if(object.WelcomePage) {
                Core.Log.Information(this.name, String.format(Resources.WebSettings_setting_welcomePage, object.WelcomePage));
                web.get_rootFolder().set_welcomePage(object.WelcomePage);   
                web.get_rootFolder().update();
            }
            if(object.AlternateCssUrl) {
                Core.Log.Information(this.name, String.format(Resources.WebSettings_setting_alternateCssUrl, object.AlternateCssUrl));
                web['set_alternateCssUrl'](object.AlternateCssUrl);
            }
            if(object.MasterUrl) {
                Core.Log.Information(this.name, String.format(Resources.WebSettings_setting_masterUrl, object.MasterUrl));
                web.set_masterUrl(object.MasterUrl);
            }
            if(object.CustomMasterUrl) {
                Core.Log.Information(this.name, String.format(Resources.WebSettings_setting_customMasterUrl, object.CustomMasterUrl));
                web.set_customMasterUrl(object.CustomMasterUrl);
            }
            if(object.SaveSiteAsTemplateEnabled != undefined) {
                Core.Log.Information(this.name, String.format(Resources.WebSettings_setting_saveSiteAsTemplateEnabled, object.SaveSiteAsTemplateEnabled));
                web.set_saveSiteAsTemplateEnabled(object.SaveSiteAsTemplateEnabled);
            }
            if(object.QuickLaunchEnabled != undefined) {
                Core.Log.Information(this.name, String.format(Resources.WebSettings_setting_quickLaunchEnabled, object.QuickLaunchEnabled));
                web.set_saveSiteAsTemplateEnabled(object.QuickLaunchEnabled);
            }
            if(object.RecycleBinEnabled != undefined) {
                Core.Log.Information(this.name, String.format(Resources.WebSettings_setting_recycleBinEnabled, object.RecycleBinEnabled));
                web['set_recycleBinEnabled'](object.RecycleBinEnabled);
            }
            if(object.TreeViewEnabled != undefined) {
                Core.Log.Information(this.name, String.format(Resources.WebSettings_setting_treeViewEnabled, object.TreeViewEnabled));
                web.set_treeViewEnabled(object.TreeViewEnabled);
            }

            web.update();
            clientContext.load(web);
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