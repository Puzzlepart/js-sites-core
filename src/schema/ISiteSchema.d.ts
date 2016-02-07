/// <reference path="schema.d.ts" />
declare module Pzl.Sites.Core.Schema {
    interface SiteSchema {     
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