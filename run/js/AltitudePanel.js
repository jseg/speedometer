function AltitudePanel (unit) {

    function update () {
        if (isFinite(altitude)) {

            var visualAltitude = unit.fix(altitude)
            visualAltitude = Math.min(999999, Math.floor(visualAltitude))

            var fractionalPart = String(visualAltitude % 1000)
            if (fractionalPart.length == 1) fractionalPart = '00' + fractionalPart
            else if (fractionalPart.length == 2) fractionalPart = '0' + fractionalPart
            fractionalPartNode.nodeValue = fractionalPart

            integerPartNode.nodeValue = Math.floor(visualAltitude / 1000)

        } else {
            fractionalPartNode.nodeValue = '\xb7\xb7\xb7'
            integerPartNode.nodeValue = '\xb7'
        }
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

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('ALTITUDE'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(integerPartElement)
    element.appendChild(fractionalPartElement)
    element.appendChild(unitElement)

    var classList = element.classList

    var altitude

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        update: update,
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
            altitude = _altitude
            update()
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.distanceLabel
            update()
        },
    }

}
