/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="../model/ILoggingOptions.ts" />

module Pzl.Sites.Core {
    export class Logger  {
        array: Array<string>;
        loggingOptions: Model.ILoggingOptions;
        
        constructor(loggingOptions : Model.ILoggingOptions) {
            this.array = [];
            this.loggingOptions = loggingOptions;
        }
        
        loggerEnabled() {
            return (console && console.log);
        }
        
        Information(objectHandler: string, msg : string) {
            if(!this.loggingOptions) return;
            var logMsg = `${new Date()} || ${objectHandler} || ${msg}`;
            if(this.loggerEnabled && this.loggingOptions.On) {
                console.log(logMsg);
            }
            this.array.push(logMsg);
        }
        Error(objectHandler: string, msg : string) {
            if(!this.loggingOptions) return;
            var logMsg = `${new Date()} || ${objectHandler} || ${msg}`;
            if(this.loggerEnabled && this.loggingOptions.On) {
                console.log(logMsg);
            }
            this.array.push(logMsg);
        }
        
        SaveToFile() {            
            var def = jQuery.Deferred();
            if(!this.loggingOptions || !this.loggingOptions.LoggingFolder) {
                def.resolve();
                return def.promise();
            }            
            
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_site().get_rootWeb();

            var fileCreateInfo = new SP.FileCreationInformation();
            fileCreateInfo.set_url(`${new Date().getTime()}.txt`);
            fileCreateInfo.set_content(new SP.Base64EncodedByteArray());
            var fileContent = this.array.join("\n");

            for (var i = 0; i < fileContent.length; i++) {
                
                fileCreateInfo.get_content().append(fileContent.charCodeAt(i));
            }

            clientContext.load(web.getFolderByServerRelativeUrl(this.loggingOptions.LoggingFolder).get_files().add(fileCreateInfo));
            clientContext.executeQueryAsync(
              () => {
                  def.resolve();
              },
              (sender, args) => {
                  def.resolve(sender, args);
              }
            );
            return def.promise();
        }
    } 
}