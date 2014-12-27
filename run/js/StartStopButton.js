function StartStopButton (startListener,
    stopListener, setDarkTheme, setLightTheme) {

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

    var contentClassList = contentElement.classList

    var element = Div('StartStopButton Button')
    element.appendChild(contentElement)

    var classList = element.classList

    return {
        element: element,
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(contentClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(contentClassList)
        },
    }

}
