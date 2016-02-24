/// <reference path="..\utilities\utilities.d.ts" />
declare module Pzl.Sites.Core.Model {
    interface IObjectHandler {
        name: string;        
        tokenParser: Pzl.Sites.Core.Utilities.TokenParser;
        ProvisionObjects(objects, parameters?);
    }
}
