function SettingsPanel (settings, darkListener, lightListener,
    imperialListener, metricListener, setDarkTheme, setLightTheme) {

    var classPrefix = 'SettingsPanel'

    var selectedClass = 'selected'

    var lightButtonContent = Div('Button-content')
    lightButtonContent.appendChild(TextNode('LIGHT'))
    OnClick(lightButtonContent, function () {
        darkButtonContentClassList.remove(selectedClass)
        lightButtonContentClassList.add(selectedClass)
        lightListener()
    })

    var lightButtonContentClassList = lightButtonContent.classList

    var lightButton = Div(classPrefix + '-lightButton ' + classPrefix + '-button Button')
    lightButton.appendChild(lightButtonContent)

    var lightButtonClassList = lightButton.classList

    var darkButtonContent = Div('Button-content')
    darkButtonContent.appendChild(TextNode('DARK'))
    OnClick(darkButtonContent, function () {
        lightButtonContentClassList.remove(selectedClass)
        darkButtonContentClassList.add(selectedClass)
        darkListener()
    })

    var darkButtonContentClassList = darkButtonContent.classList

    var darkButton = Div(classPrefix + '-darkButton ' + classPrefix + '-button Button')
    darkButton.appendChild(darkButtonContent)

    var darkButtonClassList = darkButton.classList

    var imperialButtonContent = Div('Button-content')
    imperialButtonContent.appendChild(TextNode('IMPERIAL'))
    OnClick(imperialButtonContent, function () {
        metricButtonContentClassList.remove(selectedClass)
        imperialButtonContentClassList.add(selectedClass)
        imperialListener()
    })

    var imperialButtonContentClassList = imperialButtonContent.classList

    var imperialButton = Div(classPrefix + '-imperialButton ' + classPrefix + '-button Button')
    imperialButton.appendChild(imperialButtonContent)

    var imperialButtonClassList = imperialButton.classList

    var metricButtonContent = Div('Button-content')
    metricButtonContent.appendChild(TextNode('METRIC'))
    OnClick(metricButtonContent, function () {
        imperialButtonContentClassList.remove(selectedClass)
        metricButtonContentClassList.add(selectedClass)
        metricListener()
    })

    var metricButtonContentClassList = metricButtonContent.classList

    var metricButton = Div(classPrefix + '-metricButton ' + classPrefix + '-button Button')
    metricButton.appendChild(metricButtonContent)

    var metricButtonClassList = metricButton.classList

    if (settings.unit == 'imperial') imperialButtonContentClassList.add(selectedClass)
    else metricButtonContentClassList.add(selectedClass)

    if (settings.theme == 'light') lightButtonContentClassList.add(selectedClass)
    else darkButtonContentClassList.add(selectedClass)

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
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(labelClassList)
            setDarkTheme(lightButtonClassList)
            setDarkTheme(lightButtonContentClassList)
            setDarkTheme(darkButtonClassList)
            setDarkTheme(darkButtonContentClassList)
            setDarkTheme(imperialButtonClassList)
            setDarkTheme(imperialButtonContentClassList)
            setDarkTheme(metricButtonClassList)
            setDarkTheme(metricButtonContentClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(labelClassList)
            setLightTheme(lightButtonClassList)
            setLightTheme(lightButtonContentClassList)
            setLightTheme(darkButtonClassList)
            setLightTheme(darkButtonContentClassList)
            setLightTheme(imperialButtonClassList)
            setLightTheme(imperialButtonContentClassList)
            setLightTheme(metricButtonClassList)
            setLightTheme(metricButtonContentClassList)
        },
    }

}
