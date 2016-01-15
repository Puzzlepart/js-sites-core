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

module Pzl.Sites.Core {
    export var Log: Logger;
    
    var setupWebDialog : SP.UI.ModalDialog;
    
    function ShowWaitMessage(header, content, height, width) {
        setupWebDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose(header, content, height, width);
    }
    
    
    class QueueItem {
        name :string;
        index: number;
        json: any;
        callback: Function;
        execute(dependentPromise?) {
            if(!dependentPromise) {
                return this.callback(this.json);
            }
            var def = jQuery.Deferred();
            dependentPromise.done(() => {
                return this.callback(this.json).done(function () {
                    def.resolve();
                });
            });
            return def.promise();
        }
        
        constructor(name : string, index : number, json: any, callback : Function) {
            this.name = name;
            this.index = index;
            this.json = json;
            this.callback = callback;
        }
    }
    function getSetupQueue(json) {
        return Object.keys(json);
    }
    function start(json : Schema.SiteSchema, queue : Array<string>) {
        var def = jQuery.Deferred();
        
        Log.Information("Provisioning", `Starting`);
        
        var queueItems : Array<QueueItem> = [];
        queue.forEach((q, index) => {
            queueItems.push(new QueueItem(q, index, json[q], new ObjectHandlers[q]().ProvisionObjects));
        })
        
        
        var promises = [];
        promises.push(jQuery.Deferred());
        promises[0].resolve();
        promises[0].promise();
        
        queueItems.forEach((queueItem, index) => {
            promises.push(queueItem.execute(promises[index-1]));
        })
        
        jQuery.when.apply(jQuery, promises).done(() => {
            def.resolve();
        });
        
        return def.promise();   
    }
    export function init(json : Schema.SiteSchema, debug: Boolean) {
        var def = jQuery.Deferred();
        
        ShowWaitMessage("Applying template", "This might take a moment..", 130, 600);
        
        Log = new Logger(debug);
        var queue = getSetupQueue(json);
        start(json, queue).then(() => {
            Log.Information("Provisioning", `All done`);
            setupWebDialog.close(null);
            def.resolve();
        });
        
        return def.promise();   
    }
}