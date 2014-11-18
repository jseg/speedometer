function ClockTab (listener) {

    var element = Div('Tab ClockTab Button')
    element.appendChild(TextNode('CLOCK'))

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
