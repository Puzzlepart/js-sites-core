/// <reference path="IWebPart.ts" />

module Pzl.Sites.Core.Schema {
    export interface IFile {
        Overwrite: boolean;
        Dest: string;
        Src: string;
        Properties: Object;
        RemoveExistingWebParts: boolean;
        WebParts: Array<IWebPart>;
    }
}