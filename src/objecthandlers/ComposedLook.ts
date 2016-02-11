/// <reference path="..\model\ObjectHandlerBase.ts" />
"use strict";

module Pzl.Sites.Core.ObjectHandlers {    
     module Helpers {
        export function GetUrlWithoutTokens(url: string) {
            return url.replace("{sitecollection}", _spPageContextInfo.siteAbsoluteUrl)
                        .replace("{themegallery}", `${_spPageContextInfo.siteAbsoluteUrl}/_catalogs/theme/15`);
        }
    }
    
    export class ComposedLook extends Model.ObjectHandlerBase {
        constructor() {
            super("ComposedLook")
        }
        ProvisionObjects(object : Schema.IComposedLook) {
            Core.Log.Information(this.name, Resources.Code_execution_started);
            
            var def = jQuery.Deferred();     
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();     
            var colorPaletteUrl = object.ColorPaletteUrl ? Helpers.GetUrlWithoutTokens(object.ColorPaletteUrl) : "";
            var fontSchemeUrl = object.FontSchemeUrl ? Helpers.GetUrlWithoutTokens(object.FontSchemeUrl) : "";
            var backgroundImageUrl = object.BackgroundImageUrl ? Helpers.GetUrlWithoutTokens(object.BackgroundImageUrl) : null;
            Core.Log.Information(this.name, String.format(Resources.ComposedLook_applying_theme, colorPaletteUrl, fontSchemeUrl));
            web.applyTheme(colorPaletteUrl, fontSchemeUrl, backgroundImageUrl, true);         
            web.update();
            clientContext.executeQueryAsync(
                () => {
                    Core.Log.Information(this.name, Resources.Code_execution_ended);
                    def.resolve();
                },
                (sender, args) => {
                    Core.Log.Information(this.name, Resources.Code_execution_ended);
                    Core.Log.Information(this.name, args.get_message());
                    def.resolve(sender, args);
                }
            )
              
            return def.promise();
        }
    } 
}