# Using js-sites-core
Can be as simple as
```
jQuery.getScript(`${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/js/pzl.sites.core.js`, () => {
    Pzl.Sites.Core.init(siteTemplateConfig, { "On": true }).then(() => {               
        
    })
});
```

or with logging to file
```
jQuery.getScript(`${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/js/pzl.sites.core.js`, () => {
    Pzl.Sites.Core.init(siteTemplateConfig, { "On": true, "LoggingFolder": _spPageContextInfo.siteServerRelativeUrl + "/SiteAssets/logs" }).then(() => {               
        
    })
});
```


# Schema
[Schema 1.4.0](Schema-1.4.0.md)