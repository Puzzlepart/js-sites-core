module Pzl.Sites.Core.Schema {
    export interface IWebSettings {
        WelcomePage: string;
        AlternateCssUrl: string;
        SaveSiteAsTemplateEnabled: boolean;
        MasterUrl: string;
        CustomMasterUrl: string;
        RecycleBinEnabled: boolean;
        TreeViewEnabled: boolean;
        QuickLaunchEnabled: boolean
    }
}