# Using js-sites-core
Can be as simple as
```
jQuery.getScript(`${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/js/pzl.sites.core.js`, () => {
    Pzl.Sites.Core.init(siteTemplateConfig, true).then(() => {               
        
    })
});
```