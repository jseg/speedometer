function CompassPanel () {

    function render () {
        c.clearRect(0, 0, size, size)
        c.save()
        c.translate(halfSize, halfSize)
        c.beginPath()
        c.arc(0, 0, halfSize, 0, Math.PI * 2)
        c.lineWidth = size / 20
        c.strokeStyle = '#fff'
        c.stroke()
        c.restore()
    }

    var canvas = document.createElement('canvas')
    canvas.className = 'CompassPanel'

    var c = canvas.getContext('2d')

    var heading = null
    var size, halfSize

    return {
        element: canvas,
        resize: function (scale) {
            size = 50 * scale * devicePixelRatio
            halfSize = size / 2
            canvas.width = canvas.height = size
            render()
        },
        setHeading: function (_heading) {
            heading = _heading
            render()
        },
    }

}
