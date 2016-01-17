module Pzl.Sites.Core.Schema {
    export interface IView {
        Title: string;
        Paged: boolean;
        PersonalView: boolean;
        Query: string;
        RowLimit: number;
        SetAsDefaultView: boolean;
        ViewFields: Array<string>;
        ViewTypeKind: string;
    }
}