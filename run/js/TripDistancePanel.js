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

    var contentElement = Div(classPrefix + ' BottomPanel-content')
    contentElement.appendChild(integerPartElement)
    contentElement.appendChild(fractionalPartElement)
    contentElement.appendChild(unitElement)

    var element = Div('BottomPanel')
    element.appendChild(contentElement)

    return {
        element: element,
        reset: function () {
        },
    }

}
