$null = Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c npx next dev" -WorkingDirectory "E:\CLIENT WEBSITE\Pro-Tech-Fire-Safety"
Start-Sleep -Seconds 10
# Try to fetch the image
try {
    $wc = New-Object System.Net.WebClient
    $data = $wc.DownloadData("http://localhost:3000/images/products/smoke-detector.jpg")
    Write-Host "IMAGE DOWNLOADED: $($data.Length) bytes"
} catch {
    Write-Host "ERROR: $_"
}
