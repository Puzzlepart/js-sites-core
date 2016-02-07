#JS Sites Core Schema
----------


##Root Elements
Here follows the list of root elements available in the JS Sites Core Schema.
  

```json
{
    "Parameters": {},
    "Security": {},
    "WebSettings": {},
    "PropertyBagEntries": {},
    "Files": [],
    "Pages": [],
    "Lists": [],
    "CustomActions": [],
    "Navigation": {},
    "ComposedLook": {},
    "Features": []
}
```

Element|Type|Description
-------|----|-----------
Parameters|[Parameters](#parameters)|Parameters used throughout the framework
Security|[Security](#security)|Permissions for the web
WebSettings|[WebSettings](#websettings)|Settings for the web, e.g. Welcome Page and Master Url
PropertyBagEntries|[PropertyBagEntries](#propertybagentries)|Key/Value pairs for the web property bag
Files|[Files](#files)|Files in a SharePoint Web site that can be a Web Parts page, an item in a document library, or a file in a folder
Pages|[Pages](#pages)|Files in a SharePoint Web site (Wiki Pages)
Lists|[Lists](#lists)|Lists on a SharePoint Web site. 
CustomActions|[CustomActions](#customactions)|Custom actions associated with a SharePoint list, Web site, or subsite.
Navigation|[Navigation](#navigation)|Navigation settings
ComposedLook|[ComposedLook](#composedlook)|Composed Look, a package containing a .spcolor and a .spfont file
Features|[Features](#features)|The web features to activate or deactivate


###Parameters
Coming soon.

###WebSettings
```json
     "WebSettings": {
        "WelcomePage": "",
        "AlternateCssUrl": "",
        "SaveSiteAsTemplateEnabled": false,
        "MasterUrl": "",
        "CustomMasterUrl": "",
        "RecycleBinEnabled": false,
        "TreeViewEnabled": true,
        "QuickLaunchEnabled": false
     }
```

Attibute|Type|Description
--------|----|-----------
WelcomePage|string|The WelcomePage attribute of the WebSettings
AlternateCssUrl|string|The AlternateCssUrl attribute of the WebSettings
SaveSiteAsTemplateEnabled|boolean|The SaveSiteAsTemplateEnabled attribute of the WebSettings
MasterUrl|string|The MasterUrl attribute of the WebSettings
CustomMasterUrl|string|The CustomMasterUrl attribute of the WebSettings
RecycleBinEnabled|boolean|The RecycleBinEnabled attribute of the WebSettings
TreeViewEnabled|boolean|The TreeViewEnabled attribute of the WebSettings
QuickLaunchEnabled|boolean|The QuickLaunchEnabled attribute of the WebSettings


###PropertyBagEntries
```json
     "PropertyBagEntries": []
```

Attibute|Type|Description
--------|----|-----------
PropertyBagEntries|Array<[PropertyBagEntry](#propertybagentry)>|The PropertyBagEntries entries of the PropertyBagEntries, optional collection of elements



###Files
```json
     "Files": []
```

Attibute|Type|Description
--------|----|-----------
Files|Array<[File](#file)>|The File entries of the Files, optional collection of elements

###Features
The Web Features to activate or deactivate

```json
     "Features": []
```



###Pages
```json
     "Pages": []
```

Attibute|Type|Description
--------|----|-----------
Pages|Array<[Page](#page)>|The Page entries of the Pages, optional collection of elements



###Lists
The Lists instances of the JS Sites Core Template, optional element

```json
    "Lists": []
```

Element|Type|Description
-------|----|-----------
ListInstance|[ListInstance](#listinstance)|



###CustomActions
```json
     "CustomActions": []
```

Attibute|Type|Description
--------|----|-----------
CustomActions|Array<[CustomAction](#customaction)>|The CustomAction entries of the CustomActions, optional collection of elements



###Navigation
```json
     "UseShared": false,
     "QuickLaunch": []
```

Attibute|Type|Description
--------|----|-----------
UseShared|Array<[NavigationNode](#navigationnode)>|The UseShared entries of the Navigation, optional attribute
QuickLaunch|Array<[NavigationNode](#navigationnode)>|The QuickLaunch entries of the Navigation, optional collection of elements



###ComposedLook
```json
    {
      "ColorPaletteUrl": "",
      "FontSchemeUrl": "",
      "BackgroundImageUrl": ""
    }
```


Attibute|Type|Description
--------|----|-----------
ColorPaletteUrl|string|The ColorPaletteUrl of the Composed Look, required attribute
FontSchemeUrl|string|The FontSchemeUrl of the Composed Look, optional attribute
BackgroundImageUrl|string|The BackgroundImageUrl of the Composed Look, optional attribute

Tokens available

Attibute|Token|Description
--------|----|-----------
ColorPaletteUrl|{themegallery}|URL to the site collection theme gallery
FontSchemeUrl|{themegallery}|URL to the site collection theme gallery



###ListInstance
Defines a ListInstance element

```json
    {
      "Title": "",
      "Description": "",
      "Url": "",
      "TemplateType": 000,
      "EnableVersioning": false,
      "EnableMinorVersions": false,
      "EnableModeration": false,
      "EnableFolderCreation": false,
      "EnableAttachments": false,
      "RemoveExistingContentTypes": false,
      "NoCrawl": false,
      "DefaultDisplayFormUrl": "",
      "DefaultEditFormUrl": "",
      "DefaultNewFormUrl": "",
      "DraftVersionVisibility": "",
      "ImageUrl": "",
      "Hidden": false,
      "ForceCheckout": false,
      "Folders": [],
      "ContentTypeBindings": [],
      "FieldRefs": [],
      "Views": [],
      "DataRows": [],
      "RibbonActions": [],
      "Security": {}
    }
```


Attibute|Type|Description
--------|----|-----------
Title|string|The Title of the List Instance, required attribute
Description|string|The Description of the List Instance, optional attribute
TemplateType|number|The TemplateType of the List Instance, required attribute Values available here: https://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.listtemplatetype.aspx
Url|string|The Url of the List Instance, required attribute
EnableVersioning|boolean|The EnableVersioning of the List Instance, optional attribute
EnableMinorVersions|boolean|The EnableMinorVersions of the List Instance, optional attribute
EnableModeration|boolean|The EnableModeration of the List Instance, optional attribute
EnableFolderCreation|boolean|The EnableFolderCreation of the List Instance, optional attribute
EnableAttachments|boolean|The EnableAttachments of the List Instance, optional attribute
RemoveExistingContentTypes|boolean|The RemoveExistingContentTypes of the List Instance, optional attribute
NoCrawl|boolean|The NoCrawl of the List Instance, optional attribute|
DefaultDisplayFormUrl|string|The DefaultDisplayFormUrl of the List Instance, optional attribute
DefaultEditFormUrl|string|The DefaultEditFormUrl of the List Instance, optional attribute
DefaultNewFormUrl|string|The DefaultNewFormUrl of the List Instance, optional attribute
DraftVersionVisibility|string|The DraftVersionVisibility of the List Instance, optional attribute
ImageUrl|string|The ImageUrl of the List Instance, optional attribute
Hidden|boolean|The Hidden of the List Instance, optional attribute
ForceCheckout|boolean|The ForceCheckout of the List Instance, optional attribute
RemoveExistingContentTypes|boolean|The RemoveExistingContentTypes of the List Instance, optional attribute
ContentTypeBindings|Array<[ContentTypeBinding](#contenttypebinding)>|The ContentTypeBindings entries of the List Instance, optional collection of elements
FieldRefs|Array<[FieldRef](#listinstancefieldref)>|The ContentTypeBindings entries of the List Instance, optional collection of elements
Fields|Array<[Field](#field)>|The Fields entries of the List Instance, optional collection of elements
Folders|Array<[Folder](#folder)>|The Folders entries of the List Instance, optional collection of elements
Views|Array<[View](#view)>|The Views entries of the List Instance, optional collection of elements
DataRows|Array<Object>|The DataRows entries of the List Instance, optional collection of elements
RibbonActions|Array<[RibbonAction](#ribbonaction)>|The RibbonActions entries of the List Instance, optional collection of elements
Security|[Security](#security)|The Security entrie of the List Instance, optional elemenet


###ContentTypeBinding
Defines a ContentTypeBinding element

```json
    {
      "ContentTypeId": ""
    }
```


Attibute|Type|Description
--------|----|-----------
ContentTypeId|string|The ContentTypeId of the ContentTypeBinding, required attribute


###Folder
Defines a Folder element

```json
    {
        "Name": "Agenda",
        "DefaultValues": {}
    }
```


Attibute|Type|Description
--------|----|-----------
Name|string|The Name of the Folder, required attribute
DefaultValues|Key/Value Pair|The DefaultValues of the Folder, optional attribute


###NavigationNode
Defines a NavigationNode element

```json
    {
      "Title": "",
      "Url": ""
    }
```


Attibute|Type|Description
--------|----|-----------
Title|string|The Title of the NavigationNode, required attribute
Url|string|The Url of the NavigationNode, required attribute
Children|Array<[NavigationNode](#navigationnode)>|The Children of the NavigationNode, optional attribute

###CustomAction
Defines a CustomAction element

```json
    {
        "CommandUIExtension": "",
        "Description": "",
        "Group": "",
        "ImageUrl": "",
        "Location": "",
        "Name": "",
        "RegistrationId": "",
        "RegistrationType": "",
        "ScriptBlock": "",
        "ScriptSrc": "",
        "Sequence": 0,
        "Title": "",
        "Url": ""
    }
```


Attibute|Type|Description
--------|----|-----------
CommandUIExtension|string|The CommandUIExtension of the CustomAction, optional attribute
Description|string|The Description of the CustomAction, optional attribute
Group|string|The Group of the CustomAction, optional attribute
ImageUrl|string|The ImageUrl of the CustomAction, optional attribute
Location|string|The Location of the CustomAction, optional attribute
Name|string|The Name of the CustomAction, optional attribute
RegistrationId|string|The RegistrationId of the CustomAction, optional attribute
RegistrationType|string|The RegistrationType of the CustomAction, optional attribute
ScriptBlock|string|The ScriptBlock of the CustomAction, optional attribute
ScriptSrc|string|The ScriptSrc of the CustomAction, optional attribute
Sequence|number|The Sequence of the CustomAction, optional attribute
Title|string|The Title of the CustomAction, optional attribute
Url|string|The Url of the CustomAction, optional attribute


###Security
Defines a Security element

```json
    {
      "BreakRoleInheritance": true,
      "CopyRoleAssignments": true,
      "ClearSubscopes": true,
      "RoleAssignments": []
    }
```


Attibute|Type|Description
--------|----|-----------
BreakRoleInheritance|boolean|The BreakRoleInheritance of the Security
CopyRoleAssignments|boolean|The CopyRoleAssignments of the Security
ClearSubscopes|boolean|The ClearSubscopes of the Security
RoleAssignments|Array<[RoleAssignment](#roleassignment)>|The RoleAssignment entries of the RoleAssignments, optional collection of elements


###RoleAssignment
Defines a RoleAssignment element

```json
    {
     "Principal": "", 
     "RoleDefinition": ""
    }
```


Attibute|Type|Description
--------|----|-----------
Principal|string|The Principal of the RoleAssignment
RoleDefinition|string/number|The RoleDefinition of the RoleAssignment

Tokens available

Attibute|Token|Description
--------|----|-----------
Principal|{associatevisitorgroup}|The associated visitors group of the web
Principal|{associatemembergroup}|The associated members group of the web
Principal|{associateownergroup}|The associated owners group of the web

Role definitions

ID|Name|
--------|----
1073741829|Full Control
1073741828|Design
1073741830|Edit
1073741827|Contribute
1073741826|Read
1073741825|Limited Access
1073741924|View Only


###File
Defines a File element

```json
    {
      "Dest": "",
      "Overwrite": false,
      "Src": "",
      "RemoveExistingWebParts": false,
      "Properties": [],
      "WebParts": [],
      "Views": []
    }
```


Attibute|Type|Description
--------|----|-----------
Dest|string|The Principal of the File, required attribute
Overwrite|boolean|The Overwrite of the File
Src|string|The Src of the File, required attribute
RemoveExistingWebParts|boolean|The RemoveExistingWebParts of the File
Properties|Key/Value Pair|The Properties of the File
WebParts|Array<[WebPart](#webpart)>|The WebPart entries of the File, optional collection of elements
Views|Array<[HiddenView](#hiddenview)>|The Views entries of the File, optional collection of elements

Tokens available

Attibute|Token|Description
--------|----|-----------
Src|{resources}|URL to the resources path at /Resources on site collection


###WebPart
Defines a WebPart element

```json
    {
      "Title": "",
      "Zone": "",
      "Order": 0,
      "Contents": ""
    }
```


Attibute|Type|Description
--------|----|-----------
Title|string|The Title of the WebPart, required attribute
Zone|string|The Zone of the WebPart, required attribute
Order|number|The Order of the WebPart, required attribute
Contents|[Contents](#contents)|The Contents entry of the Web Part, required element


###Contents
Defines a Contents element

```json
    {
      "Xml": "",
      "FileUrl": ""
    }
```


Attibute|Type|Description
--------|----|-----------
Xml|string|The Xml of the Contents
FileUrl|string|The FileUrl of the Contents

Tokens available

Attibute|Token|Description
--------|----|-----------
FileUrl|{resources}|URL to the resources path at /Resources/ on site collection
FileUrl|{webpartgallery}|URL to the web part galleryat /_catalogs/wp on site collection


###View
Defines a View element

```json
    {
      "Title": "",
      "Paged": true,
      "PersonalView": false,
      "Query": "",
      "RowLimit": 10,
      "Scope": 1,
      "SetAsDefaultView": false,
      "ViewFields": [],
      "ViewTypeKind": ""
    }
```


Attibute|Type|Description
--------|----|-----------
Title|string|The Title of the View
Paged|boolean|The Paged of the View
PersonalView|boolean|The PersonalView of the View
Query|string|The Query of the View
RowLimit|number|The RowLimit of the View
Scope|number|The Scope of the View
SetAsDefaultView|boolean|The SetAsDefaultView of the View
ViewFields|Array<string>|The ViewFields of the View
ViewTypeKind|string|The ViewTypeKind of the View

Scope

Value|Description
--------|----
0|DefaultValue
1|Recursive
2|RecursiveAll
3|FilesOnly


###HiddenView
Defines a HiddenView element

```json
    {
      "List": "",
      "Paged": true,
      "Query": "",
      "Scope": 1,
      "RowLimit": 10,
      "ViewFields": []
    }
```


Attibute|Type|Description
--------|----|-----------
List|string|The Title of the HiddenView
Paged|boolean|The Paged of the HiddenView
Query|string|The Query of the HiddenView
Scope|number|The Scope of the View
RowLimit|number|The RowLimit of the HiddenView
ViewFields|Array<string>|The ViewFields of the HiddenView

Scope

Value|Description
--------|----
0|DefaultValue
1|Recursive
2|RecursiveAll
3|FilesOnly


##ListInstanceFieldRef
Defines a ListInstanceFieldRef element

```json
    {
      "Name": ""
    }
```


Attibute|Type|Description
--------|----|-----------
Name|string|The Name of the ListInstanceFieldRef, required attribute


##Field
Defines a Field element

All properties for SP.Field are supported.

https://msdn.microsoft.com/en-us/library/office/aa979575.aspx


##PropertyBagEntry
Defines a PropertyBagEntry element

```json
    {
      "Key": "",
      "Value": "",
      "Indexed": true
    }
```


Attibute|Type|Description
--------|----|-----------
Key|string|The Key of the PropertyBagEntry, required attribute
Value|string|The Value of the PropertyBagEntry, required attribute
Indexed|boolean|The Indexed of the PropertyBagEntry, optional attribute

###Feature
Defines a single Web Feature, which will be activated or deactivated

```json
    {
      "ID": "",
      "Deactivate": false,
      "Description": ""
    }
```


Here follow the available attributes for the Feature element.


Attibute|Type|Description
--------|----|-----------
ID|string|The unique ID of the Feature, required attribute
Deactivate|boolean|Defines if the feature has to be deactivated or activated
Description|string|The Description of the feature, optional attribute

###RibbonAction
Defines a RibbonAction element

```json
    {
        "Location": "",
        "Control": "",
        "Name": "",
        "Description": "",
        "Sequence": 5,
        "Group": "",
        "LabelText": "",
        "Image16by16": "",
        "Image32by32": "",
        "LoadScript": ""
    }
```


Here follow the available attributes for the RibbonAction element.


Attibute|Type|Description
--------|----|-----------
Location|string||The Location of the RibbonAction, required attribute
Control|string||The Control of the RibbonAction, required attribute
Name|string||The Name of the RibbonAction, required attribute
Description|string||The Description of the RibbonAction, required attribute
Sequence|number||The Sequence of the RibbonAction, required attribute
Group|string||The Group of the RibbonAction, required attribute
LabelText|string||The LabelText of the RibbonAction, required attribute
Image16by16|string||The Image16by16 of the RibbonAction, optional attribute
Image32by32|string||The Image32by32 of the RibbonAction, optional attribute
LoadScript|string||The LoadScript of the RibbonAction, required attribute