function AltitudePanel (unit, setDarkTheme, setLightTheme, enableTransition) {

    function update () {
        var integerPart, fractionalPart
        if (altitude === null) {
            fractionalPart = '\xb7\xb7\xb7'
            integerPart = '\xb7'
        } else {
            var formatAltitude = FormatAltitude(altitude, unit)
            fractionalPart = formatAltitude.fractionalPart
            integerPart = formatAltitude.integerPart
        }
        integerPartNode.nodeValue = integerPart
        fractionalPartNode.nodeValue = fractionalPart
    }

    var classPrefix = 'AltitudePanel'

    var integerPartNode = TextNode('0')

    var integerPartElement = Div(classPrefix + '-integerPart')
    integerPartElement.appendChild(integerPartNode)

    var fractionalPartNode = TextNode('000')

    var fractionalPartElement = Div(classPrefix + '-fractionalPart')
    fractionalPartElement.appendChild(TextNode('.'))
    fractionalPartElement.appendChild(fractionalPartNode)

    var unitNode = TextNode(unit.distanceLabel)

    var unitElement = Div(classPrefix + '-unit')
    unitElement.appendChild(unitNode)

    var unitClassList = unitElement.classList

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('ALTITUDE'))

    var labelClassList = labelElement.classList

    var altitudeStatPanel = AltitudeStatPanel(unit, setDarkTheme, setLightTheme)

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(integerPartElement)
    element.appendChild(fractionalPartElement)
    element.appendChild(unitElement)
    element.appendChild(altitudeStatPanel.element)

    var classList = element.classList

    var altitude = null

    var previousAltitudes = []

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        reset: altitudeStatPanel.reset,
        start: altitudeStatPanel.start,
        stop: altitudeStatPanel.stop,
        enableTransition: function () {
            enableTransition(classList)
            enableTransition(labelClassList)
        },
        highlight: function () {
            classList.add(highlightClass)
            labelClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                classList.remove(highlightClass)
                labelClassList.remove(highlightClass)
            }, 200)
        },
        setAltitude: function (_altitude) {
            if (typeof _altitude == 'number' && isFinite(_altitude)) {

                previousAltitudes.push(_altitude)
                if (previousAltitudes.length > 3) previousAltitudes.shift()

                var averageAltitude = 0
                previousAltitudes.forEach(function (previousAltitude) {
                    averageAltitude += previousAltitude
                })
                averageAltitude /= previousAltitudes.length

                altitude = averageAltitude

            } else {
                altitude = null
                previousAltitudes.splice(0)
            }
            altitudeStatPanel.setAltitude(altitude)
            update()
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(labelClassList)
            setDarkTheme(unitClassList)
            altitudeStatPanel.setDarkTheme()
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(labelClassList)
            setLightTheme(unitClassList)
            altitudeStatPanel.setLightTheme()
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.distanceLabel
            update()
            altitudeStatPanel.setUnit(unit)
        },
    }

}
