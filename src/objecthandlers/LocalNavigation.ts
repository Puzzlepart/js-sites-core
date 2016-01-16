/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="..\model\ObjectHandlerBase.ts" />
/// <reference path="..\schema\INavigationNode.ts" />

module Pzl.Sites.Core.ObjectHandlers {
    module Helpers {
        export function GetUrlWithoutTokens(url: string) {
            return url.replace("{Site}", _spPageContextInfo.webAbsoluteUrl)
                        .replace("{SiteRelativeUrl}", _spPageContextInfo.webServerRelativeUrl)
                        .replace("{SiteUrl}", _spPageContextInfo.webAbsoluteUrl)
                        .replace("{SiteUrlEncoded}", encodeURIComponent(_spPageContextInfo.webAbsoluteUrl))
                        .replace("{SiteCollection}", _spPageContextInfo.siteAbsoluteUrl)
                        .replace("{SiteCollectionRelativeUrl}", _spPageContextInfo.siteServerRelativeUrl)
                        .replace("{SiteCollectionEncoded}", encodeURIComponent(_spPageContextInfo.siteAbsoluteUrl))
                        .replace("{WebApp}", window.location.protocol + "//" + window.location.host);
        }
        export function GetNodeFromQuickLaunchByTitle(nodeCollection, title) {
            const f = jQuery.grep(nodeCollection, (val: SP.NavigationNode) => {
			 return val.get_title() === title;
            });
            return f[0] || null;
        }
    }
    
    export class LocalNavigation extends Model.ObjectHandlerBase {
        constructor() {
            super("LocalNavigation")
        }
        ProvisionObjects(objects : Array<Schema.INavigationNode>) {
            var def = jQuery.Deferred();       
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();     
            
            Core.Log.Information(this.name, `Starting provisioning of objects`); 
            const navigation = web.get_navigation();
            var quickLaunchNodeCollection = navigation.get_quickLaunch();
            clientContext.load(quickLaunchNodeCollection);
            clientContext.executeQueryAsync(
                () => {
                    Core.Log.Information(this.name, `Removing existing navigation nodes`);
                    var temporaryQuickLaunch: Array<SP.NavigationNode> = [];
                    var index = quickLaunchNodeCollection.get_count() - 1;
                    while (index >= 0) {
                        const oldNode = quickLaunchNodeCollection.itemAt(index);
                        temporaryQuickLaunch.push(oldNode);
                        oldNode.deleteObject();
                        index--;
                    }
                    clientContext.executeQueryAsync(() => {
                            objects.forEach((obj) => {
                                Core.Log.Information(this.name, `Adding navigation node with Url '${obj.Url}' and Title '${obj.Title}'`);
                                const existingNode = Helpers.GetNodeFromQuickLaunchByTitle(temporaryQuickLaunch, obj.Title);
                                const newNode = new SP.NavigationNodeCreationInformation();
                                newNode.set_title(obj.Title);
                                newNode.set_url(existingNode ? existingNode.get_url() : Helpers.GetUrlWithoutTokens(obj.Url));
                                newNode.set_asLastNode(true);
                                quickLaunchNodeCollection.add(newNode);
                            });
                            clientContext.executeQueryAsync(() => {
                                Core.Log.Information(this.name, `Provisioning of objects ended`);
                                def.resolve();
                            }, (sender, args) => {
                                Core.Log.Information(this.name, `Provisioning of objects failed`)
                                Core.Log.Error(this.name, `${args.get_message()}`)
                                def.resolve(sender, args);
                            });           
                    });
                }, 
                (sender, args) => {
                    Core.Log.Information(this.name, `Provisioning of objects failed`)
                    Core.Log.Error(this.name, `${args.get_message()}`)
                    def.resolve(sender, args);
                });
        
            
            return def.promise();
        }
    } 
}