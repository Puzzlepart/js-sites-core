module Pzl.Sites.Core.Schema {
    export interface HiddenView {
        List: string;
        Url: string;
        Paged: boolean;
        Query: string;
        RowLimit: number;
        ViewFields: Array<string>;
    }
}