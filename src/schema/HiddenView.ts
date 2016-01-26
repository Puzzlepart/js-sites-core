module Pzl.Sites.Core.Schema {
    export interface HiddenView {
        List: string;
        Url: string;
        Paged: boolean;
        Query: string;
        RowLimit: number;
        Scope: number;
        ViewFields: Array<string>;
    }
}