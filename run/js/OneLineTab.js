function OneLineTab (line, className, listener,
    setDarkTheme, setLightTheme, enableTransition) {

    var highlightElement = Div('Tab-highlight')
    highlightElement.appendChild(TextNode(line))

    var highlightClassList = highlightElement.classList

    var buttonContentElement = Div('Button-content')
    buttonContentElement.appendChild(highlightElement)
    OnClick(buttonContentElement, listener)

    var buttonContentClassList = buttonContentElement.classList

    var element = Div(className + ' OneLineTab Tab Button')
    element.appendChild(buttonContentElement)

    var classList = element.classList

    var selected = false

    var selectedClass = 'selected'

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        deselect: function () {
            selected = false
            buttonContentClassList.remove(selectedClass)
            highlightClassList.remove(selectedClass)
        },
        enableTransition: function () {
            enableTransition(classList)
            enableTransition(highlightClassList)
        },
        highlight: function () {
            highlightClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                highlightClassList.remove(highlightClass)
            }, 200)
        },
        select: function () {
            selected = true
            buttonContentClassList.add(selectedClass)
            highlightClassList.add(selectedClass)
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(buttonContentClassList)
            setDarkTheme(highlightClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(buttonContentClassList)
            setLightTheme(highlightClassList)
        },
    }

}
