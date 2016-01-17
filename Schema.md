#JS Sites Core Schema
----------


##Root Elements
Here follows the list of root elements available in the JS Sites Core Schema.
  

```json
{
    "Parameters": {},
    "PropertyBagEntries": {},
    "Files": [],
    "Pages": [],
    "Lists": [],
    "CustomActions": [],
    "LocalNavigation": {},
    "ComposedLook": {}
}
```

Element|Type|Description
-------|----|-----------
Parameters|[Parameters](#parameters)|No description available yet
PropertyBagEntries|[PropertyBagEntries](#propertybagentries)|No description available yet
Files|[Files](#files)|No description available yet
Pages|[Pages](#pages)|No description available yet
Lists|[Lists](#lists)|No description available yet
CustomActions|[CustomActions](#customactions)|No description available yet
LocalNavigation|[LocalNavigation](#localnavigation)|No description available yet
ComposedLook|[ComposedLook](#composedlook)|No description available yet


###Parameters



###PropertyBagEntries
```json
     "PropertyBagEntries": {}
```

An Object of key value pairs


###Files
```json
     "Files": []
```

Attibute|Type|Description
--------|----|-----------
Files|Array<[File](#file)>|The File entries of the Files, optional collection of elements

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


###LocalNavigation
```json
     "LocalNavigation": []
```

Attibute|Type|Description
--------|----|-----------
NavigationNodes|Array<[NavigationNode](#navigationnode)>|The NavigationNodes entries of the LocalNavigation, optional collection of elements

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

###ListInstance
Defines a ListInstance element

```json
    {
      "Title": "",
      "Description": "",
      "Url": "",
      "TemplateType": 000,
      "Folders": [],
      "ContentTypeBindings": []
    }
```


Attibute|Type|Description
--------|----|-----------
Title|string|The Title of the List Instance, required attribute
Description|string|The Description of the List Instance, optional attribute
TemplateType|number|The TemplateType of the List Instance, required attribute Values available here: https://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.listtemplatetype.aspx
Url|string|The Url of the List Instance, required attribute
ContentTypeBindings|Array<[ContentTypeBinding](#contenttypebinding)>|The ContentTypeBindings entries of the List Instance, optional collection of elements
Folders|Array<[Folder](#folder)>|The Folders entries of the List Instance, optional collection of elements


###ContentTypeBinding

###Folder

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