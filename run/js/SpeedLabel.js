function SpeedLabel (unit, setDarkTheme, setLightTheme) {

    function update () {
        var integerPart, fractionalPart, arrow
        if (speed === null) {
            arrow = ''
            integerPart = '\xb7'
            fractionalPart = '\xb7'
        } else {

            var visualSpeed = unit.fix(speed * 18 / 5)
            visualSpeed = Math.min(999.99, visualSpeed)

            integerPart = Math.floor(visualSpeed)
            fractionalPart = Math.floor(visualSpeed % 1 * 10)

            if (increasing) {
                if (decreasing) arrow = ''
                else arrow = '\u2191'
            } else if (decreasing) {
                arrow = '\u2193'
            } else {
                arrow = ''
            }

        }
        integerPartNode.nodeValue = integerPart
        fractionalPartNode.nodeValue = fractionalPart
        arrowNode.nodeValue = arrow
    }

    var classPrefix = 'SpeedLabel'

    var integerPartNode = TextNode('\xb7')

    var integerPartElement = Div(classPrefix + '-integerPart')
    integerPartElement.appendChild(integerPartNode)

    var fractionalPartNode = TextNode('\xb7')

    var fractionalPartElement = Div(classPrefix + '-fractionalPart')
    fractionalPartElement.appendChild(TextNode('.'))
    fractionalPartElement.appendChild(fractionalPartNode)

    var unitNode = TextNode(unit.speedLabel)

    var unitElement = Div(classPrefix + '-unit')
    unitElement.appendChild(unitNode)

    var unitClassList = unitElement.classList

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('SPEED'))

    var labelClassList = labelElement.classList

    var arrowNode = TextNode('\u2195')

    var arrowElement = Div(classPrefix + '-arrow')
    arrowElement.appendChild(arrowNode)

    var element = Div(classPrefix)
    element.appendChild(labelElement)
    element.appendChild(arrowElement)
    element.appendChild(integerPartElement)
    element.appendChild(fractionalPartElement)
    element.appendChild(unitElement)

    var classList = element.classList

    var speed = null,
        previousSpeed = null

    var decreasing = false,
        increasing = false

    var decreasingTimeout,
        increasingTimeout

    var ignoreDifference = 0.02

    var previousSpeeds = []

    return {
        element: element,
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
        setSpeed: function (_speed) {
            if (typeof _speed == 'number' && isFinite(_speed)) {

                previousSpeeds.push(_speed)
                if (previousSpeeds.length > 3) previousSpeeds.shift()

                var averageSpeed = 0
                previousSpeeds.forEach(function (previousSpeed) {
                    averageSpeed += previousSpeed
                })
                averageSpeed /= previousSpeeds.length

                if (previousSpeed !== null) {
                    if (averageSpeed > previousSpeed + ignoreDifference) {
                        increasing = true
                        clearTimeout(increasingTimeout)
                        increasingTimeout = setTimeout(function () {
                            increasing = false
                            update()
                        }, 2500)
                    } else if (averageSpeed < previousSpeed - ignoreDifference) {
                        decreasing = true
                        clearTimeout(decreasingTimeout)
                        decreasingTimeout = setTimeout(function () {
                            decreasing = false
                            update()
                        }, 2500)
                    }
                }

                previousSpeed = speed
                speed = averageSpeed

            } else {
                speed = null
                previousSpeed = null
                previousSpeeds.splice(0)
                decreasing = increasing = false
                clearTimeout(decreasingTimeout)
                clearTimeout(increasingTimeout)
            }
            update()
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.speedLabel
            update()
        },
    }

}
