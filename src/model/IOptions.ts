/// <reference path="ILoggingOptions.ts" />
/// <reference path="IWaitMessageOptions.ts" />

module Pzl.Sites.Core.Model {
    export interface IOptions {
       WaitMessage?: IWaitMessageOptions;
       Logging?: ILoggingOptions;
    }
}