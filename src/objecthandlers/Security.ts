/// <reference path="..\..\typings\tsd.d.ts" />
/// <reference path="..\model\ObjectHandlerBase.ts" />
/// <reference path="..\schema\ISecurity.ts" />
/// <reference path="..\pzl.sites.core.d.ts" />
/// <reference path="..\resources\pzl.sites.core.resources.ts" />

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
                        var principal = null;
                        if (ra.Principal.match(/\{[A-Za-z]*\}+/g)) {
                            var token = ra.Principal.substring(1, ra.Principal.length - 1);
                            var groupId = rootSiteProperties.get_fieldValues()[`vti_${token}`];
                            principal = rootSiteGroups.getById(groupId);
                        } else {
                            principal = rootSiteGroups.getByName(principal);
                        }
                        web.get_roleAssignments().add(principal, roleBindings); 
                    });
                    web.update();
                    clientContext.executeQueryAsync(
                        () => {  
                            Core.Log.Information(this.name, Resources.Code_execution_ended);
                            def.resolve();
                        },
                        (sender, args) => {     
                            Core.Log.Error(this.name, `${args.get_message()}`);                                             
                            Core.Log.Information(this.name, Resources.Code_execution_ended);
                            def.resolve(sender, args);
                        });
                },
                (sender, args) => {                    
                    Core.Log.Error(this.name, `${args.get_message()}`);                      
                    Core.Log.Information(this.name, Resources.Code_execution_ended);
                    def.resolve(sender, args);
                });
            
            return def.promise();
        }
    } 
}