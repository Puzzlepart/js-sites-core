/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="..\model\ObjectHandlerBase.ts" />
/// <reference path="..\schema\IComposedLook.ts" />

module Pzl.Sites.Core.ObjectHandlers {    
     module Helpers {
        export function GetUrlWithoutTokens(url: string) {
            return url.replace("{Site}", _spPageContextInfo.webAbsoluteUrl)
                        .replace("{SiteCollection}", _spPageContextInfo.siteAbsoluteUrl)
                        .replace("{SiteCollectionRelativeUrl}", _spPageContextInfo.siteServerRelativeUrl)
                        .replace("{themegallery}", `${_spPageContextInfo.siteServerRelativeUrl}/_catalogs/theme/15`);
        }
    }
    
    export class ComposedLook extends Model.ObjectHandlerBase {
        constructor() {
            super("ComposedLook")
        }
        ProvisionObjects(object : Schema.IComposedLook) {
            Core.Log.Information(this.name, `Code execution scope started`);
            
            var def = jQuery.Deferred();     
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();     
            var colorPaletteUrl = object.ColorPaletteUrl ? Helpers.GetUrlWithoutTokens(object.ColorPaletteUrl) : "";
            var fontSchemeUrl = object.FontSchemeUrl ? Helpers.GetUrlWithoutTokens(object.FontSchemeUrl) : "";
            var backgroundImageUrl = object.BackgroundImageUrl ? Helpers.GetUrlWithoutTokens(object.BackgroundImageUrl) : null;
            web.applyTheme(colorPaletteUrl, fontSchemeUrl, backgroundImageUrl, true);         
            web.update();
            clientContext.executeQueryAsync(
                () => {
                    Core.Log.Information(this.name, `Code execution scope ended`);
                    def.resolve();
                },
                (sender, args) => {
                    Core.Log.Information(this.name, `Code execution scope ended`);
                    Core.Log.Information(this.name, args.get_message());
                    def.resolve(sender, args);
                }
            )
              
            return def.promise();
        }
    } 
}