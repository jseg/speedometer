function StartStopButton (startListener, stopListener) {

    var started = false

    var node = TextNode('START')

    var contentElement = Div('Button-content')
    contentElement.appendChild(node)
    OnClick(contentElement, function () {
        if (started) {
            started = false
            node.nodeValue = 'START'
            stopListener()
        } else {
            started = true
            node.nodeValue = 'STOP'
            startListener()
        }
    })

    var element = Div('StartStopButton Button')
    element.appendChild(contentElement)

    return { element: element }

}
