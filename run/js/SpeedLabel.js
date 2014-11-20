function SpeedLabel () {

    var classPrefix = 'SpeedLabel'

    var greyNode = TextNode('00')

    var greyElement = Div(classPrefix + '-grey')
    greyElement.appendChild(greyNode)

    var integerPartNode = TextNode('0')

    var integerPartElement = Div(classPrefix + '-integerPart')
    integerPartElement.appendChild(integerPartNode)

    var fractionalPartNode = TextNode('0')

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

            integerPartNode.nodeValue = Math.floor(speed)
            fractionalPartNode.nodeValue = Math.floor(speed % 1 * 10)

            var speedLength = integerPartNode.nodeValue.length

            var grey
            if (speedLength == 3) grey = ''
            else if (speedLength == 2) grey = '0'
            else grey = '00'
            greyNode.nodeValue = grey

        },
    }

}
