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
        OnQuickLaunch: boolean;
        TemplateType: number;
        EnableVersioning: boolean;
        EnableMinorVersions: boolean;
        EnableModeration: boolean;
        EnableFolderCreation: boolean;
        EnableAttachments: boolean;
        RemoveExistingContentTypes: boolean;
        NoCrawl: boolean;        
        DefaultDisplayFormUrl: string;
        DefaultEditFormUrl: string;
        DefaultNewFormUrl: string;
        DraftVersionVisibility: string;
        ImageUrl: string;
        Hidden: boolean;
        ForceCheckout: boolean;
        ContentTypeBindings: Array<IContentTypeBinding>;
        FieldRefs: Array<IListInstanceFieldRef>;
        Fields: Array<IField>;
        Folders: Array<IFolder>;
        Views: Array<IView>;
        DataRows: Array<Object>;
        Security: ISecurity;
    }
}