function OneLineTab (line, className, listener) {

    function select () {
        selected = true
        classList.add(selectedClass)
        highlightClassList.add(selectedClass)
    }

    var highlightElement = Div('Tab-highlight')
    highlightElement.appendChild(TextNode(line))

    var highlightClassList = highlightElement.classList

    var element = Div(className + ' OneLineTab Tab Button')
    element.appendChild(highlightElement)
    OnClick(element, function () {
        var wasSelected = selected
        select()
        listener(wasSelected)
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
            highlightClassList.remove(selectedClass)
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
