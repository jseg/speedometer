function StatusPanel () {

    var node = TextNode('INITIALIZING')

    var element = Div('StatusPanel')
    element.appendChild(TextNode('GPS: '))
    element.appendChild(node)

    return {
        element: element,
        setStatus: function () {
            node.nodeValue = node
        },
    }

}
