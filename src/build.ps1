Param(
    [switch]$OpenFolderOnComplete
)
$output = "..\dist\pzl.sites.core.js"
Write-Host ""
Write-Host "----------------------------------------------------------------------" -ForegroundColor Green
Write-Host "Compiling dist '$($output)" -ForegroundColor Green
Write-Host "----------------------------------------------------------------------" -ForegroundColor Green
Write-Host ""
tsc --out $output .\pzl.sites.core.ts --removeComments
Write-Host ""
Write-Host "----------------------------------------------------------------------" -ForegroundColor Green
Write-Host "Creating minified dist using uglifyjs" -ForegroundColor Green
Write-Host "----------------------------------------------------------------------" -ForegroundColor Green
Write-Host ""
uglifyjs --mangle --compress --output ..\dist\pzl.sites.core.min.js -- ..\dist\pzl.sites.core.js | Out-Null
if($OpenFolderOnComplete) {
    explorer.exe ..\dist
}
