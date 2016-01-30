/// <reference path="../typings/tsd.d.ts" />
/// <reference path="schema/ISiteSchema.d.ts" />
/// <reference path="objecthandlers/Lists.d.ts" />
/// <reference path="objecthandlers/ComposedLook.d.ts" />
/// <reference path="objecthandlers/Files.d.ts" />
/// <reference path="objecthandlers/Pages.d.ts" />
/// <reference path="objecthandlers/CustomActions.d.ts" />
/// <reference path="objecthandlers/PropertyBagEntries.d.ts" />
/// <reference path="objecthandlers/WebSettings.d.ts" />
/// <reference path="objecthandlers/Security.d.ts" />
/// <reference path="objecthandlers/Navigation.d.ts" />
/// <reference path="utilities/Logger.d.ts" />
/// <reference path="model/TemplateQueueItem.d.ts" />
/// <reference path="model/ILoggingOptions.d.ts" />
declare module Pzl.Sites.Core {
    var Log: Logger;
    function init(template: Schema.SiteSchema, loggingOptions: Model.ILoggingOptions): JQueryPromise<{}>;
}
