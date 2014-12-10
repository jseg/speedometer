function Page1Tab (listener) {

    var element = Div('Tab Page1Tab Button')
    element.appendChild(TextNode('PAGE 1'))
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
