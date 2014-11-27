function SpeedLabel (unit) {

    var classPrefix = 'SpeedLabel'

    var integerPartNode = TextNode('0')

    var integerPartElement = Div(classPrefix + '-integerPart')
    integerPartElement.appendChild(integerPartNode)

    var fractionalPartNode = TextNode('0')

    var fractionalPartElement = Div(classPrefix + '-fractionalPart')
    fractionalPartElement.appendChild(TextNode('.'))
    fractionalPartElement.appendChild(fractionalPartNode)

    var unitNode = TextNode(unit.speedLabel)

    var unitElement = Div(classPrefix + '-unit')
    unitElement.appendChild(unitNode)

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('SPEED'))

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(integerPartElement)
    contentElement.appendChild(fractionalPartElement)
    contentElement.appendChild(unitElement)

    var element = Div(classPrefix)
    element.appendChild(labelElement)
    element.appendChild(contentElement)

    return {
        element: element,
        setSpeed: function (speed) {

            if (!isFinite(speed)) speed = 0

            speed = speed * 18 / 5
            speed = Math.min(999.99, speed)

            integerPartNode.nodeValue = Math.floor(speed)
            fractionalPartNode.nodeValue = Math.floor(speed % 1 * 10)

        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.speedLabel
        },
    }

}
