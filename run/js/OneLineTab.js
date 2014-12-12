function OneLineTab (line, className, listener) {

    function select () {
        selected = true
        classList.add(selectedClass)
    }

    var highlightElement = Div('Tab-highlight')
    highlightElement.appendChild(TextNode(line))

    var highlightClassList = highlightElement.classList

    var element = Div(className + ' OneLineTab Tab Button')
    element.appendChild(highlightElement)
    OnClick(element, function () {
        if (!selected) {
            select()
            listener()
        }
    })

    var classList = element.classList

    var selected = false

    var selectedClass = 'selected'

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        select: select,
        deselect: function () {
            selected = false
            classList.remove(selectedClass)
        },
        highlight: function () {
            highlightClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                highlightClassList.remove(highlightClass)
            }, 200)
        },
    }

}
