/// <reference path="..\resources\pzl.sites.core.resources.ts" />
/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="..\model\model.d.ts" />
/// <reference path="..\helpers\helpers.d.ts" />
/// <reference path="..\schema\schema.d.ts" />
/// <reference path="..\pzl.sites.core.d.ts" />
module Pzl.Sites.Core.Model {
    export class ObjectHandlerBase implements IObjectHandler {
        name: string;
        tokenParser: Pzl.Sites.Core.Utilities.TokenParser;
        constructor(name : string) {
            this.name = name;
            this.tokenParser = new Pzl.Sites.Core.Utilities.TokenParser();
        }
        ProvisionObjects(objects, parameters?) {}
    }
}
