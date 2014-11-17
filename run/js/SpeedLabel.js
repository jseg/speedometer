function SpeedLabel () {

    var classPrefix = 'SpeedLabel'

    var integerPartNode = TextNode('0')

    var integerPartElement = Div(classPrefix + '-integerPart')
    integerPartElement.appendChild(integerPartNode)

    var fractionalPartNode = TextNode('0')

    var fractionalPartElement = Div(classPrefix + '-fractionalPart')
    fractionalPartElement.appendChild(TextNode('.'))
    fractionalPartElement.appendChild(fractionalPartNode)

    var element = Div(classPrefix)
    element.appendChild(integerPartElement)
    element.appendChild(fractionalPartElement)

    return {
        element: element,
        setSpeed: function (speed) {
            integerPartNode.nodeValue = Math.floor(speed)
            fractionalPartNode.nodeValue = Math.floor(speed % 1 * 10)
        },
    }

}
