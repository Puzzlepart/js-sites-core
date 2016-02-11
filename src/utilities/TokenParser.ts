/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="..\model\ObjectHandlerBase.ts" />
/// <reference path="..\schema\schema.d.ts" />
/// <reference path="..\pzl.sites.core.d.ts" />
/// <reference path="..\resources\pzl.sites.core.resources.ts" />
/// <reference path="..\utilities\RestHelper.ts" />

module Pzl.Sites.Core.Utilities {
    export class TokenParser {
        private getTokenValue(textString: string) {
            return textString.replace("{{", "").replace("}}", "").split(":")[1];
        }
        private getTokenKey(textString: string) {
            return textString.replace("{{", "").replace("}}", "").split(":")[0];
        }
        
        public ReplaceListTokens(textString: string) {
            var def = jQuery.Deferred();

            var clientContext = SP.ClientContext.get_current();
            var lists = clientContext.get_web().get_lists();
            
            clientContext.load(lists, 'Include(Title,Id)');
            clientContext.executeQueryAsync(() => {
                var replacedString = this.ReplaceListTokensFromListCollection(textString, lists.get_data());
                def.resolve(replacedString);
            });
            
            return def.promise();
        }
        public ReplaceListTokensFromListCollection(textString: string, lists: Array<SP.List>) {
            var parsedString = textString;
            var listMatches = textString.match(/{{[listId:]+[\S]*}}/g);
            
            if (listMatches) {
                listMatches.forEach(element => {
                    var listName = this.getTokenValue(element.toString());
                    var existingObj: SP.List = jQuery.grep(lists, (list) => {
                        return list.get_title() == listName;
                    })[0];
                    if (existingObj) parsedString = parsedString.replace(element.toString(), "{" + existingObj.get_id().toString() + "}");
                });
            }
            return parsedString;
        }
        public ReplaceUrlTokens(url: string) {
            return url.replace(/{resources}/g, `${_spPageContextInfo.siteAbsoluteUrl}/resources`)
                      .replace(/{webpartgallery}/g, `${_spPageContextInfo.siteAbsoluteUrl}/_catalogs/wp`)
                      .replace(/{site}/g, _spPageContextInfo.webServerRelativeUrl)                      
                      .replace(/{sitecollection}/g, _spPageContextInfo.siteAbsoluteUrl);
        }
    }
}