/// <reference path="schema.d.ts" />
declare module Pzl.Sites.Core.Schema {
    interface IProvider {
        Enabled: boolean;
        HandlerType: string;
        Configuration: IConfiguration;
    }
}