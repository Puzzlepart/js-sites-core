/// <reference path="..\..\typings\tsd.d.ts" />
module Pzl.Sites.Core.Utilities {
    export class Sequencer {
        functions: Array<any>;
        parameter: any;
        index = 0;
        constructor(__functions: Array<any>, __parameter: any) {
            this.parameter = __parameter;
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
                functions.push(new DeferredObject(f, this.parameter));
            });
            return functions;
        }
    }
    class DeferredObject {
        func: any;
        parameter: any;
        constructor(func, parameter) {
            this.func = func;
            this.parameter = parameter;
        }
        execute(dependentPromise?) {
            if (!dependentPromise) {
                return this.func.apply(null, [this.parameter]);
            }
            var def = jQuery.Deferred();
            dependentPromise.done(() => {
                this.func.apply(null, [this.parameter]).done(def.resolve);
            });
            return def.promise();
        }
    }
}