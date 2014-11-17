function TripDistanceTab (listener) {

    var element = Div('Tab TripDistanceTab')
    element.appendChild(TextNode('TRIP DST'))

    var click = OnClick(element, listener)
    click.enable()

    return element

}
