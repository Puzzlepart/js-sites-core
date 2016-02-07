/// <reference path="schema.d.ts" />
declare module Pzl.Sites.Core.Schema {
    interface IPage {
        Overwrite: string;
        Url: string;
        Layout: string;
        RemoveExistingWebParts: Boolean;
        WebParts: Array<IWebPart>;
    }
}