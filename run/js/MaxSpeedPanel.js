function MaxSpeedPanel (unit) {

    function setSpeed (speed) {
        maxSpeed = speed
        update()
    }

    function update () {

        speed = maxSpeed * 18 / 5
        speed = unit.fix(speed)
        speed = Math.min(999.99, speed)

        integerPartNode.nodeValue = String(Math.floor(speed))
        fractionalPartNode.nodeValue = Math.floor(speed % 1 * 10)

    }

    var classPrefix = 'SpeedPanel'

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

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('MAX SPEED'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(integerPartElement)
    element.appendChild(fractionalPartElement)
    element.appendChild(unitElement)

    var classList = element.classList

    var timeout

    var maxSpeed = 0

    return {
        element: element,
        highlight: function () {
            clearTimeout(timeout)
            classList.add('highlight')
            labelClassList.add('highlight')
            timeout = setTimeout(function () {
                classList.remove('highlight')
                labelClassList.remove('highlight')
            }, 200)
        },
        reset: function () {
            setSpeed(0)
        },
        setSpeed: function (speed) {
            if (!isFinite(speed)) speed = 0
            if (speed > maxSpeed) setSpeed(speed)
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.speedLabel
            update()
        },
    }

}
