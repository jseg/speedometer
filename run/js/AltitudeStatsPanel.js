function AltitudeStatsPanel (unit) {

    function format (altitude) {
        if (altitude === null) return '\xb7'
        var formatAltitude = FormatAltitude(altitude, unit)
        return formatAltitude.integerPart + '.' + formatAltitude.fractionalPart
    }

    function update () {
        if (minValue === null) {
            minValue = maxValue = altitude
        } else {
            minValue = Math.min(minValue, altitude)
            maxValue = Math.max(maxValue, altitude)
        }
        minValueNode.nodeValue = format(minValue)
        maxValueNode.nodeValue = format(maxValue)
    }

    function Label (text) {
        var element = Div(classPrefix + '-label')
        element.appendChild(TextNode(text + ':'))
        return element
    }

    var classPrefix = 'AltitudeStatsPanel'

    var minValueNode = TextNode('\xb7')

    var minValueElement = Div(classPrefix + '-value')
    minValueElement.appendChild(minValueNode)

    var maxValueNode = TextNode('\xb7')

    var maxValueElement = Div(classPrefix + '-value')
    maxValueElement.appendChild(maxValueNode)

    var element = Div(classPrefix)
    element.appendChild(Label('MIN'))
    element.appendChild(minValueElement)
    element.appendChild(Label('MAX'))
    element.appendChild(maxValueElement)

    var started = false,
        altitude = null,
        minValue = null,
        maxValue = null

    return {
        element: element,
        setAltitude: function (_altitude) {
            altitude = _altitude
            if (!started) return
            update()
        },
        setUnit: function (_unit) {
            unit = _unit
            update()
        },
        start: function () {
            started = true
            update()
        },
        stop: function () {
            started = false
        },
    }

}
