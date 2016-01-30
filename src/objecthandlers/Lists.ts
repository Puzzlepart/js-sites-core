/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="..\model\ObjectHandlerBase.ts" />
/// <reference path="..\schema\IListInstance.ts" />
/// <reference path="..\pzl.sites.core.d.ts" />
/// <reference path="..\resources\pzl.sites.core.resources.ts" />
"use strict";

module Pzl.Sites.Core.ObjectHandlers {
    function EnsureLocationBasedMetadataDefaultsReceiver(clientContext: SP.ClientContext, list: SP.List) {
        var receiverName = "LocationBasedMetadataDefaultsReceiver ItemAdded";
        var def = jQuery.Deferred();
        var eventReceivers = list.get_eventReceivers();
        Core.Log.Information("Lists Event Receivers", String.format(Resources.Lists_adding_eventreceiver, receiverName, list.get_title()));
        var eventRecCreationInfo = new SP.EventReceiverDefinitionCreationInformation();
        eventRecCreationInfo.set_receiverName(receiverName);
        eventRecCreationInfo.set_synchronization(1);
        eventRecCreationInfo.set_sequenceNumber(1000);
        eventRecCreationInfo.set_receiverAssembly("Microsoft.Office.DocumentManagement, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c");
        eventRecCreationInfo.set_receiverClass("Microsoft.Office.DocumentManagement.LocationBasedMetadataDefaultsReceiver");
        eventRecCreationInfo.set_eventType(SP.EventReceiverType.itemAdded);
        eventReceivers.add(eventRecCreationInfo);
        list.update();
        clientContext.executeQueryAsync(def.resolve, def.resolve);
        return def.promise();
    }
    function CreateFolders(clientContext: SP.ClientContext, list: SP.List, listUrl: string, folders: Array<Schema.IFolder>) {
        var def = jQuery.Deferred();
        var listRelativeUrl = `${_spPageContextInfo.webServerRelativeUrl}/${listUrl}`;
        var rootFolder = clientContext.get_web().getFolderByServerRelativeUrl(listRelativeUrl);
        var metadataDefaults = "<MetadataDefaults>";
        var setMetadataDefaults = false;
        folders.forEach(f => {
            var folderUrl = `${listRelativeUrl}/${f.Name}`;
            Core.Log.Information("Lists Folders", String.format(Resources.Lists_creating_folder, folderUrl));
            rootFolder.get_folders().add(folderUrl)
            if (f.DefaultValues) {
                Core.Log.Information("Lists Folders", String.format(Resources.Lists_setting_default_metadata, folderUrl));
                var keys = Object.keys(f.DefaultValues).length;
                if (keys > 0) {
                    metadataDefaults += `<a href='${listRelativeUrl}/${f.Name}'>`;
                    Object.keys(f.DefaultValues).forEach(key => { metadataDefaults += `<DefaultValue FieldName="${key}">${f.DefaultValues[key]}</DefaultValue>`; });
                    metadataDefaults += "</a>";
                }
                setMetadataDefaults = true;
            }
        });
        metadataDefaults += "</MetadataDefaults>";

        if (setMetadataDefaults) {
            var metadataDefaultsFileCreateInfo = new SP.FileCreationInformation();
            metadataDefaultsFileCreateInfo.set_url(`${listRelativeUrl}/Forms/client_LocationBasedDefaults.html`);
            metadataDefaultsFileCreateInfo.set_content(new SP.Base64EncodedByteArray());
            metadataDefaultsFileCreateInfo.set_overwrite(true);
            for (var i = 0; i < metadataDefaults.length; i++) {
                metadataDefaultsFileCreateInfo.get_content().append(metadataDefaults.charCodeAt(i));
            }
            rootFolder.get_files().add(metadataDefaultsFileCreateInfo);

            EnsureLocationBasedMetadataDefaultsReceiver(clientContext, list).then(() => {
                clientContext.executeQueryAsync(def.resolve, def.resolve);
            });
        } else {
            clientContext.executeQueryAsync(def.resolve, def.resolve);
        }

        return def.promise();
    }
    function ApplyContentTypeBindings(clientContext: SP.ClientContext, lists: Array<SP.List>, objects: Array<Schema.IListInstance>) {
        var def = jQuery.Deferred();
        var webCts = clientContext.get_site().get_rootWeb().get_contentTypes();
        var listCts: Array<SP.ContentTypeCollection> = [];
        lists.forEach((l, index) => {
            listCts.push(l.get_contentTypes());
            clientContext.load(listCts[index], 'Include(Name,Id)');
            if (objects[index].ContentTypeBindings) {
                Core.Log.Information("Lists Content Types", String.format(Resources.Lists_enabled_content_types, l.get_title()));
                l.set_contentTypesEnabled(true);
                l.update();
            }
        });
        clientContext.load(webCts);
        clientContext.executeQueryAsync(
            () => {
                lists.forEach((list, index) => {
                    var obj = objects[index];
                    if (!obj.ContentTypeBindings) return;
                    var listContentTypes = listCts[index];
                    //Cannot remove content types before we have added others
                    var existingContentTypes = new Array<SP.ContentType>();
                    if (obj.RemoveExistingContentTypes && obj.ContentTypeBindings.length > 0) {
                        listContentTypes.get_data().forEach(ct => {
                            existingContentTypes.push(ct);
                        });
                    }
                    obj.ContentTypeBindings.forEach(ctb => {
                        Core.Log.Information("Lists Content Types", String.format(Resources.Lists_adding_content_type, ctb.ContentTypeId, list.get_title()));
                        listContentTypes.addExistingContentType(webCts.getById(ctb.ContentTypeId));
                    });
                    
                    //Content types can now be removed
                    if (obj.RemoveExistingContentTypes && obj.ContentTypeBindings.length > 0) {
                        for (var j = 0; j < existingContentTypes.length; j++) {
                            var ect = existingContentTypes[j];
                            Core.Log.Information("Lists Content Types", String.format(Resources.Lists_removing_content_type, ect.get_id().get_stringValue(), list.get_title()))
                            ect.deleteObject();
                        }
                    }
                    list.update();
                });

                clientContext.executeQueryAsync(def.resolve,
                    (sender, args) => {
                        Core.Log.Error("Lists Content Types", `Error: ${args.get_message()}`);
                        def.resolve(sender, args);
                    });
            },
            (sender, args) => {
                Core.Log.Error("Lists Content Types", `Error: ${args.get_message()}`);
                def.resolve(sender, args);
            });

        return def.promise();
    }
    function ApplyListInstanceFieldRefs(clientContext: SP.ClientContext, lists: Array<SP.List>, objects: Array<Schema.IListInstance>) {
        var def = jQuery.Deferred();
        var siteFields = clientContext.get_site().get_rootWeb().get_fields();
        lists.forEach((l, index) => {
            var obj = objects[index];
            if (obj.FieldRefs) {
                obj.FieldRefs.forEach(fr => {
                    Core.Log.Information("Lists Field Refs", String.format(Resources.Lists_adding_field_ref, fr.Name, l.get_title()));
                    var field = siteFields.getByInternalNameOrTitle(fr.Name);
                    l.get_fields().add(field);
                });
                l.update();
            }
        });
        clientContext.executeQueryAsync(def.resolve,
            (sender, args) => {
                Core.Log.Error("Lists Field Refs", `Error: ${args.get_message()}`);
                def.resolve(sender, args);
            });
        return def.promise();
    }
    function ApplyListSecurity(clientContext: SP.ClientContext, lists: Array<SP.List>, objects: Array<Schema.IListInstance>) {
        var def = jQuery.Deferred();
        lists.forEach((l, index) => {
            var obj = objects[index];
            if (!obj.Security) return;
            if (obj.Security.BreakRoleInheritance) {
                Core.Log.Information("Lists Security", String.format(Resources.Lists_breaking_role_inheritance, l.get_title()));
                l.breakRoleInheritance(obj.Security.CopyRoleAssignments, obj.Security.ClearSubscopes);
                l.update();
                clientContext.load(l.get_roleAssignments());
            }
        });

        var web = clientContext.get_web();
        var allProperties = web.get_allProperties();
        var siteGroups = web.get_siteGroups();
        var roleDefinitions = web.get_roleDefinitions();

        clientContext.load(allProperties);
        clientContext.load(roleDefinitions);
        clientContext.executeQueryAsync(
            () => {
                lists.forEach((l, index) => {
                    var obj = objects[index];
                    if (!obj.Security) return;
                    obj.Security.RoleAssignments.forEach(ra => {
                        var roleDef = null;
                        if (typeof ra.RoleDefinition == "number") {
                            roleDef = roleDefinitions.getById(ra.RoleDefinition);
                        } else {
                            roleDef = roleDefinitions.getByName(ra.RoleDefinition);
                        }
                        var roleBindings = SP.RoleDefinitionBindingCollection.newObject(clientContext);
                        roleBindings.add(roleDef);
                        var principal = null;
                        if (ra.Principal.match(/\{[A-Za-z]*\}+/g)) {
                            var token = ra.Principal.substring(1, ra.Principal.length - 1);
                            var groupId = allProperties.get_fieldValues()[`vti_${token}`];
                            principal = siteGroups.getById(groupId);
                        } else {
                            principal = siteGroups.getByName(principal);
                        }
                        l.get_roleAssignments().add(principal, roleBindings);
                    });
                    l.update();
                    Core.Log.Information("Lists Security", String.format(Resources.Lists_role_assignments_applied, l.get_title()));
                });
                clientContext.executeQueryAsync(def.resolve,
                    (sender, args) => {
                        Core.Log.Error("Lists Security", `Error: ${args.get_message()}`);
                        def.resolve(sender, args);
                    });
            },
            (sender, args) => {
                Core.Log.Error("Lists Security", `Error: ${args.get_message()}`);
                def.resolve(sender, args);
            });
        return def.promise();
    }
    function GetViewFromCollectionByUrl(viewCollection: SP.ViewCollection, url: string) {
        var view = jQuery.grep(viewCollection.get_data(), (v) => {
            return v.get_serverRelativeUrl() == `${_spPageContextInfo.siteServerRelativeUrl}/${url}`;
        });
        return view ? view[0] : null;
    }
    function CreateViews(clientContext: SP.ClientContext, lists: Array<SP.List>, objects: Array<Schema.IListInstance>) {
        Core.Log.Information("Lists Views", Resources.Code_execution_started);
        var def = jQuery.Deferred();
        var listViewCollections: Array<SP.ViewCollection> = [];

        lists.forEach((l, index) => {
            listViewCollections.push(l.get_views());
            clientContext.load(listViewCollections[index]);
        });

        clientContext.executeQueryAsync(
            () => {
                lists.forEach((l, index) => {
                    var obj = objects[index];
                    if (!obj.Views) return;
                    listViewCollections.push(l.get_views());
                    clientContext.load(listViewCollections[index]);
                    obj.Views.forEach((v) => {
                        var viewExists = jQuery.grep(listViewCollections[index].get_data(), (ev) => {
                            return ev.get_title() == v.Title;
                        }).length > 0;
                        if (viewExists) {
                            var view = listViewCollections[index].getByTitle(v.Title);
                            Core.Log.Information("Lists Views", String.format(Resources.Lists_updating_list_view, v.Title, l.get_title()));
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
                            if (v.Scope) { view.set_scope(v.Scope); }
                            view.update();
                        } else {
                            Core.Log.Information("Lists Views", String.format(Resources.Lists_adding_list_view, v.Title, l.get_title()));
                            var viewCreationInformation = new SP.ViewCreationInformation();
                            if (v.Title) { viewCreationInformation.set_title(v.Title); }
                            if (v.PersonalView) { viewCreationInformation.set_personalView(v.PersonalView); }
                            if (v.Paged) { viewCreationInformation.set_paged(v.Paged); }
                            if (v.Query) { viewCreationInformation.set_query(v.Query); }
                            if (v.RowLimit) { viewCreationInformation.set_rowLimit(v.RowLimit); }
                            if (v.SetAsDefaultView) { viewCreationInformation.set_setAsDefaultView(v.SetAsDefaultView); }
                            if (v.ViewFields) { viewCreationInformation.set_viewFields(v.ViewFields); }
                            if (v.ViewTypeKind) { viewCreationInformation.set_viewTypeKind(SP.ViewType.html); }
                            var view = l.get_views().add(viewCreationInformation);
                            if (v.Scope) {
                                view.set_scope(v.Scope);
                                view.update();
                            }
                            l.update();
                        }
                        clientContext.load(l.get_views());
                    });
                });
                clientContext.executeQueryAsync(def.resolve,
                    (sender, args) => {
                        Core.Log.Error("Lists Views", `Error: ${args.get_message()}`);
                        def.resolve(sender, args);
                    });
            },
            (sender, args) => {
                Core.Log.Error("Lists Views", `Error: ${args.get_message()}`);
                def.resolve(sender, args);
            });

        return def.promise();
    }

