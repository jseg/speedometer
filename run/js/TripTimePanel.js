function TripTimePanel () {

    var classPrefix = 'TripTimePanel'

    var hourNode = TextNode('00')

    var hourElement = Div(classPrefix + '-hour')
    hourElement.appendChild(hourNode)

    var minuteNode = TextNode('00')

    var minuteElement = Div(classPrefix + '-minute')
    minuteElement.appendChild(minuteNode)

    var secondElement = Div(classPrefix + '-second')
    secondElement.appendChild(TextNode(':'))
    secondElement.appendChild(TextNode('00'))

    var element = Div(classPrefix + ' BottomPanel')
    element.appendChild(hourElement)
    element.appendChild(TextNode(':'))
    element.appendChild(minuteElement)
    element.appendChild(secondElement)

    return element

}
