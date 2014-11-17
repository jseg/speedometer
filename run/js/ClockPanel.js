function ClockPanel () {

    var classPrefix = 'ClockPanel'

    var hourNode = TextNode('00')

    var hourElement = Div(classPrefix + '-hour')
    hourElement.appendChild(hourNode)

    var minuteNode = TextNode('00')

    var minuteElement = Div(classPrefix + '-minute')
    minuteElement.appendChild(minuteNode)

    var colonElement = Div(classPrefix + '-colon')
    colonElement.appendChild(TextNode(':'))

    var element = Div(classPrefix + ' BottomPanel')
    element.appendChild(hourElement)
    element.appendChild(colonElement)
    element.appendChild(minuteElement)

    return element

}
