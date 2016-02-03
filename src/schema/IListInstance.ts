/// <reference path="IContentTypeBinding.ts" />
/// <reference path="IFolder.ts" />
/// <reference path="ISecurity.ts" />
/// <reference path="IView.ts" />
/// <reference path="IListInstanceFieldRef.ts" />
/// <reference path="IField.ts" />
module Pzl.Sites.Core.Schema {
    export interface IListInstance {
        Title: string;
        Url: string;
        Description: string,
        DocumentTemplate: string;
        OnQuickLaunch: Boolean;
        TemplateType: number;
        EnableVersioning: Boolean;
        MinorVersionLimit: number;
        MaxVersionLimit: number;
        DraftVersionVisibility: number;
        RemoveExistingContentTypes: boolean;
        ContentTypeBindings: Array<IContentTypeBinding>;
        FieldRefs: Array<IListInstanceFieldRef>;
        Fields: Array<IField>;
        Folders: Array<IFolder>;
        Views: Array<IView>;
        DataRows: Array<Object>;
        Security: ISecurity;
    }
}