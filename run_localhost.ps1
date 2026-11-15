$port = 3000
$htmlPath = "C:\Users\KASA GANESH\.gemini\antigravity\scratch\sahaaya\preview.html"

if (-not (Test-Path $htmlPath)) {
    Write-Error "preview.html not found!"
    exit 1
}

$htmlBytes = [System.IO.File]::ReadAllBytes($htmlPath)
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port)
$listener.Start()

Write-Output "SAHAAYA Localhost Server live at: http://localhost:$port"

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = [System.IO.StreamReader]::new($stream)
        $line = $reader.ReadLine()
        
        # Read until empty line (end of headers)
        while (-not [string]::IsNullOrWhiteSpace($line)) {
            $line = $reader.ReadLine()
        }

        # Send HTTP Response
        $header = "HTTP/1.1 200 OK`r`nContent-Type: text/html; charset=utf-8`r`nContent-Length: $($htmlBytes.Length)`r`nConnection: close`r`n`r`n"
        $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
        
        $stream.Write($headerBytes, 0, $headerBytes.Length)
        $stream.Write($htmlBytes, 0, $htmlBytes.Length)
        $stream.Flush()
        
        $client.Close()
    }
} finally {
    $listener.Stop()
}
