function SpeedLabel () {

    var classPrefix = 'SpeedLabel'

    var integerPartNode = TextNode('-')

    var integerPartElement = Div(classPrefix + '-integerPart')
    integerPartElement.appendChild(integerPartNode)

    var fractionalPartNode = TextNode('-')

    var fractionalPartElement = Div(classPrefix + '-fractionalPart')
    fractionalPartElement.appendChild(TextNode('.'))
    fractionalPartElement.appendChild(fractionalPartNode)

    var unitElement = Div(classPrefix + '-unit')
    unitElement.appendChild(TextNode('KM/H'))

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
            var integerPart, fractionalPart
            if (isFinite(speed)) {

                speed = speed * 18 / 5
                speed = Math.min(999.99, speed)

                integerPart = String(Math.floor(speed))
                fractionalPart = Math.floor(speed % 1 * 10)

            } else {
                integerPart = '-'
                fractionalPart = '-'
            }
            integerPartNode.nodeValue = integerPart
            fractionalPartNode.nodeValue = fractionalPart
        },
    }

}
