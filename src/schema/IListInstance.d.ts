/// <reference path="schema.d.ts" />
declare module Pzl.Sites.Core.Schema {
    interface IListInstance {
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
        RemoveExistingViews: boolean;
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
        RibbonActions: Array<IRibbonAction>;
        Security: ISecurity;
    }
}