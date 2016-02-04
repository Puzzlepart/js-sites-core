tsc --out ..\dist\pzl.sites.core.js .\pzl.sites.core.ts --removeComments
uglifyjs --output ..\dist\pzl.sites.core.min.js -- ..\dist\pzl.sites.core.js
explorer.exe ..\dist