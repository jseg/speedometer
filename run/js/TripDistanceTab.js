function TripDistanceTab (listener) {

    var classPrefix = 'TripDistanceTab'

    var contentElement = Div(classPrefix + '-content Tab-content')
    contentElement.appendChild(TextNode('TRIP'))
    contentElement.appendChild(document.createElement('br'))
    contentElement.appendChild(TextNode('DISTANCE'))

    var element = Div(classPrefix + ' Tab Button')
    element.appendChild(Div(classPrefix + '-aligner Tab-aligner'))
    element.appendChild(contentElement)
    OnClick(element, function () {
        listener()
        classList.add(selectedClass)
    })

    var selectedClass = 'selected'

    var classList = element.classList
    classList.add(selectedClass)

    return {
        element: element,
        deselect: function () {
            classList.remove(selectedClass)
        },
    }

}
