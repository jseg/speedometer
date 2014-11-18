function StartStopButton (startListener, stopListener) {

    var started = false

    var node = TextNode('START')

    var element = Div('StartStopButton Button')
    element.appendChild(node)

    var click = OnClick(element, function () {
        if (started) {
            started = false
            node.nodeValue = 'START'
        } else {
            started = true
            node.nodeValue = 'STOP'
        }
    })
    click.enable()

    return { element: element }

}
