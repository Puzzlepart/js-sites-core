/// <reference path="..\typings\tsd.d.ts" />
/// <reference path="pzl.sites.core.d.ts" />

module Pzl.Sites.Core {    
    export var Log: Logger;
    var options : Model.IOptions;
    var startTime = null;    
    var queueItems : Array<Model.ProvisioningStep>;
    
    var setupWebDialog : SP.UI.ModalDialog;
    function ShowWaitMessage(options : Model.IWaitMessageOptions) {
        var size = {
            width: 600,
            height: 130
        }
        var header = Resources.WaitMessage_header;
        var content = Resources.WaitMessage_content;
        if(options) {
            options.Header && (header = options.Header);   
            options.Content && (content = options.Content);            
            if(options.ShowProgress === true) {
                content = "";
                content += `<style type="text/css">.progress{overflow:hidden;height:20px;margin-bottom:20px;background-color:#f5f5f5;border-radius:4px;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.1);box-shadow:inset 0 1px 2px rgba(0,0,0,.1)}.progress-bar{float:left;width:0;height:100%;font-size:12px;line-height:20px;color:#fff;text-align:center;background-color:#337ab7;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);-webkit-transition:width .6s ease;-o-transition:width .6s ease;transition:width .6s ease}</style>`;
                content += `<div id="${Resources.Provisioning_progressbar_id}" class="progress">
                                ${String.format(Resources.Provisioning_progressbar_markup, "0")}
                            </div>
                            <div id="${Resources.Provisioning_progressbar_text_id}"></div>
                            `;      
                size.width = 700;
                size.height = 160;
            }
        }
        setupWebDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose(header, content, size.height, size.width);
    }
    
    function getSetupQueue(json) {
        return Object.keys(json);
    }
    function start(json : Schema.SiteSchema, queue : Array<string>) {
        var def = jQuery.Deferred();        
        startTime = new Date().getTime();
        Log.Information("Provisioning", String.format(Resources.Code_execution_started, _spPageContextInfo.webServerRelativeUrl));        
        queueItems = [];
        queue.forEach((q, index) => {
            if(!ObjectHandlers[q]) return;
            queueItems.push(new Model.ProvisioningStep(q, index, json[q], json["Parameters"], ObjectHandlers[q]));
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
    export function UpdateProgress(index: number, name: string) {
        if(!options.WaitMessage) return;        
        if(!options.WaitMessage.ShowProgress === true) return;
        var progress = Math.floor(((index)/queueItems.length)*100);
        var text = options.WaitMessage.ProgressOverrides ? (options.WaitMessage.ProgressOverrides[name] || name) : name;
        document.getElementById(Resources.Provisioning_progressbar_id).innerHTML = String.format(Resources.Provisioning_progressbar_markup, progress);
        document.getElementById(Resources.Provisioning_progressbar_text_id).innerHTML = text;
    }
    export function init(template : Schema.SiteSchema, _options: Model.IOptions) {
        var def = jQuery.Deferred();
        options = _options || {};
        ShowWaitMessage(options.WaitMessage);        
        Log = new Logger(options.Logging);
        var queue = getSetupQueue(template);
        start(template, queue).then(() => {
            var elapsedTime = ((new Date().getTime()) - startTime)/1000;
            Log.Information("Provisioning", String.format(Resources.Provisioning_ended, elapsedTime));
            Log.SaveToFile().then(() => {
                setupWebDialog.close(null);
                def.resolve();
            });
        });        
        return def.promise();
    }
}