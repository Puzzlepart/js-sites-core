/// <reference path="..\model\ObjectHandlerBase.ts" />
"use strict";

module Pzl.Sites.Core.ObjectHandlers {
    export class Providers extends Model.ObjectHandlerBase {
        constructor() {
            super("Providers")
        }
        ProvisionObjects(objects: Array<Schema.IProvider>) {
            Core.Log.Information(this.name, Resources.Code_execution_started);

            var def = jQuery.Deferred();

            var promises = [];
            objects.forEach(o => {
                if (o.Enabled) {
                    if (o.HandlerType === "JavaScript" && o.Configuration) {
                        var fileRef = this.tokenParser.ReplaceUrlTokens(o.Configuration.FileRef);
                        var fileName = fileRef.split('/').pop()
                        var funcName = o.Configuration.Func;
                        var funcParams = [];
                        o.Configuration.FuncParams.forEach((param) => {
                            funcParams.push(this.tokenParser.ReplaceUrlTokens(param));
                        });
                        Core.Log.Information(this.name, Resources.Providers_Queuing_Provider_JavaScript_function);
                        promises.push(this.ExecuteFunc(fileName, fileRef, funcName, funcParams));
                    }
                }
            });

            jQuery.when.apply(null, promises).then(() => {
                def.resolve();
            });

            return def.promise();
        }
        private ExecuteFunc(fileName:string, fileRef:string, funcName:string, funcParams:Array<any>) {
            SP.SOD.registerSod(fileName, fileRef);
            var fDef = jQuery.Deferred();
            EnsureScriptFunc(fileName, null, () => {
                Core.Log.Information(this.name, Resources.Providers_Loaded_Referenced_Script_Calling_Method);
                jQuery.when(
                    eval(funcName).apply(this, funcParams)
                ).then(() => {
                    fDef.resolve();
                });
            });
            return fDef.promise();
        }
    }
}