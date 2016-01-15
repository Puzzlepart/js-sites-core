module Pzl.Sites.Core.Schema {
    export interface IFile {
        Overwrite: Boolean;
        Dest: string;
        Src: string;
        Properties: Object;
        RemoveExistingWebParts: Boolean;
        WebParts: Array<IWebPart>;
    }
}