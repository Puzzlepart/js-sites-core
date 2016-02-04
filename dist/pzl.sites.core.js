var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var Model;
            (function (Model) {
                var ObjectHandlerBase = (function () {
                    function ObjectHandlerBase(name) {
                        this.name = name;
                    }
                    ObjectHandlerBase.prototype.ProvisionObjects = function (objects, parameters) { };
                    return ObjectHandlerBase;
                }());
                Model.ObjectHandlerBase = ObjectHandlerBase;
            })(Model = Core.Model || (Core.Model = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var Resources;
            (function (Resources) {
                Resources.Provisioning_progressbar_id = "js-sites-core-progress";
                Resources.Provisioning_progressbar_text_id = "js-sites-core-progress-text";
                Resources.Provisioning_progressbar_markup = "<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"{0}\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:{0}%\">{0}%</div>";
                Resources.Provisioning_started = "Starting at URL {0}";
                Resources.Provisioning_ended = "Done in {0} seconds";
                Resources.Provisioning_timeout = "Timeout for {0} seconds";
                Resources.WaitMessage_header = "Applying template";
                Resources.WaitMessage_content = "This might take a moment.";
                Resources.Code_execution_started = "Code execution scope started";
                Resources.Code_execution_ended = "Code execution scope ended";
                Resources.Lists_list_already_exists = "A list with the specified title {0} already exists in this Web site at Url {1}";
                Resources.Lists_creating_list = "Creating list with title {0} at Url {1}";
                Resources.Lists_creating_folder = "Creating folder {0}";
                Resources.Lists_setting_default_value_for_folder = "Setting default value '{0}' = '{1}' for folder '{2}'";
                Resources.Lists_setting_default_metadata = "Setting default metadata for folder {0}";
                Resources.Lists_enabled_content_types = "Enabled content types for list {0}";
                Resources.Lists_removing_content_type = "Removing content type {0} from list {1}";
                Resources.Lists_adding_content_type = "Adding content type {0} to list {1}";
                Resources.Lists_breaking_role_inheritance = "Breaking Role Inheritance for list {0}";
                Resources.Lists_role_assignments_applied = "Role assignements applied for list {0}";
                Resources.Lists_updating_list_view = "Updating existing view {0} for list {1}";
                Resources.Lists_adding_list_view = "Adding view {0} for list {1}";
                Resources.Lists_adding_eventreceiver = "Adding eventreceiver {0} to list {1}";
                Resources.Lists_adding_field_ref = "Adding field {0} to list {1}";
                Resources.Lists_adding_field = "Adding {0} field '{1}' to list '{2}'";
                Resources.Lists_invalid_lookup_field = "The lookup field '{0}' for list '{1}' is invalid";
                Resources.Lists_inserting_data_row = "Adding data row {0} of {1} to list '{2}'";
                Resources.WebSettings_setting_welcomePage = "Setting welcome page to {0}";
                Resources.WebSettings_setting_alternateCssUrl = "Setting alternate css url to {0}";
                Resources.WebSettings_setting_masterUrl = "Setting master url to {0}";
                Resources.WebSettings_setting_customMasterUrl = "Setting custom master url to {0}";
                Resources.WebSettings_setting_saveSiteAsTemplateEnabled = "Setting save site as template enabled to {0}";
                Resources.WebSettings_setting_quickLaunchEnabled = "Setting quicklaunch enabled to {0}";
                Resources.WebSettings_setting_recycleBinEnabled = "Setting recyclebin enabled to {0}";
                Resources.WebSettings_setting_treeViewEnabled = "Setting treeview enabled to {0}";
                Resources.PropertyBagEntries_setting_property = "Setting property '{0}' = '{1}' on web";
                Resources.PropertyBagEntries_setting_indexed_property = "Setting property '{0}' as indexed";
                Resources.Pages_creating_page = "Creating wiki page with Url {0}";
                Resources.Pages_creating_page_failed = "Failed to create wiki page with Url {0}";
                Resources.Navigation_setting_shared = "Setting useShared to {0}";
                Resources.Navigation_configuring_of_quicklaunch_done = "Configuring of quicklaunch done";
                Resources.Navigation_configuring_of_quicklaunch_failed = "Configuring of quicklaunch failed";
                Resources.Navigation_configuring_quicklaunch_navigation = "Configuring quicklaunch navigation";
                Resources.Navigation_removing_existing_nodes = "Removing existing navigation nodes";
                Resources.Navigation_adding_node = "Adding navigation node with Url {0} and Title {1}";
                Resources.Navigation_adding_children_node = "Adding navigation node with Url {0} and Title {1}, under parent {2}";
                Resources.CustomAction_already_exists = "A custom action with Title '{0}' already exists";
                Resources.CustomAction_creating = "Creating custom action with Title '{0}'";
                Resources.Files_retrieving_xml_for_webpart = "Retrieving XML for webpart '{0}' from file";
                Resources.Files_removing_existing_webparts = "Removing existing webparts for file with URL '{0}'";
                Resources.Files_adding_webpart = "Adding web part '{0}' to zone '{1}' for file with URL '{2}'";
                Resources.Files_setting_properties = "Setting properties for file with URL {0}";
                Resources.Files_setting_property = "Setting property '{0}' = '{1}' for file with URL '{2}'";
                Resources.Files_retrieved_file_contents = "Retrieved content for file with Url '{0}' from source file";
                Resources.Files_creating_file = "Creating file with Url '{0}'";
                Resources.Files_skipping_form_file = "File with Url {0} is a form file. Skipping creation.";
                Resources.Files_modifying_list_views = "Modifying list views for list '{0}'";
                Resources.Files_modifying_list_view = "Modifying list view with Url '{0}' for list '{1}'";
            })(Resources = Core.Resources || (Core.Resources = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var Utilities;
            (function (Utilities) {
                var RestHelper = (function () {
                    function RestHelper() {
                        this.headers = { accept: 'application/json;odata=verbose' };
                    }
                    RestHelper.prototype.getListData = function (baseUrl, listTitle) {
                        return this.get(baseUrl + "/_api/web/lists/getByTitle('" + listTitle + "')/Items");
                    };
                    RestHelper.prototype.get = function (url) {
                        return jQuery.ajax({ url: url, type: 'get', headers: this.headers });
                    };
                    return RestHelper;
                }());
                Utilities.RestHelper = RestHelper;
            })(Utilities = Core.Utilities || (Core.Utilities = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var ObjectHandlers;
            (function (ObjectHandlers) {
                function EnsureLocationBasedMetadataDefaultsReceiver(clientContext, list) {
                    var eventReceivers = list.get_eventReceivers();
                    Core.Log.Information("Lists Event Receivers", String.format(Core.Resources.Lists_adding_eventreceiver, "LocationBasedMetadataDefaultsReceiver ItemAdded", list.get_title()));
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
                function CreateFolders(clientContext, lists, objects) {
                    var def = jQuery.Deferred();
                    lists.forEach(function (l, index) {
                        var obj = objects[index];
                        if (!obj.Folders)
                            return;
                        var folderServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + obj.Url;
                        var rootFolder = l.get_rootFolder();
                        var metadataDefaults = "<MetadataDefaults>";
                        var setMetadataDefaults = false;
                        obj.Folders.forEach(function (f) {
                            var folderUrl = folderServerRelativeUrl + "/" + f.Name;
                            Core.Log.Information("Lists Folders", String.format(Core.Resources.Lists_creating_folder, folderUrl));
                            rootFolder.get_folders().add(folderUrl);
                            if (f.DefaultValues) {
                                Core.Log.Information("Lists Folders", String.format(Core.Resources.Lists_setting_default_metadata, folderUrl));
                                var keys = Object.keys(f.DefaultValues).length;
                                if (keys > 0) {
                                    metadataDefaults += "<a href='" + folderUrl + "'>";
                                    Object.keys(f.DefaultValues).forEach(function (key) {
                                        Core.Log.Information("Lists Folders", String.format(Core.Resources.Lists_setting_default_value_for_folder, key, f.DefaultValues[key], folderUrl));
                                        metadataDefaults += "<DefaultValue FieldName=\"" + key + "\">" + f.DefaultValues[key] + "</DefaultValue>";
                                    });
                                    metadataDefaults += "</a>";
                                }
                                setMetadataDefaults = true;
                            }
                        });
                        metadataDefaults += "</MetadataDefaults>";
                        if (setMetadataDefaults) {
                            var metadataDefaultsFileCreateInfo = new SP.FileCreationInformation();
                            metadataDefaultsFileCreateInfo.set_url(folderServerRelativeUrl + "/Forms/client_LocationBasedDefaults.html");
                            metadataDefaultsFileCreateInfo.set_content(new SP.Base64EncodedByteArray());
                            metadataDefaultsFileCreateInfo.set_overwrite(true);
                            for (var i = 0; i < metadataDefaults.length; i++) {
                                metadataDefaultsFileCreateInfo.get_content().append(metadataDefaults.charCodeAt(i));
                            }
                            rootFolder.get_files().add(metadataDefaultsFileCreateInfo);
                            EnsureLocationBasedMetadataDefaultsReceiver(clientContext, l);
                        }
                    });
                    clientContext.executeQueryAsync(def.resolve, function (sender, args) {
                        Core.Log.Error("Lists Folders", args.get_message());
                        def.resolve(sender, args);
                    });
                    return def.promise();
                }
                function ApplyContentTypeBindings(clientContext, lists, objects) {
                    var def = jQuery.Deferred();
                    var webCts = clientContext.get_site().get_rootWeb().get_contentTypes();
                    var listCts = [];
                    lists.forEach(function (l, index) {
                        listCts.push(l.get_contentTypes());
                        clientContext.load(listCts[index], 'Include(Name,Id)');
                        if (objects[index].ContentTypeBindings) {
                            Core.Log.Information("Lists Content Types", String.format(Core.Resources.Lists_enabled_content_types, l.get_title()));
                            l.set_contentTypesEnabled(true);
                            l.update();
                        }
                    });
                    clientContext.load(webCts);
                    clientContext.executeQueryAsync(function () {
                        lists.forEach(function (list, index) {
                            var obj = objects[index];
                            if (!obj.ContentTypeBindings)
                                return;
                            var listContentTypes = listCts[index];
                            var existingContentTypes = new Array();
                            if (obj.RemoveExistingContentTypes && obj.ContentTypeBindings.length > 0) {
                                listContentTypes.get_data().forEach(function (ct) {
                                    existingContentTypes.push(ct);
                                });
                            }
                            obj.ContentTypeBindings.forEach(function (ctb) {
                                Core.Log.Information("Lists Content Types", String.format(Core.Resources.Lists_adding_content_type, ctb.ContentTypeId, list.get_title()));
                                listContentTypes.addExistingContentType(webCts.getById(ctb.ContentTypeId));
                            });
                            if (obj.RemoveExistingContentTypes && obj.ContentTypeBindings.length > 0) {
                                for (var j = 0; j < existingContentTypes.length; j++) {
                                    var ect = existingContentTypes[j];
                                    Core.Log.Information("Lists Content Types", String.format(Core.Resources.Lists_removing_content_type, ect.get_id().get_stringValue(), list.get_title()));
                                    ect.deleteObject();
                                }
                            }
                            list.update();
                        });
                        clientContext.executeQueryAsync(def.resolve, function (sender, args) {
                            Core.Log.Error("Lists Content Types", args.get_message());
                            def.resolve(sender, args);
                        });
                    }, function (sender, args) {
                        Core.Log.Error("Lists Content Types", args.get_message());
                        def.resolve(sender, args);
                    });
                    return def.promise();
                }
                function ApplyListInstanceFieldRefs(clientContext, lists, objects) {
                    var def = jQuery.Deferred();
                    var siteFields = clientContext.get_site().get_rootWeb().get_fields();
                    lists.forEach(function (l, index) {
                        var obj = objects[index];
                        if (obj.FieldRefs) {
                            obj.FieldRefs.forEach(function (fr) {
                                Core.Log.Information("Lists Field Refs", String.format(Core.Resources.Lists_adding_field_ref, fr.Name, l.get_title()));
                                var field = siteFields.getByInternalNameOrTitle(fr.Name);
                                l.get_fields().add(field);
                            });
                            l.update();
                        }
                    });
                    clientContext.executeQueryAsync(def.resolve, function (sender, args) {
                        Core.Log.Error("Lists Field Refs", args.get_message());
                        def.resolve(sender, args);
                    });
                    return def.promise();
                }
                function ApplyFields(clientContext, lists, objects) {
                    var def = jQuery.Deferred();
                    lists.forEach(function (l, index) {
                        var obj = objects[index];
                        if (obj.Fields) {
                            obj.Fields.forEach(function (f) {
                                Core.Log.Information("Lists Fields", String.format(Core.Resources.Lists_adding_field, f.Type, f.ID, l.get_title()));
                                var properties = [];
                                for (var prop in f) {
                                    var value = f[prop];
                                    if (prop == "List") {
                                        var targetList = jQuery.grep(lists, function (v) {
                                            return v.get_title() === value;
                                        });
                                        if (targetList.length > 0) {
                                            value = "{" + targetList[0].get_id().toString() + "}";
                                        }
                                        else {
                                            Core.Log.Information("Lists Fields", String.format(Core.Resources.Lists_invalid_lookup_field, f.ID, l.get_title()));
                                            return;
                                        }
                                    }
                                    if (prop == "Formula")
                                        continue;
                                    properties.push(prop + "=\"" + value + "\"");
                                }
                                var fieldXml = "<Field " + properties.join(" ") + ">";
                                if (f.Type == "Calculated")
                                    fieldXml += "<Formula>" + f.Formula + "</Formula>";
                                fieldXml += "</Field>";
                                l.get_fields().addFieldAsXml(fieldXml, true, SP.AddFieldOptions.addToDefaultContentType);
                            });
                            l.update();
                        }
                    });
                    clientContext.executeQueryAsync(def.resolve, function (sender, args) {
                        Core.Log.Error("Lists Fields", args.get_message());
                        def.resolve(sender, args);
                    });
                    return def.promise();
                }
                function ApplyListSecurity(clientContext, lists, objects) {
                    var def = jQuery.Deferred();
                    lists.forEach(function (l, index) {
                        var obj = objects[index];
                        if (!obj.Security)
                            return;
                        if (obj.Security.BreakRoleInheritance) {
                            Core.Log.Information("Lists Security", String.format(Core.Resources.Lists_breaking_role_inheritance, l.get_title()));
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
                    clientContext.executeQueryAsync(function () {
                        lists.forEach(function (l, index) {
                            var obj = objects[index];
                            if (!obj.Security)
                                return;
                            obj.Security.RoleAssignments.forEach(function (ra) {
                                var roleDef = null;
                                if (typeof ra.RoleDefinition == "number") {
                                    roleDef = roleDefinitions.getById(ra.RoleDefinition);
                                }
                                else {
                                    roleDef = roleDefinitions.getByName(ra.RoleDefinition);
                                }
                                var roleBindings = SP.RoleDefinitionBindingCollection.newObject(clientContext);
                                roleBindings.add(roleDef);
                                var principal = null;
                                if (ra.Principal.match(/\{[A-Za-z]*\}+/g)) {
                                    var token = ra.Principal.substring(1, ra.Principal.length - 1);
                                    var groupId = allProperties.get_fieldValues()[("vti_" + token)];
                                    principal = siteGroups.getById(groupId);
                                }
                                else {
                                    principal = siteGroups.getByName(principal);
                                }
                                l.get_roleAssignments().add(principal, roleBindings);
                            });
                            l.update();
                            Core.Log.Information("Lists Security", String.format(Core.Resources.Lists_role_assignments_applied, l.get_title()));
                        });
                        clientContext.executeQueryAsync(def.resolve, function (sender, args) {
                            Core.Log.Error("Lists Security", "Error: " + args.get_message());
                            def.resolve(sender, args);
                        });
                    }, function (sender, args) {
                        Core.Log.Error("Lists Security", "Error: " + args.get_message());
                        def.resolve(sender, args);
                    });
                    return def.promise();
                }
                function CreateViews(clientContext, lists, objects) {
                    Core.Log.Information("Lists Views", Core.Resources.Code_execution_started);
                    var def = jQuery.Deferred();
                    var listViewCollections = [];
                    lists.forEach(function (l, index) {
                        listViewCollections.push(l.get_views());
                        clientContext.load(listViewCollections[index]);
                    });
                    clientContext.executeQueryAsync(function () {
                        lists.forEach(function (l, index) {
                            var obj = objects[index];
                            if (!obj.Views)
                                return;
                            listViewCollections.push(l.get_views());
                            clientContext.load(listViewCollections[index]);
                            obj.Views.forEach(function (v) {
                                var viewExists = jQuery.grep(listViewCollections[index].get_data(), function (ev) {
                                    return ev.get_title() == v.Title;
                                }).length > 0;
                                if (viewExists) {
                                    var view = listViewCollections[index].getByTitle(v.Title);
                                    Core.Log.Information("Lists Views", String.format(Core.Resources.Lists_updating_list_view, v.Title, l.get_title()));
                                    if (v.Paged) {
                                        view.set_paged(v.Paged);
                                    }
                                    if (v.Query) {
                                        view.set_viewQuery(v.Query);
                                    }
                                    if (v.RowLimit) {
                                        view.set_rowLimit(v.RowLimit);
                                    }
                                    if (v.ViewFields && v.ViewFields.length > 0) {
                                        var columns = view.get_viewFields();
                                        columns.removeAll();
                                        v.ViewFields.forEach(function (vf) {
                                            columns.add(vf);
                                        });
                                    }
                                    if (v.Scope) {
                                        view.set_scope(v.Scope);
                                    }
                                    view.update();
                                }
                                else {
                                    Core.Log.Information("Lists Views", String.format(Core.Resources.Lists_adding_list_view, v.Title, l.get_title()));
                                    var viewCreationInformation = new SP.ViewCreationInformation();
                                    if (v.Title) {
                                        viewCreationInformation.set_title(v.Title);
                                    }
                                    if (v.PersonalView) {
                                        viewCreationInformation.set_personalView(v.PersonalView);
                                    }
                                    if (v.Paged) {
                                        viewCreationInformation.set_paged(v.Paged);
                                    }
                                    if (v.Query) {
                                        viewCreationInformation.set_query(v.Query);
                                    }
                                    if (v.RowLimit) {
                                        viewCreationInformation.set_rowLimit(v.RowLimit);
                                    }
                                    if (v.SetAsDefaultView) {
                                        viewCreationInformation.set_setAsDefaultView(v.SetAsDefaultView);
                                    }
                                    if (v.ViewFields) {
                                        viewCreationInformation.set_viewFields(v.ViewFields);
                                    }
                                    if (v.ViewTypeKind) {
                                        viewCreationInformation.set_viewTypeKind(SP.ViewType.html);
                                    }
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
                        clientContext.executeQueryAsync(def.resolve, function (sender, args) {
                            Core.Log.Error("Lists Views", args.get_message());
                            def.resolve(sender, args);
                        });
                    }, function (sender, args) {
                        Core.Log.Error("Lists Views", args.get_message());
                        def.resolve(sender, args);
                    });
                    return def.promise();
                }
                function InsertDataRows(clientContext, lists, objects) {
                    Core.Log.Information("Lists Data Rows", Core.Resources.Code_execution_started);
                    var def = jQuery.Deferred();
                    var promises = [];
                    lists.forEach(function (l, index) {
                        var obj = objects[index];
                        if (obj.DataRows) {
                            obj.DataRows.forEach(function (r, index) {
                                Core.Log.Information("Lists Data Rows", String.format(Core.Resources.Lists_inserting_data_row, (index + 1), obj.DataRows.length, l.get_title()));
                                var item = l.addItem(new SP.ListItemCreationInformation());
                                for (var key in r) {
                                    item.set_item(key, r[key]);
                                }
                                item.update();
                                clientContext.load(item);
                            });
                        }
                    });
                    clientContext.executeQueryAsync(function () {
                        Core.Log.Information("Lists Data Rows", Core.Resources.Code_execution_ended);
                        def.resolve();
                    }, function (sender, args) {
                        Core.Log.Error("Lists Data Rows", args.get_message());
                        def.resolve(sender, args);
                    });
                    return def.promise();
                }
                var Lists = (function (_super) {
                    __extends(Lists, _super);
                    function Lists() {
                        _super.call(this, "Lists");
                    }
                    Lists.prototype.ProvisionObjects = function (objects) {
                        var _this = this;
                        Core.Log.Information(this.name, Core.Resources.Code_execution_started);
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var lists = clientContext.get_web().get_lists();
                        var listInstances = [];
                        clientContext.load(lists);
                        clientContext.executeQueryAsync(function () {
                            objects.forEach(function (obj, index) {
                                var existingObj = jQuery.grep(lists.get_data(), function (list) {
                                    return list.get_title() == obj.Title;
                                })[0];
                                if (existingObj) {
                                    Core.Log.Information(_this.name, String.format(Core.Resources.Lists_list_already_exists, obj.Title, obj.Url));
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
                                }
                                else {
                                    Core.Log.Information(_this.name, String.format(Core.Resources.Lists_creating_list, obj.Title, obj.Url));
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
                            clientContext.executeQueryAsync(function () {
                                ApplyContentTypeBindings(clientContext, listInstances, objects).then(function () {
                                    ApplyListInstanceFieldRefs(clientContext, listInstances, objects).then(function () {
                                        ApplyFields(clientContext, listInstances, objects).then(function () {
                                            ApplyListSecurity(clientContext, listInstances, objects).then(function () {
                                                CreateViews(clientContext, listInstances, objects).then(function () {
                                                    InsertDataRows(clientContext, listInstances, objects).then(function () {
                                                        CreateFolders(clientContext, listInstances, objects).then(function () {
                                                            Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                                                            def.resolve();
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            }, function (sender, args) {
                                Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                                Core.Log.Error(_this.name, args.get_message());
                                def.resolve(sender, args);
                            });
                        }, function (sender, args) {
                            Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                            Core.Log.Error(_this.name, args.get_message());
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    };
                    return Lists;
                }(Core.Model.ObjectHandlerBase));
                ObjectHandlers.Lists = Lists;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var ObjectHandlers;
            (function (ObjectHandlers) {
                var Helpers;
                (function (Helpers) {
                    function GetUrlWithoutTokens(url) {
                        return url.replace("{Site}", _spPageContextInfo.webAbsoluteUrl)
                            .replace("{SiteCollection}", _spPageContextInfo.siteAbsoluteUrl)
                            .replace("{SiteCollectionRelativeUrl}", _spPageContextInfo.siteServerRelativeUrl)
                            .replace("{themegallery}", _spPageContextInfo.siteServerRelativeUrl + "/_catalogs/theme/15");
                    }
                    Helpers.GetUrlWithoutTokens = GetUrlWithoutTokens;
                })(Helpers || (Helpers = {}));
                var ComposedLook = (function (_super) {
                    __extends(ComposedLook, _super);
                    function ComposedLook() {
                        _super.call(this, "ComposedLook");
                    }
                    ComposedLook.prototype.ProvisionObjects = function (object) {
                        var _this = this;
                        Core.Log.Information(this.name, "Code execution scope started");
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var web = clientContext.get_web();
                        var colorPaletteUrl = object.ColorPaletteUrl ? Helpers.GetUrlWithoutTokens(object.ColorPaletteUrl) : "";
                        var fontSchemeUrl = object.FontSchemeUrl ? Helpers.GetUrlWithoutTokens(object.FontSchemeUrl) : "";
                        var backgroundImageUrl = object.BackgroundImageUrl ? Helpers.GetUrlWithoutTokens(object.BackgroundImageUrl) : null;
                        web.applyTheme(colorPaletteUrl, fontSchemeUrl, backgroundImageUrl, true);
                        web.update();
                        clientContext.executeQueryAsync(function () {
                            Core.Log.Information(_this.name, "Code execution scope ended");
                            def.resolve();
                        }, function (sender, args) {
                            Core.Log.Information(_this.name, "Code execution scope ended");
                            Core.Log.Information(_this.name, args.get_message());
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    };
                    return ComposedLook;
                }(Core.Model.ObjectHandlerBase));
                ObjectHandlers.ComposedLook = ComposedLook;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
"use strict";
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var ObjectHandlers;
            (function (ObjectHandlers) {
                var Helpers;
                (function (Helpers) {
                    function GetFileUrlWithoutTokens(fileUrl) {
                        return fileUrl.replace(/{resources}/g, _spPageContextInfo.siteServerRelativeUrl + "/resources")
                            .replace(/{webpartgallery}/g, _spPageContextInfo.siteServerRelativeUrl + "/_catalogs/wp");
                    }
                    Helpers.GetFileUrlWithoutTokens = GetFileUrlWithoutTokens;
                    function GetWebPartXmlWithoutTokens(xml) {
                        return xml.replace(/{site}/g, _spPageContextInfo.webServerRelativeUrl)
                            .replace(/{sitecollection}/g, _spPageContextInfo.siteServerRelativeUrl);
                    }
                    Helpers.GetWebPartXmlWithoutTokens = GetWebPartXmlWithoutTokens;
                    function GetFolderFromFilePath(filePath) {
                        var split = filePath.split("/");
                        return split.splice(0, split.length - 1).join("/");
                    }
                    Helpers.GetFolderFromFilePath = GetFolderFromFilePath;
                    function GetFilenameFromFilePath(filePath) {
                        var split = filePath.split("/");
                        return split[split.length - 1];
                    }
                    Helpers.GetFilenameFromFilePath = GetFilenameFromFilePath;
                    function LastItemInArray(array) {
                        return array[array.length - 1];
                    }
                    Helpers.LastItemInArray = LastItemInArray;
                })(Helpers || (Helpers = {}));
                function RemoveWebPartsFromFileIfSpecified(clientContext, limitedWebPartManager, shouldRemoveExisting) {
                    var def = jQuery.Deferred();
                    if (!shouldRemoveExisting) {
                        def.resolve();
                        return def.promise();
                    }
                    var existingWebParts = limitedWebPartManager.get_webParts();
                    clientContext.load(existingWebParts);
                    clientContext.executeQueryAsync(function () {
                        existingWebParts.get_data().forEach(function (wp) {
                            wp.deleteWebPart();
                        });
                        clientContext.load(existingWebParts);
                        clientContext.executeQueryAsync(def.resolve, def.resolve);
                    }, def.resolve);
                    return def.promise();
                }
                function GetWebPartXml(webParts) {
                    var def = jQuery.Deferred();
                    var promises = [];
                    webParts.forEach(function (wp, index) {
                        if (wp.Contents.FileUrl) {
                            promises.push((function () {
                                var def = jQuery.Deferred();
                                var fileUrl = Helpers.GetFileUrlWithoutTokens(wp.Contents.FileUrl);
                                jQuery.get(fileUrl, function (xml) {
                                    webParts[index].Contents.Xml = xml;
                                    def.resolve();
                                }).fail(function (sender, args) {
                                    def.resolve(sender, args);
                                });
                                return def.promise();
                            })());
                        }
                    });
                    jQuery.when.apply(jQuery, promises).done(function () {
                        def.resolve(webParts);
                    });
                    return def.promise();
                }
                function AddWebPartsToWebPartPage(dest, src, webParts, shouldRemoveExisting) {
                    var def = jQuery.Deferred();
                    var clientContext = SP.ClientContext.get_current();
                    var web = clientContext.get_web();
                    var fileUrl = Helpers.LastItemInArray(src.split("/"));
                    var fileServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + dest;
                    var file = web.getFileByServerRelativeUrl(fileServerRelativeUrl);
                    clientContext.load(file);
                    clientContext.executeQueryAsync(function () {
                        var limitedWebPartManager = file.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
                        RemoveWebPartsFromFileIfSpecified(clientContext, limitedWebPartManager, shouldRemoveExisting).then(function () {
                            GetWebPartXml(webParts).then(function (webParts) {
                                webParts.forEach(function (wp) {
                                    if (!wp.Contents.Xml)
                                        return;
                                    Core.Log.Information("Files Web Parts", String.format(Core.Resources.Files_adding_webpart, wp.Title, wp.Zone, dest));
                                    var oWebPartDefinition = limitedWebPartManager.importWebPart(Helpers.GetWebPartXmlWithoutTokens(wp.Contents.Xml));
                                    var oWebPart = oWebPartDefinition.get_webPart();
                                    limitedWebPartManager.addWebPart(oWebPart, wp.Zone, wp.Order);
                                });
                                clientContext.executeQueryAsync(def.resolve, function (sender, args) {
                                    Core.Log.Error("Files Web Parts", args.get_message());
                                    def.resolve(sender, args);
                                });
                            });
                        });
                    }, function (sender, args) {
                        Core.Log.Error("Files Web Parts", args.get_message());
                        def.resolve(sender, args);
                    });
                    return def.promise();
                }
                function ApplyFileProperties(dest, fileProperties) {
                    var def = jQuery.Deferred();
                    var clientContext = SP.ClientContext.get_current();
                    var web = clientContext.get_web();
                    var fileServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + dest;
                    var file = web.getFileByServerRelativeUrl(fileServerRelativeUrl);
                    var listItemAllFields = file.get_listItemAllFields();
                    Core.Log.Information("Files Properties", String.format(Core.Resources.Files_setting_properties, dest));
                    for (var key in fileProperties) {
                        Core.Log.Information("Files Properties", String.format(Core.Resources.Files_setting_property, key, fileProperties[key], dest));
                        listItemAllFields.set_item(key, fileProperties[key]);
                    }
                    listItemAllFields.update();
                    clientContext.executeQueryAsync(def.resolve, function (sender, args) {
                        Core.Log.Error("Files Properties", args.get_message());
                        def.resolve(sender, args);
                    });
                    return def.promise();
                }
                function GetViewFromCollectionByUrl(viewCollection, url) {
                    var serverRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + url;
                    var viewCollectionEnumerator = viewCollection.getEnumerator();
                    while (viewCollectionEnumerator.moveNext()) {
                        var view = viewCollectionEnumerator.get_current();
                        if (view.get_serverRelativeUrl().toString().toLowerCase() === serverRelativeUrl.toLowerCase()) {
                            return view;
                        }
                    }
                    return null;
                }
                function ModifyHiddenViews(objects) {
                    var def = jQuery.Deferred();
                    var clientContext = SP.ClientContext.get_current();
                    var web = clientContext.get_web();
                    var mapping = {};
                    var lists = [];
                    var listViewCollections = [];
                    objects.forEach(function (obj) {
                        if (!obj.Views)
                            return;
                        obj.Views.forEach(function (v) {
                            mapping[v.List] = mapping[v.List] || [];
                            mapping[v.List].push(jQuery.extend(v, { "Url": obj.Dest }));
                        });
                    });
                    Object.keys(mapping).forEach(function (l, index) {
                        lists.push(web.get_lists().getByTitle(l));
                        listViewCollections.push(web.get_lists().getByTitle(l).get_views());
                        clientContext.load(lists[index]);
                        clientContext.load(listViewCollections[index]);
                    });
                    clientContext.executeQueryAsync(function () {
                        Object.keys(mapping).forEach(function (l, index) {
                            Core.Log.Information("Hidden Views", String.format(Core.Resources.Files_modifying_list_views, l));
                            var views = mapping[l];
                            var list = lists[index];
                            var viewCollection = listViewCollections[index];
                            views.forEach(function (v) {
                                var view = GetViewFromCollectionByUrl(viewCollection, v.Url);
                                if (view == null)
                                    return;
                                Core.Log.Information("Hidden Views", String.format(Core.Resources.Files_modifying_list_view, v.Url, l));
                                if (v.Paged) {
                                    view.set_paged(v.Paged);
                                }
                                if (v.Query) {
                                    view.set_viewQuery(v.Query);
                                }
                                if (v.RowLimit) {
                                    view.set_rowLimit(v.RowLimit);
                                }
                                if (v.ViewFields && v.ViewFields.length > 0) {
                                    var columns = view.get_viewFields();
                                    columns.removeAll();
                                    v.ViewFields.forEach(function (vf) {
                                        columns.add(vf);
                                    });
                                }
                                view.update();
                            });
                            clientContext.load(viewCollection);
                            list.update();
                        });
                        clientContext.executeQueryAsync(def.resolve, function (sender, args) {
                            Core.Log.Error("Hidden Views", args.get_message());
                            def.resolve(sender, args);
                        });
                    }, function (sender, args) {
                        Core.Log.Error("Hidden Views", args.get_message());
                        def.resolve(sender, args);
                    });
                    return def.promise();
                }
                var Files = (function (_super) {
                    __extends(Files, _super);
                    function Files() {
                        _super.call(this, "Files");
                    }
                    Files.prototype.ProvisionObjects = function (objects) {
                        var _this = this;
                        Core.Log.Information(this.name, Core.Resources.Code_execution_started);
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var web = clientContext.get_web();
                        var fileInfos = [];
                        var promises = [];
                        objects.forEach(function (obj, index) {
                            var filename = Helpers.GetFilenameFromFilePath(obj.Dest);
                            var folder = web.getFolderByServerRelativeUrl(_spPageContextInfo.webServerRelativeUrl + "/" + Helpers.GetFolderFromFilePath(obj.Dest));
                            promises.push(jQuery.get(Helpers.GetFileUrlWithoutTokens(obj.Src), function (fileContents) {
                                var f = {};
                                jQuery.extend(f, obj, { "Filename": filename, "Folder": folder, "Contents": fileContents });
                                fileInfos.push(f);
                                Core.Log.Information(_this.name, String.format(Core.Resources.Files_retrieved_file_contents, f.Dest));
                            }));
                        });
                        jQuery.when.apply(jQuery, promises).done(function () {
                            fileInfos.forEach(function (f, index) {
                                if (f.Filename.indexOf("Form.aspx") != -1) {
                                    Core.Log.Information(_this.name, String.format(Core.Resources.Files_skipping_form_file, f.Dest));
                                    return;
                                }
                                Core.Log.Information(_this.name, String.format(Core.Resources.Files_creating_file, f.Dest));
                                var objCreationInformation = new SP.FileCreationInformation();
                                objCreationInformation.set_overwrite(f.Overwrite != undefined ? f.Overwrite : false);
                                objCreationInformation.set_url(f.Filename);
                                objCreationInformation.set_content(new SP.Base64EncodedByteArray());
                                for (var i = 0; i < f.Contents.length; i++) {
                                    objCreationInformation.get_content().append(f.Contents.charCodeAt(i));
                                }
                                clientContext.load(f.Folder.get_files().add(objCreationInformation));
                            });
                            clientContext.executeQueryAsync(function () {
                                var promises = [];
                                objects.forEach(function (obj) {
                                    if (obj.Properties && Object.keys(obj.Properties).length > 0) {
                                        promises.push(ApplyFileProperties(obj.Dest, obj.Properties));
                                    }
                                    if (obj.WebParts && obj.WebParts.length > 0) {
                                        promises.push(AddWebPartsToWebPartPage(obj.Dest, obj.Src, obj.WebParts, obj.RemoveExistingWebParts));
                                    }
                                });
                                jQuery.when.apply(jQuery, promises).done(function () {
                                    ModifyHiddenViews(objects).then(function () {
                                        Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                                        def.resolve();
                                    });
                                });
                            }, function (sender, args) {
                                Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                                Core.Log.Error(_this.name, args.get_message());
                                def.resolve(sender, args);
                            });
                        });
                        return def.promise();
                    };
                    return Files;
                }(Core.Model.ObjectHandlerBase));
                ObjectHandlers.Files = Files;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var ObjectHandlers;
            (function (ObjectHandlers) {
                var Helpers;
                (function (Helpers) {
                    function GetWebPartXmlWithoutTokens(xml) {
                        return xml.replace(/{site}/g, _spPageContextInfo.webServerRelativeUrl)
                            .replace(/{sitecollection}/g, _spPageContextInfo.siteServerRelativeUrl);
                    }
                    Helpers.GetWebPartXmlWithoutTokens = GetWebPartXmlWithoutTokens;
                    function GetFolderFromFilePath(filePath) {
                        var split = filePath.split("/");
                        return split.splice(0, split.length - 1);
                    }
                    Helpers.GetFolderFromFilePath = GetFolderFromFilePath;
                })(Helpers || (Helpers = {}));
                function AddWikiPageByUrl(pageUrl) {
                    var def = jQuery.Deferred();
                    Core.Log.Information("Pages", String.format(Core.Resources.Pages_creating_page, pageUrl));
                    var clientContext = SP.ClientContext.get_current();
                    var web = clientContext.get_web();
                    var fileServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + pageUrl;
                    var folderServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + Helpers.GetFolderFromFilePath(pageUrl);
                    var folder = web.getFolderByServerRelativeUrl(folderServerRelativeUrl);
                    clientContext.load(folder.get_files().addTemplateFile(fileServerRelativeUrl, SP.TemplateFileType.wikiPage));
                    clientContext.executeQueryAsync(def.resolve, function (sender, args) {
                        Core.Log.Information("Pages", String.format(Core.Resources.Pages_creating_page_failed, pageUrl));
                        Core.Log.Error("Pages", "" + args.get_message());
                        def.resolve(sender, args);
                    });
                    return def.promise();
                }
                ObjectHandlers.AddWikiPageByUrl = AddWikiPageByUrl;
                var Pages = (function (_super) {
                    __extends(Pages, _super);
                    function Pages() {
                        _super.call(this, "Pages");
                    }
                    Pages.prototype.ProvisionObjects = function (objects) {
                        var _this = this;
                        Core.Log.Information(this.name, Core.Resources.Code_execution_started);
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var promises = [];
                        objects.forEach(function (obj) {
                            AddWikiPageByUrl(obj.Url);
                        });
                        jQuery.when.apply(jQuery, promises).done(function () {
                            Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                            def.resolve();
                        });
                        return def.promise();
                    };
                    return Pages;
                }(Core.Model.ObjectHandlerBase));
                ObjectHandlers.Pages = Pages;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
"use strict";
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var ObjectHandlers;
            (function (ObjectHandlers) {
                var CustomActions = (function (_super) {
                    __extends(CustomActions, _super);
                    function CustomActions() {
                        _super.call(this, "CustomActions");
                    }
                    CustomActions.prototype.ProvisionObjects = function (objects) {
                        var _this = this;
                        var def = jQuery.Deferred();
                        Core.Log.Information(this.name, Core.Resources.Code_execution_started);
                        var clientContext = SP.ClientContext.get_current();
                        var userCustomActions = clientContext.get_web().get_userCustomActions();
                        clientContext.load(userCustomActions);
                        clientContext.executeQueryAsync(function () {
                            objects.forEach(function (obj) {
                                var objExists = jQuery.grep(userCustomActions.get_data(), function (userCustomAction) {
                                    return userCustomAction.get_title() == obj.Title;
                                }).length > 0;
                                if (objExists) {
                                    Core.Log.Information(_this.name, String.format(Core.Resources.CustomAction_already_exists, obj.Title));
                                }
                                else {
                                    Core.Log.Information(_this.name, String.format(Core.Resources.CustomAction_creating, obj.Title));
                                    var objCreationInformation = userCustomActions.add();
                                    if (obj.Description) {
                                        objCreationInformation.set_description(obj.Description);
                                    }
                                    if (obj.CommandUIExtension) {
                                        objCreationInformation.set_commandUIExtension(obj.CommandUIExtension);
                                    }
                                    if (obj.Group) {
                                        objCreationInformation.set_group(obj.Group);
                                    }
                                    if (obj.Title) {
                                        objCreationInformation.set_title(obj.Title);
                                    }
                                    if (obj.Url) {
                                        objCreationInformation.set_url(obj.Url);
                                    }
                                    if (obj.ScriptBlock) {
                                        objCreationInformation.set_scriptBlock(obj.ScriptBlock);
                                    }
                                    if (obj.ScriptSrc) {
                                        objCreationInformation.set_scriptSrc(obj.ScriptSrc);
                                    }
                                    if (obj.Location) {
                                        objCreationInformation.set_location(obj.Location);
                                    }
                                    if (obj.ImageUrl) {
                                        objCreationInformation.set_imageUrl(obj.ImageUrl);
                                    }
                                    if (obj.Name) {
                                        objCreationInformation.set_name(obj.Name);
                                    }
                                    if (obj.RegistrationId) {
                                        objCreationInformation.set_registrationId(obj.RegistrationId);
                                    }
                                    if (obj.RegistrationType) {
                                        objCreationInformation.set_registrationType(obj.RegistrationType);
                                    }
                                    if (obj.Rights) {
                                        objCreationInformation.set_rights(obj.Rights);
                                    }
                                    if (obj.Sequence) {
                                        objCreationInformation.set_sequence(obj.Sequence);
                                    }
                                    objCreationInformation.update();
                                }
                            });
                            clientContext.executeQueryAsync(function () {
                                Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                                def.resolve();
                            }, function (sender, args) {
                                Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                                Core.Log.Error(_this.name, args.get_message());
                                def.resolve(sender, args);
                            });
                        }, function (sender, args) {
                            Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                            Core.Log.Error(_this.name, args.get_message());
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    };
                    return CustomActions;
                }(Core.Model.ObjectHandlerBase));
                ObjectHandlers.CustomActions = CustomActions;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var ObjectHandlers;
            (function (ObjectHandlers) {
                function EncodePropertyKey(propKey) {
                    var bytes = [];
                    for (var i = 0; i < propKey.length; ++i) {
                        bytes.push(propKey.charCodeAt(i));
                        bytes.push(0);
                    }
                    var b64encoded = window.btoa(String.fromCharCode.apply(null, bytes));
                    return b64encoded;
                }
                var PropertyBagEntries = (function (_super) {
                    __extends(PropertyBagEntries, _super);
                    function PropertyBagEntries() {
                        _super.call(this, "PropertyBagEntries");
                    }
                    PropertyBagEntries.prototype.ProvisionObjects = function (objects) {
                        var _this = this;
                        Core.Log.Information(this.name, Core.Resources.Code_execution_started);
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var web = clientContext.get_web();
                        var allProperties = web.get_allProperties();
                        var indexedProperties = [];
                        objects.forEach(function (o) {
                            Core.Log.Information(_this.name, String.format(Core.Resources.PropertyBagEntries_setting_property, o.Key, o.Value));
                            allProperties.set_item(o.Key, o.Value);
                            if (o.Indexed) {
                                Core.Log.Information(_this.name, String.format(Core.Resources.PropertyBagEntries_setting_indexed_property, o.Key));
                                indexedProperties.push(EncodePropertyKey(o.Key));
                            }
                        });
                        web.update();
                        clientContext.load(allProperties);
                        clientContext.executeQueryAsync(function () {
                            if (indexedProperties.length > 0) {
                                allProperties.set_item("vti_indexedpropertykeys", indexedProperties.join("|"));
                                web.update();
                                clientContext.executeQueryAsync(def.resolve, def.resolve);
                            }
                            else {
                                Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                                def.resolve();
                            }
                        }, function (sender, args) {
                            Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    };
                    return PropertyBagEntries;
                }(Core.Model.ObjectHandlerBase));
                ObjectHandlers.PropertyBagEntries = PropertyBagEntries;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
"use strict";
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var ObjectHandlers;
            (function (ObjectHandlers) {
                var WebSettings = (function (_super) {
                    __extends(WebSettings, _super);
                    function WebSettings() {
                        _super.call(this, "WebSettings");
                    }
                    WebSettings.prototype.ProvisionObjects = function (object) {
                        var _this = this;
                        Core.Log.Information(this.name, Core.Resources.Code_execution_started);
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var web = clientContext.get_web();
                        if (object.WelcomePage) {
                            Core.Log.Information(this.name, String.format(Core.Resources.WebSettings_setting_welcomePage, object.WelcomePage));
                            web.get_rootFolder().set_welcomePage(object.WelcomePage);
                            web.get_rootFolder().update();
                        }
                        if (object.AlternateCssUrl) {
                            Core.Log.Information(this.name, String.format(Core.Resources.WebSettings_setting_alternateCssUrl, object.AlternateCssUrl));
                            web['set_alternateCssUrl'](object.AlternateCssUrl);
                        }
                        if (object.MasterUrl) {
                            Core.Log.Information(this.name, String.format(Core.Resources.WebSettings_setting_masterUrl, object.MasterUrl));
                            web.set_masterUrl(object.MasterUrl);
                        }
                        if (object.CustomMasterUrl) {
                            Core.Log.Information(this.name, String.format(Core.Resources.WebSettings_setting_customMasterUrl, object.CustomMasterUrl));
                            web.set_customMasterUrl(object.CustomMasterUrl);
                        }
                        if (object.SaveSiteAsTemplateEnabled != undefined) {
                            Core.Log.Information(this.name, String.format(Core.Resources.WebSettings_setting_saveSiteAsTemplateEnabled, object.SaveSiteAsTemplateEnabled));
                            web.set_saveSiteAsTemplateEnabled(object.SaveSiteAsTemplateEnabled);
                        }
                        if (object.QuickLaunchEnabled != undefined) {
                            Core.Log.Information(this.name, String.format(Core.Resources.WebSettings_setting_quickLaunchEnabled, object.QuickLaunchEnabled));
                            web.set_saveSiteAsTemplateEnabled(object.QuickLaunchEnabled);
                        }
                        if (object.RecycleBinEnabled != undefined) {
                            Core.Log.Information(this.name, String.format(Core.Resources.WebSettings_setting_recycleBinEnabled, object.RecycleBinEnabled));
                            web['set_recycleBinEnabled'](object.RecycleBinEnabled);
                        }
                        if (object.TreeViewEnabled != undefined) {
                            Core.Log.Information(this.name, String.format(Core.Resources.WebSettings_setting_treeViewEnabled, object.TreeViewEnabled));
                            web.set_treeViewEnabled(object.TreeViewEnabled);
                        }
                        web.update();
                        clientContext.load(web);
                        clientContext.executeQueryAsync(function () {
                            Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                            def.resolve();
                        }, function (sender, args) {
                            Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    };
                    return WebSettings;
                }(Core.Model.ObjectHandlerBase));
                ObjectHandlers.WebSettings = WebSettings;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var ObjectHandlers;
            (function (ObjectHandlers) {
                var Security = (function (_super) {
                    __extends(Security, _super);
                    function Security() {
                        _super.call(this, "Security");
                    }
                    Security.prototype.ProvisionObjects = function (object) {
                        var _this = this;
                        Core.Log.Information(this.name, Core.Resources.Code_execution_started);
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var web = clientContext.get_web();
                        if (object.BreakRoleInheritance) {
                            web.breakRoleInheritance(object.CopyRoleAssignments, object.ClearSubscopes);
                            web.update();
                        }
                        var rootSiteProperties = clientContext.get_site().get_rootWeb().get_allProperties();
                        var rootSiteGroups = clientContext.get_site().get_rootWeb().get_siteGroups();
                        var rootSiteRoleDefinitions = clientContext.get_site().get_rootWeb().get_roleDefinitions();
                        clientContext.load(rootSiteProperties);
                        clientContext.load(rootSiteGroups);
                        clientContext.load(rootSiteRoleDefinitions);
                        clientContext.executeQueryAsync(function () {
                            if (!object.RoleAssignments || object.RoleAssignments.length == 0) {
                                Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                                def.resolve();
                            }
                            object.RoleAssignments.forEach(function (ra) {
                                var roleDef = null;
                                if (typeof ra.RoleDefinition == "number") {
                                    roleDef = rootSiteRoleDefinitions.getById(ra.RoleDefinition);
                                }
                                else {
                                    roleDef = rootSiteRoleDefinitions.getByName(ra.RoleDefinition);
                                }
                                var roleBindings = SP.RoleDefinitionBindingCollection.newObject(clientContext);
                                roleBindings.add(roleDef);
                                var principal = null;
                                if (ra.Principal.match(/\{[A-Za-z]*\}+/g)) {
                                    var token = ra.Principal.substring(1, ra.Principal.length - 1);
                                    var groupId = rootSiteProperties.get_fieldValues()[("vti_" + token)];
                                    principal = rootSiteGroups.getById(groupId);
                                }
                                else {
                                    principal = rootSiteGroups.getByName(principal);
                                }
                                web.get_roleAssignments().add(principal, roleBindings);
                            });
                            web.update();
                            clientContext.executeQueryAsync(function () {
                                Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                                def.resolve();
                            }, function (sender, args) {
                                Core.Log.Error(_this.name, "" + args.get_message());
                                Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                                def.resolve(sender, args);
                            });
                        }, function (sender, args) {
                            Core.Log.Error(_this.name, "" + args.get_message());
                            Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    };
                    return Security;
                }(Core.Model.ObjectHandlerBase));
                ObjectHandlers.Security = Security;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var ObjectHandlers;
            (function (ObjectHandlers) {
                var Helpers;
                (function (Helpers) {
                    function GetUrlWithoutTokens(url) {
                        return url.replace("{Site}", _spPageContextInfo.webAbsoluteUrl)
                            .replace("{SiteRelativeUrl}", _spPageContextInfo.webServerRelativeUrl)
                            .replace("{SiteUrl}", _spPageContextInfo.webAbsoluteUrl)
                            .replace("{SiteUrlEncoded}", encodeURIComponent(_spPageContextInfo.webAbsoluteUrl))
                            .replace("{SiteCollection}", _spPageContextInfo.siteAbsoluteUrl)
                            .replace("{SiteCollectionRelativeUrl}", _spPageContextInfo.siteServerRelativeUrl)
                            .replace("{SiteCollectionEncoded}", encodeURIComponent(_spPageContextInfo.siteAbsoluteUrl))
                            .replace("{WebApp}", window.location.protocol + "//" + window.location.host);
                    }
                    Helpers.GetUrlWithoutTokens = GetUrlWithoutTokens;
                    function GetNodeFromQuickLaunchByTitle(nodeCollection, title) {
                        var f = jQuery.grep(nodeCollection, function (val) {
                            return val.get_title() === title;
                        });
                        return f[0] || null;
                    }
                    Helpers.GetNodeFromQuickLaunchByTitle = GetNodeFromQuickLaunchByTitle;
                })(Helpers || (Helpers = {}));
                function ConfigureQuickLaunch(objects, clientContext, navigation) {
                    Core.Log.Information("QuickLaunch", Core.Resources.Navigation_configuring_quicklaunch_navigation);
                    var def = jQuery.Deferred();
                    if (objects.length == 0) {
                        def.resolve();
                    }
                    else {
                        var quickLaunchNodeCollection = navigation.get_quickLaunch();
                        clientContext.load(quickLaunchNodeCollection);
                        clientContext.executeQueryAsync(function () {
                            Core.Log.Information("QuickLaunch", Core.Resources.Navigation_removing_existing_nodes);
                            var temporaryQuickLaunch = [];
                            var index = quickLaunchNodeCollection.get_count() - 1;
                            while (index >= 0) {
                                var oldNode = quickLaunchNodeCollection.itemAt(index);
                                temporaryQuickLaunch.push(oldNode);
                                oldNode.deleteObject();
                                index--;
                            }
                            clientContext.executeQueryAsync(function () {
                                objects.forEach(function (obj) {
                                    Core.Log.Information("QuickLaunch", String.format(Core.Resources.Navigation_adding_node, obj.Url, obj.Title));
                                    var existingNode = Helpers.GetNodeFromQuickLaunchByTitle(temporaryQuickLaunch, obj.Title);
                                    var newNode = new SP.NavigationNodeCreationInformation();
                                    newNode.set_title(obj.Title);
                                    newNode.set_url(existingNode ? existingNode.get_url() : Helpers.GetUrlWithoutTokens(obj.Url));
                                    newNode.set_asLastNode(true);
                                    quickLaunchNodeCollection.add(newNode);
                                });
                                clientContext.executeQueryAsync(function () {
                                    jQuery.ajax({
                                        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/Navigation/QuickLaunch",
                                        type: 'get',
                                        headers: {
                                            "accept": "application/json;odata=verbose"
                                        }
                                    }).done(function (data) {
                                        data = data.d.results;
                                        data.forEach(function (n) {
                                            var node = navigation.getNodeById(n.Id);
                                            var childrenNodeCollection = node.get_children();
                                            var parentNode = jQuery.grep(objects, function (value) { return value.Title === n.Title; })[0];
                                            if (parentNode && parentNode.Children) {
                                                parentNode.Children.forEach(function (c) {
                                                    var existingNode = Helpers.GetNodeFromQuickLaunchByTitle(temporaryQuickLaunch, c.Title);
                                                    var newNode = new SP.NavigationNodeCreationInformation();
                                                    newNode.set_title(c.Title);
                                                    newNode.set_url(existingNode ? existingNode.get_url() : Helpers.GetUrlWithoutTokens(c.Url));
                                                    newNode.set_asLastNode(true);
                                                    childrenNodeCollection.add(newNode);
                                                    Core.Log.Information("QuickLaunch", String.format(Core.Resources.Navigation_adding_children_node, c.Url, c.Title, n.Title));
                                                });
                                            }
                                        });
                                        clientContext.executeQueryAsync(function () {
                                            Core.Log.Information("QuickLaunch", Core.Resources.Navigation_configuring_of_quicklaunch_done);
                                            def.resolve();
                                        }, function (sender, args) {
                                            Core.Log.Information("QuickLaunch", Core.Resources.Navigation_configuring_of_quicklaunch_failed);
                                            Core.Log.Error("QuickLaunch", "" + args.get_message());
                                            def.resolve(sender, args);
                                        });
                                    });
                                }, function (sender, args) {
                                    Core.Log.Information("QuickLaunch", Core.Resources.Navigation_configuring_of_quicklaunch_failed);
                                    Core.Log.Error("QuickLaunch", "" + args.get_message());
                                    def.resolve(sender, args);
                                });
                            });
                        });
                    }
                    return def.promise();
                }
                var Navigation = (function (_super) {
                    __extends(Navigation, _super);
                    function Navigation() {
                        _super.call(this, "Navigation");
                    }
                    Navigation.prototype.ProvisionObjects = function (object) {
                        var _this = this;
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var web = clientContext.get_web();
                        Core.Log.Information(this.name, Core.Resources.Code_execution_started);
                        var navigation = web.get_navigation();
                        if (object.UseShared != undefined) {
                            Core.Log.Information(this.name, String.format(Core.Resources.Navigation_setting_shared, object.UseShared));
                            navigation.set_useShared(object.UseShared);
                        }
                        clientContext.executeQueryAsync(function () {
                            if (!object.QuickLaunch || object.QuickLaunch.length == 0) {
                                Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                                def.resolve();
                                return def.promise();
                            }
                            ConfigureQuickLaunch(object.QuickLaunch, clientContext, navigation).then(function () {
                                Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                                def.resolve();
                            });
                        }, function (sender, args) {
                            Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                            Core.Log.Error(_this.name, "Error: " + args.get_message());
                            def.resolve();
                        });
                        return def.promise();
                    };
                    return Navigation;
                }(Core.Model.ObjectHandlerBase));
                ObjectHandlers.Navigation = Navigation;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var Logger = (function () {
                function Logger(loggingOptions) {
                    this.array = [];
                    this.loggingOptions = loggingOptions;
                }
                Logger.prototype.loggerEnabled = function () {
                    return (console && console.log);
                };
                Logger.prototype.Information = function (objectHandler, msg) {
                    if (!this.loggingOptions)
                        return;
                    var logMsg = new Date() + " || Information || " + objectHandler + " || " + msg;
                    if (this.loggerEnabled && this.loggingOptions.On) {
                        console.log(logMsg);
                    }
                    this.array.push(logMsg);
                };
                Logger.prototype.Error = function (objectHandler, msg) {
                    if (!this.loggingOptions)
                        return;
                    var logMsg = new Date() + " || Error || " + objectHandler + " || " + msg;
                    if (this.loggerEnabled && this.loggingOptions.On) {
                        console.log(logMsg);
                    }
                    this.array.push(logMsg);
                };
                Logger.prototype.SaveToFile = function () {
                    var def = jQuery.Deferred();
                    if (!this.loggingOptions || !this.loggingOptions.LoggingFolder) {
                        def.resolve();
                        return def.promise();
                    }
                    var clientContext = SP.ClientContext.get_current();
                    var web = clientContext.get_site().get_rootWeb();
                    var fileName = new Date().getTime() + ".txt";
                    var fileCreateInfo = new SP.FileCreationInformation();
                    fileCreateInfo.set_url(fileName);
                    fileCreateInfo.set_content(new SP.Base64EncodedByteArray());
                    var fileContent = this.array.join("\n");
                    for (var i = 0; i < fileContent.length; i++) {
                        fileCreateInfo.get_content().append(fileContent.charCodeAt(i));
                    }
                    clientContext.load(web.getFolderByServerRelativeUrl(this.loggingOptions.LoggingFolder).get_files().add(fileCreateInfo));
                    clientContext.executeQueryAsync(function () {
                        def.resolve();
                    }, function (sender, args) {
                        def.resolve(sender, args);
                    });
                    return def.promise();
                };
                return Logger;
            }());
            Core.Logger = Logger;
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var Model;
            (function (Model) {
                var TemplateQueueItem = (function () {
                    function TemplateQueueItem(name, index, objects, parameters, callback) {
                        this.name = name;
                        this.index = index;
                        this.objects = objects;
                        this.parameters = parameters;
                        this.callback = callback;
                    }
                    TemplateQueueItem.prototype.execute = function (dependentPromise) {
                        var _this = this;
                        if (!dependentPromise) {
                            return this.callback(this.objects, this.parameters);
                        }
                        var def = jQuery.Deferred();
                        dependentPromise.done(function () {
                            Core.UpdateProgress(_this.index, _this.name);
                            return _this.callback(_this.objects, _this.parameters).done(function () {
                                def.resolve();
                            });
                        });
                        return def.promise();
                    };
                    return TemplateQueueItem;
                }());
                Model.TemplateQueueItem = TemplateQueueItem;
            })(Model = Core.Model || (Core.Model = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var options;
            var startTime = null;
            var queueItems;
            var setupWebDialog;
            function ShowWaitMessage(options) {
                var size = {
                    width: 600,
                    height: 130
                };
                var header = Core.Resources.WaitMessage_header;
                var content = Core.Resources.WaitMessage_content;
                if (options) {
                    options.Header && (header = options.Header);
                    options.Content && (content = options.Content);
                    if (options.ShowProgress === true) {
                        content = "";
                        content += "<style type=\"text/css\">.progress{overflow:hidden;height:20px;margin-bottom:20px;background-color:#f5f5f5;border-radius:4px;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.1);box-shadow:inset 0 1px 2px rgba(0,0,0,.1)}.progress-bar{float:left;width:0;height:100%;font-size:12px;line-height:20px;color:#fff;text-align:center;background-color:#337ab7;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);-webkit-transition:width .6s ease;-o-transition:width .6s ease;transition:width .6s ease}</style>";
                        content += "<div id=\"" + Core.Resources.Provisioning_progressbar_id + "\" class=\"progress\">\n                                " + String.format(Core.Resources.Provisioning_progressbar_markup, "0") + "\n                            </div>\n                            <div id=\"" + Core.Resources.Provisioning_progressbar_text_id + "\"></div>\n                            ";
                        size.width = 700;
                        size.height = 160;
                    }
                }
                setupWebDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose(header, content, size.height, size.width);
            }
            function getSetupQueue(json) {
                return Object.keys(json);
            }
            function start(json, queue) {
                var def = jQuery.Deferred();
                startTime = new Date().getTime();
                Core.Log.Information("Provisioning", String.format(Core.Resources.Code_execution_started, _spPageContextInfo.webServerRelativeUrl));
                queueItems = [];
                queue.forEach(function (q, index) {
                    if (!Core.ObjectHandlers[q])
                        return;
                    queueItems.push(new Core.Model.TemplateQueueItem(q, index, json[q], json["Parameters"], new Core.ObjectHandlers[q]().ProvisionObjects));
                });
                var promises = [];
                promises.push(jQuery.Deferred());
                promises[0].resolve();
                promises[0].promise();
                var index = 1;
                while (queueItems[index - 1] != undefined) {
                    var i = promises.length - 1;
                    promises.push(queueItems[index - 1].execute(promises[i]));
                    index++;
                }
                ;
                jQuery.when.apply(jQuery, promises).done(def.resolve);
                return def.promise();
            }
            function UpdateProgress(index, name) {
                if (!options.WaitMessage)
                    return;
                if (!options.WaitMessage.ShowProgress === true)
                    return;
                var progress = Math.floor(((index) / queueItems.length) * 100);
                var text = options.WaitMessage.ProgressOverrides ? (options.WaitMessage.ProgressOverrides[name] || name) : name;
                document.getElementById(Core.Resources.Provisioning_progressbar_id).innerHTML = String.format(Core.Resources.Provisioning_progressbar_markup, progress);
                document.getElementById(Core.Resources.Provisioning_progressbar_text_id).innerHTML = text;
            }
            Core.UpdateProgress = UpdateProgress;
            function init(template, _options) {
                var def = jQuery.Deferred();
                options = _options || {};
                ShowWaitMessage(options.WaitMessage);
                Core.Log = new Core.Logger(options.Logging);
                var queue = getSetupQueue(template);
                start(template, queue).then(function () {
                    var elapsedTime = ((new Date().getTime()) - startTime) / 1000;
                    Core.Log.Information("Provisioning", String.format(Core.Resources.Code_execution_ended, elapsedTime));
                    Core.Log.SaveToFile().then(function () {
                        setupWebDialog.close(null);
                        def.resolve();
                    });
                });
                return def.promise();
            }
            Core.init = init;
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
