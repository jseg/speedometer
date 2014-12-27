function TripDistancePanel (tripDistance, unit, setDarkTheme, setLightTheme) {

    function update () {

        var distance = unit.fix(tripDistance.get())
        distance = Math.min(999999, Math.floor(distance))

        var fractionalPart = String(distance % 1000)
        if (fractionalPart.length == 1) fractionalPart = '00' + fractionalPart
        else if (fractionalPart.length == 2) fractionalPart = '0' + fractionalPart
        fractionalPartNode.nodeValue = fractionalPart

        integerPartNode.nodeValue = Math.floor(distance / 1000)

    }

    var classPrefix = 'TripDistancePanel'

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
    labelElement.appendChild(TextNode('TRIP DISTANCE'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(integerPartElement)
    element.appendChild(fractionalPartElement)
    element.appendChild(unitElement)

    var classList = element.classList

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
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(labelClassList)
            setDarkTheme(unitClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(labelClassList)
            setLightTheme(unitClassList)
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.distanceLabel
            update()
        },
    }

}
