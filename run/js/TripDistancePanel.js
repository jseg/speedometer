function TripDistancePanel (distance, unit) {

    function update () {

        var distanceValue = distance.get()
        distanceValue = unit.fix(distanceValue)
        distanceValue = Math.min(999999, Math.floor(distanceValue))

        var fractionalPart = String(distanceValue % 1000)
        if (fractionalPart.length == 1) fractionalPart = '00' + fractionalPart
        else if (fractionalPart.length == 2) fractionalPart = '0' + fractionalPart
        fractionalPartNode.nodeValue = fractionalPart

        integerPartNode.nodeValue = Math.floor(distanceValue / 1000)

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

    var contentElement = Div(classPrefix + ' BottomPanel-content')
    contentElement.appendChild(integerPartElement)
    contentElement.appendChild(fractionalPartElement)
    contentElement.appendChild(unitElement)

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('TRIP DISTANCE'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(contentElement)

    var classList = element.classList

    var timeout

    return {
        element: element,
        reset: update,
        update: update,
        highlight: function () {
            clearTimeout(timeout)
            classList.add('highlight')
            labelClassList.add('highlight')
            timeout = setTimeout(function () {
                classList.remove('highlight')
                labelClassList.remove('highlight')
            }, 200)
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.distanceLabel
            update()
        },
    }

}
