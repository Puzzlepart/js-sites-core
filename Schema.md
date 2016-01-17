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



###Files


###Pages



###Lists
The Lists instances of the JS Sites Core Template, optional element

```json
    "Lists": []
```

Element|Type|Description
-------|----|-----------
ListInstance|[ListInstance](#listinstance)|

###CustomActions



###LocalNavigation



###ComposedLook




###ListInstance
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


Here follow the available child elements for the ListInstance element.


Element|Type|Description
-------|----|-----------
ContentTypeBindings|[ContentTypeBindings](#contenttypebindings)|The ContentTypeBindings entries of the List Instance, optional collection of elements
Folders|[Folders](#Folders)|The Folders entries of the List Instance, optional collection of elements

Here follow the available attributes for the ListInstance element.


Attibute|Type|Description
--------|----|-----------
Title|xsd:string|The Title of the List Instance, required attribute
Description|xsd:string|The Description of the List Instance, optional attribute
TemplateType|xsd:int|The TemplateType of the List Instance, required attribute Values available here: https://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.listtemplatetype.aspx
Url|xsd:string|The Url of the List Instance, required attribute