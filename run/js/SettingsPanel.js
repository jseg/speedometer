function SettingsPanel (settings, imperialListener, metricListener) {

    var classPrefix = 'SettingsPanel'

    var imperialButton = Div(classPrefix + '-button Button')
    imperialButton.appendChild(TextNode('IMPERIAL'))

    var imperialClick = OnClick(imperialButton, function () {
        metricButton.classList.remove('selected')
        imperialButton.classList.add('selected')
        imperialListener()
    })
    imperialClick.enable()

    var metricButton = Div(classPrefix + '-metricButton ' + classPrefix + '-button Button')
    metricButton.appendChild(TextNode('METRIC'))

    var metricClick = OnClick(metricButton, function () {
        imperialButton.classList.remove('selected')
        metricButton.classList.add('selected')
        metricListener()
    })
    metricClick.enable()

    if (settings.unit == 'imperial') imperialButton.classList.add('selected')
    else metricButton.classList.add('selected')

    var fieldLabelElement = Div(classPrefix + '-fieldLabel')
    fieldLabelElement.appendChild(TextNode('UNITS:'))

    var contentElement = Div(classPrefix + ' BottomPanel-content')
    contentElement.appendChild(fieldLabelElement)
    contentElement.appendChild(imperialButton)
    contentElement.appendChild(metricButton)

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
