function OneLineTab (line, className, listener) {

    var highlightElement = Div('Tab-highlight')
    highlightElement.appendChild(TextNode(line))

    var highlightClassList = highlightElement.classList

    var element = Div(className + ' OneLineTab Tab Button')
    element.appendChild(highlightElement)
    OnClick(element, listener)

    var classList = element.classList

    var selected = false

    var selectedClass = 'selected'

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
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
        select: function () {
            selected = true
            classList.add(selectedClass)
            highlightClassList.add(selectedClass)
        },
    }

}
