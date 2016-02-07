/// <reference path="schema.d.ts" />
declare module Pzl.Sites.Core.Schema {
    interface IFile {
        Overwrite: boolean;
        Dest: string;
        Src: string;
        Properties: Object;
        RemoveExistingWebParts: boolean;
        WebParts: Array<IWebPart>;
        Views: Array<IHiddenView>
    }
}