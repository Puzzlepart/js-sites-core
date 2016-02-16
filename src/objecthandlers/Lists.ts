/// <reference path="..\model\ObjectHandlerBase.ts" />
"use strict";


module Pzl.Sites.Core.ObjectHandlers {
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
                        var existingObj: SP.List = jQuery.grep(lists.get_data(), (list) => {
                            return list.get_title() == obj.Title;
                        })[0];

                        if (existingObj) {
                            Core.Log.Information(this.name, String.format(Resources.Lists_list_already_exists, obj.Title, obj.Url));
                            obj.Description && existingObj.set_description(obj.Description);
                            obj.EnableVersioning != undefined && existingObj.set_enableVersioning(obj.EnableVersioning);
                            obj.EnableMinorVersions != undefined && existingObj.set_enableMinorVersions(obj.EnableMinorVersions);
                            obj.EnableModeration != undefined && existingObj.set_enableModeration(obj.EnableModeration);
                            obj.EnableFolderCreation != undefined && existingObj.set_enableFolderCreation(obj.EnableFolderCreation);
                            obj.EnableAttachments != undefined && existingObj.set_enableAttachments(obj.EnableAttachments);
                            obj.NoCrawl != undefined && existingObj.set_noCrawl(obj.NoCrawl);
                            obj.DefaultDisplayFormUrl && existingObj.set_defaultDisplayFormUrl(obj.DefaultDisplayFormUrl);
                            obj.DefaultEditFormUrl && existingObj.set_defaultEditFormUrl(obj.DefaultEditFormUrl);
                            obj.DefaultNewFormUrl && existingObj.set_defaultNewFormUrl(obj.DefaultNewFormUrl);
                            obj.DraftVersionVisibility && existingObj.set_draftVersionVisibility(SP.DraftVisibilityType[obj.DraftVersionVisibility]);
                            obj.ImageUrl && existingObj.set_imageUrl(obj.ImageUrl);
                            obj.Hidden != undefined && existingObj.set_hidden(obj.Hidden);
                            obj.ForceCheckout != undefined && existingObj.set_forceCheckout(obj.ForceCheckout);
                            existingObj.update();
                            listInstances.push(existingObj);
                            clientContext.load(listInstances[index]);
                        } else {
                            Core.Log.Information(this.name, String.format(Resources.Lists_creating_list, obj.Title, obj.Url));
                            var objCreationInformation = new SP.ListCreationInformation();
                            obj.Description && objCreationInformation.set_description(obj.Description);
                            obj.OnQuickLaunch != undefined && objCreationInformation.set_quickLaunchOption(obj.OnQuickLaunch ? SP.QuickLaunchOptions.on : SP.QuickLaunchOptions.off);
                            obj.TemplateType && objCreationInformation.set_templateType(obj.TemplateType);
                            obj.Title && objCreationInformation.set_title(obj.Title);
                            obj.Url && objCreationInformation.set_url(obj.Url);
                            var createdList = lists.add(objCreationInformation);
                            obj.EnableVersioning != undefined && createdList.set_enableVersioning(obj.EnableVersioning);
                            obj.EnableMinorVersions != undefined && createdList.set_enableMinorVersions(obj.EnableMinorVersions);
                            obj.EnableModeration != undefined && createdList.set_enableModeration(obj.EnableModeration);
                            obj.EnableFolderCreation != undefined && createdList.set_enableFolderCreation(obj.EnableFolderCreation);
                            obj.EnableAttachments != undefined && createdList.set_enableAttachments(obj.EnableAttachments);
                            obj.NoCrawl != undefined && createdList.set_noCrawl(obj.NoCrawl);
                            obj.DefaultDisplayFormUrl && createdList.set_defaultDisplayFormUrl(obj.DefaultDisplayFormUrl);
                            obj.DefaultEditFormUrl && createdList.set_defaultEditFormUrl(obj.DefaultEditFormUrl);
                            obj.DefaultNewFormUrl && createdList.set_defaultNewFormUrl(obj.DefaultNewFormUrl);
                            obj.DraftVersionVisibility && createdList.set_draftVersionVisibility(SP.DraftVisibilityType[obj.DraftVersionVisibility.toLocaleLowerCase()]);
                            obj.ImageUrl && createdList.set_imageUrl(obj.ImageUrl);
                            obj.Hidden != undefined && createdList.set_hidden(obj.Hidden);
                            obj.ForceCheckout != undefined && createdList.set_forceCheckout(obj.ForceCheckout);
                            listInstances.push(createdList);
                            clientContext.load(listInstances[index]);
                        }
                    });
                    clientContext.executeQueryAsync(
                        () => {
                            this.ApplyContentTypeBindings(clientContext, listInstances, objects).then(() => {
                                this.ApplyListInstanceFieldRefs(clientContext, listInstances, objects).then(() => {
                                    this.ApplyFields(clientContext, listInstances, objects).then(() => {
                                        this.ApplyLookupFields(clientContext, listInstances, objects).then(() => {
                                            this.ApplyListSecurity(clientContext, listInstances, objects).then(() => {
                                                this.CreateViews(clientContext, listInstances, objects).then(() => {
                                                    this.InsertDataRows(clientContext, listInstances, objects).then(() => {
                                                        this.CreateFolders(clientContext, listInstances, objects).then(() => {
                                                            this.AddRibbonActions(clientContext, listInstances, objects).then(() => {
                                                                Core.Log.Information(this.name, Resources.Code_execution_ended);
                                                                def.resolve();
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        },
                        (sender, args) => {
                            Core.Log.Information(this.name, Resources.Code_execution_ended);
                            Core.Log.Error(this.name, args.get_message());
                            def.resolve(sender, args);
                        });
                },
                (sender, args) => {
                    Core.Log.Information(this.name, Resources.Code_execution_ended);
                    Core.Log.Error(this.name, args.get_message());
                    def.resolve(sender, args);
                });

            return def.promise();
        }
        private AddRibbonActions(clientContext: SP.ClientContext, lists: Array<SP.List>, objects: Array<Schema.IListInstance>) {
            var def = jQuery.Deferred();
            lists.forEach((l, index) => {
                var obj = objects[index];
                if (obj.RibbonActions) {
                    obj.RibbonActions.forEach(ra => {
                        Core.Log.Information("Lists Ribbon Actions", String.format(Resources.Lists_adding_ribbon_action, ra.Name, l.get_title()));
                        var action = l.get_userCustomActions().add();
                        action.set_name(`${ra.Control}.${ra.Name}`);
                        action.set_title(`${ra.Control}.${ra.Name}`);
                        action.set_location(ra.Location);
                        action.set_sequence(5);
                        var scriptSrc = `${ra.LoadScript}/${ra.Control}.${ra.Group}.${ra.Name}.js`.replace("~sitecollection", _spPageContextInfo.siteAbsoluteUrl);
                        action.set_commandUIExtension(decodeURIComponent(String.format(this.ribbonActionTemplate, ra.Control, ra.Group, ra.Name, ra.LabelText, ra.Image16by16, ra.Image32by32, ra.Description, ra.Sequence, scriptSrc)));
                        action.update();
                    });
                }
            });

            clientContext.executeQueryAsync(def.resolve,
            (sender, args) => {
                Core.Log.Error("Lists Ribbon Actions", args.get_message());
                def.resolve(sender, args);
            });

            return def.promise();
        }
        private EnsureLocationBasedMetadataDefaultsReceiver(clientContext: SP.ClientContext, list: SP.List) {
            var eventReceivers = list.get_eventReceivers();
            Core.Log.Information("Lists Event Receivers", String.format(Resources.Lists_adding_eventreceiver, "LocationBasedMetadataDefaultsReceiver ItemAdded", list.get_title()));
            var eventRecCreationInfo = new SP.EventReceiverDefinitionCreationInformation();
            eventRecCreationInfo.set_receiverName("LocationBasedMetadataDefaultsReceiver ItemAdded");
            eventRecCreationInfo.set_synchronization(1);
            eventRecCreationInfo.set_sequenceNumber(1000);
            eventRecCreationInfo.set_receiverAssembly("Microsoft.Office.DocumentManagement, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c");
            eventRecCreationInfo.set_receiverClass("Microsoft.Office.DocumentManagement.LocationBasedMetadataDefaultsReceiver");
            eventRecCreationInfo.set_eventType(SP.EventReceiverType.itemAdded);
            eventReceivers.add(eventRecCreationInfo);
            list.update();
        }
        private CreateFolders(clientContext: SP.ClientContext, lists: Array<SP.List>, objects: Array<Schema.IListInstance>) {
            var def = jQuery.Deferred();

            lists.forEach((l, index) => {
                var obj = objects[index];
                if (!obj.Folders) return;
                var folderServerRelativeUrl = `${_spPageContextInfo.webServerRelativeUrl}/${obj.Url}`;
                var rootFolder = l.get_rootFolder();
                var metadataDefaults = "<MetadataDefaults>";
                var setMetadataDefaults = false;
                obj.Folders.forEach(f => {
                    var folderUrl = `${folderServerRelativeUrl}/${f.Name}`;
                    Core.Log.Information("Lists Folders", String.format(Resources.Lists_creating_folder, folderUrl));
                    rootFolder.get_folders().add(folderUrl)
                    if (f.DefaultValues) {
                        Core.Log.Information("Lists Folders", String.format(Resources.Lists_setting_default_metadata, folderUrl));
                        var keys = Object.keys(f.DefaultValues).length;
                        if (keys > 0) {
                            metadataDefaults += `<a href='${folderUrl}'>`;
                            Object.keys(f.DefaultValues).forEach(key => {
                                Core.Log.Information("Lists Folders", String.format(Resources.Lists_setting_default_value_for_folder, key, f.DefaultValues[key], folderUrl));
                                metadataDefaults += `<DefaultValue FieldName="${key}">${f.DefaultValues[key]}</DefaultValue>`;
                            });
                            metadataDefaults += "</a>";
                        }
                        setMetadataDefaults = true;
                    }
                });
                metadataDefaults += "</MetadataDefaults>";

                if (setMetadataDefaults) {
                    var metadataDefaultsFileCreateInfo = new SP.FileCreationInformation();
                    metadataDefaultsFileCreateInfo.set_url(`${folderServerRelativeUrl}/Forms/client_LocationBasedDefaults.html`);
                    metadataDefaultsFileCreateInfo.set_content(new SP.Base64EncodedByteArray());
                    metadataDefaultsFileCreateInfo.set_overwrite(true);
                    for (var i = 0; i < metadataDefaults.length; i++) {
                        metadataDefaultsFileCreateInfo.get_content().append(metadataDefaults.charCodeAt(i));
                    }
                    rootFolder.get_files().add(metadataDefaultsFileCreateInfo);
                    this.EnsureLocationBasedMetadataDefaultsReceiver(clientContext, l);
                }
            });

            clientContext.executeQueryAsync(def.resolve,
                (sender, args) => {
                    Core.Log.Error("Lists Folders", args.get_message());
                    def.resolve(sender, args);
                });

            return def.promise();
        }
        private ApplyContentTypeBindings(clientContext: SP.ClientContext, lists: Array<SP.List>, objects: Array<Schema.IListInstance>) {
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
                            Core.Log.Error("Lists Content Types", args.get_message());
                            def.resolve(sender, args);
                        });
                },
                (sender, args) => {
                    Core.Log.Error("Lists Content Types", args.get_message());
                    def.resolve(sender, args);
                });

            return def.promise();
        }
        private ApplyListInstanceFieldRefs(clientContext: SP.ClientContext, lists: Array<SP.List>, objects: Array<Schema.IListInstance>) {
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
                    Core.Log.Error("Lists Field Refs", args.get_message());
                    def.resolve(sender, args);
                });

            return def.promise();
        }
        private ApplyFields(clientContext: SP.ClientContext, lists: Array<SP.List>, objects: Array<Schema.IListInstance>) {
            var def = jQuery.Deferred();

            lists.forEach((l, index) => {
                var obj = objects[index];
                if (obj.Fields) {
                    obj.Fields.forEach(f => {
                        var fieldXml = this.GetFieldXml(f, lists, l);
                        var fieldType = this.GetFieldXmlType(fieldXml);
                        if(fieldType != "Lookup" && fieldType != "LookupMulti" ){
                             l.get_fields().addFieldAsXml(fieldXml, true, SP.AddFieldOptions.addToAllContentTypes); 
                        }
                    });
                    l.update();
                }
            });
            clientContext.executeQueryAsync(def.resolve,
                (sender, args) => {
                    Core.Log.Error("Lists Fields", args.get_message());
                    def.resolve(sender, args);
                });

            return def.promise();
        }
        private ApplyLookupFields(clientContext: SP.ClientContext, lists: Array<SP.List>, objects: Array<Schema.IListInstance>) {
            var def = jQuery.Deferred();

            lists.forEach((l, index) => {
                var obj = objects[index];
                if (obj.Fields) {
                    obj.Fields.forEach(f => { 
                        var fieldXml = this.GetFieldXml(f, lists, l);
                        var fieldType = this.GetFieldXmlType(fieldXml);
                        if(fieldType == "Lookup" || fieldType == "LookupMulti"){
                            l.get_fields().addFieldAsXml(fieldXml, true, SP.AddFieldOptions.addToAllContentTypes);
                        }
                    });
                    l.update();
                } 
            });
            clientContext.executeQueryAsync(def.resolve,
                (sender, args) => {
                    Core.Log.Error("Lists Fields", args.get_message());
                    def.resolve(sender, args);
                });

            return def.promise();
        }
        private GetFieldXmlType (fieldXml: string) { 
             return $(jQuery.parseXML(fieldXml)).find("Field").attr("Type"); 
        }
        private GetFieldXml (field: Schema.IField, lists: Array<SP.List>, list: SP.List){
              var fieldXml = "";
              if (!field.SchemaXml) {
                Core.Log.Information("Lists Fields", String.format(Resources.Lists_adding_field, field.Type, field.ID, list.get_title()));
                var properties = [];
                for (var prop in field) {
                    var value = field[prop];
                    if (prop == "List") {
                        var targetList = jQuery.grep(lists, v => {
                            return v.get_title() === value;
                        }); 
                        if (targetList.length > 0) {
                            value = `{${targetList[0].get_id().toString()}}`;
                        } else {
                            Core.Log.Information("Lists Fields", String.format(Resources.Lists_invalid_lookup_field, field.ID, list.get_title()));
                            return;
                        }
                    } 
                    if (prop == "Formula") continue;
                    properties.push(`${prop}="${value}"`);
                }
                fieldXml = `<Field ${properties.join(" ")}>`;
                if (field.Type == "Calculated") fieldXml += `<Formula>${field.Formula}</Formula>`;
                fieldXml += "</Field>";
                return fieldXml;
            
            } else {
                Core.Log.Information("Lists Fields", String.format(Resources.Lists_adding_field_schema_xml, list.get_title())); 
                fieldXml = this.tokenParser.ReplaceListTokensFromListCollection(field.SchemaXml, lists);
                return fieldXml;
            }
            return fieldXml;
        }
        private ApplyListSecurity(clientContext: SP.ClientContext, lists: Array<SP.List>, objects: Array<Schema.IListInstance>) {
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
        private CreateViews(clientContext: SP.ClientContext, lists: Array<SP.List>, objects: Array<Schema.IListInstance>) {
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
                                if(obj.RemoveExistingViews && obj.Views.length > 0) {
                                    Core.Log.Information("Lists Views", String.format(Resources.Lists_removing_existing_list_view, v.Title, l.get_title()))
                                    ev.deleteObject();
                                    return false;  
                                } 
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
                            Core.Log.Error("Lists Views", args.get_message());
                            def.resolve(sender, args);
                        });
                },
                (sender, args) => {
                    Core.Log.Error("Lists Views", args.get_message());
                    def.resolve(sender, args);
                });

            return def.promise();
        }
        private InsertDataRows(clientContext: SP.ClientContext, lists: Array<SP.List>, objects: Array<Schema.IListInstance>) {
            Core.Log.Information("Lists Data Rows", Resources.Code_execution_started);
            var def = jQuery.Deferred();

            var promises = [];
            lists.forEach((l, index) => {
                var obj = objects[index];
                if (obj.DataRows) {
                    obj.DataRows.forEach((r, index) => {
                        Core.Log.Information("Lists Data Rows", String.format(Resources.Lists_inserting_data_row, (index + 1), obj.DataRows.length, l.get_title()));
                        var item = l.addItem(new SP.ListItemCreationInformation());
                        for (var key in r) {
                            item.set_item(key, r[key]);
                        }
                        item.update();
                        clientContext.load(item);
                    });
                }
            });
            clientContext.executeQueryAsync(
                () => {
                    Core.Log.Information("Lists Data Rows", Resources.Code_execution_ended);
                    def.resolve();
                },
                (sender, args) => {
                    Core.Log.Error("Lists Data Rows", args.get_message());
                    def.resolve(sender, args);
                });

            return def.promise();
        }
        ribbonActionTemplate = `<CommandUIExtension><CommandUIDefinitions><CommandUIDefinition Location="{0}.Groups._children"><Group Id="{0}.{1}" Sequence="33" Description="" Title="{1}" Template="Ribbon.Templates.Flexible2"><Controls Id="{0}.{1}.Controls"><Button Id="{0}.{1}.{2}" Command="{2}ButtonCommand" LabelText="{3}" Image16by16="{4}" Image32by32="{5}" Description="{6}" Sequence="{7}" TemplateAlias="o2" /></Controls></Group></CommandUIDefinition><CommandUIDefinition Location="{0}.Scaling._children"><MaxSize Id="{0}.{1}.MaxSize" Sequence="15" GroupId="{0}.{1}" Size="LargeLarge"/></CommandUIDefinition></CommandUIDefinitions><CommandUIHandlers><CommandUIHandler Command="{2}ButtonCommand" CommandAction="javascript:if(window['{0}.{1}.{2}.Loaded']==true)%7B{0}.{1}.{2}();%7D;SP.SOD.registerSod('{0}.{1}.{2}.js', '{8}');EnsureScriptFunc('{0}.{1}.{2}.js', null, function()%7B{0}.{1}.{2}();window['{0}.{1}.{2}.Loaded']=true;%7D);" /></CommandUIHandlers></CommandUIExtension>`;
    }
}
