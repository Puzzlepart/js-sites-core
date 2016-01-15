module Pzl.Sites.Core.Schema {
    export interface IFile {
        Overwrite: Boolean;
        Dest: string;
        Src: string;
        RemoveExistingWebParts: Boolean;
        WebParts: Array<IWebPart>;
    }
}