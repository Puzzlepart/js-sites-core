/// <reference path="IListInstance.ts" />
/// <reference path="IFile.ts" />
/// <reference path="IPage.ts" />
/// <reference path="IFeature.ts" />
/// <reference path="IField.ts" />
/// <reference path="IContentType.ts" />
/// <reference path="INavigation.ts" />
/// <reference path="ICustomAction.ts" />
/// <reference path="IComposedLook.ts" />
/// <reference path="IWebSettings.ts" />

module Pzl.Sites.Core.Schema {
    export interface SiteSchema {     
        Lists: Array<IListInstance>;
        Files: Array<IFile>;
        Pages: Array<IPage>;
        Navigation: INavigation;
        CustomActions: Array<ICustomAction>;
        ComposedLook: IComposedLook;
        PropertyBagEntries: Object;
        Parameters: Object;
        WebSettings: IWebSettings;
        Features: Array<IFeature>;
    }
}