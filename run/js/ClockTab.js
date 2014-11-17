function ClockTab (listener) {

    var element = Div('Tab ClockTab')
    element.appendChild(TextNode('CLOCK'))

    var click = OnClick(element, listener)
    click.enable()

    return element

}
