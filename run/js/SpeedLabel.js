function SpeedLabel (unit) {

    function update () {

        var visualSpeed = unit.fix(speed * 18 / 5)
        visualSpeed = Math.min(999.99, visualSpeed)

        integerPartNode.nodeValue = Math.floor(visualSpeed)
        fractionalPartNode.nodeValue = Math.floor(visualSpeed % 1 * 10)

        var arrow = ''
        if (increasing) {
            if (decreasing) arrow = ''
            else arrow = '\u2191'
        } else if (decreasing) {
            arrow = '\u2193'
        } else {
            arrow = ''
        }
        arrowNode.nodeValue = arrow

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

    var arrowNode = TextNode('\u2195')

    var arrowElement = Div(classPrefix + '-arrow')
    arrowElement.appendChild(arrowNode)

    var element = Div(classPrefix)
    element.appendChild(labelElement)
    element.appendChild(arrowElement)
    element.appendChild(integerPartElement)
    element.appendChild(fractionalPartElement)
    element.appendChild(unitElement)

    var speed = 0,
        previousSpeed = 0

    var decreasing = 0,
        increasing = 0

    var decreasingTimeout,
        increasingTimeout

    return {
        element: element,
        setSpeed: function (_speed) {

            if (!isFinite(_speed)) _speed = 0

            if (_speed > previousSpeed) {
                increasing = true
                clearTimeout(decreasingTimeout)
                increasingTimeout = setTimeout(function () {
                    increasing = false
                }, 3000)
            } else if (_speed < previousSpeed) {
                decreasing = true
                clearTimeout(increasingTimeout)
                decreasingTimeout = setTimeout(function () {
                    decreasing = false
                }, 3000)
            }

            previousSpeed = speed
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
