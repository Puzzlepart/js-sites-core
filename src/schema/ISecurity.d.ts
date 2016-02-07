/// <reference path="schema.d.ts" />
declare module Pzl.Sites.Core.Schema {
    interface ISecurity {
        BreakRoleInheritance: boolean;
        CopyRoleAssignments : boolean;
        ClearSubscopes : boolean;
        RoleDefinitions: Array<IRoleDefinition>;
        RoleAssignments: Array<IRoleAssignment>;
    }
}