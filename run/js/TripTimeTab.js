function TripTimeTab (listener) {

    var element = Div('Tab TripTimeTab')
    element.appendChild(TextNode('TRIP TIME'))

    var click = OnClick(element, listener)
    click.enable()

    return element

}
