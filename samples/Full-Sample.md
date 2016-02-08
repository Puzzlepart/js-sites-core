```json
{
  "Parameters": {
    "_JsSitesCore_Template": "Full_Sample_Template"
  },
  "PropertyBagEntries": [
    {
      "Key": "_JsSitesCore_Template",
      "Value": "Full_Sample_Template",
      "Indexed": true
    },
    {
      "Key": "_JsSitesCore_Template",
      "Value": "0.1.0.0",
      "Indexed": true
    }
  ],
  "WebSettings": {
    "WelcomePage": "SitePages/Homepage.aspx"
  },
  "Files": [
    {
      "Dest": "SitePages/Homepage.aspx",
      "Overwrite": true,
      "Src": "{resources}/SitePages/Homepage.txt",
      "RemoveExistingWebParts": true,
      "Properties": {
        "ContentTypeId": "0x010109010092214CADC5FC4262A177C632F516412E"
      },
      "WebParts": [
        {
          "Title": "Image Viewer",
          "Zone": "LeftColumn",
          "Order": 0,
          "Contents": {
            "Xml": "<?xml version=\"1.0\" encoding=\"utf-8\"?><WebPart xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://schemas.microsoft.com/WebPart/v2\"><Title>Image Viewer</Title><FrameType>None</FrameType><Assembly>Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly><TypeName>Microsoft.SharePoint.WebPartPages.ImageWebPart</TypeName><ImageLink xmlns=\"http://schemas.microsoft.com/WebPart/v2/Image\" /><AlternativeText xmlns=\"http://schemas.microsoft.com/WebPart/v2/Image\" /><VerticalAlignment xmlns=\"http://schemas.microsoft.com/WebPart/v2/Image\">Middle</VerticalAlignment><HorizontalAlignment xmlns=\"http://schemas.microsoft.com/WebPart/v2/Image\">Center</HorizontalAlignment><BackgroundColor xmlns=\"http://schemas.microsoft.com/WebPart/v2/Image\">transparent</BackgroundColor></WebPart>"
          }
        },
        {
          "Title": "SiteFeed",
          "Zone": "LeftColumn",
          "Order": 1,
          "Contents": {
            "FileUrl": "{webpartgallery}/SiteFeed.dwp"
          }
        },
        {
          "Title": "MyWebPart",
          "Zone": "RightColumn",
          "Order": 0,
          "Contents": {
            "FileUrl": "{resources}/WebParts/MyWebPart.txt"
          }
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
          {
            "Principal": "{associatevisitorgroup}",
            "RoleDefinition": 1073741826
          },
          {
            "Principal": "{associatemembergroup}",
            "RoleDefinition": "Contribute"
          },
          {
            "Principal": "{associateownergroup}",
            "RoleDefinition": "Full Control"
          }
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
      ],
      "RibbonActions": [
        {
          "Location": "CommandUI.Ribbon",
          "Control": "Ribbon.Documents",
          "Name": "ArchiveDocs",
          "Description": "",
          "Sequence": 5,
          "Group": "Archiving",
          "LabelText": "Archive documents",
          "Image16by16": "",
          "Image32by32": "",
          "LoadScript": "~sitecollection/siteasset/js"
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
  "Navigation": {
    "UseShared": "true",
    "QuickLaunch": [
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
    ]
  },
  "ComposedLook": {
    "ColorPaletteUrl": "{themegallery}/Palette008.spcolor",
    "FontSchemeUrl": "{themegallery}/SharePointPersonality.spfont"
  }
}
```
