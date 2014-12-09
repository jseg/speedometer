function StatusPanel () {

    var classPrefix = 'StatusPanel'

    var valueNode = TextNode('ACQUIRING')

    var valueElement = Div(classPrefix + '-value')
    valueElement.appendChild(valueNode)

    var element = Div(classPrefix)
    element.appendChild(TextNode('GPS'))
    element.appendChild(valueElement)

    var classList = element.classList

    var timeout

    var highlightClass = 'highlight'

    return {
        element: element,
        setStatus: function (value) {
            if (value != valueNode.nodeValue) {
                valueNode.nodeValue = value
                clearTimeout(timeout)
                classList.add(highlightClass)
                timeout = setTimeout(function () {
                    classList.remove(highlightClass)
                }, 200)
            }
        },
    }

}
