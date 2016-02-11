/// <reference path="..\model\ObjectHandlerBase.ts" />
"use strict";


module Pzl.Sites.Core.ObjectHandlers {
    export class Security extends Model.ObjectHandlerBase {
       constructor() {
            super("Security")
      }
      ProvisionObjects(object : Schema.ISecurity) {
            Core.Log.Information(this.name, Resources.Code_execution_started);
            var def = jQuery.Deferred();       
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();     
            if(object.BreakRoleInheritance) {
                web.breakRoleInheritance(object.CopyRoleAssignments, object.ClearSubscopes);
                web.update();
            }
            var rootSiteProperties = clientContext.get_site().get_rootWeb().get_allProperties();
            var rootSiteGroups = clientContext.get_site().get_rootWeb().get_siteGroups();
            var rootSiteRoleDefinitions = clientContext.get_site().get_rootWeb().get_roleDefinitions();

            clientContext.load(rootSiteProperties);
            clientContext.load(rootSiteGroups);
            clientContext.load(rootSiteRoleDefinitions);
            clientContext.executeQueryAsync(
                () => {  
                    if(!object.RoleAssignments || object.RoleAssignments.length == 0) {                        
                        Core.Log.Information(this.name, Resources.Code_execution_ended);
                        def.resolve();
                    }
                    object.RoleAssignments.forEach(ra => {
                        var roleDef = null;
                        if (typeof ra.RoleDefinition == "number") {
                            roleDef = rootSiteRoleDefinitions.getById(ra.RoleDefinition);
                        } else {
                            roleDef = rootSiteRoleDefinitions.getByName(ra.RoleDefinition);
                        }
                        var roleBindings = SP.RoleDefinitionBindingCollection.newObject(clientContext);
                        roleBindings.add(roleDef);
                        var principal = this.ParseGroupPrincipal(rootSiteGroups, rootSiteProperties, ra.Principal);
                        web.get_roleAssignments().add(principal, roleBindings); 
                    });
                    web.update();
                    clientContext.executeQueryAsync(
                        () => {  
                            Core.Log.Information(this.name, Resources.Code_execution_ended);
                            def.resolve();
                        },
                        (sender, args) => {                                             
                            Core.Log.Information(this.name, Resources.Code_execution_ended);          
                            Core.Log.Error(this.name, args.get_message());        
                            def.resolve(sender, args);
                        });
                },
                (sender, args) => {                 
                    Core.Log.Information(this.name, Resources.Code_execution_ended);                 
                    Core.Log.Error(this.name, args.get_message());        
                    def.resolve(sender, args);
                });
            
            return def.promise();
        }
        
        private ParseGroupPrincipal(siteGroups : SP.GroupCollection, properties: any, principal: any) {
            if (principal.match(/\{[A-Za-z]*\}+/g)) {
                var token = principal.substring(1, principal.length - 1);
                var groupId = properties.get_fieldValues()[`vti_${token}`];
                return siteGroups.getById(groupId);
            } else {
                return siteGroups.getByName(principal);
            }
        }
    } 
}