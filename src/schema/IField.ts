module Pzl.Sites.Core.Schema {
    export interface IField {
        ShowInDisplayForm: boolean;
        ShowInEditForm: boolean;
        ShowInNewForm: boolean;
        CanBeDeleted: boolean;
        DefaultValue: string;
        Description: string;
        EnforceUniqueValues: boolean;
        Direction: string;
        EntityPropertyName: string;
        FieldTypeKind: any;
        Filterable: boolean;
        Group: string;
        Hidden: boolean;
        ID: string;
        Indexed: boolean;
        InternalName: string;
        JsLink: string;
        ReadOnlyField: boolean;
        Required: boolean;
        SchemaXml: string;
        StaticName: string;
        Title: string;
        TypeAsString: string;
        TypeDisplayName: string;
        TypeShortDescription: string;
        ValidationFormula: string;
        ValidationMessage: string;
    }
}