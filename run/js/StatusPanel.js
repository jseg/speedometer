function StatusPanel () {

    function highlight () {
        classList.add(highlightClass)
        clearTimeout(highlightTimeout)
        highlightTimeout = setTimeout(function () {
            classList.remove(highlightClass)
        }, 200)
    }

    var classPrefix = 'StatusPanel'

    var valueNode = TextNode('ACQUIRING')

    var valueElement = Div(classPrefix + '-value')
    valueElement.appendChild(valueNode)

    var valueClassList = valueElement.classList

    var element = Div(classPrefix)
    element.appendChild(TextNode('GPS'))
    element.appendChild(valueElement)

    var classList = element.classList

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
