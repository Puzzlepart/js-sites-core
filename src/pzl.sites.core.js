/// <reference path="..\typings\tsd.d.ts" />
/// <reference path="schema/ISiteSchema.ts" />
/// <reference path="objecthandlers/Lists.ts" />
/// <reference path="objecthandlers/ComposedLook.ts" />
/// <reference path="objecthandlers/Files.ts" />
/// <reference path="objecthandlers/Pages.ts" />
/// <reference path="objecthandlers/CustomActions.ts" />
/// <reference path="objecthandlers/PropertyBagEntries.ts" />
/// <reference path="objecthandlers/WebSettings.ts" />
/// <reference path="objecthandlers/Security.ts" />
/// <reference path="utilities/Logger.ts" />
/// <reference path="model/TemplateQueueItem.ts" />
/// <reference path="model/ILoggingOptions.ts" />
var Pzl;
(function (Pzl) {
    var Sites;
    (function (Sites) {
        var Core;
        (function (Core) {
            var startTime = null;
            var setupWebDialog;
            function ShowWaitMessage(header, content, height, width) {
                setupWebDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose(header, content, height, width);
            }
            function getSetupQueue(json) {
                return Object.keys(json);
            }
            function start(json, queue) {
                var def = jQuery.Deferred();
                startTime = new Date().getTime();
                Core.Log.Information("Provisioning", "Starting at URL '" + _spPageContextInfo.webServerRelativeUrl + "'");
                var queueItems = [];
                queue.forEach(function (q, index) {
                    if (!Core.ObjectHandlers[q])
                        return;
                    queueItems.push(new Core.Model.TemplateQueueItem(q, index, json[q], json["Parameters"], new Core.ObjectHandlers[q]().ProvisionObjects));
                });
                var promises = [];
                promises.push(jQuery.Deferred());
                promises[0].resolve();
                promises[0].promise();
                var index = 1;
                while (queueItems[index - 1] != undefined) {
                    var i = promises.length - 1;
                    promises.push(queueItems[index - 1].execute(promises[i]));
                    index++;
                }
                ;
                jQuery.when.apply(jQuery, promises).done(function () {
                    def.resolve();
                });
                return def.promise();
            }
            function init(template, loggingOptions) {
                var def = jQuery.Deferred();
                ShowWaitMessage("Applying template", "This might take a moment..", 130, 600);
                Core.Log = new Core.Logger(loggingOptions);
                var queue = getSetupQueue(template);
                start(template, queue).then(function () {
                    var provisioningTime = ((new Date().getTime()) - startTime) / 1000;
                    Core.Log.Information("Provisioning", "All done in " + provisioningTime + " seconds");
                    Core.Log.SaveToFile().then(function () {
                        setupWebDialog.close(null);
                        def.resolve();
                    });
                });
                return def.promise();
            }
            Core.init = init;
        })(Core = Sites.Core || (Sites.Core = {}));
    })(Sites = Pzl.Sites || (Pzl.Sites = {}));
})(Pzl || (Pzl = {}));