    export class Lists extends Model.ObjectHandlerBase {
        constructor() {
            super("Lists")
        }
        ProvisionObjects(objects: Array<Schema.IListInstance>) {
            Core.Log.Information(this.name, Resources.Code_execution_started);
            var def = jQuery.Deferred();

            var clientContext = SP.ClientContext.get_current();
            var lists = clientContext.get_web().get_lists();
            var listInstances: Array<SP.List> = [];

            clientContext.load(lists);
            clientContext.executeQueryAsync(
                () => {
                    objects.forEach((obj, index) => {
                        var existingObj: any = jQuery.grep(lists.get_data(), (list) => {
                            return list.get_title() == obj.Title;
                        })[0];

                        if (existingObj) {
                            Core.Log.Information(this.name, String.format(Resources.Lists_list_already_exists, obj.Title, obj.Url));
                            listInstances.push(existingObj);
                            clientContext.load(listInstances[index]);
                        } else {
                            Core.Log.Information(this.name, String.format(Resources.Lists_creating_list, obj.Title, obj.Url));
                            var objCreationInformation = new SP.ListCreationInformation();
                            if (obj.Description) { objCreationInformation.set_description(obj.Description); }
                            if (obj.OnQuickLaunch != undefined) { 
                                objCreationInformation.set_quickLaunchOption(obj.OnQuickLaunch ? SP.QuickLaunchOptions.on : SP.QuickLaunchOptions.off); 
                            }
                            if (obj.TemplateType) { objCreationInformation.set_templateType(obj.TemplateType); }
                            if (obj.Title) { objCreationInformation.set_title(obj.Title); }
                            if (obj.Url) { objCreationInformation.set_url(obj.Url); }
                            listInstances.push(lists.add(objCreationInformation));
                            clientContext.load(listInstances[index]);
                        }
                    });

                    if (!clientContext.get_hasPendingRequest()) {
                        Core.Log.Information(this.name, Resources.Code_execution_ended);
                        def.resolve();
                        return def.promise();
                    }

                    clientContext.executeQueryAsync(
                        () => {
                            ApplyContentTypeBindings(clientContext, listInstances, objects).then(() => {
                                ApplyListInstanceFieldRefs(clientContext, listInstances, objects).then(() => {
                                    ApplyListSecurity(clientContext, listInstances, objects).then(() => {
                                        CreateViews(clientContext, listInstances, objects).then(() => {
                                            var promises = [];
                                            objects.forEach((obj, index) => {
                                                if (obj.Folders && obj.Folders.length > 0) {
                                                    promises.push(CreateFolders(clientContext, listInstances[index], obj.Url, obj.Folders));
                                                }
                                            });
                                            jQuery.when.apply(jQuery, promises).done(() => {
                                                clientContext.executeQueryAsync(() => {
                                                    Core.Log.Information(this.name, Resources.Code_execution_ended);
                                                    def.resolve();
                                                },
                                                (sender, args) => {
                                                    Core.Log.Error(this.name, `Error: ${args.get_message()}`);
                                                    def.resolve(sender, args);
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        },
                        (sender, args) => {
                            Core.Log.Error(this.name, `Error: ${args.get_message()}`);
                            def.resolve(sender, args);
                        });
                },
                (sender, args) => {
                    Core.Log.Error(this.name, `Error: ${args.get_message()}`);
                    def.resolve(sender, args);
                });

            return def.promise();
        }
    }
}