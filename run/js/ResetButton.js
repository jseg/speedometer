function ResetButton (clickListener, setDarkTheme, setLightTheme) {

    var contentElement = Div('Button-content')
    contentElement.appendChild(TextNode('RESET'))
    OnClick(contentElement, clickListener)

    var contentClassList = contentElement.classList

    var element = Div('ResetButton Button')
    element.appendChild(contentElement)

    var classList = element.classList

    return {
        element: element,
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
