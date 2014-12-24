function AltitudeStatsPanel (unit) {

    function setValue (field, altitude) {
        var formatAltitude = FormatAltitude(altitude, unit)
        field.setValue(formatAltitude.integerPart, formatAltitude.fractionalPart)
    }

    function update () {
        if (minValue === null) {
            minValue = maxValue = altitude
        } else {
            minValue = Math.min(minValue, altitude)
            maxValue = Math.max(maxValue, altitude)
            setValue(minValueField, minValue)
            setValue(maxValueField, maxValue)
        }
    }

    var classPrefix = 'AltitudeStatsPanel'

    var minValueField = StatField('MIN')

    var maxValueField = StatField('MAX')

    var element = Div(classPrefix)
    element.appendChild(minValueField.element)
    element.appendChild(maxValueField.element)

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
