function SettingsTab (listener) {

    var element = Div('Tab SettingsTab Button')
    element.appendChild(TextNode('SETTINGS'))
    OnClick(element, function () {
        listener()
        classList.add(selectedClass)
    })

    var classList = element.classList

    var selectedClass = 'selected'

    return {
        element: element,
        deselect: function () {
            classList.remove(selectedClass)
        },
    }

}
