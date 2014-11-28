function AverageSpeedTab (listener) {

    var classPrefix = 'AverageSpeedTab'

    var contentElement = Div(classPrefix + '-content Tab-content')
    contentElement.appendChild(TextNode('AVERAGE'))
    contentElement.appendChild(document.createElement('br'))
    contentElement.appendChild(TextNode('SPEED'))

    var element = Div(classPrefix + ' Tab Button')
    element.appendChild(Div(classPrefix + '-aligner Tab-aligner'))
    element.appendChild(contentElement)
    OnClick(element, function () {
        listener()
        classList.add(selectedClass)
    })

    var classList = element.classList

    var selectedClass = 'selected'

    return {
        element: element,
        deselect: function () {
            classList.remove(selectedClass)
        },
    }

}
