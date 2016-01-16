/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="ObjectHandlerBase.ts" />
/// <reference path="..\schema\IComposedLook.ts" />

module Pzl.Sites.Core.ObjectHandlers {    
     module Helpers {
        export function GetUrlWithoutTokens(url: string) {
            return url.replace("{Site}", _spPageContextInfo.webAbsoluteUrl)
                        .replace("{SiteCollection}", _spPageContextInfo.siteAbsoluteUrl)
                        .replace("{SiteCollectionRelativeUrl}", _spPageContextInfo.siteServerRelativeUrl)
                        .replace("{ThemeGallery}", `${_spPageContextInfo.siteServerRelativeUrl}/_catalogs/theme/15`);
        }
    }
    
    export class ComposedLook extends ObjectHandlerBase {
        constructor() {
            super("ComposedLook")
        }
        ProvisionObjects(object : Schema.IComposedLook) {
            Core.Log.Information(this.name, `Starting provisioning of objects`);
            
            var def = jQuery.Deferred();     
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();     
            var colorPaletteUrl = object.ColorPaletteUrl ? Helpers.GetUrlWithoutTokens(object.ColorPaletteUrl) : "";
            var fontSchemeUrl = object.FontSchemeUrl ? Helpers.GetUrlWithoutTokens(object.FontSchemeUrl) : "";
            var backgroundImageUrl = object.BackgroundImageUrl ? Helpers.GetUrlWithoutTokens(object.BackgroundImageUrl) : null;
            web.applyTheme(colorPaletteUrl, fontSchemeUrl, backgroundImageUrl, true);
            if(object.MasterUrl) { web.set_masterUrl(object.MasterUrl); }
            if(object.CustomMasterUrl) { web.set_customMasterUrl(object.CustomMasterUrl); };
         
            web.update();
            clientContext.executeQueryAsync(
                () => {
                    Core.Log.Information(this.name, `Provisioning of objects ended`);
                    def.resolve();
                },
                (sender, args) => {
                    console.log(sender, args);
                    def.resolve(sender, args);
                }
            )
              
            return def.promise();
        }
    } 
}