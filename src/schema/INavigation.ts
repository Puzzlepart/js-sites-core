/// <reference path="INavigationNode.ts" />

module Pzl.Sites.Core.Schema {
    export interface INavigation {
        UseShared: boolean;
        QuickLaunch: Array<INavigationNode>;      
    }
}