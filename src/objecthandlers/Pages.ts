/// <reference path="..\model\ObjectHandlerBase.ts" />
"use strict";


module Pzl.Sites.Core.ObjectHandlers {
    export class Pages extends Model.ObjectHandlerBase {
        constructor() {
            super("Pages")
        }
        ProvisionObjects(objects: Array<Schema.IPage>) {
            Core.Log.Information(this.name, Resources.Code_execution_started);
            var def = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();

            var promises = [];
            objects.forEach((obj) => {
                this.AddWikiPageByUrl(obj.Url);
            });

            jQuery.when.apply(jQuery, promises).done(() => {
                Core.Log.Information(this.name, Resources.Code_execution_ended);
                def.resolve();
            });

            return def.promise();
        }
        private AddWikiPageByUrl(pageUrl: string) {
            var def = jQuery.Deferred();

            Core.Log.Information("Pages", String.format(Resources.Pages_creating_page, pageUrl));

            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var fileServerRelativeUrl = `${_spPageContextInfo.webServerRelativeUrl}/${pageUrl}`;
            var folderServerRelativeUrl = `${_spPageContextInfo.webServerRelativeUrl}/${this.GetFolderFromFilePath(pageUrl)}`;
            var folder = web.getFolderByServerRelativeUrl(folderServerRelativeUrl);
            clientContext.load(folder.get_files().addTemplateFile(fileServerRelativeUrl, SP.TemplateFileType.wikiPage));
            clientContext.executeQueryAsync(def.resolve,
                (sender, args) => {
                    Core.Log.Information("Pages", String.format(Resources.Pages_creating_page_failed, pageUrl));
                    Core.Log.Error("Pages", `${args.get_message()}`)
                    def.resolve(sender, args);
                }
            );
            return def.promise();
        }
        private GetFolderFromFilePath(filePath: string) {
            var split = filePath.split("/");
            return split.splice(0, split.length - 1);
        }
    }
}