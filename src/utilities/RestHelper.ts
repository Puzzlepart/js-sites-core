/// <reference path="..\..\typings\tsd.d.ts" />
module Pzl.Sites.Core.Utilities {
    export class RestHelper {
        headers: Object;
        
        constructor() {
            this.headers = { accept: 'application/json;odata=verbose' };
        }
        
        getListData(baseUrl: string, listTitle: string) {
            return this.get(`${baseUrl}/_api/web/lists/getByTitle('${listTitle}')/Items`);
        }
        
        private get(url: string) {
            return jQuery.ajax({ url: url, type: 'get', headers: this.headers });
        }
    }
}