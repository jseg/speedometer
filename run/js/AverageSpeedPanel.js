function AverageSpeedPanel (distance, tripTimePanel, unit) {

    function update () {

        var distanceValue = distance.get()
        var tripTime = tripTimePanel.getTripTime()

        var speed
        if (tripTime == 0) speed = 0
        else speed = distanceValue / (tripTime / 1000)
        speed = speed * 18 / 5
        speed = unit.fix(speed)
        speed = Math.min(999.99, speed)

        integerPartNode.nodeValue = String(Math.floor(speed))
        fractionalPartNode.nodeValue = Math.floor(speed % 1 * 10)

    }

    var classPrefix = 'AverageSpeedPanel'

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

    var contentElement = Div(classPrefix + ' BottomPanel-content')
    contentElement.appendChild(integerPartElement)
    contentElement.appendChild(fractionalPartElement)
    contentElement.appendChild(unitElement)

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('AVERAGE SPEED'))

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
            unitNode.nodeValue = unit.speedLabel
            update()
        },
    }

}
