tsc --out ..\dist\pzl.sites.core.js .\pzl.sites.core.ts --removeComments | Out-Null
uglifyjs --mangle --compress --output ..\dist\pzl.sites.core.min.js -- ..\dist\pzl.sites.core.js | Out-Null
explorer.exe ..\dist
