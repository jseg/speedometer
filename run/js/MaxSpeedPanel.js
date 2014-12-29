function MaxSpeedPanel (unit, setDarkTheme, setLightTheme, enableTransition) {

    function setSpeed (speed) {
        maxSpeed = speed
        update()
    }

    function update () {

        var speed = unit.fix(maxSpeed * 18 / 5)
        speed = Math.min(999.99, speed)

        integerPartNode.nodeValue = Math.floor(speed)
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

    var unitClassList = unitElement.classList

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('MAX SPEED'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(integerPartElement)
    element.appendChild(fractionalPartElement)
    element.appendChild(unitElement)

    var classList = element.classList

    var maxSpeed = 0

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
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
        reset: function () {
            setSpeed(0)
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
