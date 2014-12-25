var mozApps = navigator.mozApps
if (mozApps) {
    var installButton = document.getElementById('installButton')
    installButton.disabled = false
    installButton.addEventListener('click', function () {

        function restore () {
            installButton.innerHTML = 'Install'
        }

        installButton.innerHTML = 'Installing...'

        var manifest = location.protocol + '/' + location.host + location.pathname + 'webapp-manifest/'
        var installRequest = mozApps.install(manifest)
        installRequest.onsuccess = installRequest.onerror = function () {
            clearTimeout(timeout)
            restore()
        }

        var timeout = setTimeout(function () {
            installRequest.onsuccess = installRequest.onerror = null
            restore()
        }, 2000)

    })
}
