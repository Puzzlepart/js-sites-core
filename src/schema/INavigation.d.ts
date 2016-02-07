/// <reference path="schema.d.ts" />
declare module Pzl.Sites.Core.Schema {
    interface INavigation {
        UseShared: boolean;
        QuickLaunch: Array<INavigationNode>;      
    }
}