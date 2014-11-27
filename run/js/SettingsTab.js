function SettingsTab (listener) {

    var element = Div('Tab SettingsTab Button')
    element.appendChild(TextNode('SETTINGS'))

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
