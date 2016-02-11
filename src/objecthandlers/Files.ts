/// <reference path="..\model\ObjectHandlerBase.ts" />
"use strict";

module Pzl.Sites.Core.ObjectHandlers {
    interface IFileInfo extends Schema.IFile {
        Filename: string;
        Folder: SP.Folder;
        Contents: string;
        ServerRelativeUrl: string;
        Instance: SP.File;
    }

    export class Files extends Model.ObjectHandlerBase {
        
        
        constructor() {
            super("Files")
        }
        ProvisionObjects(objects: Array<Schema.IFile>) {
            Core.Log.Information(this.name, Resources.Code_execution_started);
            var def = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();

            var fileInfos: Array<IFileInfo> = []
            var promises = [];
            objects.forEach((obj, index) => {
                var filename = this.GetFilenameFromFilePath(obj.Dest);
                var folder = web.getFolderByServerRelativeUrl(`${_spPageContextInfo.webServerRelativeUrl}/${this.GetFolderFromFilePath(obj.Dest)}`);
                promises.push(jQuery.get(this.tokenParser.ReplaceUrlTokens(obj.Src), (fileContents) => {
                    var f: any = {};
                    jQuery.extend(f, obj, { "Filename": filename, "Folder": folder, "Contents": fileContents })
                    fileInfos.push(f);
                    Core.Log.Information(this.name, String.format(Resources.Files_retrieved_file_contents, f.Dest));
                }));
            });

            jQuery.when.apply(jQuery, promises).done(() => {
                fileInfos.forEach((f, index) => {
                    if (f.Filename.indexOf("Form.aspx") != -1) {
                        Core.Log.Information(this.name, String.format(Resources.Files_skipping_form_file, f.Dest));
                        return;
                    }
                    Core.Log.Information(this.name, String.format(Resources.Files_creating_file, f.Dest));
                    var objCreationInformation = new SP.FileCreationInformation();
                    objCreationInformation.set_overwrite(f.Overwrite != undefined ? f.Overwrite : false);
                    objCreationInformation.set_url(f.Filename);
                    objCreationInformation.set_content(new SP.Base64EncodedByteArray());
                    for (var i = 0; i < f.Contents.length; i++) {
                        objCreationInformation.get_content().append(f.Contents.charCodeAt(i));
                    }
                    clientContext.load(f.Folder.get_files().add(objCreationInformation));
                });

                clientContext.executeQueryAsync(() => {
                    var promises = [];
                    objects.forEach((obj) => {
                        if (obj.Properties && Object.keys(obj.Properties).length > 0) {
                            promises.push(this.ApplyFileProperties(obj.Dest, obj.Properties));
                        }
                        if (obj.WebParts && obj.WebParts.length > 0) {
                            promises.push(this.AddWebPartsToWebPartPage(obj.Dest, obj.Src, obj.WebParts, obj.RemoveExistingWebParts));
                        }
                    });
                    jQuery.when.apply(jQuery, promises).done(() => {
                        this.ModifyHiddenViews(objects).then(() => {
                            Core.Log.Information(this.name, Resources.Code_execution_ended);
                            def.resolve();
                        });
                    });
                }, (sender, args) => {
                    Core.Log.Information(this.name, Resources.Code_execution_ended);
                    Core.Log.Error(this.name, args.get_message());
                    def.resolve(sender, args);
                });
            });
            return def.promise();
        }
        private RemoveWebPartsFromFileIfSpecified(clientContext: SP.ClientContext, limitedWebPartManager: SP.WebParts.LimitedWebPartManager, shouldRemoveExisting) {
            var def = jQuery.Deferred();
            if (!shouldRemoveExisting) {
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
                    clientContext.executeQueryAsync(def.resolve, def.resolve);
                }, def.resolve);

