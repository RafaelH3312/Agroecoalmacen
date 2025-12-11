# -------------------------------
# Script automático: Spring Boot + Next.js + ngrok
# -------------------------------

# --- Rutas del backend y frontend ---
$backendPath = "C:\Users\Caos\Agroecoalmacen\ADSO-2977517\agroecoalmacen-backend"
$frontendPath = "C:\Users\Caos\Agroecoalmacen\ADSO-2977517\agroecoalmacen-frontend"

# --- Buscar ngrok.exe ---
$possiblePaths = @(
    "C:\Users\Caos\Agroecoalmacen\ngrok.exe",
    "C:\Users\Caos\Downloads\ngrok.exe",
    "C:\ngrok.exe"
)

$ngrokExe = $possiblePaths | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $ngrokExe) {
    Write-Host "❌ No se encontró ngrok.exe. Por favor indica la ruta completa:"
    $ngrokExe = Read-Host "Ruta de ngrok.exe"
    if (-not (Test-Path $ngrokExe)) {
        Write-Host "❌ Ruta inválida. Terminado."
        exit
    }
}

Write-Host "✅ ngrok encontrado en: $ngrokExe"

# --- Función para iniciar un proceso en PowerShell ---
function Start-PSProcess {
    param(
        [string]$path,
        [string]$command,
        [string]$title
    )
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$path`"; $command" -WindowStyle Normal
}

# --- INICIAR SPRING BOOT ---
Write-Host "🚀 Iniciando Spring Boot..."
Start-PSProcess -path $backendPath -command "mvn spring-boot:run" -title "Spring Boot"

# --- Espera para que Spring Boot se levante ---
Start-Sleep -Seconds 10

# --- INICIAR NEXT.JS ---
Write-Host "🌐 Iniciando Next.js..."
Start-PSProcess -path $frontendPath -command "npm run dev" -title "Next.js"

# --- Espera para que Next.js se levante ---
Start-Sleep -Seconds 10

# --- INICIAR NGROK ---
Write-Host "🔗 Iniciando ngrok en el puerto 3000..."
Start-Process $ngrokExe -ArgumentList "http 3000" -WindowStyle Normal

# --- Espera y obtener URL pública ---
$maxTries = 20
$try = 0
$publicUrl = $null

while (-not $publicUrl -and $try -lt $maxTries) {
    Start-Sleep -Seconds 2
    try {
        $apiResponse = Invoke-RestMethod http://127.0.0.1:4040/api/tunnels
        $publicUrl = $apiResponse.tunnels[0].public_url
    } catch {
        # ngrok todavía no listo
    }
    $try++
}

if ($publicUrl) {
    Write-Host "✅: $publicUrl"
    Start-Process $publicUrl
} else {
    Write-Host "⚠ No se pudo obtener la URL de ngrok. Abre manualmente http://127.0.0.1:4040"
}
