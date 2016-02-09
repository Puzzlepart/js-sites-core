# JS Sites Core
SharePoint Provisioning engine with pure JavaScript inspired by https://github.com/OfficeDev/PnP-Sites-Core/

*Size:* 105 kB (43 kB minified)

# Using js-sites-core
Can be as simple as
```
jQuery.getScript(`${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/js/pzl.sites.core.js`, () => {
    Pzl.Sites.Core.init(siteTemplateConfig, { "Logging": { "On": true } }).then(() => {               

    })
});
```

or with logging to file

```
jQuery.getScript(`${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/js/pzl.sites.core.js`, () => {
    Pzl.Sites.Core.init(siteTemplateConfig, { "Logging": { "On": true, "LoggingFolder": _spPageContextInfo.siteServerRelativeUrl + "/SiteAssets/logs" } }).then(() => {               

    })
});
```

with customized wait message

```
jQuery.getScript(`${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/js/pzl.sites.core.js`, () => {
    Pzl.Sites.Core.init(siteTemplateConfig,
    {
        "WaitMessage": { "Header": "Working on it..", "Content": "Won't take long mate!" },  
        "Logging": { "On": true, "LoggingFolder": _spPageContextInfo.siteServerRelativeUrl + "/SiteAssets/logs" }
    }
    ).then(() => {               

    })
});
```
# Bower
js-sites-core is available through bower.

Package information
```powershell
    bower info js-sites-core
```

Install package
```powershell
    bower install js-sites-core
```

# Schema
Schema is inspired by https://github.com/OfficeDev/PnP-Provisioning-Schema

Most of the differences are due to the available CSOM attributes and functions.

[Schema Documentation](dist/schema.md)

[Schema](dist/schema.json)

Your template can be tested here: http://jsonschemalint.com/draft4/

# Samples
[Full Sample](samples/Full-Sample.md)