            return def.promise();
        }
        private GetWebPartXml(webParts: Array<Schema.IWebPart>) {
            var def = jQuery.Deferred();

            var promises = [];
            webParts.forEach((wp, index) => {
                if (wp.Contents.FileUrl) {
                    promises.push((() => {
                        var def = jQuery.Deferred();
                        var fileUrl = this.tokenParser.ReplaceUrlTokens(wp.Contents.FileUrl);
                        jQuery.get(fileUrl, (xml) => {
                            webParts[index].Contents.Xml = xml;
                            def.resolve();
                        }).fail((sender, args) => {
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    })());
                }
            });

            jQuery.when.apply(jQuery, promises).done(() => {
                def.resolve(webParts);
            });

            return def.promise();
        }
        private AddWebPartsToWebPartPage(dest: string, src: string, webParts: Array<Schema.IWebPart>, shouldRemoveExisting: Boolean) {
            var def = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var fileUrl = this.LastItemInArray(src.split("/"));
            var fileServerRelativeUrl = `${_spPageContextInfo.webServerRelativeUrl}/${dest}`;
            var file = web.getFileByServerRelativeUrl(fileServerRelativeUrl);
            clientContext.load(file);
            clientContext.executeQueryAsync(
                () => {
                    var limitedWebPartManager = file.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
                    this.RemoveWebPartsFromFileIfSpecified(clientContext, limitedWebPartManager, shouldRemoveExisting).then(() => {
                        this.GetWebPartXml(webParts).then((webParts: Array<Schema.IWebPart>) => {
                            webParts.forEach(wp => {
                                if (!wp.Contents.Xml) return;
                                Core.Log.Information("Files Web Parts", String.format(Resources.Files_adding_webpart, wp.Title, wp.Zone, dest));
                                var oWebPartDefinition = limitedWebPartManager.importWebPart(this.tokenParser.ReplaceUrlTokens(wp.Contents.Xml));
                                var oWebPart = oWebPartDefinition.get_webPart();
                                limitedWebPartManager.addWebPart(oWebPart, wp.Zone, wp.Order);
                            });
                            clientContext.executeQueryAsync(def.resolve,
                                (sender, args) => {
                                    Core.Log.Error("Files Web Parts", args.get_message());
                                    def.resolve(sender, args);
                                });
                        });
                    });
                },
                (sender, args) => {
                    Core.Log.Error("Files Web Parts", args.get_message());
                    def.resolve(sender, args);
                }
            );

            return def.promise();
        }
        private ApplyFileProperties(dest: string, fileProperties: Object) {
            var def = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var fileServerRelativeUrl = `${_spPageContextInfo.webServerRelativeUrl}/${dest}`;
            var file = web.getFileByServerRelativeUrl(fileServerRelativeUrl);
            var listItemAllFields = file.get_listItemAllFields();

            Core.Log.Information("Files Properties", String.format(Resources.Files_setting_properties, dest));

            for (var key in fileProperties) {
                Core.Log.Information("Files Properties", String.format(Resources.Files_setting_property, key, fileProperties[key], dest));
                listItemAllFields.set_item(key, fileProperties[key]);
            }

            listItemAllFields.update();
            clientContext.executeQueryAsync(def.resolve,
                (sender, args) => {
                    Core.Log.Error("Files Properties", args.get_message());
                    def.resolve(sender, args);
                }
            );

            return def.promise();
        }
        private GetViewFromCollectionByUrl(viewCollection: SP.ViewCollection, url: string) {
            var serverRelativeUrl = `${_spPageContextInfo.webServerRelativeUrl}/${url}`;
            var viewCollectionEnumerator = viewCollection.getEnumerator();
            while (viewCollectionEnumerator.moveNext()) {
                var view = viewCollectionEnumerator.get_current();
                if (view.get_serverRelativeUrl().toString().toLowerCase() === serverRelativeUrl.toLowerCase()) {
                    return view;
                }
            }
            return null;
        }
        private ModifyHiddenViews(objects: Array<Schema.IFile>) {
            var def = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var mapping = {};
            var lists: Array<SP.List> = [];
            var listViewCollections: Array<SP.ViewCollection> = [];

            objects.forEach((obj) => {
                if (!obj.Views) return;
                obj.Views.forEach((v) => {
                    mapping[v.List] = mapping[v.List] || [];
                    mapping[v.List].push(jQuery.extend(v, { "Url": obj.Dest }));
                });
            });
            Object.keys(mapping).forEach((l, index) => {
                lists.push(web.get_lists().getByTitle(l));
                listViewCollections.push(web.get_lists().getByTitle(l).get_views());
                clientContext.load(lists[index]);
                clientContext.load(listViewCollections[index]);
            });

            clientContext.executeQueryAsync(
                () => {
                    Object.keys(mapping).forEach((l, index) => {
                        Core.Log.Information("Hidden Views", String.format(Resources.Files_modifying_list_views, l));
                        var views: Array<Schema.IHiddenView> = mapping[l];
                        var list = lists[index];
                        var viewCollection = listViewCollections[index];
                        views.forEach((v) => {
                            var view = this.GetViewFromCollectionByUrl(viewCollection, v.Url);
                            if (view == null) return;
                            Core.Log.Information("Hidden Views", String.format(Resources.Files_modifying_list_view, v.Url, l));
                            if (v.Paged) { view.set_paged(v.Paged); }
                            if (v.Query) { view.set_viewQuery(v.Query); }
                            if (v.RowLimit) { view.set_rowLimit(v.RowLimit); }
                            if (v.ViewFields && v.ViewFields.length > 0) {
                                var columns = view.get_viewFields();
                                columns.removeAll();
                                v.ViewFields.forEach((vf) => {
                                    columns.add(vf);
                                });
                            }
                            view.update();
                        });
                        clientContext.load(viewCollection);
                        list.update();
                    });
                    clientContext.executeQueryAsync(def.resolve,
                        (sender, args) => {
                            Core.Log.Error("Hidden Views", args.get_message());
                            def.resolve(sender, args);
                        });
                },
                (sender, args) => {
                    Core.Log.Error("Hidden Views", args.get_message());
                    def.resolve(sender, args);
                }
            );
            return def.promise();
        }
        private GetFolderFromFilePath(filePath: string) {
            var split = filePath.split("/");
            return split.splice(0, split.length - 1).join("/");
        }
        private GetFilenameFromFilePath(filePath: string) {
            var split = filePath.split("/");
            return split[split.length - 1];
        }
        private LastItemInArray(array: Array<any>) {
            return array[array.length - 1];
        }
    }
}
