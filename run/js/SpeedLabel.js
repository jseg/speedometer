function SpeedLabel () {

    var classPrefix = 'SpeedLabel'

    var greyNode = TextNode('00')

    var greyElement = Div(classPrefix + '-grey')
    greyElement.appendChild(greyNode)

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
    contentElement.appendChild(greyElement)
    contentElement.appendChild(integerPartElement)
    contentElement.appendChild(fractionalPartElement)
    contentElement.appendChild(unitElement)

    var element = Div(classPrefix)
    element.appendChild(labelElement)
    element.appendChild(contentElement)

    return {
        element: element,
        setSpeed: function (speed) {
            var integerPart, fractionalPart, grey
            if (isFinite(speed)) {

                speed = speed * 18 / 5
                speed = Math.min(999.99, speed)

                integerPart = String(Math.floor(speed))
                fractionalPart = Math.floor(speed % 1 * 10)

                var speedLength = integerPart.length

                if (speedLength == 3) grey = ''
                else if (speedLength == 2) grey = '0'
                else grey = '00'

            } else {
                integerPart = '-'
                fractionalPart = '-'
                grey = '--'
            }
            integerPartNode.nodeValue = integerPart
            fractionalPartNode.nodeValue = fractionalPart
            greyNode.nodeValue = grey
        },
    }

}
