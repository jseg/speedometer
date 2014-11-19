function ResetButton (clickListener) {

    var element = Div('ResetButton Button')
    element.appendChild(TextNode('RESET'))

    var click = OnClick(element, clickListener)
    click.enable()

    return element

}
