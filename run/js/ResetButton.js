function ResetButton (clickListener, setDarkTheme, setLightTheme, enableTransition) {

    var contentElement = Div('Button-content')
    contentElement.appendChild(TextNode('RESET'))
    OnClick(contentElement, clickListener)

    var contentClassList = contentElement.classList

    var element = Div('ResetButton Button')
    element.appendChild(contentElement)

    var classList = element.classList

    return {
        element: element,
        enableTransition: function () {
            enableTransition(classList)
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(contentClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(contentClassList)
        },
    }

}
