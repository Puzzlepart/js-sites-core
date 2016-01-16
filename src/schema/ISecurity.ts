/// <reference path="IRoleDefinition.ts" />
/// <reference path="IRoleAssignment.ts" />

module Pzl.Sites.Core.Schema {
    export interface ISecurity {
        BreakRoleInheritance: boolean;
        CopyRoleAssignments : boolean;
        ClearSubscopes : boolean;
        RoleDefinitions: Array<IRoleDefinition>;
        RoleAssignments: Array<IRoleAssignment>;
    }
}