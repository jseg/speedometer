function CompassPanel () {

    function render () {

        c.clearRect(0, 0, size, size)
        c.save()

        c.translate(halfSize, halfSize)
        c.strokeStyle = '#fff'

        var radius = -halfSize * 0.92
        c.save()
        c.font = 'bold 22px FreeMono, monospace'
        c.textAlign = 'center'
        c.textBaseline = 'top'
        c.fillStyle = 'red'
        c.fillText('N', 0, radius)
        c.fillStyle = '#999'
        c.rotate(Math.PI / 2)
        c.fillText('E', 0, radius)
        c.rotate(Math.PI / 2)
        c.fillText('S', 0, radius)
        c.rotate(Math.PI / 2)
        c.fillText('W', 0, radius)
        c.restore()

        for (var i = 0; i < 16; i++) {
            c.rotate(Math.PI / 8)
            c.beginPath()
            c.moveTo(0, halfSize * 1)
            c.lineTo(0, halfSize * 0.95)
            c.stroke()
        }

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
            size = 100 * scale * devicePixelRatio
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
