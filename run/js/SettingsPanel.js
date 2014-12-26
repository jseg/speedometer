function SettingsPanel (settings, darkListener,
    lightListener, imperialListener, metricListener) {

    var classPrefix = 'SettingsPanel'

    var selectedClass = 'selected'

    var lightButton = Div(classPrefix + '-lightButton ' + classPrefix + '-button Button')
    lightButton.appendChild(TextNode('LIGHT'))
    OnClick(lightButton, function () {
        darkButton.classList.remove(selectedClass)
        lightButton.classList.add(selectedClass)
        lightListener()
    })

    var darkButton = Div(classPrefix + '-darkButton ' + classPrefix + '-button Button')
    darkButton.appendChild(TextNode('DARK'))
    OnClick(darkButton, function () {
        lightButton.classList.remove(selectedClass)
        darkButton.classList.add(selectedClass)
        darkListener()
    })

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

    if (settings.theme == 'light') lightButton.classList.add(selectedClass)
    else darkButton.classList.add(selectedClass)

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
    element.appendChild(lightButton)
    element.appendChild(darkButton)
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
