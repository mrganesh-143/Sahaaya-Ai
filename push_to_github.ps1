param (
    [Parameter(Mandatory=$false)]
    [string]$Token
)

Set-Location $PSScriptRoot

if (-not $Token) {
    $Token = Read-Host "Please enter your GitHub Personal Access Token (PAT)"
}

if (-not $Token) {
    Write-Error "Token is required to push to GitHub."
    exit 1
}

$repoUrl = "https://mrganesh-143:$Token@github.com/mrganesh-143/Sahaaya-Ai.git"

Write-Output "Pushing SAHAAYA complete ecosystem to https://github.com/mrganesh-143/Sahaaya-Ai..."

& ".\mingit\cmd\git.exe" push -u $repoUrl main --force

if ($LASTEXITCODE -eq 0) {
    Write-Output "SUCCESS! Code is live on https://github.com/mrganesh-143/Sahaaya-Ai"
} else {
    Write-Error "Push failed. Please ensure the token has 'repo' permissions."
}
