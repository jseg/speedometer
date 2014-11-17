function OnClick (element, listener) {

    function click () {
        classList.add('active')
        clearTimeout(timeout)
        timeout = setTimeout(function () {
            listener()
            timeout = setTimeout(function () {
                classList.remove('active')
            }, 150)
        }, 100)
    }

    function mouseDown (e) {
        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else click()
    }

    function touchStart (e) {
        e.preventDefault()
        touched = true
        click()
    }

    var timeout

    var classList = element.classList

    var touched = false

    return {
        disable: function () {
            element.removeEventListener('touchstart', touchStart)
            element.removeEventListener('mousedown', mouseDown)
        },
        enable: function () {
            element.addEventListener('mousedown', mouseDown)
            element.addEventListener('touchstart', touchStart)
        },
    }

}
