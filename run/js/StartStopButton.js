function StartStopButton (startListener, stopListener, enableTransition) {

    var classPrefix = 'StartStopButton'

    var started = false

    var node = TextNode('START')

    var contentElement = Div(classPrefix + '-content Button-content start')
    contentElement.appendChild(node)
    OnClick(contentElement, function () {
        if (started) {
            started = false
            node.nodeValue = 'START'
            contentClassList.remove('stop')
            contentClassList.add('start')
            stopListener()
        } else {
            started = true
            node.nodeValue = 'STOP'
            contentClassList.remove('start')
            contentClassList.add('stop')
            startListener()
        }
    })

    var contentClassList = contentElement.classList

    var element = Div(classPrefix + ' Button')
    element.appendChild(contentElement)

    var classList = element.classList

    return {
        element: element,
        enableTransition: function () {
            enableTransition(classList)
        },
    }

}
