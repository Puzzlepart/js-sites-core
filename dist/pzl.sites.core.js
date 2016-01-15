/// <reference path="IContentTypeBinding.ts" />
/// <reference path="IFolder.ts" />
/// <reference path="IWebPart.ts" />
/// <reference path="IListInstance.ts" />
/// <reference path="IFile.ts" />
/// <reference path="IPage.ts" />
/// <reference path="IFeature.ts" />
/// <reference path="IField.ts" />
/// <reference path="IContentType.ts" />
/// <reference path="INavigationNode.ts" />
/// <reference path="ICustomAction.ts" />
/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="IObjectHandler.ts" />
/// <reference path="..\schema\IListInstance.ts" />
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var ObjectHandlers;
            (function (ObjectHandlers) {
                var Extensions;
                (function (Extensions) {
                    function CreateFolders(clientContext, listUrl, folders) {
                        var def = jQuery.Deferred();
                        var listRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + listUrl;
                        var rootFolder = clientContext.get_web().getFolderByServerRelativeUrl(listRelativeUrl);
                        var metadataDefaults = "<MetadataDefaults>";
                        folders.forEach(function (f) {
                            rootFolder.get_folders().add(listRelativeUrl + "/" + f.Name);
                            if (f.DefaultValues) {
                                var keys = Object.keys(f.DefaultValues).length;
                                if (keys > 0) {
                                    metadataDefaults += "<a href='" + listRelativeUrl + "/" + f.Name + "'>";
                                    Object.keys(f.DefaultValues).forEach(function (key) { metadataDefaults += "<DefaultValue FieldName=\"" + key + "\">" + f.DefaultValues[key] + "</DefaultValue>"; });
                                    metadataDefaults += "</a>";
                                }
                            }
                        });
                        metadataDefaults += "</MetadataDefaults>";
                        var metadataDefaultsFileCreateInfo = new SP.FileCreationInformation();
                        metadataDefaultsFileCreateInfo.set_url(listRelativeUrl + "/Forms/client_LocationBasedDefaults.html");
                        metadataDefaultsFileCreateInfo.set_content(new SP.Base64EncodedByteArray());
                        metadataDefaultsFileCreateInfo.set_overwrite(true);
                        for (var i = 0; i < metadataDefaults.length; i++) {
                            metadataDefaultsFileCreateInfo.get_content().append(metadataDefaults.charCodeAt(i));
                        }
                        rootFolder.get_files().add(metadataDefaultsFileCreateInfo);
                        def.resolve();
                        return def.promise();
                    }
                    Extensions.CreateFolders = CreateFolders;
                    function ApplyContentTypeBindings(clientContext, list, contentTypeBindings) {
                        var def = jQuery.Deferred();
                        var webCts = clientContext.get_web().get_contentTypes();
                        var listCts = list.get_contentTypes();
                        Core.Log.Information("Lists", "Enabled content types for list '" + list.get_title() + "'");
                        list.set_contentTypesEnabled(true);
                        list.update();
                        clientContext.load(webCts);
                        clientContext.load(listCts);
                        clientContext.executeQueryAsync(function () {
                            def.resolve();
                        }, function (sender, args) {
                            console.log(sender, args);
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    }
                    Extensions.ApplyContentTypeBindings = ApplyContentTypeBindings;
                    function CreateViews() {
                    }
                    Extensions.CreateViews = CreateViews;
                })(Extensions || (Extensions = {}));
                var Lists = (function () {
                    function Lists() {
                    }
                    Lists.prototype.ProvisionObjects = function (objects) {
                        Core.Log.Information("Lists", "Starting provisioning of objects");
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var lists = clientContext.get_web().get_lists();
                        var createdLists = [];
                        clientContext.load(lists);
                        clientContext.executeQueryAsync(function () {
                            objects.forEach(function (obj, index) {
                                var objExists = jQuery.grep(lists.get_data(), function (list) {
                                    return list.get_title() == obj.Title;
                                }).length > 0;
                                if (objExists) {
                                    Core.Log.Information("Lists", "A list, survey, discussion board, or document library with the specified title '" + obj.Title + "' already exists in this Web site at Url '" + obj.Url + "'.");
                                }
                                else {
                                    Core.Log.Information("Lists", "Creating list with Title '" + obj.Title + "' and Url '" + obj.Url + "'.");
                                    var objCreationInformation = new SP.ListCreationInformation();
                                    if (obj.Description) {
                                        objCreationInformation.set_description(obj.Description);
                                    }
                                    if (obj.OnQuickLaunch) {
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
                                    createdLists.push(lists.add(objCreationInformation));
                                    clientContext.load(createdLists[index]);
                                }
                            });
                            if (!clientContext.get_hasPendingRequest()) {
                                Core.Log.Information("Lists", "Provisioning of objects ended");
                                def.resolve();
                                return def.promise();
                            }
                            clientContext.executeQueryAsync(function () {
                                var promises = [];
                                objects.forEach(function (obj, index) {
                                    if (obj.Folders && obj.Folders.length > 0) {
                                        promises.push(Extensions.CreateFolders(clientContext, obj.Url, obj.Folders));
                                    }
                                    if (obj.ContentTypeBindings && obj.ContentTypeBindings.length > 0) {
                                        promises.push(Extensions.ApplyContentTypeBindings(clientContext, createdLists[index], obj.ContentTypeBindings));
                                    }
                                });
                                jQuery.when.apply(jQuery, promises).done(function () {
                                    clientContext.executeQueryAsync(function () {
                                        Core.Log.Information("Lists", "Provisioning of objects ended");
                                        def.resolve();
                                    });
                                });
                            }, function (sender, args) {
                                Core.Log.Information("Lists", "Provisioning of objects failed");
                                Core.Log.Error("Lists", "" + args.get_message());
                                def.resolve(sender, args);
                            });
                        }, function (sender, args) {
                            Core.Log.Information("Lists", "Provisioning of objects failed");
                            Core.Log.Error("Lists", "" + args.get_message());
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    };
                    return Lists;
                })();
                ObjectHandlers.Lists = Lists;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
/// <reference path="IObjectHandler.ts" />
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var ObjectHandlers;
            (function (ObjectHandlers) {
                var SiteFields = (function () {
                    function SiteFields() {
                    }
                    SiteFields.prototype.ProvisionObjects = function (json) {
                        var def = jQuery.Deferred();
                        Core.Log.Information("SiteFields", "Starting provisioning of objects");
                        Core.Log.Information("SiteFields", "Provisioning of objects ended");
                        def.resolve();
                        return def.promise();
                    };
                    return SiteFields;
                })();
                ObjectHandlers.SiteFields = SiteFields;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
/// <reference path="IObjectHandler.ts" />
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var ObjectHandlers;
            (function (ObjectHandlers) {
                var ContentTypes = (function () {
                    function ContentTypes() {
                    }
                    ContentTypes.prototype.ProvisionObjects = function (json) {
                        var def = jQuery.Deferred();
                        Core.Log.Information("ContentTypes", "Starting provisioning of objects");
                        Core.Log.Information("ContentTypes", "Provisioning of objects ended");
                        def.resolve();
                        return def.promise();
                    };
                    return ContentTypes;
                })();
                ObjectHandlers.ContentTypes = ContentTypes;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
/// <reference path="IObjectHandler.ts" />
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var ObjectHandlers;
            (function (ObjectHandlers) {
                var Features = (function () {
                    function Features() {
                    }
                    Features.prototype.ProvisionObjects = function (json) {
                        var def = jQuery.Deferred();
                        Core.Log.Information("Features", "Starting provisioning of objects");
                        Core.Log.Information("Features", "Provisioning of objects ended");
                        def.resolve();
                        return def.promise();
                    };
                    return Features;
                })();
                ObjectHandlers.Features = Features;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="IObjectHandler.ts" />
/// <reference path="..\schema\IFile.ts" />
/// <reference path="..\schema\IWebPart.ts" />
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
                        return fileUrl.replace(/{resources}/g, _spPageContextInfo.siteServerRelativeUrl + "/resources");
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
                var Extensions;
                (function (Extensions) {
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
                    Extensions.AddFileByUrl = AddFileByUrl;
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
                    Extensions.RemoveWebPartsFromFileIfSpecified = RemoveWebPartsFromFileIfSpecified;
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
                                webParts.forEach(function (wp) {
                                    Core.Log.Information("Files Web Parts", "Adding web part '" + wp.Title + "' to zone '" + wp.Zone + "' for file with URL '" + dest + "'");
                                    var oWebPartDefinition = limitedWebPartManager.importWebPart(Helpers.GetWebPartXmlWithoutTokens(wp.Xml));
                                    var oWebPart = oWebPartDefinition.get_webPart();
                                    limitedWebPartManager.addWebPart(oWebPart, wp.Zone, wp.Order);
                                });
                                clientContext.executeQueryAsync(function () {
                                    Core.Log.Information("Files Web Parts", "Provisioning of objects ended");
                                    def.resolve();
                                }, function (sender, args) {
                                    Core.Log.Information("Files Web Parts", "Provisioning of objects failed for file with Url '" + fileUrl + "'");
                                    Core.Log.Error("Files Web Parts", "" + args.get_message());
                                    def.resolve(sender, args);
                                });
                            });
                        }, function (sender, args) {
                            Core.Log.Information("Files Web Parts", "Provisioning of objects failed for file with Url '" + fileUrl + "'");
                            Core.Log.Error("Files Web Parts", "" + args.get_message());
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    }
                    Extensions.AddWebPartsToWebPartPage = AddWebPartsToWebPartPage;
                })(Extensions || (Extensions = {}));
                var Files = (function () {
                    function Files() {
                    }
                    Files.prototype.ProvisionObjects = function (objects) {
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        Core.Log.Information("Files", "Starting provisioning of objects");
                        var promises = [];
                        objects.forEach(function (obj) {
                            Extensions.AddFileByUrl(obj.Dest, obj.Src, obj.Overwrite);
                        });
                        jQuery.when.apply(jQuery, promises).done(function () {
                            Core.Log.Information("Files", "Provisioning of objects ended");
                            Core.Log.Information("Files Web Parts", "Starting provisioning of objects");
                            var promises = [];
                            objects.forEach(function (obj) {
                                if (obj.WebParts && obj.WebParts.length > 0) {
                                    promises.push(Extensions.AddWebPartsToWebPartPage(obj.Dest, obj.Src, obj.WebParts, obj.RemoveExistingWebParts));
                                }
                            });
                            jQuery.when.apply(jQuery, promises).done(function () {
                                Core.Log.Information("Files Web Parts", "Provisioning of objects ended");
                                def.resolve();
                            });
                        });
                        return def.promise();
                    };
                    return Files;
                })();
                ObjectHandlers.Files = Files;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="IObjectHandler.ts" />
/// <reference path="..\schema\IPage.ts" />
/// <reference path="..\schema\IWebPart.ts" />
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
                var Extensions;
                (function (Extensions) {
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
                    Extensions.AddWikiPageByUrl = AddWikiPageByUrl;
                    function AddLayoutToWikiPage(layout, fileUrl) {
                    }
                    Extensions.AddLayoutToWikiPage = AddLayoutToWikiPage;
                    function AddWebPartsToWikiPage(fileUrl, webParts, removeExisting) {
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var web = clientContext.get_web();
                        var fileServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + fileUrl;
                        var file = web.getFileByServerRelativeUrl(fileServerRelativeUrl);
                        clientContext.load(file);
                        clientContext.executeQueryAsync(function () {
                            var limitedWebPartManager = file.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
                            webParts.forEach(function (wp) {
                                var oWebPartDefinition = limitedWebPartManager.importWebPart(Helpers.GetWebPartXmlWithoutTokens(wp.Xml));
                                var oWebPart = oWebPartDefinition.get_webPart();
                                limitedWebPartManager.addWebPart(oWebPart, 'wpz', 1);
                            });
                            clientContext.executeQueryAsync(function () {
                                Core.Log.Information("Pages Web Parts", "Provisioning of objects ended");
                                def.resolve();
                            }, function (sender, args) {
                                Core.Log.Information("Pages Web Parts", "Provisioning of objects failed for file with Url '" + fileUrl + "'");
                                Core.Log.Error("Pages Web Parts", "" + args.get_message());
                                def.resolve(sender, args);
                            });
                        }, function (sender, args) {
                            Core.Log.Information("Pages Web Parts", "Provisioning of objects failed for file with Url '" + fileUrl + "'");
                            Core.Log.Error("Pages Web Parts", "" + args.get_message());
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    }
                    Extensions.AddWebPartsToWikiPage = AddWebPartsToWikiPage;
                })(Extensions || (Extensions = {}));
                var Pages = (function () {
                    function Pages() {
                    }
                    Pages.prototype.ProvisionObjects = function (objects) {
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        Core.Log.Information("Pages", "Starting provisioning of objects");
                        var promises = [];
                        objects.forEach(function (obj) {
                            Extensions.AddWikiPageByUrl(obj.Url);
                        });
                        jQuery.when.apply(jQuery, promises).done(function () {
                            Core.Log.Information("Pages", "Provisioning of objects ended");
                            Core.Log.Information("Pages Web Parts", "Starting provisioning of objects");
                            var promises = [];
                            objects.forEach(function (obj) {
                                if (obj.WebParts && obj.WebParts.length > 0) {
                                    promises.push(Extensions.AddWebPartsToWikiPage(obj.Url, obj.WebParts, obj.RemoveExistingWebParts));
                                }
                            });
                            jQuery.when.apply(jQuery, promises).done(function () {
                                Core.Log.Information("Pages Web Parts", "Provisioning of objects ended");
                                def.resolve();
                            });
                        });
                        return def.promise();
                    };
                    return Pages;
                })();
                ObjectHandlers.Pages = Pages;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="IObjectHandler.ts" />
/// <reference path="..\schema\ICustomAction.ts" />
/// <reference path="..\schema\IWebPart.ts" />
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var ObjectHandlers;
            (function (ObjectHandlers) {
                var CustomActions = (function () {
                    function CustomActions() {
                    }
                    CustomActions.prototype.ProvisionObjects = function (objects) {
                        var def = jQuery.Deferred();
                        Core.Log.Information("CustomActions", "Starting provisioning of objects");
                        var clientContext = SP.ClientContext.get_current();
                        var userCustomActions = clientContext.get_web().get_userCustomActions();
                        clientContext.load(userCustomActions);
                        clientContext.executeQueryAsync(function () {
                            objects.forEach(function (obj) {
                                var objExists = jQuery.grep(userCustomActions.get_data(), function (userCustomAction) {
                                    return userCustomAction.get_title() == obj.Title;
                                }).length > 0;
                                if (objExists) {
                                    Core.Log.Information("CustomActions", "A custom action with Title '" + obj.Title + "' already exists in this Web site at Url '" + obj.Url + "'.");
                                }
                                else {
                                    Core.Log.Information("CustomActions", "Creating custom action with Title '" + obj.Title + "'");
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
                                Core.Log.Information("CustomActions", "Provisioning of objects ended");
                                def.resolve();
                                return def.promise();
                            }
                            clientContext.executeQueryAsync(function () {
                                Core.Log.Information("CustomActions", "Provisioning of objects ended");
                                def.resolve();
                            }, function (sender, args) {
                                Core.Log.Information("CustomActions", "Provisioning of objects failed");
                                Core.Log.Error("CustomActions", "" + args.get_message());
                                def.resolve(sender, args);
                            });
                        }, function (sender, args) {
                            Core.Log.Information("CustomActions", "Provisioning of objects failed");
                            Core.Log.Error("CustomActions", "" + args.get_message());
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    };
                    return CustomActions;
                })();
                ObjectHandlers.CustomActions = CustomActions;
            })(ObjectHandlers = Core.ObjectHandlers || (Core.ObjectHandlers = {}));
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="IObjectHandler.ts" />
/// <reference path="..\schema\INavigationNode.ts" />
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
                var LocalNavigation = (function () {
                    function LocalNavigation() {
                    }
                    LocalNavigation.prototype.ProvisionObjects = function (objects) {
                        var def = jQuery.Deferred();
                        var clientContext = SP.ClientContext.get_current();
                        var web = clientContext.get_web();
                        Core.Log.Information("LocalNavigation", "Starting provisioning of objects");
                        var navigation = web.get_navigation();
                        var quickLaunchNodeCollection = navigation.get_quickLaunch();
                        clientContext.load(quickLaunchNodeCollection);
                        clientContext.executeQueryAsync(function () {
                            Core.Log.Information("LocalNavigation", "Removing existing navigation nodes");
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
                                    Core.Log.Information("LocalNavigation", "Adding navigation node with Url '" + obj.Url + "' and Title '" + obj.Title + "'");
                                    var existingNode = Helpers.GetNodeFromQuickLaunchByTitle(temporaryQuickLaunch, obj.Title);
                                    var newNode = new SP.NavigationNodeCreationInformation();
                                    newNode.set_title(obj.Title);
                                    newNode.set_url(existingNode ? existingNode.get_url() : Helpers.GetUrlWithoutTokens(obj.Url));
                                    newNode.set_asLastNode(true);
                                    quickLaunchNodeCollection.add(newNode);
                                });
                                clientContext.executeQueryAsync(function () {
                                    Core.Log.Information("LocalNavigation", "Provisioning of objects ended");
                                    def.resolve();
                                }, function (sender, args) {
                                    Core.Log.Information("LocalNavigation", "Provisioning of objects failed");
                                    Core.Log.Error("LocalNavigation", "" + args.get_message());
                                    def.resolve(sender, args);
                                });
                            });
                        }, function (sender, args) {
                            Core.Log.Information("LocalNavigation", "Provisioning of objects failed");
                            Core.Log.Error("LocalNavigation", "" + args.get_message());
                            def.resolve(sender, args);
                        });
                        return def.promise();
                    };
                    return LocalNavigation;
                })();
                ObjectHandlers.LocalNavigation = LocalNavigation;
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
                function Logger(debug) {
                    this.debug = debug;
                }
                Logger.prototype.loggerEnabled = function () {
                    return (console && console.log);
                };
                Logger.prototype.Information = function (objectHandler, msg) {
                    if (this.loggerEnabled && this.debug) {
                        console.log(new Date() + " || " + objectHandler + " || " + msg);
                    }
                };
                Logger.prototype.Error = function (objectHandler, msg) {
                    if (this.loggerEnabled && this.debug) {
                        console.log(new Date() + " || " + objectHandler + " || " + msg);
                    }
                };
                return Logger;
            })();
            Core.Logger = Logger;
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
/// <reference path="..\typings\tsd.d.ts" />
/// <reference path="schema/ISiteSchema.ts" />
/// <reference path="objecthandlers/Lists.ts" />
/// <reference path="objecthandlers/SiteFields.ts" />
/// <reference path="objecthandlers/ContentTypes.ts" />
/// <reference path="objecthandlers/Features.ts" />
/// <reference path="objecthandlers/Files.ts" />
/// <reference path="objecthandlers/Pages.ts" />
/// <reference path="objecthandlers/CustomActions.ts" />
/// <reference path="objecthandlers/LocalNavigation.ts" />
/// <reference path="utilities/Logger.ts" />
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var setupWebDialog;
            function ShowWaitMessage(header, content, height, width) {
                setupWebDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose(header, content, height, width);
            }
            var QueueItem = (function () {
                function QueueItem(name, index, json, callback) {
                    this.name = name;
                    this.index = index;
                    this.json = json;
                    this.callback = callback;
                }
                QueueItem.prototype.execute = function (dependentPromise) {
                    var _this = this;
                    if (!dependentPromise) {
                        return this.callback(this.json);
                    }
                    var def = jQuery.Deferred();
                    dependentPromise.done(function () {
                        return _this.callback(_this.json).done(function () {
                            def.resolve();
                        });
                    });
                    return def.promise();
                };
                return QueueItem;
            })();
            function getSetupQueue(json) {
                return Object.keys(json);
            }
            function start(json, queue) {
                var def = jQuery.Deferred();
                Core.Log.Information("Provisioning", "Starting");
                var queueItems = [];
                queue.forEach(function (q, index) {
                    queueItems.push(new QueueItem(q, index, json[q], new Core.ObjectHandlers[q]().ProvisionObjects));
                });
                var promises = [];
                promises.push(jQuery.Deferred());
                promises[0].resolve();
                promises[0].promise();
                var step = 1;
                while (queueItems[step] != undefined) {
                    var i = promises.length - 1;
                    promises.push(queueItems[step].execute(promises[i]));
                    step++;
                }
                ;
                jQuery.when.apply(jQuery, promises).done(function () {
                    def.resolve();
                });
                return def.promise();
            }
            function init(json, debug) {
                var def = jQuery.Deferred();
                ShowWaitMessage("Applying template", "This might take a moment..", 130, 600);
                Core.Log = new Core.Logger(debug);
                var queue = getSetupQueue(json);
                start(json, queue).then(function () {
                    Core.Log.Information("Provisioning", "All done");
                    setupWebDialog.close(null);
                    def.resolve();
                });
                return def.promise();
            }
            Core.init = init;
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
