/// <reference path="IListInstance.ts" />
/// <reference path="IFile.ts" />
/// <reference path="IPage.ts" />
/// <reference path="IFeature.ts" />
/// <reference path="IField.ts" />
/// <reference path="IContentType.ts" />
/// <reference path="INavigationNode.ts" />
/// <reference path="ICustomAction.ts" />

module Pzl.Sites.Core.Schema {
    export interface SiteSchema {
        SiteFields: Array<IField>;
        ContentTypes: Array<IContentType>;
        Lists: Array<IListInstance>;
        Files: Array<IFile>;
        Pages: Array<IPage>;
        Features: Array<IFeature>;
        LocalNavigation: Array<INavigationNode>;
        CustomActions: Array<ICustomAction>;
    }
}