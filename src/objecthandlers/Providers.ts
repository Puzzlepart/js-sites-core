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

                        promises.push((fileName, fileRef, funcName, funcParams) => {
                            SP.SOD.registerSod(fileName, fileRef);
                            var fDef = jQuery.Deferred();
                            EnsureScriptFunc(fileName, null, () => {
                                jQuery.when(
                                    this[funcName].apply(this, funcParams)
                                ).then(() => {
                                    fDef.resolve();
                                });
                            }, fileName);
                            return fDef.promise();
                        });
                    }
                }
            });

            jQuery.when.apply(null, promises).then(() => {
                def.resolve();
            })

            return def.promise();
        }
    }
}