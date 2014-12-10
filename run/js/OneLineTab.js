function OneLineTab (line, className, listener) {

    function select () {
        classList.add(selectedClass)
    }

    var element = Div(className + ' OneLineTab Tab Button')
    element.appendChild(TextNode(line))
    OnClick(element, function () {
        listener()
        select()
    })

    var classList = element.classList

    var selectedClass = 'selected'

    return {
        element: element,
        select: select,
        deselect: function () {
            classList.remove(selectedClass)
        },
    }

}
