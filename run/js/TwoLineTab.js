function TwoLineTab (line1, line2, className, listener) {

    function select () {
        classList.add(selectedClass)
    }

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
    OnClick(element, function () {
        listener()
        select()
    })

    var classList = element.classList

    var selectedClass = 'selected'

    var timeout
    var highlightClass = 'highlight'

    return {
        element: element,
        select: select,
        deselect: function () {
            classList.remove(selectedClass)
        },
        highlight: function () {
            clearTimeout(timeout)
            highlightClassList.add(highlightClass)
            timeout = setTimeout(function () {
                highlightClassList.remove(highlightClass)
            }, 200)
        },
    }

}
