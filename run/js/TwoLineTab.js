function TwoLineTab (line1, line2, className,
    listener, setDarkTheme, setLightTheme, enableTransition) {

    var classPrefix = 'TwoLineTab ' + className

    var contentElement = Div(classPrefix + '-content Tab-content')
    contentElement.appendChild(TextNode(line1))
    contentElement.appendChild(document.createElement('br'))
    contentElement.appendChild(TextNode(line2))

    var highlightElement = Div('Tab-highlight')
    highlightElement.appendChild(Div(classPrefix + '-aligner Tab-aligner'))
    highlightElement.appendChild(contentElement)

    var highlightClassList = highlightElement.classList

    var buttonContentElement = Div('Button-content')
    buttonContentElement.appendChild(highlightElement)
    OnClick(buttonContentElement, listener)

    var buttonContentClassList = buttonContentElement.classList

    var element = Div(classPrefix + ' Tab Button')
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
