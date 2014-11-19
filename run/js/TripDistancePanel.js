function TripDistancePanel () {

    var classPrefix = 'TripDistancePanel'

    var greyNode = TextNode('00')

    var greyElement = Div(classPrefix + '-grey')
    greyElement.appendChild(greyNode)

    var integerPartElement = Div(classPrefix + '-integerPart')
    integerPartElement.appendChild(greyElement)
    integerPartElement.appendChild(TextNode('0'))

    var fractionalPartElement = Div(classPrefix + '-fractionalPart')
    fractionalPartElement.appendChild(TextNode('.'))
    fractionalPartElement.appendChild(TextNode('000'))

    var unitElement = Div(classPrefix + '-unit')
    unitElement.appendChild(TextNode('km'))

    var element = Div(classPrefix + ' BottomPanel')
    element.appendChild(integerPartElement)
    element.appendChild(fractionalPartElement)
    element.appendChild(unitElement)

    return {
        element: element,
        reset: function () {
        },
    }

}
