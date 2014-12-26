function SettingsPanel (settings, imperialListener, metricListener) {

    var classPrefix = 'SettingsPanel'

    var selectedClass = 'selected'

    var darkButton = Div(classPrefix + '-darkButton ' + classPrefix + '-button Button')
    darkButton.appendChild(TextNode('DARK'))

    var lightButton = Div(classPrefix + '-lightButton ' + classPrefix + '-button Button')
    lightButton.appendChild(TextNode('LIGHT'))
    lightButton.classList.add(selectedClass)

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

    var unitsLabelElement = Div(classPrefix + '-fieldLabel units')
    unitsLabelElement.appendChild(TextNode('UNITS:'))

    var themeLabelElement = Div(classPrefix + '-fieldLabel theme')
    themeLabelElement.appendChild(TextNode('THEME:'))

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('SETTINGS'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(themeLabelElement)
    element.appendChild(darkButton)
    element.appendChild(lightButton)
    element.appendChild(unitsLabelElement)
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
