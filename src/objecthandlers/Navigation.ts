/// <reference path="..\model\ObjectHandlerBase.ts" />
"use strict";


module Pzl.Sites.Core.ObjectHandlers {
    export class Navigation extends Model.ObjectHandlerBase {
        constructor() {
            super("Navigation")
        }

        ProvisionObjects(object: Schema.INavigation): JQueryPromise<any> {
            var def = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();

            Core.Log.Information(this.name, Resources.Code_execution_started);

            Helpers.IsPublishingEnabled().then(publishingEnabled => {
                const navigation = web.get_navigation();
                if (object.UseShared == true) {
                    Core.Log.Information(this.name, String.format(Resources.Navigation_setting_shared, object.UseShared));
                    if (publishingEnabled) {
                        const navSettings = new SP.Publishing.Navigation.WebNavigationSettings(clientContext, web);
                        const publishingNavigation = navSettings.get_globalNavigation();
                        publishingNavigation.set_source(3);
                        navSettings.update();
                    }
                    else {
                        navigation.set_useShared(object.UseShared);
                    }
                    web.update();
                }
                clientContext.executeQueryAsync(
                    () => {
                        if (!object.QuickLaunch || object.QuickLaunch.length == 0) {
                            Core.Log.Information(this.name, Resources.Code_execution_ended);
                            def.resolve();
                            return def.promise();
                        }
                        this.ConfigureQuickLaunch(object.QuickLaunch, clientContext, navigation).then(() => {
                            Core.Log.Information(this.name, Resources.Code_execution_ended);
                            def.resolve();
                        });
                    }, (sender, args) => {
                        Core.Log.Information(this.name, Resources.Code_execution_ended);
                        Core.Log.Error(this.name, `Error: ${args.get_message()}`);
                        def.resolve();
                    });
            });

            return def.promise();
        }
        private ConfigureQuickLaunch(objects: Array<Schema.INavigationNode>, clientContext: SP.ClientContext, navigation: SP.Navigation): JQueryPromise<any> {
            Core.Log.Information("QuickLaunch", Resources.Navigation_configuring_quicklaunch_navigation);

            var def = jQuery.Deferred();

            if (objects.length == 0) {
                def.resolve();
            } else {
                var quickLaunchNodeCollection = navigation.get_quickLaunch();
                clientContext.load(quickLaunchNodeCollection);
                clientContext.executeQueryAsync(
                    () => {
                        Core.Log.Information("QuickLaunch", Resources.Navigation_removing_existing_nodes);
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
                                Core.Log.Information("QuickLaunch", String.format(Resources.Navigation_adding_node, obj.Url, obj.Title));
                                const existingNode = this.GetNodeFromQuickLaunchByTitle(temporaryQuickLaunch, obj.Title);
                                const newNode = new SP.NavigationNodeCreationInformation();
                                newNode.set_title(obj.Title);
                                newNode.set_url(existingNode ? existingNode.get_url() : this.tokenParser.ReplaceUrlTokens(obj.Url));
                                newNode.set_asLastNode(true);
                                quickLaunchNodeCollection.add(newNode);
                            });
                            clientContext.executeQueryAsync(() => {
                                jQuery.ajax({
                                    url: `${_spPageContextInfo.webAbsoluteUrl}/_api/web/Navigation/QuickLaunch`,
                                    type: 'get',
                                    headers: {
                                        "accept": "application/json;odata=verbose"
                                    }
                                }).done((data: any) => {
                                    data = data.d.results;
                                    data.forEach((n: any) => {
                                        var node = navigation.getNodeById(n.Id);
                                        var childrenNodeCollection = node.get_children();
                                        var parentNode = jQuery.grep(objects, (value: any) => { return value.Title === n.Title; })[0];
                                        if (parentNode && parentNode.Children) {
                                            parentNode.Children.forEach((c: any) => {
                                                var existingNode = this.GetNodeFromQuickLaunchByTitle(temporaryQuickLaunch, c.Title);
                                                const newNode = new SP.NavigationNodeCreationInformation();
                                                newNode.set_title(c.Title);
                                                newNode.set_url(existingNode ? existingNode.get_url() : this.tokenParser.ReplaceUrlTokens(c.Url));
                                                newNode.set_asLastNode(true);
                                                childrenNodeCollection.add(newNode);
                                                Core.Log.Information("QuickLaunch", String.format(Resources.Navigation_adding_children_node, c.Url, c.Title, n.Title));
                                            });
                                        }
                                    });
                                    clientContext.executeQueryAsync(() => {
                                        Core.Log.Information("QuickLaunch", Resources.Navigation_configuring_of_quicklaunch_done);
                                        def.resolve();
                                    }, (sender, args) => {
                                        Core.Log.Information("QuickLaunch", Resources.Navigation_configuring_of_quicklaunch_failed);
                                        Core.Log.Error("QuickLaunch", `${args.get_message()}`);
                                        def.resolve(sender, args);
                                    });
                                });
                            },
                                (sender, args) => {
                                    Core.Log.Information("QuickLaunch", Resources.Navigation_configuring_of_quicklaunch_failed)
                                    Core.Log.Error("QuickLaunch", `${args.get_message()}`)
                                    def.resolve(sender, args);
                                });
                        });
                    });
            }
            return def.promise();
        }
        private GetNodeFromQuickLaunchByTitle(nodeCollection, title) {
            const f = jQuery.grep(nodeCollection, (val: SP.NavigationNode) => {
                return val.get_title() === title;
            });
            return f[0] || null;
        }
    }
}