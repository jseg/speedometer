function StatusPanel () {

    var node = TextNode('ACQUIRING')

    var element = Div('StatusPanel')
    element.appendChild(TextNode('GPS: '))
    element.appendChild(node)

    var classList = element.classList

    var timeout

    var highlightClass = 'highlight'

    return {
        element: element,
        setStatus: function (text) {
            if (text != node.nodeValue) {
                node.nodeValue = text
                clearTimeout(timeout)
                classList.add(highlightClass)
                timeout = setTimeout(function () {
                    classList.remove(highlightClass)
                }, 200)
            }
        },
    }

}
