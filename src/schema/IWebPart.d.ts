/// <reference path="schema.d.ts"" />
declare module Pzl.Sites.Core.Schema {
    export interface IWebPart {
        Title: string;
        Order: number;
        Zone: string;
        Row: number;
        Column: number;
        Contents: IContents;
    }
}