function TripTimePanel (setDarkTheme, setLightTheme) {

    var classPrefix = 'ClockPanel'

    var hourNode = TextNode('00')

    var minuteNode = TextNode('00')

    var secondNode = TextNode('00')

    var secondElement = Div(classPrefix + '-second')
    secondElement.appendChild(TextNode(':'))
    secondElement.appendChild(secondNode)

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('TRIP TIME'))

    var labelClassList = labelElement.classList

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(hourNode)
    contentElement.appendChild(TextNode(':'))
    contentElement.appendChild(minuteNode)
    contentElement.appendChild(secondElement)

    var element = Div(classPrefix + ' BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(contentElement)

    var classList = element.classList

    var tripTime = 0,
        startTime = null,
        maxTripTime = 1000 * 60 * 60 * 100 - 1000

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        getTripTime: function () {
            return tripTime
        },
        highlight: function () {
            classList.add(highlightClass)
            labelClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                classList.remove(highlightClass)
                labelClassList.remove(highlightClass)
            }, 200)
        },
        reset: function () {
            tripTime = 0
            if (startTime !== null) startTime = Date.now()
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(labelClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(labelClassList)
        },
        start: function () {
            startTime = Date.now()
        },
        stop: function () {
            tripTime += Date.now() - startTime
            tripTime = Math.min(tripTime, maxTripTime)
            startTime = null
        },
        update: function () {

            if (startTime !== null) {
                var now = Date.now()
                tripTime += now - startTime
                startTime = now
            }
            tripTime = Math.min(tripTime, maxTripTime)

            var seconds = tripTime / 1000
            secondNode.nodeValue = TwoDigitPad(Math.floor(seconds % 60))

            var minutes = seconds / 60
            minuteNode.nodeValue = TwoDigitPad(Math.floor(minutes % 60))

            var hours = minutes / 60
            hourNode.nodeValue = TwoDigitPad(Math.floor(hours))

        },
    }

}
