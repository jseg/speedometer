function AverageSpeedPanel (tripDistance, tripTimePanel, unit) {

    function update () {

        var tripTime = tripTimePanel.getTripTime()

        var speed
        if (tripTime == 0) speed = 0
        else speed = tripDistance.get() / (tripTime / 1000)
        speed = unit.fix(speed * 18 / 5)
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
    labelElement.appendChild(TextNode('AVERAGE SPEED'))

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
        reset: update,
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
            classList.remove('lightTheme')
            classList.add('darkTheme')
            labelClassList.remove('lightTheme')
            labelClassList.add('darkTheme')
            unitClassList.remove('lightTheme')
            unitClassList.add('darkTheme')
        },
        setLightTheme: function () {
            classList.remove('darkTheme')
            classList.add('lightTheme')
            labelClassList.remove('darkTheme')
            labelClassList.add('lightTheme')
            unitClassList.remove('darkTheme')
            unitClassList.add('lightTheme')
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.speedLabel
            update()
        },
    }

}
