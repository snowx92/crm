@echo off
echo ====================================
echo  CRM File Restoration Script
echo ====================================
echo.

set "SOURCE_DIR=%~dp0financial"
set "DEST_DIR=%~dp0..\frontend\src\app\dashboard\financial"

echo Restoring financial pages...
echo.

if exist "%SOURCE_DIR%\expenses-page.tsx" (
    echo [1/4] Restoring Expenses page...
    copy /Y "%SOURCE_DIR%\expenses-page.tsx" "%DEST_DIR%\expenses\page.tsx"
    echo ✓ Expenses page restored
) else (
    echo ✗ Expenses backup not found
)

echo.
echo ====================================
echo Restoration Complete!
echo ====================================
echo.
echo Next steps:
echo 1. Check the files in frontend/src/app/dashboard/financial
echo 2. Restore Menu, Quotations, and Receipts pages manually
echo 3. Add public assets (logos, files)
echo.
pause
