```json
{
    "Parameters": {
        "_JsSitesCore_Template": "Full_Sample_Template"
    },
    "PropertyBagEntries": {
        "_JsSitesCore_Template": "Full_Sample_Template"
    },
    "Files": [
        {
            "Dest": "SitePages/Home.aspx",
            "Overwrite": true,
            "Src": "{resources}/SitePages/Home.txt",
            "RemoveExistingWebParts": true,
            "Properties": { 
                "ContentTypeId": "0x010109010092214CADC5FC4262A177C632F516412E"
            },
            "WebParts": [
                {
                "Title": "Image Viewer",
                "Zone": "LeftColumn",
                "Order": 0,
                "Xml": "<?xml version=\"1.0\" encoding=\"utf-8\"?><WebPart xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://schemas.microsoft.com/WebPart/v2\"><Title>Image Viewer</Title><FrameType>None</FrameType><Assembly>Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly><TypeName>Microsoft.SharePoint.WebPartPages.ImageWebPart</TypeName><ImageLink xmlns=\"http://schemas.microsoft.com/WebPart/v2/Image\" /><AlternativeText xmlns=\"http://schemas.microsoft.com/WebPart/v2/Image\" /><VerticalAlignment xmlns=\"http://schemas.microsoft.com/WebPart/v2/Image\">Middle</VerticalAlignment><HorizontalAlignment xmlns=\"http://schemas.microsoft.com/WebPart/v2/Image\">Center</HorizontalAlignment><BackgroundColor xmlns=\"http://schemas.microsoft.com/WebPart/v2/Image\">transparent</BackgroundColor></WebPart>"
                }
            ]
        }
    ],
    "Pages": [
         {
            "Url": "SitePages/MyWikiPage.aspx",
            "Overwrite": true
         }
    ],
    "Lists": [
        {
            "Title": "Internal Documents",
            "Url": "InternalDocuments",
            "TemplateType": 101,
            "Security": {
                "BreakRoleInheritance": true,
                "CopyRoleAssignments": true,
                "ClearSubscopes": true,
                "RoleAssignments": [
                    { "Principal": "{associatemembergroup}", "RoleDefinition": "Contribute" },
                    { "Principal": "{associateownergroup}", "RoleDefinition": "Full Control" }
                ]
            },
            "Folders": [
                {
                "Name": "Agenda",
                "DefaultValues": {
                    "PortDocumentCategory": "-1;#Agenda|bdbd7af3-45ea-4993-a243-be91c0e5a6a8"
                }
                },
                {
                "Name": "Agreements",
                "DefaultValues": {
                    "PortDocumentCategory": "-1;#Agreements|6689b4c-d2d0-43fa-b916-2e7698b8387d"
                }
                }
            ],
            "ContentTypeBindings": [
                {
                "ContentTypeId": "0x010100B3337B3CDC314FF2B8BC5F38977EDBF0"
                }
            ]
        }
    ],
    "CustomActions": [
         {
            "Location": "ScriptLink",
            "Seqeuence": 10,
            "ScriptSrc": "~sitecollection/SiteAssets/js/script.js",
            "Name": "script.js",
            "Title": "script.js"
        }
    ],
    "LocalNavigation": [
        {
            "Url": "",
            "Title": "Home"
        },
        {
            "Url": "",
            "Title": "Notebook"
        },
        {
            "Url": "Documents",
            "Title": "Documents"
        }
    ],
    "ComposedLook": {
        "ColorPaletteUrl": "{ThemeGallery}/Palette008.spcolor",
        "FontSchemeUrl": "{ThemeGallery}/SharePointPersonality.spfont"
    }
}
```