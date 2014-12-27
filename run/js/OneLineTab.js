function OneLineTab (line, className, listener) {

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
            classList.remove('lightTheme')
            classList.add('darkTheme')
            buttonContentClassList.remove('lightTheme')
            buttonContentClassList.add('darkTheme')
            highlightClassList.remove('lightTheme')
            highlightClassList.add('darkTheme')
        },
        setLightTheme: function () {
            classList.remove('darkTheme')
            classList.add('lightTheme')
            buttonContentClassList.remove('darkTheme')
            buttonContentClassList.add('lightTheme')
            highlightClassList.remove('darkTheme')
            highlightClassList.add('lightTheme')
        },
    }

}
