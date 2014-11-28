function SpeedLabel (unit) {

    function update () {

        var visualSpeed = unit.fix(speed * 18 / 5)
        visualSpeed = Math.min(999.99, visualSpeed)

        integerPartNode.nodeValue = Math.floor(visualSpeed)
        fractionalPartNode.nodeValue = Math.floor(visualSpeed % 1 * 10)

    }

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

    var speed = 0

    return {
        element: element,
        setSpeed: function (_speed) {
            if (!isFinite(_speed)) _speed = 0
            speed = _speed
            update()
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.speedLabel
            update()
        },
    }

}
