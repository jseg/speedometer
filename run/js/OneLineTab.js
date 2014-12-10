function OneLineTab (line, className, listener) {

    function select () {
        selected = true
        classList.add(selectedClass)
    }

    var element = Div(className + ' OneLineTab Tab Button')
    element.appendChild(TextNode(line))
    OnClick(element, function () {
        if (!selected) {
            select()
            listener()
        }
    })

    var selected = false

    var classList = element.classList

    var selectedClass = 'selected'

    return {
        element: element,
        select: select,
        deselect: function () {
            selected = false
            classList.remove(selectedClass)
        },
    }

}
