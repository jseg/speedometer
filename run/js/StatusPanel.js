function StatusPanel () {

    var node = TextNode('ACQUIRING')

    var element = Div('StatusPanel')
    element.appendChild(TextNode('GPS: '))
    element.appendChild(node)

    var classList = element.classList

    var timeout

    return {
        element: element,
        setStatus: function (text) {
            if (text != node.nodeValue) {
                node.nodeValue = text
                clearTimeout(timeout)
                classList.add('highlight')
                timeout = setTimeout(function () {
                    classList.remove('highlight')
                }, 200)
            }
        },
    }

}
