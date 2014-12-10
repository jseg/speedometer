function Page2Tab (listener) {

    var element = Div('Tab Page2Tab Button')
    element.appendChild(TextNode('PAGE 2'))
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
