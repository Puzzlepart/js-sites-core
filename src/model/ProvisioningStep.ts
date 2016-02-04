/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="..\pzl.sites.core.d.ts" />
/// <reference path="..\resources\pzl.sites.core.resources.ts" />

module Pzl.Sites.Core.Model {
    export class ProvisioningStep {
        name :string;
        index: number;
        objects: any;
        parameters: any;
        handler: any;
        
        execute(dependentPromise?) {
            var _handler = new this.handler();
            if(!dependentPromise) {
                return _handler.ProvisionObjects(this.objects, this.parameters);
            }
            var def = jQuery.Deferred();
            dependentPromise.done(() => {
                UpdateProgress(this.index, this.name);
                return _handler.ProvisionObjects(this.objects, this.parameters).done(def.resolve);
            });
            return def.promise();
        }
        
        constructor(name : string, index : number, objects: any, parameters: any, handler : any) {
            this.name = name;
            this.index = index;
            this.objects = objects;
            this.parameters = parameters;
            this.handler = handler;
        }
    }
}