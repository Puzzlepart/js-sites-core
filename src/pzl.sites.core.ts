/// <reference path="..\typings\tsd.d.ts" />
/// <reference path="schema/ISiteSchema.ts" />
/// <reference path="objecthandlers/Lists.ts" />
/// <reference path="objecthandlers/ComposedLook.ts" />
/// <reference path="objecthandlers/Files.ts" />
/// <reference path="objecthandlers/Pages.ts" />
/// <reference path="objecthandlers/CustomActions.ts" />
/// <reference path="objecthandlers/PropertyBagEntries.ts" />
/// <reference path="objecthandlers/WebSettings.ts" />
/// <reference path="objecthandlers/Security.ts" />
/// <reference path="objecthandlers/Navigation.ts" />
/// <reference path="utilities/Logger.ts" />
/// <reference path="model/TemplateQueueItem.ts" />
/// <reference path="model/IOptions.ts" />
/// <reference path="resources\pzl.sites.core.resources.ts" />

module Pzl.Sites.Core {
    var startTime = null;
    export var Log: Logger;
    
    var setupWebDialog : SP.UI.ModalDialog;
    function ShowWaitMessage(options : Model.IWaitMessageOptions) {
        var header = Resources.WaitMessage_header;
        var content = Resources.WaitMessage_content;
        if(options) {
            if(options.Header) {
                header = options.Header;   
            }
            if(options.Content) {
                content = options.Content;
            }
        }
        setupWebDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose(header, content, 130, 600);
    }
    
    function getSetupQueue(json) {
        return Object.keys(json);
    }
    function start(json : Schema.SiteSchema, queue : Array<string>) {
        var def = jQuery.Deferred();        
        startTime = new Date().getTime();
        Log.Information("Provisioning", String.format(Resources.Code_execution_started, _spPageContextInfo.webServerRelativeUrl));        
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
        jQuery.when.apply(jQuery, promises).done(def.resolve);
        
        return def.promise();   
    }
    export function init(template : Schema.SiteSchema, options: Model.IOptions) {
        var def = jQuery.Deferred();
        ShowWaitMessage(options.WaitMessage);        
        Log = new Logger(options.Logging);
        var queue = getSetupQueue(template);
        start(template, queue).then(() => {
            Log.Information("Provisioning", String.format(Resources.Code_execution_ended, ((new Date().getTime()) - startTime)/1000));
            Log.SaveToFile().then(() => {
                setupWebDialog.close(null);
                def.resolve();
            });
        });
        
        return def.promise();   
    }
}