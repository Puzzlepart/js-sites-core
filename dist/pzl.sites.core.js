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
                })();
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
                Resources.Provisioning_started = "Starting at URL {0}";
                Resources.Provisioning_ended = "Done in {0} seconds";
                Resources.WaitMessage_header = "Applying template";
                Resources.WaitMessage_content = "This might take a moment.";
                Resources.Code_execution_started = "Code execution scope started";
                Resources.Code_execution_ended = "Code execution scope ended";
                Resources.Lists_list_already_exists = "A list with the specified title {0} already exists in this Web site at Url {1}";
                Resources.Lists_creating_list = "Creating list with title {0} at Url {1}";
                Resources.Lists_creating_folder = "Creating folder {0}";
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
            })(Resources = Core.Resources || (Core.Resources = {}));
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
                    var receiverName = "LocationBasedMetadataDefaultsReceiver ItemAdded";
                    var def = jQuery.Deferred();
                    var eventReceivers = list.get_eventReceivers();
                    Core.Log.Information("Lists Event Receivers", String.format(Core.Resources.Lists_adding_eventreceiver, receiverName, list.get_title()));
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
                function CreateFolders(clientContext, list, listUrl, folders) {
                    var def = jQuery.Deferred();
                    var listRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + listUrl;
                    var rootFolder = clientContext.get_web().getFolderByServerRelativeUrl(listRelativeUrl);
                    var metadataDefaults = "<MetadataDefaults>";
                    var setMetadataDefaults = false;
                    folders.forEach(function (f) {
                        var folderUrl = listRelativeUrl + "/" + f.Name;
                        Core.Log.Information("Lists Folders", String.format(Core.Resources.Lists_creating_folder, folderUrl));
                        rootFolder.get_folders().add(folderUrl);
                        if (f.DefaultValues) {
                            Core.Log.Information("Lists Folders", String.format(Core.Resources.Lists_setting_default_metadata, folderUrl));
                            var keys = Object.keys(f.DefaultValues).length;
                            if (keys > 0) {
                                metadataDefaults += "<a href='" + listRelativeUrl + "/" + f.Name + "'>";
                                Object.keys(f.DefaultValues).forEach(function (key) { metadataDefaults += "<DefaultValue FieldName=\"" + key + "\">" + f.DefaultValues[key] + "</DefaultValue>"; });
                                metadataDefaults += "</a>";
                            }
                            setMetadataDefaults = true;
                        }
                    });
                    metadataDefaults += "</MetadataDefaults>";
                    if (setMetadataDefaults) {
                        var metadataDefaultsFileCreateInfo = new SP.FileCreationInformation();
                        metadataDefaultsFileCreateInfo.set_url(listRelativeUrl + "/Forms/client_LocationBasedDefaults.html");
                        metadataDefaultsFileCreateInfo.set_content(new SP.Base64EncodedByteArray());
                        metadataDefaultsFileCreateInfo.set_overwrite(true);
                        for (var i = 0; i < metadataDefaults.length; i++) {
                            metadataDefaultsFileCreateInfo.get_content().append(metadataDefaults.charCodeAt(i));
                        }
                        rootFolder.get_files().add(metadataDefaultsFileCreateInfo);
                        EnsureLocationBasedMetadataDefaultsReceiver(clientContext, list).then(function () {
                            clientContext.executeQueryAsync(def.resolve, def.resolve);
                        });
                    }
                    else {
                        clientContext.executeQueryAsync(def.resolve, def.resolve);
                    }
                    return def.promise();
                }
                function ApplyContentTypeBindings(clientContext, lists, objects) {
                    var def = jQuery.Deferred();
                    var webCts = clientContext.get_site().get_rootWeb().get_contentTypes();
                    var listCts = [];
                    lists.forEach(function (l, index) {
                        listCts.push(l.get_contentTypes());
                        clientContext.load(listCts[index]);
                        if (objects[index].ContentTypeBindings) {
                            Core.Log.Information("Lists Content Types", String.format(Core.Resources.Lists_enabled_content_types, l.get_title()));
                            l.set_contentTypesEnabled(true);
                            l.update();
                        }
                    });
                    clientContext.load(webCts);
                    clientContext.executeQueryAsync(function () {
                        lists.forEach(function (l, index) {
                            var obj = objects[index];
                            if (!obj.ContentTypeBindings)
                                return;
                            var listContentTypes = listCts[index];
                            if (obj.RemoveExistingContentTypes) {
                                listContentTypes.get_data().forEach(function (ct) {
                                    Core.Log.Information("Lists Content Types", String.format(Core.Resources.Lists_removing_content_type, ct.get_stringId(), l.get_title()));
                                    ct.deleteObject();
                                });
                            }
                            obj.ContentTypeBindings.forEach(function (ctb) {
                                Core.Log.Information("Lists Content Types", String.format(Core.Resources.Lists_adding_content_type, ctb.ContentTypeId, l.get_title()));
                                listContentTypes.addExistingContentType(webCts.getById(ctb.ContentTypeId));
                            });
                            l.update();
                        });
                        clientContext.executeQueryAsync(def.resolve, function (sender, args) {
                            Core.Log.Error("Lists Content Types", "Error: " + args.get_message());
                            def.resolve(sender, args);
                        });
                    }, function (sender, args) {
                        Core.Log.Error("Lists Content Types", "Error: " + args.get_message());
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
                        Core.Log.Error("Lists Field Refs", "Error: " + args.get_message());
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
                function GetViewFromCollectionByUrl(viewCollection, url) {
                    var view = jQuery.grep(viewCollection.get_data(), function (v) {
                        return v.get_serverRelativeUrl() == _spPageContextInfo.siteServerRelativeUrl + "/" + url;
                    });
                    return view ? view[0] : null;
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
                            Core.Log.Error("Lists Views", "Error: " + args.get_message());
                            def.resolve(sender, args);
                        });
                    }, function (sender, args) {
                        Core.Log.Error("Lists Views", "Error: " + args.get_message());
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
                                    listInstances.push(existingObj);
                                    clientContext.load(listInstances[index]);
                                }
                                else {
                                    Core.Log.Information(_this.name, String.format(Core.Resources.Lists_creating_list, obj.Title, obj.Url));
                                    var objCreationInformation = new SP.ListCreationInformation();
                                    if (obj.Description) {
                                        objCreationInformation.set_description(obj.Description);
                                    }
                                    if (obj.OnQuickLaunch != undefined) {
                                        objCreationInformation.set_quickLaunchOption(obj.OnQuickLaunch ? SP.QuickLaunchOptions.on : SP.QuickLaunchOptions.off);
                                    }
                                    if (obj.TemplateType) {
                                        objCreationInformation.set_templateType(obj.TemplateType);
                                    }
                                    if (obj.Title) {
                                        objCreationInformation.set_title(obj.Title);
                                    }
                                    if (obj.Url) {
                                        objCreationInformation.set_url(obj.Url);
                                    }
                                    listInstances.push(lists.add(objCreationInformation));
                                    clientContext.load(listInstances[index]);
                                }
                            });
                            if (!clientContext.get_hasPendingRequest()) {
                                Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                                def.resolve();
                                return def.promise();
                            }
                            clientContext.executeQueryAsync(function () {
                                ApplyContentTypeBindings(clientContext, listInstances, objects).then(function () {
                                    ApplyListInstanceFieldRefs(clientContext, listInstances, objects).then(function () {
                                        ApplyListSecurity(clientContext, listInstances, objects).then(function () {
                                            CreateViews(clientContext, listInstances, objects).then(function () {
                                                var promises = [];
                                                objects.forEach(function (obj, index) {
                                                    if (obj.Folders && obj.Folders.length > 0) {
                                                        promises.push(CreateFolders(clientContext, listInstances[index], obj.Url, obj.Folders));
                                                    }
                                                });
                                                jQuery.when.apply(jQuery, promises).done(function () {
                                                    clientContext.executeQueryAsync(function () {
                                                        Core.Log.Information(_this.name, Core.Resources.Code_execution_ended);
                                                        def.resolve();
                                                    }, function (sender, args) {
                                                        Core.Log.Error(_this.name, "Error: " + args.get_message());
                                                        def.resolve(sender, args);
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            }, function (sender, args) {
                                Core.Log.Error(_this.name, "Error: " + args.get_message());
                                def.resolve(sender, args);
                            });
                        }, function (sender, args) {
                            Core.Log.Error(_this.name, "Error: " + args.get_message());
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    };
                    return Lists;
                })(Core.Model.ObjectHandlerBase);
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
                })(Core.Model.ObjectHandlerBase);
                ObjectHandlers.ComposedLook = ComposedLook;
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
                function AddFileByUrl(dest, src, overwrite) {
                    var def = jQuery.Deferred();
                    Core.Log.Information("Files", "Creating file with Url '" + dest + "'");
                    var clientContext = SP.ClientContext.get_current();
                    var web = clientContext.get_web();
                    var sourceFile = Helpers.GetFileUrlWithoutTokens(src);
                    var destFolder = Helpers.GetFolderFromFilePath(dest);
                    var destFileName = Helpers.GetFilenameFromFilePath(dest);
                    var folderServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + destFolder;
                    var folder = web.getFolderByServerRelativeUrl(folderServerRelativeUrl);
                    jQuery.get(sourceFile, function (fileContent) {
                        var objCreationInformation = new SP.FileCreationInformation();
                        objCreationInformation.set_overwrite(overwrite);
                        objCreationInformation.set_url(destFileName);
                        objCreationInformation.set_content(new SP.Base64EncodedByteArray());
                        for (var i = 0; i < fileContent.length; i++) {
                            objCreationInformation.get_content().append(fileContent.charCodeAt(i));
                        }
                        clientContext.load(folder.get_files().add(objCreationInformation));
                        clientContext.executeQueryAsync(function () {
                            def.resolve();
                        }, function (sender, args) {
                            Core.Log.Information("Files", "Failed to create file with Url '" + dest + "'");
                            Core.Log.Error("Files", "" + args.get_message());
                            def.resolve(sender, args);
                        });
                    });
                    return def.promise();
                }
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
                        clientContext.executeQueryAsync(function () {
                            def.resolve();
                        }, function () {
                            def.resolve();
                        });
                    }, function () {
                        def.resolve();
                    });
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
                                    Core.Log.Information("Files Web Parts", "Adding web part '" + wp.Title + "' to zone '" + wp.Zone + "' for file with URL '" + dest + "'");
                                    var oWebPartDefinition = limitedWebPartManager.importWebPart(Helpers.GetWebPartXmlWithoutTokens(wp.Contents.Xml));
                                    var oWebPart = oWebPartDefinition.get_webPart();
                                    limitedWebPartManager.addWebPart(oWebPart, wp.Zone, wp.Order);
                                });
                                clientContext.executeQueryAsync(function () {
                                    def.resolve();
                                }, function (sender, args) {
                                    Core.Log.Information("Files Web Parts", "Provisioning of objects failed for file with Url '" + fileUrl + "'");
                                    Core.Log.Error("Files Web Parts", "" + args.get_message());
                                    def.resolve(sender, args);
                                });
                            });
                        });
                    }, function (sender, args) {
                        Core.Log.Information("Files Web Parts", "Provisioning of objects failed for file with Url '" + fileUrl + "'");
                        Core.Log.Error("Files Web Parts", "" + args.get_message());
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
                    Core.Log.Information("Files Properties", "Setting properties for file with URL '" + dest + "'");
                    for (var key in fileProperties) {
                        Core.Log.Information("Files Properties", "Setting property '" + key + "' = '" + fileProperties[key] + "' for file with URL '" + dest + "'");
                        listItemAllFields.set_item(key, fileProperties[key]);
                    }
                    listItemAllFields.update();
                    clientContext.executeQueryAsync(function () {
                        def.resolve();
                    }, function (sender, args) {
                        Core.Log.Information("Files Properties", "Provisioning of objects failed for file with Url '" + dest + "'");
                        Core.Log.Error("Files Properties", "" + args.get_message());
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
                    Core.Log.Information("Hidden Views", "Code execution scope started");
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
                            Core.Log.Information("Hidden Views", "Modifying list views for list '" + l + "'");
                            var views = mapping[l];
                            var list = lists[index];
                            var viewCollection = listViewCollections[index];
                            views.forEach(function (v) {
                                var view = GetViewFromCollectionByUrl(viewCollection, v.Url);
                                if (view == null)
                                    return;
                                Core.Log.Information("Hidden Views", "Modifying list view with Url '" + v.Url + "' for list '" + l + "'");
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
                        clientContext.executeQueryAsync(function () {
                            Core.Log.Information("Hidden Views", "Code execution scope ended");
                            def.resolve();
                        }, function (sender, args) {
                            Core.Log.Error("Hidden Views", "Error: " + args.get_message());
                            Core.Log.Information("Hidden Views", "Code execution scope ended");
                            def.resolve(sender, args);
                        });
                    }, function (sender, args) {
                        Core.Log.Error("Hidden Views", "Error: " + args.get_message());
                        Core.Log.Information("Hidden Views", "Code execution scope ended");
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
                        Core.Log.Information(this.name, "Code execution scope started");
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var promises = [];
                        objects.forEach(function (obj) {
                            AddFileByUrl(obj.Dest, obj.Src, obj.Overwrite);
                        });
                        jQuery.when.apply(jQuery, promises).done(function () {
                            var promises = [];
                            objects.forEach(function (obj) {
                                if (obj.WebParts && obj.WebParts.length > 0) {
                                    promises.push(AddWebPartsToWebPartPage(obj.Dest, obj.Src, obj.WebParts, obj.RemoveExistingWebParts));
                                }
                            });
                            jQuery.when.apply(jQuery, promises).done(function () {
                                var promises = [];
                                objects.forEach(function (obj) {
                                    if (obj.Properties && Object.keys(obj.Properties).length > 0) {
                                        promises.push(ApplyFileProperties(obj.Dest, obj.Properties));
                                    }
                                });
                                jQuery.when.apply(jQuery, promises).done(function () {
                                    ModifyHiddenViews(objects).then(function () {
                                        Core.Log.Information(_this.name, "Code execution scope ended");
                                        def.resolve();
                                    });
                                });
                            });
                        });
                        return def.promise();
                    };
                    return Files;
                })(Core.Model.ObjectHandlerBase);
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
                function AddWikiPageByUrl(fileUrl) {
                    var def = jQuery.Deferred();
                    Core.Log.Information("Pages", "Creating file with Url '" + fileUrl + "'");
                    var clientContext = SP.ClientContext.get_current();
                    var web = clientContext.get_web();
                    var fileServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + fileUrl;
                    var folderServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + Helpers.GetFolderFromFilePath(fileUrl);
                    var folder = web.getFolderByServerRelativeUrl(folderServerRelativeUrl);
                    clientContext.load(folder.get_files().addTemplateFile(fileServerRelativeUrl, SP.TemplateFileType.wikiPage));
                    clientContext.executeQueryAsync(function () {
                        def.resolve();
                    }, function (sender, args) {
                        Core.Log.Information("Pages", "Failed to create file with Url '" + fileUrl + "'");
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
                        Core.Log.Information(this.name, "Code execution scope started");
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var promises = [];
                        objects.forEach(function (obj) {
                            AddWikiPageByUrl(obj.Url);
                        });
                        jQuery.when.apply(jQuery, promises).done(function () {
                            Core.Log.Information(_this.name, "Code execution scope ended");
                            def.resolve();
                        });
                        return def.promise();
                    };
                    return Pages;
                })(Core.Model.ObjectHandlerBase);
                ObjectHandlers.Pages = Pages;
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
                var CustomActions = (function (_super) {
                    __extends(CustomActions, _super);
                    function CustomActions() {
                        _super.call(this, "CustomActions");
                    }
                    CustomActions.prototype.ProvisionObjects = function (objects) {
                        var _this = this;
                        var def = jQuery.Deferred();
                        Core.Log.Information(this.name, "Starting provisioning of objects");
                        var clientContext = SP.ClientContext.get_current();
                        var userCustomActions = clientContext.get_web().get_userCustomActions();
                        clientContext.load(userCustomActions);
                        clientContext.executeQueryAsync(function () {
                            objects.forEach(function (obj) {
                                var objExists = jQuery.grep(userCustomActions.get_data(), function (userCustomAction) {
                                    return userCustomAction.get_title() == obj.Title;
                                }).length > 0;
                                if (objExists) {
                                    Core.Log.Information(_this.name, "A custom action with Title '" + obj.Title + "' already exists in this Web site at Url '" + obj.Url + "'.");
                                }
                                else {
                                    Core.Log.Information(_this.name, "Creating custom action with Title '" + obj.Title + "'");
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
                            if (!clientContext.get_hasPendingRequest()) {
                                Core.Log.Information(_this.name, "Provisioning of objects ended");
                                def.resolve();
                                return def.promise();
                            }
                            clientContext.executeQueryAsync(function () {
                                Core.Log.Information(_this.name, "Provisioning of objects ended");
                                def.resolve();
                            }, function (sender, args) {
                                Core.Log.Information(_this.name, "Provisioning of objects failed");
                                Core.Log.Error(_this.name, "" + args.get_message());
                                def.resolve(sender, args);
                            });
                        }, function (sender, args) {
                            Core.Log.Information(_this.name, "Provisioning of objects failed");
                            Core.Log.Error(_this.name, "" + args.get_message());
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    };
                    return CustomActions;
                })(Core.Model.ObjectHandlerBase);
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
                var PropertyBagEntries = (function (_super) {
                    __extends(PropertyBagEntries, _super);
                    function PropertyBagEntries() {
                        _super.call(this, "PropertyBagEntries");
                    }
                    PropertyBagEntries.prototype.ProvisionObjects = function (object) {
                        var _this = this;
                        Core.Log.Information(this.name, "Starting provisioning of objects");
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var web = clientContext.get_web();
                        var allProperties = web.get_allProperties();
                        for (var key in object) {
                            Core.Log.Information(this.name, "Setting property '" + key + "' = '" + object[key] + "' on web");
                            allProperties.set_item(key, object[key]);
                        }
                        web.update();
                        clientContext.executeQueryAsync(function () {
                            Core.Log.Information(_this.name, "Provisioning of objects ended");
                            def.resolve();
                        }, function (sender, args) {
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    };
                    return PropertyBagEntries;
                })(Core.Model.ObjectHandlerBase);
                ObjectHandlers.PropertyBagEntries = PropertyBagEntries;
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
                var WebSettings = (function (_super) {
                    __extends(WebSettings, _super);
                    function WebSettings() {
                        _super.call(this, "WebSettings");
                    }
                    WebSettings.prototype.ProvisionObjects = function (object) {
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var web = clientContext.get_web();
                        if (object.WelcomePage) {
                            Core.Log.Information(this.name, "Setting WelcomePage to '" + object.WelcomePage + "'");
                            web.get_rootFolder().set_welcomePage(object.WelcomePage);
                            web.get_rootFolder().update();
                        }
                        web.update();
                        clientContext.load(web);
                        clientContext.executeQueryAsync(function () {
                            def.resolve();
                        }, function (sender, args) {
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    };
                    return WebSettings;
                })(Core.Model.ObjectHandlerBase);
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
                        Core.Log.Information(this.name, "Code execution scope started");
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
                                Core.Log.Information(_this.name, "Code execution scope ended");
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
                                Core.Log.Information(_this.name, "Code execution scope ended");
                                def.resolve();
                            }, function (sender, args) {
                                Core.Log.Error(_this.name, "" + args.get_message());
                                Core.Log.Information(_this.name, "Code execution scope ended");
                                def.resolve(sender, args);
                            });
                        }, function (sender, args) {
                            Core.Log.Error(_this.name, "" + args.get_message());
                            Core.Log.Information(_this.name, "Code execution scope ended");
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    };
                    return Security;
                })(Core.Model.ObjectHandlerBase);
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
                    var _this = this;
                    Core.Log.Information(this.name, "Configuring quicklaunch navigation");
                    var def = jQuery.Deferred();
                    if (objects.length == 0) {
                        def.resolve();
                    }
                    else {
                        var quickLaunchNodeCollection = navigation.get_quickLaunch();
                        clientContext.load(quickLaunchNodeCollection);
                        clientContext.executeQueryAsync(function () {
                            Core.Log.Information(_this.name, "Removing existing navigation nodes");
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
                                    Core.Log.Information(_this.name, "Adding navigation node with Url '" + obj.Url + "' and Title '" + obj.Title + "'");
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
                                                    Core.Log.Information(_this.name, "Adding the link node " + c.Title + " to the quicklaunch, under parent " + n.Title);
                                                });
                                            }
                                        });
                                        clientContext.executeQueryAsync(function () {
                                            Core.Log.Information(_this.name, "Configuring of quicklaunch done");
                                            def.resolve();
                                        }, function (sender, args) {
                                            Core.Log.Information(_this.name, "Configuring of quicklaunch failed");
                                            Core.Log.Error(_this.name, "" + args.get_message());
                                            def.resolve(sender, args);
                                        });
                                    });
                                }, function (sender, args) {
                                    Core.Log.Information(_this.name, "Configuring of quicklaunch failed");
                                    Core.Log.Error(_this.name, "" + args.get_message());
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
                        Core.Log.Information(this.name, "Code execution scope started");
                        var navigation = web.get_navigation();
                        if (object.UseShared != undefined) {
                            navigation.set_useShared(object.UseShared);
                        }
                        clientContext.executeQueryAsync(function () {
                            if (!object.QuickLaunch || object.QuickLaunch.length == 0) {
                                def.resolve();
                                return def.promise();
                            }
                            ConfigureQuickLaunch(object.QuickLaunch, clientContext, navigation).then(function () {
                                Core.Log.Information(_this.name, "Code execution scope ended");
                                def.resolve();
                            });
                        }, function (sender, args) {
                            Core.Log.Information(_this.name, "Code execution scope ended");
                            Core.Log.Error(_this.name, "" + args.get_message());
                            def.resolve();
                        });
                        return def.promise();
                    };
                    return Navigation;
                })(Core.Model.ObjectHandlerBase);
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
            })();
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
                            return _this.callback(_this.objects, _this.parameters).done(function () {
                                def.resolve();
                            });
                        });
                        return def.promise();
                    };
                    return TemplateQueueItem;
                })();
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
            var startTime = null;
            var setupWebDialog;
            function ShowWaitMessage(options) {
                var header = Core.Resources.WaitMessage_header;
                var content = Core.Resources.WaitMessage_content;
                if (options) {
                    if (options.Header) {
                        header = options.Header;
                    }
                    if (options.Content) {
                        content = options.Content;
                    }
                }
                setupWebDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose(header, content, 130, 600);
            }
            function getSetupQueue(json) {
                return Object.keys(json);
            }
            function start(json, queue) {
                var def = jQuery.Deferred();
                startTime = new Date().getTime();
                Core.Log.Information("Provisioning", String.format(Core.Resources.Code_execution_started, _spPageContextInfo.webServerRelativeUrl));
                var queueItems = [];
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
            function init(template, options) {
                var def = jQuery.Deferred();
                ShowWaitMessage(options.WaitMessage);
                Core.Log = new Core.Logger(options.Logging);
                var queue = getSetupQueue(template);
                start(template, queue).then(function () {
                    Core.Log.Information("Provisioning", String.format(Core.Resources.Code_execution_ended, ((new Date().getTime()) - startTime) / 1000));
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
