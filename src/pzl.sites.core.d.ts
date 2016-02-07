/// <reference path="schema/schema.d.ts" />
/// <reference path="objecthandlers/objecthandlers.d.ts" />
/// <reference path="utilities/utilities.d.ts" />
/// <reference path="model/model.d.ts" />
/// <reference path="resources\pzl.sites.core.resources.ts" />

declare module Pzl.Sites.Core {    
    var Log: Logger;
    var options : Model.IOptions;
    var startTime: any;  
    var queueItems : Array<Model.ProvisioningStep>;
    
    var setupWebDialog : SP.UI.ModalDialog;
    function ShowWaitMessage(options : Model.IWaitMessageOptions) : void;    
    function getSetupQueue(json) : Array<string>;
    function start(json : Schema.SiteSchema, queue : Array<string>) : void;
    function UpdateProgress(index:number, name:string) : void;
    function init(template : Schema.SiteSchema, _options: Model.IOptions) : void;
}