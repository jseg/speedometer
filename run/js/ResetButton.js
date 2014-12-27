function ResetButton (clickListener) {

    var contentElement = Div('Button-content')
    contentElement.appendChild(TextNode('RESET'))
    OnClick(contentElement, clickListener)

    var element = Div('ResetButton Button')
    element.appendChild(contentElement)

    return element

}
