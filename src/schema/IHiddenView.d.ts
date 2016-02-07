declare module Pzl.Sites.Core.Schema {
    interface IHiddenView {
        List: string;
        Url: string;
        Paged: boolean;
        Query: string;
        RowLimit: number;
        Scope: number;
        ViewFields: Array<string>;
    }
}