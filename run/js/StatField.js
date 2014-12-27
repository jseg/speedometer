function StatField (label) {

    var classPrefix = 'StatField'

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode(label))

    var labelClassList = labelElement.classList

    var integerPartNode = TextNode('\xb7')

    var integerPartElement = Div(classPrefix + '-integerPart')
    integerPartElement.appendChild(integerPartNode)

    var fractionalPartNode = TextNode('\xb7')

    var fractionalPartElement = Div(classPrefix + '-fractionalPart')
    fractionalPartElement.appendChild(TextNode('.'))
    fractionalPartElement.appendChild(fractionalPartNode)

    var valueElement = Div(classPrefix + '-value')
    valueElement.appendChild(integerPartElement)
    valueElement.appendChild(fractionalPartElement)

    var element = Div(classPrefix)
    element.appendChild(labelElement)
    element.appendChild(valueElement)

    return {
        element: element,
        reset: function () {
            integerPartNode.nodeValue = fractionalPartNode.nodeValue = '\xb7'
        },
        setDarkTheme: function () {
            labelClassList.remove('lightTheme')
            labelClassList.add('darkTheme')
        },
        setLightTheme: function () {
            labelClassList.remove('darkTheme')
            labelClassList.add('lightTheme')
        },
        setValue: function (integerPart, fractionalPart) {
            integerPartNode.nodeValue = integerPart
            fractionalPartNode.nodeValue = fractionalPart
        },
    }

}
