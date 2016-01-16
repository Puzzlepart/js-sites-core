/// <reference path="..\typings\tsd.d.ts" />
/// <reference path="schema/ISiteSchema.ts" />
/// <reference path="objecthandlers/Lists.ts" />
/// <reference path="objecthandlers/ComposedLook.ts" />
/// <reference path="objecthandlers/Files.ts" />
/// <reference path="objecthandlers/Pages.ts" />
/// <reference path="objecthandlers/CustomActions.ts" />
/// <reference path="objecthandlers/LocalNavigation.ts" />
/// <reference path="objecthandlers/PropertyBagEntries.ts" />
/// <reference path="utilities/Logger.ts" />
/// <reference path="model/TemplateQueueItem.ts" />

module Pzl.Sites.Core {
    export var Log: Logger;
    
    var setupWebDialog : SP.UI.ModalDialog;
    
    function ShowWaitMessage(header, content, height, width) {
        setupWebDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose(header, content, height, width);
    }
    
    function getSetupQueue(json) {
        return Object.keys(json);
    }
    function start(json : Schema.SiteSchema, queue : Array<string>) {
        var def = jQuery.Deferred();
        
        Log.Information("Provisioning", `Starting`);
        
        var queueItems : Array<Model.TemplateQueueItem> = [];
        queue.forEach((q, index) => {
            if(!ObjectHandlers[q]) return;
            queueItems.push(new Model.TemplateQueueItem(q, index, json[q], json["Parameters"], new ObjectHandlers[q]().ProvisionObjects));
        });        
        
        var promises = [];
        promises.push(jQuery.Deferred());
        promises[0].resolve();
        promises[0].promise();
        
        var index = 1;
        while (queueItems[index-1] != undefined) {
            var i = promises.length - 1;
            promises.push(queueItems[index-1].execute(promises[i]));
            index++;
        };
        
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