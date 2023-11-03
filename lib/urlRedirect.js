function redirect() {
    const path = `${window.location.pathname}${window.location.search}`
    location.replace(`${window.origin}?path=${encodeURIComponent(path)}`)
}

function restorePath() {
    const urlParams = new URLSearchParams(window.location.search)
    const path = urlParams.get('path')
    if (path) {
        const decodedPath = decodeURIComponent(path)
        window.history.replaceState({}, '', decodedPath)
    }
}