function SettingsPanel (settings, imperialListener, metricListener) {

    var classPrefix = 'SettingsPanel'

    var selectedClass = 'selected'

    var imperialButton = Div(classPrefix + '-imperialButton ' + classPrefix + '-button Button')
    imperialButton.appendChild(TextNode('IMPERIAL'))
    OnClick(imperialButton, function () {
        metricButton.classList.remove(selectedClass)
        imperialButton.classList.add(selectedClass)
        imperialListener()
    })

    var metricButton = Div(classPrefix + '-metricButton ' + classPrefix + '-button Button')
    metricButton.appendChild(TextNode('METRIC'))
    OnClick(metricButton, function () {
        imperialButton.classList.remove(selectedClass)
        metricButton.classList.add(selectedClass)
        metricListener()
    })

    if (settings.unit == 'imperial') imperialButton.classList.add(selectedClass)
    else metricButton.classList.add(selectedClass)

    var fieldLabelElement = Div(classPrefix + '-fieldLabel')
    fieldLabelElement.appendChild(TextNode('UNITS:'))

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('SETTINGS'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(fieldLabelElement)
    element.appendChild(imperialButton)
    element.appendChild(metricButton)

    var classList = element.classList

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        highlight: function () {
            classList.add(highlightClass)
            labelClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                classList.remove(highlightClass)
                labelClassList.remove(highlightClass)
            }, 200)
        },
    }

}
