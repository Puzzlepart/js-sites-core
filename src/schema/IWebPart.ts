/// <reference path="IContents.ts" />

module Pzl.Sites.Core.Schema {
    export interface IWebPart {
        Title: string;
        Order: number;
        Zone: string;
        Row: number;
        Column: number;
        Contents: IContents;
    }
}