function CompassPanel () {

    function render () {

        var angle
        if (heading === null) angle = 0
        else angle = heading * Math.PI / 180

        c.clearRect(0, 0, size, size)
        c.save()
        c.translate(halfSize, halfSize)
        c.rotate(-angle)

        if (heading !== null) {

            var lineWidth = size * 0.01
            c.save()
            c.lineWidth = lineWidth
            c.beginPath()
            c.moveTo(0, 0)
            c.rotate(-Math.PI / 2)
            c.arc(0, 0, halfSize - lineWidth, 0, angle)
            c.closePath()
            c.fillStyle = angleBackgroundColor
            c.fill()
            c.lineJoin = 'round'
            c.strokeStyle = angleBorderColor
            c.stroke()
            c.restore()

        }

        c.save()
        for (var i = 0; i < 60; i++) {
            c.beginPath()
            if (i % 5 || heading === null) {
                var lineWidth = size * 0.01
                c.lineWidth = lineWidth
                c.moveTo(0, halfSize * 0.98)
                c.lineTo(0, halfSize * 0.95)
                c.strokeStyle = smallBarColor
            } else {
                c.lineWidth = size * 0.03
                c.moveTo(0, halfSize * 0.98)
                c.lineTo(0, halfSize * 0.92)
                c.strokeStyle = bigBarColor
            }
            c.stroke()
            c.rotate(Math.PI / 30)
        }
        c.restore()

        if (heading !== null) {
            var radius = -halfSize * 0.92
            c.save()
            c.font = 'bold ' + size * 0.25 + 'px FreeMono, monospace'
            c.textAlign = 'center'
            c.textBaseline = 'top'
            c.fillStyle = '#f00'
            c.fillText('N', 0, radius)
            c.fillStyle = textColor
            c.rotate(Math.PI / 2)
            c.fillText('E', 0, radius)
            c.rotate(Math.PI / 2)
            c.fillText('S', 0, radius)
            c.rotate(Math.PI / 2)
            c.fillText('W', 0, radius)
            c.restore()

        }

        c.save()
        c.rotate(angle)
        c.beginPath()
        c.lineJoin = 'round'
        c.lineWidth = halfSize * 0.05
        c.moveTo(0, halfSize * 0.3)
        c.lineTo(0, -halfSize * 0.3)
        c.moveTo(-halfSize * 0.15, -halfSize * 0.15)
        c.lineTo(0, -halfSize * 0.3)
        c.lineTo(halfSize * 0.15, -halfSize * 0.15)
        c.strokeStyle = bigBarColor
        c.stroke()
        c.restore()

        c.restore()

    }

    var textColor, bigBarColor, smallBarColor,
        angleBorderColor, angleBackgroundColor

    var canvas = document.createElement('canvas')
    canvas.className = 'CompassPanel'

    var c = canvas.getContext('2d')

    var heading = null
    var size, halfSize

    return {
        element: canvas,
        resize: function (scale) {
            size = 116 * scale * devicePixelRatio
            halfSize = size / 2
            canvas.width = canvas.height = size
            render()
        },
        setDarkTheme: function () {
            angleBorderColor = '#999'
            angleBackgroundColor = '#444'
            textColor = '#999'
            bigBarColor = '#fff'
            smallBarColor = '#999'
            render()
        },
        setHeading: function (_heading) {
            heading = _heading
            render()
        },
        setLightTheme: function () {
            angleBorderColor = '#666'
            angleBackgroundColor = '#bbb'
            textColor = '#666'
            bigBarColor = '#000'
            smallBarColor = '#666'
            render()
        },
    }

}
