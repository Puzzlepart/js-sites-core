declare module Pzl.Sites.Core.Schema {
    interface IRibbonAction {
        Location: string;
        Control: string;
        Name: string;
        Description: string;
        Sequence: number;
        Group: string;
        LabelText: string;
        Image16by16: string;
        Image32by32: string;
        LoadScript: string;
    }
}