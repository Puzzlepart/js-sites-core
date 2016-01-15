/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="IObjectHandler.ts" />
/// <reference path="..\schema\IFile.ts" />
/// <reference path="..\schema\IWebPart.ts" />

module Pzl.Sites.Core.ObjectHandlers {
    module Helpers {
        export function GetFileUrlWithoutTokens(fileUrl: string) {
            return fileUrl.replace(/{resources}/g, `${_spPageContextInfo.siteServerRelativeUrl}/resources`);
        }
        export function GetWebPartXmlWithoutTokens(xml: string) {
            return xml.replace(/{site}/g, _spPageContextInfo.webServerRelativeUrl) 
                      .replace(/{sitecollection}/g, _spPageContextInfo.siteServerRelativeUrl);
        }
        export function GetFolderFromFilePath(filePath : string) {
            var split = filePath.split("/");
            return split.splice(0, split.length-1).join("/");
        }
        export function GetFilenameFromFilePath(filePath : string) {
            var split = filePath.split("/");
            return split[split.length-1];
        }
        export function LastItemInArray(array: Array<any>) {
            return array[array.length-1];
        }
    }
    
    module Extensions {    
        export function AddFileByUrl(dest: string, src: string, overwrite: boolean) {
            var def = jQuery.Deferred();
            
            Core.Log.Information("Files", `Creating file with Url '${dest}'`)       
              
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var sourceFile = Helpers.GetFileUrlWithoutTokens(src);
            var destFolder = Helpers.GetFolderFromFilePath(dest);
            var destFileName = Helpers.GetFilenameFromFilePath(dest);
            var folderServerRelativeUrl = `${_spPageContextInfo.webServerRelativeUrl}/${destFolder}`;
            var folder = web.getFolderByServerRelativeUrl(folderServerRelativeUrl);
            
            jQuery.get(sourceFile, (fileContent) => {
                var objCreationInformation = new SP.FileCreationInformation();
                objCreationInformation.set_overwrite(overwrite);
                objCreationInformation.set_url(destFileName);
                objCreationInformation.set_content(new SP.Base64EncodedByteArray());
                for (var i = 0; i < fileContent.length; i++) {
                    objCreationInformation.get_content().append(fileContent.charCodeAt(i));
                }
                clientContext.load(folder.get_files().add(objCreationInformation));
                clientContext.executeQueryAsync(
                 () => {
                     def.resolve();
                 }, 
                 (sender, args) => {
                    Core.Log.Information("Files", `Failed to create file with Url '${dest}'`)
                    Core.Log.Error("Files", `${args.get_message()}`)
                    def.resolve(sender, args);
                 });
            }) 
            return def.promise();
        }
        export function RemoveWebPartsFromFileIfSpecified(clientContext : SP.ClientContext, limitedWebPartManager : SP.WebParts.LimitedWebPartManager, shouldRemoveExisting) {
            var def = jQuery.Deferred();        
            
            if(!shouldRemoveExisting) {
                 def.resolve();          
                return def.promise();
            }
                
            var existingWebParts = limitedWebPartManager.get_webParts();
             
            clientContext.load(existingWebParts);
            clientContext.executeQueryAsync(
                () => {
                    existingWebParts.get_data().forEach((wp) => {
                        wp.deleteWebPart();
                    })
                    clientContext.load(existingWebParts);
                    clientContext.executeQueryAsync(
                        () => {
                            def.resolve();
                        },
                        () => {
                            def.resolve();
                        });
                },
                () => {
                    def.resolve();
                }
            );
            
            return def.promise();
        }
        export function AddWebPartsToWebPartPage(dest: string, src: string, webParts : Array<Schema.IWebPart>, shouldRemoveExisting: Boolean) {
            var def = jQuery.Deferred();              
            
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var fileUrl = Helpers.LastItemInArray(src.split("/"));
            var fileServerRelativeUrl = `${_spPageContextInfo.webServerRelativeUrl}/${dest}`;
            var file = web.getFileByServerRelativeUrl(fileServerRelativeUrl);
            
            clientContext.load(file);
            clientContext.executeQueryAsync(
                () => {
                    var limitedWebPartManager = file.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);                   
                    
                    RemoveWebPartsFromFileIfSpecified(clientContext, limitedWebPartManager, shouldRemoveExisting).then(() => {
                            webParts.forEach(wp => {
                                Core.Log.Information("Files Web Parts", `Adding web part '${wp.Title}' to zone '${wp.Zone}' for file with URL '${dest}'`);
                                var oWebPartDefinition = limitedWebPartManager.importWebPart(Helpers.GetWebPartXmlWithoutTokens(wp.Xml));
                                var oWebPart = oWebPartDefinition.get_webPart();
                                limitedWebPartManager.addWebPart(oWebPart, wp.Zone, wp.Order);
                            });
                            
                            clientContext.executeQueryAsync(
                                () => {
                                    Core.Log.Information("Files Web Parts", `Provisioning of objects ended`);
                                    def.resolve();
                                },
                                (sender, args) => {
                                    Core.Log.Information("Files Web Parts", `Provisioning of objects failed for file with Url '${fileUrl}'`)
                                    Core.Log.Error("Files Web Parts", `${args.get_message()}`)
                                    def.resolve(sender, args);
                                });
                        });
                }, 
                (sender, args) => {
                    Core.Log.Information("Files Web Parts", `Provisioning of objects failed for file with Url '${fileUrl}'`)
                    Core.Log.Error("Files Web Parts", `${args.get_message()}`)
                    def.resolve(sender, args);
                }
            );       
            
            return def.promise();
        }
    }
    
    export class Files implements IObjectHandler {
      ProvisionObjects(objects : Array<Schema.IFile>) {
            var def = jQuery.Deferred();            
 
            var clientContext = SP.ClientContext.get_current();
            window.setTimeout(() => {
                Core.Log.Information("Files", `Starting provisioning of objects`);      

                var promises = [];
                objects.forEach(function(obj) {        
                    Extensions.AddFileByUrl(obj.Dest, obj.Src, obj.Overwrite);
                });            
                
                jQuery.when.apply(jQuery, promises).done(() => {
                    Core.Log.Information("Files", `Provisioning of objects ended`);
                    Core.Log.Information("Files Web Parts", `Starting provisioning of objects`);   
                    
                    var promises = [];
                    objects.forEach((obj) => {
                        if(obj.WebParts && obj.WebParts.length > 0) {
                            promises.push(Extensions.AddWebPartsToWebPartPage(obj.Dest, obj.Src, obj.WebParts, obj.RemoveExistingWebParts));
                        }
                    });
                    
                    jQuery.when.apply(jQuery, promises).done(() => {
                        Core.Log.Information("Files Web Parts", `Provisioning of objects ended`);   
                        def.resolve();
                    });                      
                });
            }, 5000);
            
            
            return def.promise();
        }
    } 
}