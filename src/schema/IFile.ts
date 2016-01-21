/// <reference path="IWebPart.ts" />
/// <reference path="HiddenView.ts" />

module Pzl.Sites.Core.Schema {
    export interface IFile {
        Overwrite: boolean;
        Dest: string;
        Src: string;
        Properties: Object;
        RemoveExistingWebParts: boolean;
        WebParts: Array<IWebPart>;
        Views: Array<HiddenView>
    }
}