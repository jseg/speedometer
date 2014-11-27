function SettingsPanel () {

    var classPrefix = 'SettingsPanel'

    var contentElement = Div(classPrefix + ' BottomPanel-content')

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('SETTINGS'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(contentElement)

    var classList = element.classList

    var timeout

    return {
        element: element,
        highlight: function () {
            clearTimeout(timeout)
            classList.add('highlight')
            labelClassList.add('highlight')
            timeout = setTimeout(function () {
                classList.remove('highlight')
                labelClassList.remove('highlight')
            }, 200)
        },
    }

}
