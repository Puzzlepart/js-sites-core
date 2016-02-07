declare module Pzl.Sites.Core.Schema {
    interface INavigationNode {
        Title: string;
        Url: string;
        Children:Array<INavigationNode>;        
    }
}