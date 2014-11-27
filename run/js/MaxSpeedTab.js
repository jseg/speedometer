function MaxSpeedTab (listener) {

    var classPrefix = 'MaxSpeedTab'

    var contentElement = Div(classPrefix + '-content Tab-content')
    contentElement.appendChild(TextNode('MAX'))
    contentElement.appendChild(document.createElement('br'))
    contentElement.appendChild(TextNode('SPEED'))

    var element = Div(classPrefix + ' Tab Button')
    element.appendChild(Div(classPrefix + '-aligner Tab-aligner'))
    element.appendChild(contentElement)

    var classList = element.classList

    var click = OnClick(element, function () {
        listener()
        classList.add('selected')
    })
    click.enable()

    return {
        element: element,
        deselect: function () {
            classList.remove('selected')
        },
    }

}
