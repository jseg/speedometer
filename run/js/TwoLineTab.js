function TwoLineTab (line1, line2, className, listener) {

    var classPrefix = 'TwoLineTab ' + className

    var contentElement = Div(classPrefix + '-content Tab-content')
    contentElement.appendChild(TextNode(line1))
    contentElement.appendChild(document.createElement('br'))
    contentElement.appendChild(TextNode(line2))

    var highlightElement = Div('Tab-highlight')
    highlightElement.appendChild(Div(classPrefix + '-aligner Tab-aligner'))
    highlightElement.appendChild(contentElement)

    var highlightClassList = highlightElement.classList

    var element = Div(classPrefix + ' Tab Button')
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
