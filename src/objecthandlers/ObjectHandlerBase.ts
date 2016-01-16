/// <reference path="IObjectHandler.ts" />

module Pzl.Sites.Core.ObjectHandlers {
    export class ObjectHandlerBase implements IObjectHandler {
        name: string;
        constructor(name : string) {
            this.name = name;
        }
        ProvisionObjects(objects) {}
    }
}