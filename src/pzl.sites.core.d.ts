/// <reference path="../typings/tsd.d.ts" />
declare module Pzl.Sites.Core {
    var Log: Logger;
    function init(template: Schema.SiteSchema, loggingOptions: Model.ILoggingOptions): JQueryPromise<{}>;
}
