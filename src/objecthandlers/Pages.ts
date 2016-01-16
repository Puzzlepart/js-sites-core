/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="..\model\ObjectHandlerBase.ts" />
/// <reference path="..\schema\IPage.ts" />
/// <reference path="..\schema\IWebPart.ts" />

module Pzl.Sites.Core.ObjectHandlers {
    module Helpers {
        export function GetWebPartXmlWithoutTokens(xml: string) {
            return xml.replace(/{site}/g, _spPageContextInfo.webServerRelativeUrl) 
                      .replace(/{sitecollection}/g, _spPageContextInfo.siteServerRelativeUrl);
        }
        export function GetFolderFromFilePath(filePath : string) {
            var split = filePath.split("/");
            return split.splice(0, split.length-1);
        }
    }
    module Extensions {    
        export function AddWikiPageByUrl(fileUrl: string) {
            var def = jQuery.Deferred();  
            
            Core.Log.Information("Pages", `Creating file with Url '${fileUrl}'`)       
            
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var fileServerRelativeUrl = `${_spPageContextInfo.webServerRelativeUrl}/${fileUrl}`;
            var folderServerRelativeUrl = `${_spPageContextInfo.webServerRelativeUrl}/${Helpers.GetFolderFromFilePath(fileUrl)}`;
            var folder = web.getFolderByServerRelativeUrl(folderServerRelativeUrl);
            clientContext.load(folder.get_files().addTemplateFile(fileServerRelativeUrl, SP.TemplateFileType.wikiPage));
            clientContext.executeQueryAsync(
                () => {
                    def.resolve();
                }, 
                (sender, args) => {                  
                    Core.Log.Information("Pages", `Failed to create file with Url '${fileUrl}'`)
                    Core.Log.Error("Pages", `${args.get_message()}`)
                    def.resolve(sender, args);
                }
            );    
            
            return def.promise();
        }
        export function AddLayoutToWikiPage(layout : string, fileUrl: string) {
            
        }    
        export function AddWebPartsToWikiPage(fileUrl: string, webParts : Array<Schema.IWebPart>, removeExisting: Boolean) {
            var def = jQuery.Deferred();              
            
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var fileServerRelativeUrl = `${_spPageContextInfo.webServerRelativeUrl}/${fileUrl}`;
            var file = web.getFileByServerRelativeUrl(fileServerRelativeUrl);
            
            clientContext.load(file);
            clientContext.executeQueryAsync(
                () => {
                    var limitedWebPartManager = file.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
                    
                    webParts.forEach(wp => {
                        var oWebPartDefinition = limitedWebPartManager.importWebPart(Helpers.GetWebPartXmlWithoutTokens(wp.Xml));
                        var oWebPart = oWebPartDefinition.get_webPart();
                        limitedWebPartManager.addWebPart(oWebPart, 'wpz', 1);
                    });
                    
                    clientContext.executeQueryAsync(
                        () => {
                            Core.Log.Information("Pages Web Parts", `Provisioning of objects ended`);
                            def.resolve();
                        },
                        (sender, args) => {
                            Core.Log.Information("Pages Web Parts", `Provisioning of objects failed for file with Url '${fileUrl}'`)
                            Core.Log.Error("Pages Web Parts", `${args.get_message()}`)
                            def.resolve(sender, args);
                        });
                }, 
                (sender, args) => {
                    Core.Log.Information("Pages Web Parts", `Provisioning of objects failed for file with Url '${fileUrl}'`)
                    Core.Log.Error("Pages Web Parts", `${args.get_message()}`)
                    def.resolve(sender, args);
                }
            );       
            
            return def.promise();
        }
    }
    
    export class Pages extends Model.ObjectHandlerBase {
        constructor() {
            super("Pages")
        }
        ProvisionObjects(objects : Array<Schema.IPage>) {
            var def = jQuery.Deferred();            
 
            var clientContext = SP.ClientContext.get_current();
            
            Core.Log.Information(this.name, `Starting provisioning of objects`);      

            var promises = [];
            objects.forEach(function(obj) {        
                Extensions.AddWikiPageByUrl(obj.Url);
            });            
            
            jQuery.when.apply(jQuery, promises).done(() => {
                Core.Log.Information(this.name, `Provisioning of objects ended`);
                
                var promises = [];
                objects.forEach((obj) => {
                    if(obj.WebParts && obj.WebParts.length > 0) {
                        promises.push(Extensions.AddWebPartsToWikiPage(obj.Url, obj.WebParts, obj.RemoveExistingWebParts));
                    }
                });
                
                jQuery.when.apply(jQuery, promises).done(() => {
                    def.resolve();
                });                      
            });
            
            return def.promise();
        }
    } 
}