function StatusPanel () {

    function highlight () {
        contentClassList.add(highlightClass)
        clearTimeout(highlightTimeout)
        highlightTimeout = setTimeout(function () {
            contentClassList.remove(highlightClass)
        }, 200)
    }

    var classPrefix = 'StatusPanel'

    var valueNode = TextNode('ACQUIRING')

    var valueElement = Div(classPrefix + '-value')
    valueElement.appendChild(valueNode)

    var valueClassList = valueElement.classList

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(TextNode('GPS'))
    contentElement.appendChild(valueElement)

    var contentClassList = contentElement.classList

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    var error = false,
        errorClass = 'error'

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        hideError: function () {
            if (error) {
                error =false
                valueClassList.remove(errorClass)
                highlight()
            }
        },
        setStatus: function (value) {
            valueNode.nodeValue = value
        },
        showError: function () {
            if (!error) {
                error = true
                valueClassList.add(errorClass)
                highlight()
            }
        },
    }

}
