/// <reference path="..\..\typings\tsd.d.ts" />
module Pzl.Sites.Core.Utilities {
    export class Sequencer {
        functions: Array<any>;
        parameter: any;
        scope: any;
        index = 0;
        constructor(__functions: Array<any>, __parameter: any, __scope: any) {
            this.parameter = __parameter;
            this.scope = __scope;
            this.functions = this.deferredArray(__functions);
        }
        init(callback: Function) {
            var promises = [];
            promises.push(jQuery.Deferred());
            promises[0].resolve();
            promises[0].promise();
            var index = 1;
            while (this.functions[index - 1] != undefined) {
                var i = promises.length - 1;
                promises.push(this.functions[index - 1].execute(promises[i]));
                index++;
            };
            jQuery.when.apply(jQuery, promises).done(callback);
        }
        private deferredArray(__functions: Array<any>) {
            var functions = [];
            __functions.forEach(f => {
                functions.push(new DeferredObject(f, this.parameter, this.scope));
            });
            return functions;
        }
    }
    class DeferredObject {
        func: any;
        parameter: any;
        scope: any;
        constructor(func, parameter, scope) {
            this.func = func;
            this.parameter = parameter;
            this.scope = scope;
        }
        execute(depFunc?) {
            if (!depFunc) {
                return this.func.apply(this.scope, [this.parameter]);
            }
            var def = jQuery.Deferred();
            depFunc.done(() => {
                this.func.apply(this.scope, [this.parameter]).done(def.resolve);
            });
            return def.promise();
        }
    }
}