function ResetButton (clickListener) {

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
            classList.remove('lightTheme')
            classList.add('darkTheme')
            contentClassList.remove('lightTheme')
            contentClassList.add('darkTheme')
        },
        setLightTheme: function () {
            classList.remove('darkTheme')
            classList.add('lightTheme')
            contentClassList.remove('darkTheme')
            contentClassList.add('lightTheme')
        },
    }

}
