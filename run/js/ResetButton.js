function ResetButton (clickListener, enableTransition) {

    var classPrefix = 'ResetButton'

    var contentElement = Div(classPrefix + '-content Button-content')
    contentElement.appendChild(TextNode('RESET'))
    OnClick(contentElement, clickListener)

    var contentClassList = contentElement.classList

    var element = Div(classPrefix + ' Button')
    element.appendChild(contentElement)

    var classList = element.classList

    return {
        element: element,
        enableTransition: function () {
            enableTransition(classList)
        },
    }

}
