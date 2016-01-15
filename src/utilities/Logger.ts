module Pzl.Sites.Core {
    export class Logger  {
        debug: Boolean;
        
        constructor(debug: Boolean) {
            this.debug = debug;
        }
        
        loggerEnabled() {
            return (console && console.log);
        }
        
        Information(objectHandler: string, msg : string) {
            if(this.loggerEnabled && this.debug) {
                console.log(`${new Date()} || ${objectHandler} || ${msg}`);
            }
        }
        Error(objectHandler: string, msg : string) {
            if(this.loggerEnabled && this.debug) {
                console.error(`${new Date()} || ${objectHandler} || ${msg}`);
            }
        }
    } 
}