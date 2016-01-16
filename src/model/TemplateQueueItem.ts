/// <reference path="..\..\typings\tsd.d.ts" />

module Pzl.Sites.Core.Model {
    export class TemplateQueueItem {
        name :string;
        index: number;
        objects: any;
        parameters: any;
        callback: Function;
        execute(dependentPromise?) {
            if(!dependentPromise) {
                return this.callback(this.objects, this.parameters);
            }
            var def = jQuery.Deferred();
            dependentPromise.done(() => {
                return this.callback(this.objects, this.parameters).done(function () {
                    def.resolve();
                });
            });
            return def.promise();
        }
        
        constructor(name : string, index : number, objects: any, parameters: any, callback : Function) {
            this.name = name;
            this.index = index;
            this.objects = objects;
            this.parameters = parameters;
            this.callback = callback;
        }
    }
}