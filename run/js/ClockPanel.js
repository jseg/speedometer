function ClockPanel () {

    var classPrefix = 'ClockPanel'

    var hourNode = TextNode('00')

    var minuteNode = TextNode('00')

    var secondNode = TextNode('00')

    var secondElement = Div(classPrefix + '-second')
    secondElement.appendChild(TextNode(':'))
    secondElement.appendChild(secondNode)

    var contentElement = Div(classPrefix + '-content BottomPanel-content')
    contentElement.appendChild(hourNode)
    contentElement.appendChild(TextNode(':'))
    contentElement.appendChild(minuteNode)
    contentElement.appendChild(secondElement)

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('CLOCK'))

    var labelClassList = labelElement.classList

    var element = Div(classPrefix + ' BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(contentElement)

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
            classList.remove('lightTheme')
            classList.add('darkTheme')
            labelClassList.remove('lightTheme')
            labelClassList.add('darkTheme')
        },
        setLightTheme: function () {
            classList.remove('darkTheme')
            classList.add('lightTheme')
            labelClassList.remove('darkTheme')
            labelClassList.add('lightTheme')
        },
        update: function () {
            var date = new Date
            hourNode.nodeValue = TwoDigitPad(date.getHours())
            minuteNode.nodeValue = TwoDigitPad(date.getMinutes())
            secondNode.nodeValue = TwoDigitPad(date.getSeconds())
        },
    }

}
