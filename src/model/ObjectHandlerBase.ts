/// <reference path="IObjectHandler.ts" />

module Pzl.Sites.Core.Model {
    export class ObjectHandlerBase implements IObjectHandler {
        name: string;
        constructor(name : string) {
            this.name = name;
        }
        ProvisionObjects(objects, parameters?) {}
    }
}